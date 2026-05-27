import Link from "next/link";
import { redirect } from "next/navigation";
import { Heart } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAllVillas } from "@/lib/supabase/queries";
import VillaCard from "@/components/VillaCard";

export const dynamic = "force-dynamic";

export const metadata = { title: "Your favorites" };

export default async function FavoritesPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/favorites");

  const { data: favRows } = await supabase
    .from("favorites")
    .select("villa_id")
    .eq("user_id", user.id);

  const favIds = (favRows || []).map((r: { villa_id: string }) => r.villa_id);
  const all = await getAllVillas();
  const favorites = all.filter((v) => favIds.includes(v.id));

  return (
    <div className="container-px mx-auto max-w-7xl py-16 md:py-24">
      <span className="eyebrow">{user.email}</span>
      <h1 className="mt-3 h-display">Your favorites</h1>

      {favorites.length === 0 ? (
        <div className="mt-12 grid place-items-center rounded-3xl border border-dashed border-ink-200 p-16 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-sand-100">
            <Heart className="h-6 w-6 text-sand-600" />
          </div>
          <p className="mt-4 text-ink-500">You haven&apos;t saved any villas yet.</p>
          <Link href="/villas" className="btn-primary mt-6">
            Browse villas
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((v, i) => (
            <VillaCard key={v.id} villa={v} initialFavorited index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
