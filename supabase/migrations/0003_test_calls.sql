-- "Beni Ara" self-test aramalari icin ayri tablo (musteri talebine bagli degil).
-- Admin panelden girilen numaraya yapilan gercek Retell telefon testini kaydeder.

create table if not exists public.test_calls (
  id uuid primary key default gen_random_uuid(),
  to_number text not null,               -- E.164 aranan numara
  scenario_id text,                      -- test-scenarios.ts id
  retell_call_id text,
  status text not null default 'queued', -- queued|ringing|in_progress|completed|failed|no_answer|voicemail
  price numeric,
  currency text default 'TRY',
  price_unit text,                       -- m2 | adet | toplam | bilinmiyor
  lead_time_days int,
  warranty_years numeric,
  includes_installation boolean,
  is_reachable boolean,
  summary text,
  transcript text,
  recording_url text,
  raw_analysis jsonb,
  error text,
  started_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_test_calls_retell on public.test_calls(retell_call_id);
create index if not exists idx_test_calls_created on public.test_calls(created_at desc);

alter table public.test_calls enable row level security;

-- Ayni talep+tedarikci icin tekrar arama denemesinde duplike satiri engelle.
-- (triggerCallsForRequest retry'da eski satirlari silip yeniden ekler; bu ek guvence.)
create unique index if not exists uniq_call_sessions_request_supplier
  on public.call_sessions(request_id, supplier_id);
