import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FeaturedVillas from "@/components/FeaturedVillas";
import Experiences from "@/components/Experiences";
import CallToAction from "@/components/CallToAction";
import SliderSection from "@/components/SliderSection";
import TextBlock from "@/components/TextBlock";
import FaqSection from "@/components/FaqSection";
import {
  DEFAULT_HOME_LAYOUT,
  normalizeHomeLayout,
  type LayoutModule,
} from "@/lib/layout/modules";
import type { SiteContentMap, VillaWithImages } from "@/types";

type Props = {
  site: SiteContentMap;
  villas: VillaWithImages[];
  favoriteIds: string[];
};

function renderModule(
  mod: LayoutModule,
  site: SiteContentMap,
  villas: VillaWithImages[],
  favoriteIds: string[]
) {
  if (!mod.enabled) return null;

  switch (mod.type) {
    case "hero":
      return <Hero key={mod.id} content={site.home_hero} />;
    case "about":
      return <AboutSection key={mod.id} content={site.home_about} />;
    case "featured_villas":
      return (
        <FeaturedVillas
          key={mod.id}
          villas={villas}
          favoriteIds={favoriteIds}
        />
      );
    case "experiences":
      return <Experiences key={mod.id} content={site.home_experiences} />;
    case "cta":
      return <CallToAction key={mod.id} content={site.home_cta} />;
    case "image_slider":
      return <SliderSection key={mod.id} content={site.home_slider} />;
    case "text_block":
      return <TextBlock key={mod.id} content={site.home_text} />;
    case "faq":
      return <FaqSection key={mod.id} content={site.home_faq} compact />;
    default:
      return null;
  }
}

export default function HomePageRenderer({ site, villas, favoriteIds }: Props) {
  const layout = normalizeHomeLayout(site.home_layout ?? DEFAULT_HOME_LAYOUT);

  return (
    <div className="-mt-20">
      {layout.modules.map((mod) =>
        renderModule(mod, site, villas, favoriteIds)
      )}
    </div>
  );
}
