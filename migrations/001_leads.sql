create table if not exists leads (
  id uuid primary key,
  idempotency_key text not null unique,
  payload_hash text not null,
  created_at timestamptz not null default now(),
  activity_stage text not null,
  platforms text[] not null,
  concern text not null,
  contact_method text not null,
  contact_value text not null,
  consent_version text not null,
  source text not null,
  utm jsonb not null default '{}'::jsonb,
  ip_hash text not null,
  user_agent text not null,
  status text not null default 'new',
  retention_until timestamptz not null
);

alter table leads
  add column if not exists payload_hash text;

create index if not exists leads_ip_rate_idx
  on leads (ip_hash, created_at desc);

create index if not exists leads_retention_idx
  on leads (retention_until);

create table if not exists lead_outbox (
  id bigserial primary key,
  lead_id uuid not null references leads(id) on delete cascade,
  event_type text not null,
  payload jsonb not null,
  attempts integer not null default 0,
  available_at timestamptz not null default now(),
  processing_started_at timestamptz,
  delivered_at timestamptz,
  failed_at timestamptz,
  last_error text,
  unique (lead_id, event_type)
);

alter table lead_outbox
  add column if not exists processing_started_at timestamptz,
  add column if not exists failed_at timestamptz;

create index if not exists lead_outbox_pending_idx
  on lead_outbox (available_at, id)
  where delivered_at is null and failed_at is null;

-- Expired rows are deleted by the authenticated maintenance task.
