import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSiteContent } from "@/lib/supabase/queries";

export const revalidate = 60;
export const metadata = { title: "About Paxoi Villas" };

export default async function AboutPage() {
  const site = await getSiteContent();
  const content = site.page_about;
  const en = content?.en;
  const image =
    content?.image ||
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80";

  return (
    <div>
      <div className="relative overflow-hidden bg-ink-900 py-20 md:py-28">
        <div className="container-px relative mx-auto max-w-7xl">
          <span className="eyebrow-light">
            {en?.eyebrow || "The collection"}
          </span>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-light text-white md:text-5xl lg:text-6xl">
            {en?.title || "A quiet corner of Paxos"}
          </h1>
        </div>
      </div>

      <div className="container-px mx-auto max-w-7xl py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-card ring-1 ring-ink-900/5 lg:aspect-[4/5]">
            <Image
              src={image}
              alt="Paxoi Villas"
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-base leading-relaxed text-ink-600 md:text-lg">
              {en?.body ||
                "Three private villas above the Ionian coast of Paxos — each with its own character, shared olive groves, and views that stretch to Antipaxos. We built this place for guests who want the Greece of slow mornings, not crowded beaches."}
            </p>
            <p className="mt-6 text-base leading-relaxed text-ink-500">
              Whether you stay in one villa or book the entire hillside for a
              wedding or retreat, our team handles the details so you can focus
              on the sea, the light, and the company you keep.
            </p>
            <Link href="/villas" className="btn-primary mt-10 group">
              Explore the villas
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
