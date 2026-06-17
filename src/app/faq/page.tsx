import FaqSection from "@/components/FaqSection";
import { getSiteContent } from "@/lib/supabase/queries";

export const revalidate = 60;
export const metadata = { title: "FAQ" };

export default async function FaqPage() {
  const site = await getSiteContent();

  return (
    <div>
      <div className="bg-gradient-to-b from-sand-100/60 to-transparent py-16 md:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <span className="eyebrow">Help</span>
          <h1 className="page-header mt-4 h-display">Frequently asked questions</h1>
          <p className="mt-5 max-w-xl text-ink-500">
            Everything you need to know before booking your stay in Paxos.
          </p>
        </div>
      </div>
      <FaqSection content={site.page_faq || site.home_faq} />
    </div>
  );
}
