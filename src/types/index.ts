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

// ----- CMS / Media (additive) -----

/**
 * Generic, locale-aware translation block used inside site_content rows.
 * Components fall back to translations.ts when a field is missing.
 */
export type LocalizedText = Partial<{
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
}>;

export type HeroContent = {
  image?: string;
  /** Multiple images enable the hero slider */
  images?: Array<{ url: string; alt?: string }>;
  autoplay?: number;
  en?: LocalizedText;
  gr?: LocalizedText;
};

export type SliderContent = {
  images?: Array<{ url: string; alt?: string }>;
  autoplay?: number;
  en?: LocalizedText;
  gr?: LocalizedText;
};

export type TextBlockContent = {
  en?: LocalizedText;
  gr?: LocalizedText;
};

export type FaqItem = {
  en?: { q?: string; a?: string };
  gr?: { q?: string; a?: string };
};

export type FaqContent = {
  items?: FaqItem[];
};

export type PageContent = {
  image?: string;
  en?: LocalizedText;
  gr?: LocalizedText;
};

export type AboutContent = {
  image?: string;
  stats?: Array<{ k: string; v: string }>;
  en?: LocalizedText;
  gr?: LocalizedText;
};

export type ExperienceItem = {
  icon?: string;
  image?: string;
  en?: { title?: string; body?: string };
  gr?: { title?: string; body?: string };
};

export type ExperiencesContent = {
  items?: ExperienceItem[];
};

export type CtaContent = {
  image?: string;
  en?: LocalizedText;
  gr?: LocalizedText;
};

export type SiteContentMap = {
  home_hero?: HeroContent;
  home_about?: AboutContent;
  home_experiences?: ExperiencesContent;
  home_cta?: CtaContent;
  home_layout?: { modules?: Array<{ id: string; type: string; enabled: boolean }> };
  home_slider?: SliderContent;
  home_text?: TextBlockContent;
  home_faq?: FaqContent;
  page_about?: PageContent;
  page_faq?: FaqContent;
};

export type SiteContentKey = keyof SiteContentMap;

export type MediaItem = {
  id: string;
  url: string;
  alt: string | null;
  kind: string;
  storage_path: string | null;
  tags: string[];
  created_at: string;
};
