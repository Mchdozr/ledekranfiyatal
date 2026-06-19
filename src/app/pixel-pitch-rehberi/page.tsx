import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container, SectionHeading } from "@/components/ui/Container";
import { ComparisonTable } from "@/components/ComparisonTable";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Reveal } from "@/components/Reveal";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pixelPitchHeaders, pixelPitchRows } from "@/lib/content";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pixel Pitch Rehberi: P2, P2.5, P3, P4, P10 Karşılaştırma",
  description:
    "Pixel pitch nedir, izleme mesafesine göre P2, P2.5, P4, P10 nasıl seçilir? LED ekran pixel pitch karşılaştırma tablosu ve seçim rehberi.",
  path: "/pixel-pitch-rehberi",
  keywords: ["pixel pitch nedir", "p10 led ekran fiyat", "pixel pitch karşılaştırma"],
});

const faqs = [
  { q: "Pixel pitch nedir?", a: "İki LED merkezinin arasındaki mesafedir, milimetre ile ifade edilir. P2.5, piksel arası mesafenin 2,5 mm olduğunu gösterir." },
  { q: "Hangi pixel pitch'i seçmeliyim?", a: "İzleme mesafenize bağlıdır. Pratik kural: minimum ideal izleme mesafesi (metre) yaklaşık pitch değerine eşittir. P4 için ~4 m, P10 için ~10 m." },
  { q: "Düşük pitch her zaman daha mı iyi?", a: "Hayır. Uzaktan izlenen ekranda düşük pitch fark edilmez ve gereksiz maliyettir. Doğru pitch, mesafeye uygun en ekonomik olandır." },
  { q: "P2 ile P10 arasındaki fark nedir?", a: "P2 çok yakından net görüntü için, P10 uzaktan izlenen büyük ekranlar için uygundur. P2'nin birim m² maliyeti P10'dan kat kat yüksektir." },
];

const ranges = [
  { range: "P0.9 – P1.5", title: "Fine Pitch", text: "1–3 m yakın izleme. Kontrol odası, kurumsal lobi, stüdyo." },
  { range: "P1.8 – P2.5", title: "İç Mekân Standart", text: "2–4 m. AVM ortak alanı, mağaza, toplantı odası." },
  { range: "P3 – P4", title: "İç/Dış Genel", text: "4–8 m. Sahne, iç mekân büyük ekran, showroom." },
  { range: "P5 – P6", title: "Dış Mekân Orta", text: "8–12 m. Cephe, orta ölçek dış mekân." },
  { range: "P8 – P10", title: "Uzak Mesafe", text: "12 m+. Billboard, meydan, stadyum." },
];

export default function PixelPitchRehberiPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHeader
        eyebrow="Pixel Pitch Rehberi"
        title="Pixel Pitch Karşılaştırma ve Seçim Rehberi"
        description="Pixel pitch, LED ekranın netliğini ve fiyatını belirleyen en kritik değerdir. İzleme mesafenize göre doğru pitch'i seçmek hem kaliteyi hem bütçeyi optimize eder."
        breadcrumb={[{ name: "Pixel Pitch Rehberi", path: "/pixel-pitch-rehberi" }]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Karşılaştırma"
            title="Pixel pitch ve izleme mesafesi tablosu"
          />
          <div className="mt-10">
            <ComparisonTable
              headers={pixelPitchHeaders}
              rows={pixelPitchRows}
              caption="İzleme mesafesine göre önerilen pixel pitch"
            />
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Aralıklar"
            title="Kullanıma göre pixel pitch aralıkları"
          />
          <div className="mt-10 space-y-4">
            {ranges.map((r, i) => (
              <Reveal key={r.range} delay={i * 0.05}>
                <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-navy-800/50 p-5 sm:flex-row sm:items-center">
                  <span className="inline-flex w-fit items-center rounded-lg bg-cyan-bright/10 px-4 py-2 font-display font-bold text-cyan-bright">
                    {r.range}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{r.title}</h3>
                    <p className="text-sm text-muted">{r.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading eyebrow="SSS" title="Pixel pitch hakkında sık sorulanlar" />
          <div className="mt-10">
            <FAQAccordion faqs={faqs} />
          </div>
        </Container>
      </section>

      <CTABanner title="Hangi pixel pitch size uygun? Birlikte belirleyelim" />
    </>
  );
}
