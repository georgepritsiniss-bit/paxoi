import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = { title: "Contact" };

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    title: "Visit us",
    detail: "Paxos, Ionian Islands, Greece",
    href: null,
  },
  {
    icon: Mail,
    title: "Email",
    detail: "hello@paxoi.example",
    href: "mailto:hello@paxoi.example",
  },
  {
    icon: Phone,
    title: "Phone",
    detail: "+30 26620 00000",
    href: "tel:+302662000000",
  },
];

export default function ContactPage() {
  return (
    <div>
      {/* Hero band */}
      <div className="relative overflow-hidden bg-ink-900 py-20 md:py-28">
        <div className="orb left-1/4 top-0 h-64 w-64 bg-sand-500/10" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sand-400/30 to-transparent" />
        <div className="container-px relative mx-auto max-w-7xl">
          <span className="eyebrow-light">Get in touch</span>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
            Plan your stay with us.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65 md:text-base">
            Questions about a villa, a long stay or a private event? Tell us a
            little and we&apos;ll be in touch within 24 hours.
          </p>
        </div>
      </div>

      <div className="container-px relative mx-auto max-w-7xl -mt-8 pb-20 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="space-y-4">
            {CONTACT_ITEMS.map((item) => (
              <div
                key={item.title}
                className="glass flex items-start gap-4 rounded-2xl p-5 transition-all duration-300 hover:shadow-float"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sand-100 to-sand-200 text-sand-700">
                  <item.icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-semibold text-ink-900">{item.title}</div>
                  {item.href ? (
                    <a
                      className="text-sm text-ink-500 transition-colors hover:text-sand-600"
                      href={item.href}
                    >
                      {item.detail}
                    </a>
                  ) : (
                    <div className="text-sm text-ink-500">{item.detail}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
