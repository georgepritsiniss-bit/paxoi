"use client";

import { useEffect, useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function FavoriteButton({
  villaId,
  initialFavorited = false,
  variant = "floating",
}: {
  villaId: string;
  initialFavorited?: boolean;
  variant?: "floating" | "inline";
}) {
  const router = useRouter();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [ready, setReady] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;
    const supabase = createSupabaseBrowserClient();
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        if (!cancelled) setReady(true);
        return;
      }
      const { data } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("villa_id", villaId)
        .maybeSingle();
      if (!cancelled) {
        setFavorited(!!data);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [villaId]);

  async function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const supabase = createSupabaseBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login?next=" + encodeURIComponent(window.location.pathname));
      return;
    }
    const next = !favorited;
    setFavorited(next);
    startTransition(async () => {
      if (next) {
        await supabase
          .from("favorites")
          .insert({ user_id: user.id, villa_id: villaId });
      } else {
        await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("villa_id", villaId);
      }
      router.refresh();
    });
  }

  const base =
    variant === "floating"
      ? "absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-ink-900 backdrop-blur-md shadow-md transition-all hover:scale-105 hover:bg-white"
      : "inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white px-4 py-2 text-sm text-ink-900 transition-all hover:border-ink-900";

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!ready || pending}
      aria-label={favorited ? "Remove favorite" : "Add favorite"}
      className={cn(base, !ready && "opacity-60")}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-all",
          favorited ? "fill-red-500 text-red-500" : "text-ink-900"
        )}
      />
      {variant === "inline" && (
        <span>{favorited ? "Saved" : "Save"}</span>
      )}
    </button>
  );
}
