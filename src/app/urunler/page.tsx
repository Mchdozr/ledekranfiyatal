import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import { Reveal } from "@/components/Reveal";
import { CTABanner } from "@/components/CTABanner";
import { products } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "LED Ekran Çeşitleri ve Fiyatları",
  description:
    "İç mekân, dış mekân, rental, fine pitch, transparent ve curved LED ekran çeşitleri. Teknik özellikleri inceleyin, ihtiyacınıza uygun teklifi alın.",
  path: "/urunler",
  keywords: ["led ekran çeşitleri", "led ekran fiyat", "led ekran modelleri"],
});

export default function UrunlerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ürünler"
        title="LED Ekran Çeşitleri ve Fiyatları"
        description="Her kullanım senaryosu için doğru LED ekran tipi farklıdır. Aşağıdaki kategorilerden ihtiyacınıza en yakın olanı inceleyin; teknik kararı birlikte netleştirelim."
        breadcrumb={[{ name: "Ürünler", path: "/urunler" }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 3) * 0.08}>
                <ProductCategoryCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CTABanner />
    </>
  );
}
