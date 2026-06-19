import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@/components/Analytics";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "LED Ekran Fiyatları | Tek Formla Karşılaştır - ledekranfiyatal.com",
    template: "%s | ledekranfiyatal.com",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.brand }],
  keywords: [
    "led ekran fiyat",
    "led ekran fiyatları",
    "led ekran fiyat al",
    "led ekran teklif al",
    "iç mekan led ekran fiyat",
    "dış mekan led ekran fiyat",
  ],
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: site.url,
    siteName: site.name,
    title: "LED Ekran Fiyatları | Tek Formla Karşılaştır",
    description: site.description,
    images: [{ url: "/images/dis-mekan-led-video-wall.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A1628",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${inter.variable} ${display.variable}`}>
      <body className="min-h-screen flex flex-col bg-navy-900 text-white">
        <Analytics />
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-cyan-bright focus:px-4 focus:py-2 focus:text-navy-900 focus:font-semibold"
        >
          İçeriğe geç
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
