-- =============================================================
--  Paxoi Villas - Supabase schema
--  Run this entire file once in the Supabase SQL editor.
-- =============================================================

create extension if not exists "pgcrypto";

-- ---------- VILLAS ----------
create table if not exists public.villas (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  tagline       text,
  description   text not null,
  capacity      int  not null default 2,
  bedrooms      int  not null default 1,
  bathrooms     int  not null default 1,
  size_sqm      int,
  location      text default 'Paxos, Greece',
  amenities     jsonb not null default '[]'::jsonb,
  booking_url   text,
  airbnb_url    text,
  hero_image    text,
  price_from    int,
  featured      boolean not null default false,
  is_available  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_villas_featured on public.villas(featured);

-- ---------- VILLA IMAGES ----------
create table if not exists public.villa_images (
  id          uuid primary key default gen_random_uuid(),
  villa_id    uuid not null references public.villas(id) on delete cascade,
  image_url   text not null,
  alt         text,
  position    int  not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists idx_villa_images_villa on public.villa_images(villa_id);

-- ---------- UNAVAILABLE DATES (manual calendar) ----------
create table if not exists public.villa_unavailable_dates (
  id          uuid primary key default gen_random_uuid(),
  villa_id    uuid not null references public.villas(id) on delete cascade,
  start_date  date not null,
  end_date    date not null,
  note        text,
  created_at  timestamptz not null default now(),
  check (end_date >= start_date)
);

create index if not exists idx_unavail_villa on public.villa_unavailable_dates(villa_id);

-- ---------- FAVORITES ----------
create table if not exists public.favorites (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  villa_id    uuid not null references public.villas(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (user_id, villa_id)
);

create index if not exists idx_favorites_user on public.favorites(user_id);

-- ---------- CONTACT MESSAGES ----------
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  message     text not null,
  villa_id    uuid references public.villas(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- =============================================================
--  Row Level Security
-- =============================================================

alter table public.villas                    enable row level security;
alter table public.villa_images              enable row level security;
alter table public.villa_unavailable_dates   enable row level security;
alter table public.favorites                 enable row level security;
alter table public.contact_messages          enable row level security;

-- Public read for villas + images + unavailable dates
drop policy if exists "villas_public_read" on public.villas;
create policy "villas_public_read" on public.villas
  for select using (true);

drop policy if exists "villa_images_public_read" on public.villa_images;
create policy "villa_images_public_read" on public.villa_images
  for select using (true);

drop policy if exists "unavail_public_read" on public.villa_unavailable_dates;
create policy "unavail_public_read" on public.villa_unavailable_dates
  for select using (true);

-- Favorites: users can only see / modify their own
drop policy if exists "favorites_select_own" on public.favorites;
create policy "favorites_select_own" on public.favorites
  for select using (auth.uid() = user_id);

drop policy if exists "favorites_insert_own" on public.favorites;
create policy "favorites_insert_own" on public.favorites
  for insert with check (auth.uid() = user_id);

drop policy if exists "favorites_delete_own" on public.favorites;
create policy "favorites_delete_own" on public.favorites
  for delete using (auth.uid() = user_id);

-- Contact messages: anyone can submit, no public read
drop policy if exists "contact_insert_anyone" on public.contact_messages;
create policy "contact_insert_anyone" on public.contact_messages
  for insert with check (true);

-- NOTE: admin writes go through server actions using the SERVICE ROLE KEY
-- which bypasses RLS, so we do NOT need admin write policies here.

-- =============================================================
--  Storage bucket for villa images
-- =============================================================
insert into storage.buckets (id, name, public)
values ('villa-images', 'villa-images', true)
on conflict (id) do nothing;

-- Anyone can read images
drop policy if exists "villa_images_read" on storage.objects;
create policy "villa_images_read" on storage.objects
  for select using (bucket_id = 'villa-images');

-- Uploads happen server-side via the service role key, so no
-- public insert/update/delete policy is required.

-- =============================================================
--  updated_at trigger
-- =============================================================
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_villas_updated on public.villas;
create trigger trg_villas_updated
  before update on public.villas
  for each row execute function public.touch_updated_at();
