import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Paxoi Villas — Luxury villa rentals in Paxos, Greece",
    template: "%s · Paxoi Villas",
  },
  description:
    "A private collection of three luxury villas above the Ionian coast of Paxos, Greece. Sea views, private pools, olive groves and unforgettable Greek summers.",
  keywords: [
    "Paxos villas",
    "Paxoi villas",
    "luxury villas Greece",
    "Ionian villa rental",
    "private villa Paxos",
  ],
  openGraph: {
    type: "website",
    title: "Paxoi Villas — Luxury villa rentals in Paxos, Greece",
    description:
      "Three luxury villas above the Ionian coast of Paxos. Sea views, private pools, unforgettable summers.",
    url: siteUrl,
    siteName: "Paxoi Villas",
    images: [
      {
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
        width: 1600,
        height: 900,
        alt: "Paxoi Villas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paxoi Villas",
    description:
      "Three luxury villas above the Ionian coast of Paxos, Greece.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-sand-50 font-sans antialiased">
        <LanguageProvider>
          <ScrollProgress />
          <Navbar />
          <main className="min-h-screen pt-20">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
