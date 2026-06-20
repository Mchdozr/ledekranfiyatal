-- ledekranfiyatal.com - AI sesli cagri motoru semasi
-- Calistirma: Supabase Dashboard > SQL Editor veya `supabase db push`

create extension if not exists "pgcrypto";

-- Tedarikciler
create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,                 -- E.164 ornek: +905xxxxxxxxx
  city text,
  product_types text[] not null default '{}',  -- urun slug'lari (bos = hepsi)
  usage_types text[] not null default '{}',     -- ic-mekan/dis-mekan/kiralama (bos = hepsi)
  active boolean not null default true,
  priority int not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

-- Musteri teklif talepleri
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  usage_type text not null,
  width text,
  height text,
  area text,
  distance text,
  pixel_pitch text,
  application text not null,
  city text not null,
  installation text,
  notes text,
  full_name text not null,
  phone text not null,
  email text not null,
  kvkk boolean not null default false,
  marketing boolean not null default false,
  status text not null default 'new',  -- new | calling | completed | archived
  created_at timestamptz not null default now()
);

-- Tedarikci basina cagri oturumu
create table if not exists public.call_sessions (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.quote_requests(id) on delete cascade,
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
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

create index if not exists idx_call_sessions_request on public.call_sessions(request_id);
create index if not exists idx_call_sessions_retell on public.call_sessions(retell_call_id);
create index if not exists idx_quote_requests_status on public.quote_requests(status);

-- Uygulama ayarlari (KVKK/kayit gibi parametreler)
create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.app_settings (key, value) values
  ('call', '{"recordingEnabled": true, "disclosureEnabled": true, "maxConcurrentCalls": 5}'::jsonb)
on conflict (key) do nothing;

-- RLS: varsayilan kapali. Sunucu service_role anahtariyla baglanir ve RLS'i bypass eder.
alter table public.suppliers enable row level security;
alter table public.quote_requests enable row level security;
alter table public.call_sessions enable row level security;
alter table public.app_settings enable row level security;
