import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Container, SectionHeading } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { products, getProduct } from "@/lib/products";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return buildMetadata({
    title: `${product.name} Fiyatları ve Özellikleri`,
    description: product.excerpt,
    path: `/urunler/${product.slug}`,
    image: product.image,
    keywords: product.keywords,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd data={faqJsonLd(product.faqs)} />
      <PageHeader
        eyebrow={product.shortName}
        title={`${product.name} Fiyatları`}
        description={product.tagline}
        breadcrumb={[
          { name: "Ürünler", path: "/urunler" },
          { name: product.name, path: `/urunler/${product.slug}` },
        ]}
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-2xl font-bold text-white">Nedir?</h2>
              <p className="mt-3 leading-relaxed text-muted">{product.intro}</p>
              <ul className="mt-6 space-y-3">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-slate-200">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-success/15 text-success">
                      <Check className="h-4 w-4" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-amber-warm/25 bg-amber-warm/5 p-5">
                <p className="text-sm text-slate-200">
                  <strong className="text-amber-warm">Fiyat bilgisi:</strong> {product.priceHint}
                </p>
              </div>
              <div className="mt-6">
                <ButtonLink href="/fiyat-al" variant="amber" size="lg">
                  Bu ürün için fiyat al <ArrowRight className="h-5 w-5" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Specs */}
      <section className="py-14 sm:py-16">
        <Container>
          <SectionHeading align="left" eyebrow="Teknik Özellikler" title="Teknik özellikler tablosu" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.specs.map((spec) => (
              <div key={spec.label} className="rounded-xl border border-white/10 bg-navy-800/50 p-5">
                <dt className="text-xs uppercase tracking-wider text-muted">{spec.label}</dt>
                <dd className="mt-1.5 font-semibold text-white">{spec.value}</dd>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Use cases */}
      <section className="py-14 sm:py-16">
        <Container>
          <SectionHeading align="left" eyebrow="Kullanım Alanları" title="Nerelerde kullanılır?" />
          <div className="mt-8 flex flex-wrap gap-3">
            {product.useCases.map((u) => (
              <span
                key={u}
                className="rounded-full border border-white/10 bg-navy-800/60 px-4 py-2 text-sm text-slate-200"
              >
                {u}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow="SSS" title={`${product.name} hakkında sık sorulanlar`} />
          <div className="mt-10">
            <FAQAccordion faqs={product.faqs} />
          </div>
        </Container>
      </section>

      {/* Other products */}
      <section className="py-14">
        <Container>
          <h2 className="font-display text-xl font-bold text-white">Diğer LED ekran çeşitleri</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/urunler/${o.slug}`}
                className="group flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-navy-800/50 px-5 py-4 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-bright/50 hover:text-white"
              >
                {o.name}
                <ArrowRight className="h-4 w-4 text-cyan-bright transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner title={`${product.name} için en uygun teklifi alın`} />
    </>
  );
}
