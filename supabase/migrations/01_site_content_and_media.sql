-- =============================================================
--  Paxoi Villas — Migration 01
--  Adds: site_content (CMS-style key/value), media_library (reusable assets).
--  Safe to run on top of schema.sql — purely additive, idempotent.
-- =============================================================

-- ---------- SITE CONTENT (CMS blocks) ----------
-- Each row holds a logical content block (hero, about, experiences, cta, ...)
-- The value is a flexible jsonb shape that the front-end interprets per key.
-- Components fall back to translations.ts when a row is absent or partial.
create table if not exists public.site_content (
  key         text primary key,
  value       jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "site_content_public_read" on public.site_content;
create policy "site_content_public_read" on public.site_content
  for select using (true);

drop trigger if exists trg_site_content_updated on public.site_content;
create trigger trg_site_content_updated
  before update on public.site_content
  for each row execute function public.touch_updated_at();

-- ---------- MEDIA LIBRARY ----------
-- A reusable catalogue of images (and later videos). Both uploaded assets
-- (stored in the existing villa-images bucket under a media/ prefix) and
-- external URLs (e.g. Unsplash) live here so admins can pick them by URL
-- inside any editor.
create table if not exists public.media_library (
  id          uuid primary key default gen_random_uuid(),
  url         text not null,
  alt         text,
  kind        text not null default 'image',
  storage_path text,
  tags        text[] not null default '{}',
  created_at  timestamptz not null default now()
);

create index if not exists idx_media_library_kind    on public.media_library(kind);
create index if not exists idx_media_library_created on public.media_library(created_at desc);

alter table public.media_library enable row level security;

drop policy if exists "media_library_public_read" on public.media_library;
create policy "media_library_public_read" on public.media_library
  for select using (true);

-- Writes happen server-side via the service role key (admin actions),
-- so no public write policy is required.

-- ---------- SEED default site_content rows (idempotent) ----------
-- These mirror the translations.ts defaults so the public site looks
-- identical out of the box, then admins can edit them via /admin/content.
insert into public.site_content (key, value) values
  ('home_hero', jsonb_build_object(
    'image', 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=2400&q=80',
    'en', jsonb_build_object(
      'eyebrow', 'Paxos, Greece',
      'title', 'Three villas. One unforgettable Ionian summer.',
      'subtitle', 'A private collection of luxury hideaways above the turquoise coast of Paxos — where slow mornings, olive groves and cinematic sunsets are part of the stay.'
    ),
    'gr', jsonb_build_object(
      'eyebrow', 'Παξοί, Ελλάδα',
      'title', 'Τρεις βίλες. Ένα αξέχαστο ιόνιο καλοκαίρι.',
      'subtitle', 'Μια ιδιωτική συλλογή πολυτελών καταφυγίων πάνω από τα τιρκουάζ νερά των Παξών — όπου τα ήρεμα πρωινά, οι ελαιώνες και τα ηλιοβασιλέματα είναι μέρος της εμπειρίας.'
    )
  )),
  ('home_about', jsonb_build_object(
    'image', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
    'stats', jsonb_build_array(
      jsonb_build_object('k', '3',  'v', 'Private villas'),
      jsonb_build_object('k', '22', 'v', 'Guests max'),
      jsonb_build_object('k', '0',  'v', 'Booking fees')
    ),
    'en', jsonb_build_object(
      'eyebrow', 'The collection',
      'title', 'A trio of villas, one quiet corner of paradise',
      'body', 'Set across a sun-drenched hillside, our three villas share the same olive grove, the same horizon, and the same obsession with quiet, well-made luxury. Stay in one — or book all three for an unforgettable private retreat.'
    ),
    'gr', jsonb_build_object(
      'eyebrow', 'Η συλλογή',
      'title', 'Τρεις βίλες, μια ήσυχη γωνιά του παραδείσου',
      'body', 'Πάνω από μια ηλιόλουστη πλαγιά, οι τρεις βίλες μας μοιράζονται τον ίδιο ελαιώνα, τον ίδιο ορίζοντα και την ίδια αγάπη για την ήσυχη, καλοφτιαγμένη πολυτέλεια.'
    )
  )),
  ('home_experiences', jsonb_build_object(
    'items', jsonb_build_array(
      jsonb_build_object(
        'icon', 'Sailboat',
        'image', 'https://images.unsplash.com/photo-1502209524164-acea936639a2?auto=format&fit=crop&w=1200&q=80',
        'en', jsonb_build_object('title', 'Private boat days', 'body', 'Charter a wooden caïque and trace the hidden coves of Antipaxos.'),
        'gr', jsonb_build_object('title', 'Ιδιωτικές ημέρες με σκάφος', 'body', 'Νοικιάστε καΐκι και ανακαλύψτε τους κρυφούς όρμους του Αντίπαξου.')
      ),
      jsonb_build_object(
        'icon', 'UtensilsCrossed',
        'image', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80',
        'en', jsonb_build_object('title', 'Private chef dinners', 'body', 'Slow tasting menus served at home, in pyjamas if you wish.'),
        'gr', jsonb_build_object('title', 'Δείπνα με ιδιωτικό σεφ', 'body', 'Αργά μενού δοκιμασίας σερβιρισμένα στο σπίτι, με ησυχία.')
      ),
      jsonb_build_object(
        'icon', 'Waves',
        'image', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        'en', jsonb_build_object('title', 'Sunset swims', 'body', 'Cliff steps lead straight to a private patch of Ionian blue.'),
        'gr', jsonb_build_object('title', 'Βουτιές στο ηλιοβασίλεμα', 'body', 'Σκαλιά στον βράχο οδηγούν σε μια ιδιωτική γωνιά γαλάζιου.')
      ),
      jsonb_build_object(
        'icon', 'Wine',
        'image', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
        'en', jsonb_build_object('title', 'Local wine tastings', 'body', 'Sip native Ionian varietals on the veranda as the sun melts.'),
        'gr', jsonb_build_object('title', 'Γευσιγνωσίες κρασιού', 'body', 'Δοκιμάστε ιόνια κρασιά στη βεράντα την ώρα του δειλινού.')
      )
    )
  )),
  ('home_cta', jsonb_build_object(
    'image', 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=80',
    'en', jsonb_build_object(
      'title', 'Ready to plan your stay?',
      'body', 'Reserve your favourite villa directly on Booking.com or Airbnb — secure, instant and protected.'
    ),
    'gr', jsonb_build_object(
      'title', 'Έτοιμοι να σχεδιάσετε τη διαμονή σας;',
      'body', 'Κάντε κράτηση απευθείας μέσω Booking.com ή Airbnb — άμεσα και με ασφάλεια.'
    )
  ))
on conflict (key) do nothing;
