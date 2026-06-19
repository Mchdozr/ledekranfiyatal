import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { UseCaseCard } from "@/components/UseCaseCard";
import { Reveal } from "@/components/Reveal";
import { CTABanner } from "@/components/CTABanner";
import { useCases } from "@/lib/usecases";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "LED Ekran Kullanım Alanları ve Sektörel Çözümler",
  description:
    "AVM, stadyum, otel, hastane, belediye ve etkinlik için LED ekran çözümleri. Sektörünüze uygun doğru ekran tipini ve teklifi keşfedin.",
  path: "/kullanim-alanlari",
  keywords: ["led ekran kullanım alanları", "avm led ekran", "stadyum led ekran"],
});

export default function KullanimAlanlariPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kullanım Alanları"
        title="Sektörünüze özel LED ekran çözümleri"
        description="Her sektörün ihtiyaçları ve doğru ekran tipi farklıdır. Aşağıdan alanınızı seçin; o sektöre uygun teknik çözümleri ve teklif sürecini görün."
        breadcrumb={[{ name: "Kullanım Alanları", path: "/kullanim-alanlari" }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc, i) => (
              <Reveal key={uc.slug} delay={(i % 3) * 0.08}>
                <UseCaseCard useCase={uc} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CTABanner />
    </>
  );
}
