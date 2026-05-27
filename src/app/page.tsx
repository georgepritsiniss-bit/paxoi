import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FeaturedVillas from "@/components/FeaturedVillas";
import Experiences from "@/components/Experiences";
import CallToAction from "@/components/CallToAction";
import {
  getFeaturedVillas,
  getUserFavoriteIds,
} from "@/lib/supabase/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [villas, favoriteIds] = await Promise.all([
    getFeaturedVillas(3),
    getUserFavoriteIds(),
  ]);

  return (
    <div className="-mt-20">
      <Hero />
      <AboutSection />
      <FeaturedVillas villas={villas} favoriteIds={favoriteIds} />
      <Experiences />
      <CallToAction />
    </div>
  );
}
