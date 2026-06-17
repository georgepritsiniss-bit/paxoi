export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container-px mx-auto max-w-3xl py-16 md:py-24">
      <span className="eyebrow">Legal</span>
      <h1 className="mt-4 h-section">Privacy policy</h1>
      <div className="prose prose-sm mt-8 max-w-none space-y-4 text-ink-600">
        <p>
          Paxoi Villas (&quot;we&quot;, &quot;us&quot;) respects your privacy.
          This policy explains how we collect and use personal information when
          you browse our website or contact us about a booking.
        </p>
        <h2 className="font-serif text-xl text-ink-900">Information we collect</h2>
        <p>
          When you submit the contact form, create an account, or save
          favourites, we may store your name, email address, phone number, and
          message content. Booking platforms (Booking.com, Airbnb) process
          payments under their own privacy policies.
        </p>
        <h2 className="font-serif text-xl text-ink-900">How we use it</h2>
        <p>
          We use your details to respond to enquiries, manage reservations, and
          improve our service. We do not sell your data to third parties.
        </p>
        <h2 className="font-serif text-xl text-ink-900">Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href="mailto:hello@paxoi.example" className="text-ink-900 underline">
            hello@paxoi.example
          </a>
          .
        </p>
      </div>
    </div>
  );
}
