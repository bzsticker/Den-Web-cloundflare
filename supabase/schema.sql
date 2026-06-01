create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  line_id text,
  car_model text,
  plate_number text,
  service_type text not null,
  branch text,
  preferred_date date,
  message text,
  status text not null default 'new',
  created_at timestamp with time zone not null default now(),
  constraint bookings_status_check check (
    status in ('new', 'contacted', 'confirmed', 'completed', 'cancelled')
  )
);

alter table public.bookings enable row level security;

alter table public.bookings
add column if not exists branch text;

drop policy if exists "Allow public booking inserts" on public.bookings;

create policy "Allow public booking inserts"
on public.bookings
for insert
to anon
with check (status = 'new');

create table if not exists public.site_content (
  id text primary key default 'main',
  content jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Allow public site content reads" on public.site_content;
drop policy if exists "Allow authenticated site content inserts" on public.site_content;
drop policy if exists "Allow authenticated site content updates" on public.site_content;

create policy "Allow public site content reads"
on public.site_content
for select
to anon, authenticated
using (id = 'main');

create policy "Allow authenticated site content inserts"
on public.site_content
for insert
to authenticated
with check (id = 'main');

create policy "Allow authenticated site content updates"
on public.site_content
for update
to authenticated
using (id = 'main')
with check (id = 'main');

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do update set public = true;

drop policy if exists "Allow public site asset reads" on storage.objects;
drop policy if exists "Allow authenticated site asset uploads" on storage.objects;
drop policy if exists "Allow authenticated site asset updates" on storage.objects;
drop policy if exists "Allow authenticated site asset deletes" on storage.objects;

create policy "Allow public site asset reads"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'site-assets');

create policy "Allow authenticated site asset uploads"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-assets');

create policy "Allow authenticated site asset updates"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-assets')
with check (bucket_id = 'site-assets');

create policy "Allow authenticated site asset deletes"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-assets');
