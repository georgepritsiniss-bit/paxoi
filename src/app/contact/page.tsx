import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="container-px mx-auto max-w-7xl py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Get in touch</span>
          <h1 className="mt-3 h-display text-balance">
            Plan your stay with us.
          </h1>
          <p className="mt-4 max-w-md text-ink-500">
            Questions about a villa, a long stay or a private event? Tell us a
            little and we&apos;ll be in touch within 24 hours.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sand-100 text-sand-700">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <div className="font-medium text-ink-900">Visit us</div>
                <div className="text-sm text-ink-500">
                  Paxos, Ionian Islands, Greece
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sand-100 text-sand-700">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <div className="font-medium text-ink-900">Email</div>
                <a
                  className="text-sm text-ink-500 hover:text-ink-900"
                  href="mailto:hello@paxoi.example"
                >
                  hello@paxoi.example
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sand-100 text-sand-700">
                <Phone className="h-4 w-4" />
              </span>
              <div>
                <div className="font-medium text-ink-900">Phone</div>
                <div className="text-sm text-ink-500">+30 26620 00000</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
