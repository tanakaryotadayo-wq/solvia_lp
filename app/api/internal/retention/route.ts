import { NextResponse } from "next/server";
import { purgeExpiredLeads, validCronSecret } from "../../../../lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!validCronSecret(request.headers.get("authorization"))) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const result = await purgeExpiredLeads();
  if (result.skipped) {
    return NextResponse.json({ error: "RETENTION_NOT_CONFIGURED" }, { status: 503 });
  }

  return NextResponse.json({ ok: true, purged: result.purged });
}
