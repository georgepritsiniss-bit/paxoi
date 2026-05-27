import {
  getAllVillas,
  getUserFavoriteIds,
} from "@/lib/supabase/queries";
import VillasListing from "./_listing";

export const revalidate = 60;

export const metadata = {
  title: "Our Villas",
  description:
    "Three luxury villas above the Ionian coast of Paxos — pick the one that fits your stay.",
};

export default async function VillasPage() {
  const [villas, favoriteIds] = await Promise.all([
    getAllVillas(),
    getUserFavoriteIds(),
  ]);
  return <VillasListing villas={villas} favoriteIds={favoriteIds} />;
}
