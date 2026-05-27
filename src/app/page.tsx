import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FeaturedVillas from "@/components/FeaturedVillas";
import Experiences from "@/components/Experiences";
import CallToAction from "@/components/CallToAction";
import {
  getFeaturedVillas,
  getSiteContent,
  getUserFavoriteIds,
} from "@/lib/supabase/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [villas, favoriteIds, site] = await Promise.all([
    getFeaturedVillas(3),
    getUserFavoriteIds(),
    getSiteContent(),
  ]);

  return (
    <div className="-mt-20">
      <Hero content={site.home_hero} />
      <AboutSection content={site.home_about} />
      <FeaturedVillas villas={villas} favoriteIds={favoriteIds} />
      <Experiences content={site.home_experiences} />
      <CallToAction content={site.home_cta} />
    </div>
  );
}
