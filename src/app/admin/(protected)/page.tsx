import Link from "next/link";
import {
  Home,
  Heart,
  MessageSquare,
  Image as ImageIcon,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = createSupabaseAdminClient();
  const [
    { count: villaCount },
    { count: imageCount },
    { count: favoriteCount },
    { count: messageCount },
    { count: mediaCount },
  ] = await Promise.all([
    supabase.from("villas").select("*", { count: "exact", head: true }),
    supabase.from("villa_images").select("*", { count: "exact", head: true }),
    supabase.from("favorites").select("*", { count: "exact", head: true }),
    supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("media_library")
      .select("*", { count: "exact", head: true }),
  ]);

  const { data: recent } = await supabase
    .from("villas")
    .select("id, name, slug, featured, is_available, updated_at")
    .order("updated_at", { ascending: false })
    .limit(5);

  const stats = [
    { label: "Villas", value: villaCount ?? 0, icon: Home },
    { label: "Gallery images", value: imageCount ?? 0, icon: ImageIcon },
    { label: "Media library", value: mediaCount ?? 0, icon: Sparkles },
    { label: "Favorites", value: favoriteCount ?? 0, icon: Heart },
    { label: "Messages", value: messageCount ?? 0, icon: MessageSquare },
  ];

  const quickLinks = [
    {
      title: "Page builder",
      body: "Arrange homepage modules, edit hero slider, about, CTA and more.",
      href: "/admin/layout",
    },
    {
      title: "Manage villas",
      body: "Edit listings, galleries, availability and booking links.",
      href: "/admin/villas",
    },
    {
      title: "Media library",
      body: "Upload reusable images or save Unsplash URLs.",
      href: "/admin/media",
    },
    {
      title: "Site pages",
      body: "Edit About, FAQ and preview all public pages.",
      href: "/admin/pages",
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-900">Dashboard</h1>
      <p className="mt-2 text-sm text-ink-500">
        A quick overview of your villa collection.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl border border-ink-900/5 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <Icon className="h-4 w-4 text-sand-600" />
              <div className="mt-4 font-serif text-3xl text-ink-900">
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-ink-400">
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {quickLinks.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="group rounded-2xl border border-ink-900/5 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="font-medium text-ink-900">{q.title}</div>
              <ArrowUpRight className="h-4 w-4 text-ink-400 transition-transform group-hover:rotate-45 group-hover:text-ink-900" />
            </div>
            <p className="mt-2 text-sm text-ink-500">{q.body}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-ink-900">Recent villas</h2>
          <Link
            href="/admin/villas"
            className="text-sm text-ink-500 hover:text-ink-900"
          >
            Manage all →
          </Link>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-ink-900/5 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-sand-100/50 text-left text-xs uppercase tracking-wider text-ink-500">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Slug</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {(recent || []).map((v) => (
                <tr
                  key={v.id}
                  className="border-t border-ink-900/5 hover:bg-sand-50/50"
                >
                  <td className="px-5 py-4 font-medium text-ink-900">
                    {v.name}
                  </td>
                  <td className="px-5 py-4 text-ink-500">{v.slug}</td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        v.is_available
                          ? "rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs text-emerald-700"
                          : "rounded-full bg-red-50 px-2.5 py-0.5 text-xs text-red-700"
                      }
                    >
                      {v.is_available ? "Available" : "Hidden"}
                    </span>
                    {v.featured && (
                      <span className="ml-2 rounded-full bg-sand-100 px-2.5 py-0.5 text-xs text-sand-700">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/villas/${v.id}/edit`}
                      className="text-ink-700 hover:text-ink-900"
                    >
                      Edit →
                    </Link>
                  </td>
                </tr>
              ))}
              {(!recent || recent.length === 0) && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-8 text-center text-sm text-ink-400"
                  >
                    No villas yet —{" "}
                    <Link
                      href="/admin/villas/new"
                      className="underline underline-offset-4"
                    >
                      add the first
                    </Link>
                    .
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
