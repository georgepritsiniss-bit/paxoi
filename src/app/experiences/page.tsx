import Experiences from "@/components/Experiences";
import { getSiteContent } from "@/lib/supabase/queries";

export const revalidate = 60;
export const metadata = { title: "Experiences" };

export default async function ExperiencesPage() {
  const site = await getSiteContent();

  return (
    <div>
      <div className="bg-gradient-to-b from-sand-100/60 to-transparent py-16 md:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <span className="eyebrow">Paxos, Greece</span>
          <h1 className="page-header mt-4 h-display max-w-2xl">
            Curated experiences
          </h1>
          <p className="mt-5 max-w-xl text-ink-500">
            From private boat days to chef dinners at home — the best of Paxos,
            arranged for you.
          </p>
        </div>
      </div>
      <Experiences content={site.home_experiences} />
    </div>
  );
}
