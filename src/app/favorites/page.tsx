import Link from "next/link";
import { redirect } from "next/navigation";
import { Heart, ArrowRight } from "lucide-react";
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
    <div>
      <div className="relative overflow-hidden bg-gradient-to-b from-sand-100/60 to-transparent pb-12 pt-16 md:pb-16 md:pt-24">
        <div className="container-px relative mx-auto max-w-7xl">
          <span className="eyebrow">{user.email}</span>
          <h1 className="page-header mt-4 h-display">Your favorites</h1>
          <p className="mt-4 text-ink-500">
            {favorites.length} saved{" "}
            {favorites.length === 1 ? "villa" : "villas"}
          </p>
        </div>
      </div>

      <div className="container-px mx-auto max-w-7xl pb-20 md:pb-28">
        {favorites.length === 0 ? (
          <div className="glass grid place-items-center rounded-[1.75rem] p-16 text-center shadow-float">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-sand-100 to-sand-200">
              <Heart className="h-7 w-7 text-sand-600" />
            </div>
            <p className="mt-5 text-ink-500">
              You haven&apos;t saved any villas yet.
            </p>
            <Link href="/villas" className="btn-primary mt-8 group">
              Browse villas
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((v, i) => (
              <VillaCard key={v.id} villa={v} initialFavorited index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
