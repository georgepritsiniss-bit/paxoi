export type Villa = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  size_sqm: number | null;
  location: string | null;
  amenities: string[];
  booking_url: string | null;
  airbnb_url: string | null;
  hero_image: string | null;
  price_from: number | null;
  featured: boolean;
  is_available: boolean;
  created_at: string;
  updated_at: string;
};

export type VillaImage = {
  id: string;
  villa_id: string;
  image_url: string;
  alt: string | null;
  position: number;
  created_at: string;
};

export type VillaWithImages = Villa & { images: VillaImage[] };

export type UnavailableDate = {
  id: string;
  villa_id: string;
  start_date: string;
  end_date: string;
  note: string | null;
};

export type Favorite = {
  id: string;
  user_id: string;
  villa_id: string;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  villa_id: string | null;
  created_at: string;
};
