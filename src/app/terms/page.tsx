export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="container-px mx-auto max-w-3xl py-16 md:py-24">
      <span className="eyebrow">Legal</span>
      <h1 className="mt-4 h-section">Terms of service</h1>
      <div className="prose prose-sm mt-8 max-w-none space-y-4 text-ink-600">
        <p>
          By using the Paxoi Villas website you agree to these terms. Bookings
          made via third-party platforms are subject to their respective terms
          and cancellation policies.
        </p>
        <h2 className="font-serif text-xl text-ink-900">Bookings</h2>
        <p>
          Availability shown on our calendar is indicative. Confirmed dates are
          those agreed at the time of booking through our partners or direct
          correspondence.
        </p>
        <h2 className="font-serif text-xl text-ink-900">Property use</h2>
        <p>
          Guests agree to respect the villas, neighbours, and local regulations.
          Maximum occupancy must not be exceeded. Events may require prior
          written approval.
        </p>
        <h2 className="font-serif text-xl text-ink-900">Liability</h2>
        <p>
          We are not liable for indirect losses arising from your stay. Travel
          insurance is recommended.
        </p>
      </div>
    </div>
  );
}
