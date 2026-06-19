import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Container, SectionHeading } from "@/components/ui/Container";
import { StatsCounter } from "@/components/StatsCounter";
import { Reveal } from "@/components/Reveal";
import { CTABanner } from "@/components/CTABanner";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Target, Eye, Handshake, ShieldCheck } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Hakkımızda | LED Ekran Fiyat Karşılaştırma Platformu",
  description:
    "ledekranfiyatal.com; LED ekran almak isteyenleri doğru tedarikçilerle buluşturan, teklif toplayıp karşılaştıran bağımsız bir platformdur. Misyonumuzu keşfedin.",
  path: "/hakkimizda",
});

const values = [
  { icon: Target, title: "İhtiyaç odaklı", text: "En ucuzu değil, ihtiyacınıza en uygun fiyatlı çözümü hedefleriz." },
  { icon: Eye, title: "Şeffaflık", text: "Teklifleri açık ve karşılaştırılabilir şekilde sunarız; yanıltıcı iddia yok." },
  { icon: Handshake, title: "Tarafsızlık", text: "Belirli bir markaya değil, sizin çıkarınıza göre yönlendiririz." },
  { icon: ShieldCheck, title: "Güven", text: "KVKK uyumlu süreç; verileriniz yalnızca teklif amacıyla kullanılır." },
];

export default function HakkimizdaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hakkımızda"
        title="LED ekran sektörünü bilen, sizin tarafınızda bir ekip"
        description="ledekranfiyatal.com; LED ekran almak isteyenlerle güvenilir tedarikçileri buluşturan bağımsız bir fiyat karşılaştırma ve teklif toplama platformudur."
        breadcrumb={[{ name: "Hakkımızda", path: "/hakkimizda" }]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-white">Neden varız?</h2>
              <p className="mt-4 leading-relaxed text-muted">
                LED ekran almak isteyen çoğu kişi, onlarca firmayla tek tek görüşmek, teknik
                terimlerle boğuşmak ve fiyatların gerçekten uygun olup olmadığını bilememekle
                karşılaşır. Biz bu süreci tersine çevirdik: ihtiyacınızı tek seferde alıyor,
                ağımızdaki uygun tedarikçilerden teklif topluyor ve sizin için karşılaştırıyoruz.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Yıllardır sektörün içindeyiz; pixel pitch, parlaklık, IP koruma ve montaj gibi
                kararlarda doğru tercihi yapmanız için yön gösteriyoruz. Amacımız, doğru ürünü
                <strong className="text-white"> en uygun fiyatla</strong> almanızı sağlamak.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src="/images/fiyat-teklif-laptop.png"
                  alt="LED ekran fiyat teklifi alan profesyonel"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-white/10 bg-navy-950/60 py-14">
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

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Değerlerimiz" title="Çalışma prensiplerimiz" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 0.06}>
                <div className="h-full rounded-2xl border border-white/10 bg-navy-800/50 p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-bright/10 text-cyan-bright">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display font-bold text-white">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
