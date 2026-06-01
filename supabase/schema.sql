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
