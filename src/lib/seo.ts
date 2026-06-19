import type { Metadata } from "next";
import { site } from "./site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/images/dis-mekan-led-video-wall.png",
  keywords = [],
  type = "website",
}: SeoInput): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "tr_TR",
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.brand,
  legalName: site.brand,
  url: site.url,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  areaServed: "TR",
  address: {
    "@type": "PostalAddress",
    addressCountry: "TR",
    addressLocality: "İstanbul",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phone,
    contactType: "sales",
    availableLanguage: ["Turkish"],
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  inLanguage: "tr-TR",
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.url}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "LED ekran fiyat karşılaştırma ve teklif toplama",
  provider: { "@type": "Organization", name: site.brand, url: site.url },
  areaServed: { "@type": "Country", name: "Türkiye" },
  description:
    "Tek formla birden fazla LED ekran tedarikçisinden teklif toplar, karşılaştırır ve ihtiyacınıza en uygun fiyatlı çözümü sunarız.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "TRY",
    description: "Ücretsiz fiyat teklifi karşılaştırma hizmeti",
  },
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${site.url}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: site.brand },
    publisher: {
      "@type": "Organization",
      name: site.brand,
      logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` },
    },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };
}
