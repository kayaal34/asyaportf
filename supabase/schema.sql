-- ============================================================================
--  Asya portfolio — Supabase schema
--  Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
-- ============================================================================

-- 1. Content table -----------------------------------------------------------
--    A single row (id = 1) holding the whole site content document as JSON.

create table if not exists public.site_content (
  id          integer primary key default 1,
  data        jsonb   not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  constraint site_content_single_row check (id = 1)
);

insert into public.site_content (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- 2. Row Level Security ----------------------------------------------------------
--    Anyone may read the content (the public site needs it).
--    Only signed-in users may change it.

alter table public.site_content enable row level security;

drop policy if exists "site_content read for all" on public.site_content;
create policy "site_content read for all"
  on public.site_content for select
  using (true);

drop policy if exists "site_content write for authenticated" on public.site_content;
create policy "site_content write for authenticated"
  on public.site_content for all
  to authenticated
  using (true)
  with check (true);

-- 3. Storage bucket for uploaded Work images -----------------------------------

insert into storage.buckets (id, name, public)
values ('work-images', 'work-images', true)
on conflict (id) do nothing;

drop policy if exists "work-images public read" on storage.objects;
create policy "work-images public read"
  on storage.objects for select
  using (bucket_id = 'work-images');

drop policy if exists "work-images authenticated write" on storage.objects;
create policy "work-images authenticated write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'work-images');

drop policy if exists "work-images authenticated update" on storage.objects;
create policy "work-images authenticated update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'work-images');

drop policy if exists "work-images authenticated delete" on storage.objects;
create policy "work-images authenticated delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'work-images');

-- 4. Leads (заявки from the /contact form) --------------------------------------

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  contact     text not null,           -- telegram / whatsapp / phone
  email       text,
  platform    text,                    -- WB / OZON / both
  shop        text,                    -- shop name or cabinet link
  turnover    text,                    -- current monthly turnover
  message     text,
  handled     boolean not null default false
);

-- If the table already exists from an earlier version, add the new columns:
alter table public.leads add column if not exists email text;
alter table public.leads add column if not exists turnover text;

alter table public.leads enable row level security;

-- Anyone may submit a lead…
drop policy if exists "leads insert for anon" on public.leads;
create policy "leads insert for anon"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- …only signed-in users (Asya) may read / update / delete them.
drop policy if exists "leads read for authenticated" on public.leads;
create policy "leads read for authenticated"
  on public.leads for select to authenticated using (true);

drop policy if exists "leads update for authenticated" on public.leads;
create policy "leads update for authenticated"
  on public.leads for update to authenticated using (true) with check (true);

drop policy if exists "leads delete for authenticated" on public.leads;
create policy "leads delete for authenticated"
  on public.leads for delete to authenticated using (true);

-- 5. Page views (lightweight analytics) --------------------------------------

create table if not exists public.page_views (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  path        text not null,
  referrer    text
);

create index if not exists page_views_created_at_idx on public.page_views (created_at desc);

alter table public.page_views enable row level security;

drop policy if exists "page_views insert for anon" on public.page_views;
create policy "page_views insert for anon"
  on public.page_views for insert to anon, authenticated with check (true);

drop policy if exists "page_views read for authenticated" on public.page_views;
create policy "page_views read for authenticated"
  on public.page_views for select to authenticated using (true);

-- 6. Email notification on new lead -------------------------------------------
--    Fires the `notify-lead` Edge Function (see supabase/functions/notify-lead)
--    whenever a row is inserted into `leads`, which emails Asya via Resend.
--    Uses pg_net (Supabase's built-in HTTP extension) to call the function.
--    The `notify-lead` function must have "Enforce JWT Verification" turned
--    off (Edge Functions → notify-lead → settings), since this call carries
--    no auth header.

create extension if not exists pg_net;

create or replace function public.notify_new_lead()
returns trigger
language plpgsql
security definer
as $$
begin
  perform net.http_post(
    url := 'https://fgayxfzzpouotpkxruxm.supabase.co/functions/v1/notify-lead',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object('type', 'INSERT', 'table', 'leads', 'record', to_jsonb(new))
  );
  return new;
end;
$$;

drop trigger if exists notify_new_lead_trigger on public.leads;
create trigger notify_new_lead_trigger
after insert on public.leads
for each row execute function public.notify_new_lead();

-- ============================================================================
--  After running this:
--   • Authentication → Sign In / Providers → enable "Allow new users to sign up"
--   • open  /admin/setup  on the site, create the account (email + password)
--   • turn "Allow new users to sign up" back OFF
--   • log in at  /admin
-- ============================================================================
