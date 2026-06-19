import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container, SectionHeading } from "@/components/ui/Container";
import { ComparisonTable } from "@/components/ComparisonTable";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Reveal } from "@/components/Reveal";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { priceGuideHeaders, priceGuideRows } from "@/lib/content";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "LED Ekran Fiyatları Rehberi 2025",
  description:
    "LED ekran fiyatlarını belirleyen faktörler, ekran tiplerine göre bütçe seviyeleri ve en uygun teklifi alma yöntemi. Güncel LED ekran fiyat rehberi.",
  path: "/fiyat-rehberi",
  keywords: ["led ekran fiyat", "led ekran fiyatları", "led ekran fiyat rehberi"],
});

const factors = [
  { title: "Pixel Pitch", text: "Pitch küçüldükçe birim m² maliyeti artar. En belirleyici kalemdir." },
  { title: "Toplam m²", text: "Genişlik × yükseklik. Alan büyüdükçe toplam tutar artar, birim maliyet bir miktar düşebilir." },
  { title: "İç / Dış Mekân", text: "Dış mekân; yüksek parlaklık ve IP65 koruma gerektirdiği için daha maliyetlidir." },
  { title: "Parlaklık (nit)", text: "Güneş gören cepheler yüksek nit gerektirir; bu da fiyatı yükseltir." },
  { title: "Kontrol Sistemi", text: "Novastar/Colorlight kart ve yüksek refresh rate kalite ve fiyatı etkiler." },
  { title: "Montaj & Altyapı", text: "Konstrüksiyon, elektrik ve işçilik ayrı bir bütçe kalemidir." },
  { title: "Garanti & Servis", text: "Uzun garanti ve yerinde servis toplam sahip olma maliyetini düşürür." },
  { title: "İçerik Yönetimi", text: "Uzaktan içerik yönetimi yazılımı ve oynatıcı bütçeye dahildir." },
];

const faqs = [
  { q: "LED ekran metrekare fiyatı ne kadar?", a: "Sabit bir m² fiyatı yoktur. Pixel pitch, iç/dış mekân, parlaklık ve montaj kalemlerine göre belirlenir. Net fiyat için ihtiyacınızı formla iletmeniz yeterli." },
  { q: "En ucuz LED ekran hangisidir?", a: "Genellikle yüksek pitch'li (P8–P10) ve standart iç mekân ekranlar birim m² olarak daha ekonomiktir. Ancak doğru seçim, en ucuz değil ihtiyaca en uygun olandır." },
  { q: "LED ekran fiyatına montaj dahil mi?", a: "Çoğu zaman ayrı kalemdir. Teklif alırken montaj, konstrüksiyon ve elektrik altyapısının dahil olup olmadığını netleştirmek gerekir." },
  { q: "En uygun fiyatı nasıl bulurum?", a: "Tek tedarikçi yerine birden fazla teklifi karşılaştırmak en doğru yöntemdir. Biz bu karşılaştırmayı sizin için ücretsiz yapıyoruz." },
];

export default function FiyatRehberiPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHeader
        eyebrow="Fiyat Rehberi"
        title="LED Ekran Fiyatları Rehberi"
        description="LED ekran fiyatı tek bir rakam değildir; pixel pitch, alan, parlaklık ve montaj gibi birçok faktörün toplamıdır. Bu rehberde fiyatı belirleyen her şeyi açıklıyoruz."
        breadcrumb={[{ name: "Fiyat Rehberi", path: "/fiyat-rehberi" }]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Maliyet Faktörleri"
            title="LED ekran fiyatını belirleyen 8 faktör"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {factors.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) * 0.06}>
                <div className="h-full rounded-2xl border border-white/10 bg-navy-800/50 p-5">
                  <div className="font-display text-sm font-bold text-cyan-bright">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 font-semibold text-white">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Bütçe Karşılaştırması"
            title="Ekran tiplerine göre bütçe seviyeleri"
            description="Aşağıdaki tablo, ekran tiplerinin tipik kullanım ve bütçe konumlandırmasını gösterir. Net fiyat için form üzerinden teklif alın."
          />
          <div className="mt-10">
            <ComparisonTable headers={priceGuideHeaders} rows={priceGuideRows} />
          </div>
          <p className="mt-4 text-center text-xs text-muted">
            * Bütçe seviyeleri yön gösterici niteliktedir; kesin fiyat değildir. Fiyat garantisi değil, en uygun teklif karşılaştırması sunulur.
          </p>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading eyebrow="SSS" title="Fiyatlar hakkında sık sorulanlar" />
          <div className="mt-10">
            <FAQAccordion faqs={faqs} />
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
