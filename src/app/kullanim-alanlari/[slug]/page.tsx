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
import { useCases, getUseCase } from "@/lib/usecases";
import { getProduct } from "@/lib/products";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const uc = getUseCase(slug);
  if (!uc) return {};
  return buildMetadata({
    title: `${uc.name} İçin LED Ekran Çözümleri`,
    description: uc.excerpt,
    path: `/kullanim-alanlari/${uc.slug}`,
    image: uc.image,
  });
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const uc = getUseCase(slug);
  if (!uc) notFound();

  return (
    <>
      <JsonLd data={faqJsonLd(uc.faqs)} />
      <PageHeader
        eyebrow="Kullanım Alanı"
        title={`${uc.name} İçin LED Ekran`}
        description={uc.tagline}
        breadcrumb={[
          { name: "Kullanım Alanları", path: "/kullanim-alanlari" },
          { name: uc.name, path: `/kullanim-alanlari/${uc.slug}` },
        ]}
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={uc.image}
                  alt={uc.imageAlt}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-muted">{uc.intro}</p>
              <ul className="mt-6 space-y-3">
                {uc.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-slate-200">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-success/15 text-success">
                      <Check className="h-4 w-4" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href="/fiyat-al" variant="amber" size="lg">
                  {uc.name} için fiyat al <ArrowRight className="h-5 w-5" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Recommended products */}
      <section className="py-14 sm:py-16">
        <Container>
          <SectionHeading align="left" eyebrow="Önerilen Ürünler" title="Bu alan için önerdiğimiz ekranlar" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {uc.recommended.map((r) => {
              const product = getProduct(r.product);
              if (!product) return null;
              return (
                <Link
                  key={r.product}
                  href={`/urunler/${product.slug}`}
                  className="glow-border group rounded-2xl border border-white/10 bg-navy-800/50 p-6 transition-all hover:-translate-y-1"
                >
                  <span className="inline-block rounded-full bg-cyan-bright/10 px-3 py-1 text-xs font-semibold text-cyan-bright">
                    {r.pitch}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-white">{product.name}</h3>
                  <p className="mt-1.5 text-sm text-muted">{r.note}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-bright">
                    İncele <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow="SSS" title={`${uc.name} hakkında sık sorulanlar`} />
          <div className="mt-10">
            <FAQAccordion faqs={uc.faqs} />
          </div>
        </Container>
      </section>

      <CTABanner title={`${uc.name} projeniz için en uygun teklifi alın`} />
    </>
  );
}
