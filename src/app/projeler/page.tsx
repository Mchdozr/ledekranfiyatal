import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { ProjectGallery } from "@/components/ProjectGallery";
import { CTABanner } from "@/components/CTABanner";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Referans LED Ekran Projeleri",
  description:
    "AVM, stadyum, otel, etkinlik ve belediye projelerinden örnek LED ekran kurulumları. İç mekân, dış mekân ve rental referans galerisi.",
  path: "/projeler",
  keywords: ["led ekran projeleri", "led ekran referans", "led ekran kurulum"],
});

export default function ProjelerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projeler"
        title="Referans LED Ekran Projeleri"
        description="Farklı sektörlerden örnek kurulumlar. Filtreleyerek inceleyin; benzer bir proje için tek formla teklif alın."
        breadcrumb={[{ name: "Projeler", path: "/projeler" }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <ProjectGallery />
        </Container>
      </section>
      <CTABanner title="Benzer bir proje mi planlıyorsunuz?" />
    </>
  );
}
