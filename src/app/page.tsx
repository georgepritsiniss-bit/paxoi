import HomePageRenderer from "@/components/HomePageRenderer";
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
    <HomePageRenderer site={site} villas={villas} favoriteIds={favoriteIds} />
  );
}
