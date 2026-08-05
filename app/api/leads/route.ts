import { after, NextResponse } from "next/server";
import { createLead, deliverOutbox, hashIp } from "../../../lib/leads";
import { leadSchema } from "../../../lib/lead-schema";
import { siteConfig } from "../../../content/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "INVALID_ORIGIN" }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "UNSUPPORTED_MEDIA_TYPE" }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 12_000) {
    return NextResponse.json({ error: "PAYLOAD_TOO_LARGE" }, { status: 413 });
  }

  let json: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > 12_000) {
      return NextResponse.json({ error: "PAYLOAD_TOO_LARGE" }, { status: 413 });
    }
    json = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_INPUT", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ipHash = hashIp(forwarded || "unknown");
  const suppliedIdempotencyKey = request.headers.get("idempotency-key")?.trim();
  const idempotencyKey = suppliedIdempotencyKey || crypto.randomUUID();

  try {
    const result = await createLead(parsed.data, {
      idempotencyKey: idempotencyKey.slice(0, 128),
      ipHash,
      userAgent: (request.headers.get("user-agent") || "unknown").slice(0, 240),
      consentVersion: siteConfig.consentVersion,
    });

    if (!result.preview) {
      after(async () => {
        await deliverOutbox(1);
      });
    }

    return NextResponse.json(
      { ok: true, leadId: result.leadId, preview: result.preview },
      { status: result.preview ? 202 : 201 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === "RATE_LIMITED") {
      return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
    }
    if (error instanceof Error && error.message === "IDEMPOTENCY_CONFLICT") {
      return NextResponse.json({ error: "IDEMPOTENCY_CONFLICT" }, { status: 409 });
    }
    return NextResponse.json({ error: "TEMPORARILY_UNAVAILABLE" }, { status: 503 });
  }
}
