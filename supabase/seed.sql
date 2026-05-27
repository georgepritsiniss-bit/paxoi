-- =============================================================
--  Paxoi Villas - Seed data (3 luxury villas)
--  Run this AFTER schema.sql.
-- =============================================================

-- Clean previous seed (safe to re-run)
delete from public.villa_unavailable_dates;
delete from public.villa_images;
delete from public.villas;

-- ---------- Villa 1: Lefkothea ----------
with v as (
  insert into public.villas
    (slug, name, tagline, description, capacity, bedrooms, bathrooms, size_sqm,
     amenities, booking_url, airbnb_url, hero_image, price_from, featured, is_available)
  values (
    'villa-lefkothea',
    'Villa Lefkothea',
    'Whitewashed elegance above the Ionian Sea',
    'Perched on a sun-drenched hillside above Lakka Bay, Villa Lefkothea blends timeless Ionian architecture with quiet, modern luxury. Long verandas, hand-finished stone and an infinity pool that spills toward the horizon make every hour feel like golden hour.',
    8, 4, 3, 280,
    '["Infinity pool","Sea view","Private chef on request","Air conditioning","Wi-Fi","BBQ","Outdoor dining","Sun loungers","Parking","Smart TV"]'::jsonb,
    'https://www.booking.com/',
    'https://www.airbnb.com/',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=80',
    650,
    true, true
  )
  returning id
)
insert into public.villa_images (villa_id, image_url, alt, position)
select v.id, img.url, img.alt, img.pos from v, (values
  ('https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=80','Villa Lefkothea exterior at dusk',0),
  ('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=80','Bright living room',1),
  ('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=2000&q=80','Master bedroom with sea view',2),
  ('https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2000&q=80','Infinity pool',3),
  ('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80','Outdoor terrace at sunset',4),
  ('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80','Stone kitchen',5)
) as img(url,alt,pos);

-- ---------- Villa 2: Aphrodite ----------
with v as (
  insert into public.villas
    (slug, name, tagline, description, capacity, bedrooms, bathrooms, size_sqm,
     amenities, booking_url, airbnb_url, hero_image, price_from, featured, is_available)
  values (
    'villa-aphrodite',
    'Villa Aphrodite',
    'A romantic retreat hidden in the olive groves',
    'Tucked between centuries-old olive trees and a private cove, Villa Aphrodite is an intimate hideaway for couples and small families. Curved white walls, soft linen and a heated plunge pool create a sense of slow, sensual indulgence — the Greek summer at its most personal.',
    4, 2, 2, 180,
    '["Heated plunge pool","Private garden","Beach access","Air conditioning","Wi-Fi","Coffee machine","Outdoor shower","Hammock","Parking","Pet friendly"]'::jsonb,
    'https://www.booking.com/',
    'https://www.airbnb.com/',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=2000&q=80',
    480,
    true, true
  )
  returning id
)
insert into public.villa_images (villa_id, image_url, alt, position)
select v.id, img.url, img.alt, img.pos from v, (values
  ('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=2000&q=80','Villa Aphrodite exterior',0),
  ('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=80','Bedroom with arched window',1),
  ('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=80','Plunge pool at golden hour',2),
  ('https://images.unsplash.com/photo-1551776235-dde6d4829808?auto=format&fit=crop&w=2000&q=80','Outdoor lounge',3),
  ('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80','Olive grove garden',4),
  ('https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=2000&q=80','Open-air bathroom',5)
) as img(url,alt,pos);

-- ---------- Villa 3: Calypso ----------
with v as (
  insert into public.villas
    (slug, name, tagline, description, capacity, bedrooms, bathrooms, size_sqm,
     amenities, booking_url, airbnb_url, hero_image, price_from, featured, is_available)
  values (
    'villa-calypso',
    'Villa Calypso',
    'Cinematic sea views and a private cliffside pool',
    'The largest of the three villas, Calypso is built into a cliff above the Ionian. A 14-metre cantilevered pool seems to float over the water, while floor-to-ceiling glass dissolves the boundary between living room and sea. Designed for unforgettable gatherings.',
    10, 5, 4, 380,
    '["Cantilevered infinity pool","Panoramic sea view","Home cinema","Wine cellar","Gym","Air conditioning","Wi-Fi","Concierge","Daily housekeeping","Sauna","Smart home","Parking"]'::jsonb,
    'https://www.booking.com/',
    'https://www.airbnb.com/',
    'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=2000&q=80',
    980,
    true, true
  )
  returning id
)
insert into public.villa_images (villa_id, image_url, alt, position)
select v.id, img.url, img.alt, img.pos from v, (values
  ('https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=2000&q=80','Villa Calypso cliffside exterior',0),
  ('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=80','Floor to ceiling living room',1),
  ('https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80','Cantilevered infinity pool',2),
  ('https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=2000&q=80','Master suite',3),
  ('https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=2000&q=80','Sea view terrace',4),
  ('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80','Designer bathroom',5),
  ('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80','Outdoor dining at sunset',6)
) as img(url,alt,pos);

-- ---------- Sample unavailable dates ----------
insert into public.villa_unavailable_dates (villa_id, start_date, end_date, note)
select id,
       (current_date + 7)::date,
       (current_date + 14)::date,
       'Booked'
from public.villas where slug = 'villa-lefkothea';

insert into public.villa_unavailable_dates (villa_id, start_date, end_date, note)
select id,
       (current_date + 20)::date,
       (current_date + 27)::date,
       'Booked'
from public.villas where slug = 'villa-calypso';
