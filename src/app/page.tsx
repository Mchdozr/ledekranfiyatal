import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ClipboardList,
  Network,
  Scale,
  BadgeCheck,
  Headset,
  Zap,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { Container, SectionHeading } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { StatsCounter } from "@/components/StatsCounter";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import { UseCaseCard } from "@/components/UseCaseCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { FAQAccordion } from "@/components/FAQAccordion";
import { BlogCard } from "@/components/BlogCard";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { products } from "@/lib/products";
import { useCases } from "@/lib/usecases";
import { sortedPosts } from "@/lib/blog";
import { site } from "@/lib/site";
import {
  howItWorks,
  whyUs,
  homeFaqs,
  pixelPitchHeaders,
  pixelPitchRows,
} from "@/lib/content";
import { faqJsonLd, serviceJsonLd } from "@/lib/seo";

const whyIcons = [Network, Headset, Scale, Zap];
const stepIcons = [ClipboardList, Network, Scale, BadgeCheck];

export default function Home() {
  const posts = sortedPosts().slice(0, 3);

  return (
    <>
      <JsonLd data={[serviceJsonLd, faqJsonLd(homeFaqs.slice(0, 6))]} />
      <Hero />

      {/* Trust band */}
      <section className="border-y border-white/10 bg-navy-950/60 py-12">
        <Container>
          <StatsCounter
            stats={[
              { value: site.stats.suppliers, label: "Anlaşmalı tedarikçi" },
              { value: site.stats.projects, label: "Karşılaştırılan proje" },
              { value: "24 saat", label: "Ortalama teklif süresi" },
              { value: site.stats.avgSaving, label: "Ortalama bütçe tasarrufu" },
            ]}
          />
        </Container>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Nasıl Çalışır"
            title="4 adımda en uygun LED ekran teklifi"
            description="Tek tek firma aramayı bırakın. İhtiyacınızı bir kez bildirin, gerisini biz hallederiz."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <Reveal key={step.step} delay={i * 0.08}>
                  <div className="glow-border group relative h-full rounded-2xl border border-white/10 bg-navy-800/50 p-6">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-bright/10 text-cyan-bright">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-display text-3xl font-bold text-white/10">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/nasil-calisir" variant="outline">
              Süreci detaylı incele <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Ürün Kategorileri"
            title="Her ihtiyaca uygun LED ekran çözümü"
            description="İç mekândan dış mekâna, etkinlikten mimari uygulamalara kadar tüm LED ekran tipleri için teklif topluyoruz."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 3) * 0.08}>
                <ProductCategoryCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Use cases */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Kullanım Alanları"
            title="Hangi sektörde olursanız olun, doğru ekran burada"
            description="AVM'den stadyuma, otelden belediyeye kadar her sektör için doğru teknik çözümü öneriyoruz."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc, i) => (
              <Reveal key={uc.slug} delay={(i % 3) * 0.08}>
                <UseCaseCard useCase={uc} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Why us */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="bg-radial-glow absolute inset-0" aria-hidden />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-bright/30 bg-cyan-bright/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-bright">
                Neden ledekranfiyatal?
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
                Sektörü bilen bir ekiple, doğru fiyatı bulmanın en hızlı yolu
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Yıllardır LED ekran sektöründeyiz. Teknik detayları doğru sorar, teklifleri
                profesyonelce karşılaştırır ve sizi yanlış üründen koruruz. Amacımız en
                ucuzu değil, ihtiyacınıza <strong className="text-white">en uygun fiyatlı</strong> çözümü
                bulmaktır.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {whyUs.map((item, i) => {
                  const Icon = whyIcons[i];
                  return (
                    <div key={item.title} className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-800 text-cyan-bright ring-1 ring-white/10">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="mt-1 text-sm text-muted">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src="/images/led-is-ortakligi.png"
                  alt="LED ekran tedarikçileriyle iş ortaklığı ve teklif karşılaştırması"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Pixel pitch preview */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Pixel Pitch Rehberi"
            title="Doğru pixel pitch, doğru fiyat demektir"
            description="İzleme mesafenize göre doğru pitch'i seçmek hem görüntü kalitesini hem de bütçenizi optimize eder."
          />
          <div className="mt-10">
            <Reveal>
              <ComparisonTable
                headers={pixelPitchHeaders}
                rows={pixelPitchRows}
                caption="Pixel pitch ve izleme mesafesi karşılaştırması"
              />
            </Reveal>
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href="/pixel-pitch-rehberi" variant="outline">
              Detaylı pixel pitch rehberine git <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Müşteri Yorumları"
            title="Bizimle çalışanlar ne diyor?"
          />
          <div className="mt-12">
            <TestimonialSlider />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Sık Sorulan Sorular"
            title="Merak ettikleriniz"
            description="Aklınıza takılan başka bir soru varsa bize ulaşmaktan çekinmeyin."
          />
          <div className="mt-10">
            <FAQAccordion faqs={homeFaqs.slice(0, 6)} />
          </div>
          <div className="mt-8 text-center">
            <Link href="/sss" className="text-sm font-semibold text-cyan-bright hover:underline">
              Tüm soruları görüntüle →
            </Link>
          </div>
        </Container>
      </section>

      {/* Blog preview */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              align="left"
              eyebrow="Blog"
              title="LED ekran rehberleri"
              description="Fiyat, teknik seçim ve sektörel çözümler hakkında güncel içerikler."
            />
            <ButtonLink href="/blog" variant="ghost" className="hidden sm:inline-flex">
              Tüm yazılar <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
