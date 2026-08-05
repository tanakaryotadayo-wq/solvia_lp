import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { db, databaseConfigured } from "./db";
import type { LeadInput } from "./lead-schema";
import { isApprovedProductionRelease } from "./release";

type RequestMeta = {
  idempotencyKey: string;
  ipHash: string;
  userAgent: string;
  consentVersion: string;
};

export function hashIp(ip: string) {
  const secret = process.env.LEAD_HASH_SECRET;
  if (!secret) return "preview";
  return createHmac("sha256", secret).update(ip).digest("hex");
}

export async function createLead(input: LeadInput, meta: RequestMeta) {
  const candidateLeadId = crypto.randomUUID();

  if (!isApprovedProductionRelease()) {
    return { leadId: candidateLeadId, preview: true };
  }
  if (!databaseConfigured()) throw new Error("INTAKE_NOT_CONFIGURED");

  const sql = db();
  let storedLeadId = candidateLeadId;
  const payloadHash = createHash("sha256").update(JSON.stringify(input)).digest("hex");
  await sql.begin(async (tx) => {
    const duplicate = await tx<{ id: string; payload_hash: string | null }[]>`
      select id, payload_hash from leads where idempotency_key = ${meta.idempotencyKey}
    `;
    if (duplicate[0]) {
      if (duplicate[0].payload_hash !== payloadHash) {
        throw new Error("IDEMPOTENCY_CONFLICT");
      }
      storedLeadId = duplicate[0].id;
      return;
    }

    await tx`select pg_advisory_xact_lock(hashtext(${meta.ipHash}))`;

    const recent = await tx<{ count: number }[]>`
      select count(*)::int as count
      from leads
      where ip_hash = ${meta.ipHash}
        and created_at > now() - interval '15 minutes'
    `;

    if ((recent[0]?.count ?? 0) >= 5) {
      throw new Error("RATE_LIMITED");
    }

    const rows = await tx<{ id: string }[]>`
      insert into leads (
        id, idempotency_key, payload_hash, activity_stage, platforms, concern,
        contact_method, contact_value, consent_version, source,
        utm, ip_hash, user_agent, retention_until
      ) values (
        ${candidateLeadId}, ${meta.idempotencyKey}, ${payloadHash}, ${input.activityStage},
        ${tx.array(input.platforms)}, ${input.concern}, ${input.contactMethod},
        ${input.contactValue}, ${meta.consentVersion}, ${input.source},
        ${tx.json(input.utm ?? {})}, ${meta.ipHash}, ${meta.userAgent},
        now() + interval '180 days'
      )
      on conflict (idempotency_key) do update
        set idempotency_key = excluded.idempotency_key
      returning id
    `;

    const storedId = rows[0]?.id ?? candidateLeadId;
    storedLeadId = storedId;
    await tx`
      insert into lead_outbox (lead_id, event_type, payload)
      values (
        ${storedId},
        'lead.created',
        ${tx.json({
          leadId: storedId,
          activityStage: input.activityStage,
          platforms: input.platforms,
          concern: input.concern,
          contactMethod: input.contactMethod,
          contactValue: input.contactValue,
          source: input.source,
          utm: input.utm ?? {},
        })}
      )
      on conflict (lead_id, event_type) do nothing
    `;
  });

  return { leadId: storedLeadId, preview: false };
}

function signPayload(timestamp: string, body: string) {
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  if (!secret) throw new Error("WEBHOOK_SECRET_NOT_CONFIGURED");
  return createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
}

class PermanentDeliveryError extends Error {}

export async function deliverOutbox(limit = 10) {
  if (
    !databaseConfigured() ||
    !process.env.LEAD_NOTIFICATION_WEBHOOK_URL ||
    !process.env.LEAD_WEBHOOK_SECRET
  ) {
    return { delivered: 0, skipped: true };
  }

  const sql = db();
  const events = await sql<
    { id: number; lead_id: string; event_type: string; payload: unknown }[]
  >`
    with pending as (
      select id
      from lead_outbox
      where delivered_at is null
        and failed_at is null
        and available_at <= now()
        and (
          processing_started_at is null
          or processing_started_at < now() - interval '15 minutes'
        )
      order by id
      for update skip locked
      limit ${limit}
    )
    update lead_outbox as event
    set processing_started_at = now()
    from pending
    where event.id = pending.id
    returning event.id, event.lead_id, event.event_type, event.payload
  `;

  let delivered = 0;
  for (const event of events) {
    const timestamp = Math.floor(Date.now() / 1_000).toString();
    const body = JSON.stringify({
      eventId: event.id,
      eventType: event.event_type,
      payload: event.payload,
    });

    try {
      const response = await fetch(process.env.LEAD_NOTIFICATION_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-solvia-timestamp": timestamp,
          "x-solvia-signature": signPayload(timestamp, body),
        },
        body,
        signal: AbortSignal.timeout(8_000),
      });

      if (!response.ok) {
        const message = `WEBHOOK_${response.status}`;
        if (response.status !== 408 && response.status !== 429 && response.status < 500) {
          throw new PermanentDeliveryError(message);
        }
        throw new Error(message);
      }

      await sql`
        update lead_outbox
        set delivered_at = now(), processing_started_at = null, last_error = null
        where id = ${event.id}
      `;
      delivered += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message.slice(0, 160) : "unknown";
      const permanent = error instanceof PermanentDeliveryError;
      await sql`
        update lead_outbox
        set attempts = attempts + 1,
            last_error = ${message},
            processing_started_at = null,
            failed_at = case
              when ${permanent} or attempts + 1 >= 12 then now()
              else null
            end,
            available_at = now() + make_interval(
              mins => power(2, least(attempts, 6))::int
            ) + random() * interval '30 seconds'
        where id = ${event.id}
      `;
    }
  }

  return { delivered, skipped: false };
}

export async function purgeExpiredLeads(limit = 1_000) {
  if (!databaseConfigured()) return { purged: 0, skipped: true };

  const sql = db();
  const rows = await sql<{ id: string }[]>`
    with expired as (
      select id
      from leads
      where retention_until < now()
      order by retention_until
      limit ${limit}
      for update skip locked
    )
    delete from leads
    using expired
    where leads.id = expired.id
    returning leads.id
  `;

  return { purged: rows.length, skipped: false };
}

export function validCronSecret(authorization: string | null) {
  const secret = process.env.CRON_SECRET;
  if (!secret || !authorization?.startsWith("Bearer ")) return false;
  const supplied = Buffer.from(authorization.slice(7));
  const expected = Buffer.from(secret);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}
