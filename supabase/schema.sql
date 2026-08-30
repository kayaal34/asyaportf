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

-- ============================================================================
--  After running this:
--   • Authentication → Sign In / Providers → enable "Allow new users to sign up"
--   • open  /admin/setup  on the site, create the account (email + password)
--   • turn "Allow new users to sign up" back OFF
--   • log in at  /admin
-- ============================================================================
