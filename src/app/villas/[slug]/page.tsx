import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BedDouble, Bath, Users, Maximize, MapPin } from "lucide-react";
import {
  getAllVillas,
  getUnavailableDates,
  getUserFavoriteIds,
  getVillaBySlug,
} from "@/lib/supabase/queries";
import ImageGallery from "@/components/ImageGallery";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import FavoriteButton from "@/components/FavoriteButton";
import AmenityIcon from "@/components/AmenityIcon";
import VillaActions from "./_actions";
import ContactForm from "@/components/ContactForm";

export const revalidate = 60;

export async function generateStaticParams() {
  const villas = await getAllVillas();
  return villas.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const v = await getVillaBySlug(params.slug);
  if (!v) return { title: "Villa not found" };
  return {
    title: v.name,
    description: v.tagline || v.description.slice(0, 160),
    openGraph: {
      title: v.name,
      description: v.tagline || v.description.slice(0, 160),
      images: v.hero_image ? [{ url: v.hero_image }] : [],
    },
  };
}

export default async function VillaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const villa = await getVillaBySlug(params.slug);
  if (!villa) notFound();

  const [unavailable, favoriteIds] = await Promise.all([
    getUnavailableDates(villa.id),
    getUserFavoriteIds(),
  ]);

  const initialFavorited = favoriteIds.includes(villa.id);

  return (
    <article className="container-px mx-auto max-w-7xl py-10 md:py-14">
      <Link
        href="/villas"
        className="inline-flex items-center gap-2 text-sm text-ink-500 transition-colors hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to villas
      </Link>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="eyebrow inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            {villa.location || "Paxos, Greece"}
          </span>
          <h1 className="mt-2 h-display max-w-3xl text-balance">{villa.name}</h1>
          {villa.tagline && (
            <p className="mt-3 max-w-2xl text-ink-500">{villa.tagline}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <FavoriteButton
            villaId={villa.id}
            initialFavorited={initialFavorited}
            variant="inline"
          />
        </div>
      </div>

      <div className="mt-8">
        <ImageGallery images={villa.images} alt={villa.name} />
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon={Users} value={villa.capacity} label="Guests" />
            <Stat icon={BedDouble} value={villa.bedrooms} label="Bedrooms" />
            <Stat icon={Bath} value={villa.bathrooms} label="Bathrooms" />
            {villa.size_sqm && (
              <Stat
                icon={Maximize}
                value={`${villa.size_sqm}`}
                label="m² indoor"
              />
            )}
          </div>

          <section className="mt-12">
            <h2 className="font-serif text-2xl font-light text-ink-900">
              About this villa
            </h2>
            <p className="mt-4 max-w-2xl whitespace-pre-line text-ink-600 leading-relaxed">
              {villa.description}
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-serif text-2xl font-light text-ink-900">
              Amenities
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {villa.amenities.map((a) => (
                <div
                  key={a}
                  className="flex items-center gap-3 rounded-2xl border border-ink-900/5 bg-white p-3"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-sand-100 text-sand-700">
                    <AmenityIcon label={a} className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-ink-700">{a}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14" id="contact">
            <h2 className="font-serif text-2xl font-light text-ink-900">
              Have a question?
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              Send us a message and we&apos;ll be in touch within 24 hours.
            </p>
            <div className="mt-6">
              <ContactForm villaId={villa.id} />
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <VillaActions
            bookingUrl={villa.booking_url}
            airbnbUrl={villa.airbnb_url}
            priceFrom={villa.price_from}
          />
          <div className="mt-6">
            <AvailabilityCalendar unavailable={unavailable} />
          </div>
        </aside>
      </div>
    </article>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number | string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-ink-900/5 bg-white p-4">
      <Icon className="h-4 w-4 text-sand-600" />
      <div className="mt-3 font-serif text-2xl text-ink-900">{value}</div>
      <div className="text-xs text-ink-500">{label}</div>
    </div>
  );
}
