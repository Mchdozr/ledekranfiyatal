import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { homeFaqs } from "@/lib/content";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sık Sorulan Sorular | LED Ekran Fiyat ve Teklif",
  description:
    "LED ekran fiyatı, teklif süreci, pixel pitch, montaj ve hizmet alanı hakkında en çok merak edilen soruların cevapları.",
  path: "/sss",
  keywords: ["led ekran sss", "led ekran fiyat soruları"],
});

export default function SSSPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <PageHeader
        eyebrow="SSS"
        title="Sık Sorulan Sorular"
        description="LED ekran fiyatı ve teklif sürecimiz hakkında en çok merak edilenleri derledik."
        breadcrumb={[{ name: "SSS", path: "/sss" }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <FAQAccordion faqs={homeFaqs} />
        </Container>
      </section>
      <CTABanner />
    </>
  );
}
