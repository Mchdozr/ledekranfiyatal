import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { CTABanner } from "@/components/CTABanner";
import { howItWorks } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { ClipboardList, Network, Scale, BadgeCheck } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Nasıl Çalışır? LED Ekran Teklif Süreci",
  description:
    "Tek formla LED ekran teklifi alma süreci nasıl işliyor? İhtiyaç bildirimi, tedarikçilerden teklif toplama, karşılaştırma ve en uygun çözümü sunma adımları.",
  path: "/nasil-calisir",
  keywords: ["led ekran teklif al", "led ekran fiyat al", "nasıl çalışır"],
});

const icons = [ClipboardList, Network, Scale, BadgeCheck];

export default function NasilCalisirPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nasıl Çalışır"
        title="Tek formdan en uygun teklife: süreç nasıl işliyor?"
        description="LED ekran almak için onlarca firmayı aramanıza gerek yok. İhtiyacınızı bir kez bildiriyorsunuz; toplama, karşılaştırma ve pazarlık yükünü biz üstleniyoruz."
        breadcrumb={[{ name: "Nasıl Çalışır", path: "/nasil-calisir" }]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-cyan-bright/60 via-cyan-bright/20 to-transparent sm:left-[31px]" aria-hidden />
            <div className="space-y-8">
              {howItWorks.map((step, i) => {
                const Icon = icons[i];
                return (
                  <Reveal key={step.step} delay={i * 0.08}>
                    <div className="relative flex gap-5">
                      <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-800 text-cyan-bright ring-1 ring-cyan-bright/30">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div className="rounded-2xl border border-white/10 bg-navy-800/50 p-5">
                        <div className="font-display text-xs font-bold uppercase tracking-wider text-cyan-bright">
                          Adım {step.step}
                        </div>
                        <h2 className="mt-1 font-display text-lg font-bold text-white">
                          {step.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Şeffaflık"
            title="Süreç boyunca neyi garanti ediyoruz?"
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-3">
            {[
              { t: "Birden fazla teklif", d: "Talebinize uygun birden fazla tedarikçiden teklif toplarız." },
              { t: "24 saat içinde dönüş", d: "Çoğu talebe bir gün içinde karşılaştırmalı dönüş yaparız." },
              { t: "Baskısız karar", d: "Teklifleri sunarız; kararı tamamen siz verirsiniz." },
            ].map((item) => (
              <div key={item.t} className="rounded-2xl border border-white/10 bg-navy-800/50 p-6 text-center">
                <h3 className="font-display font-bold text-white">{item.t}</h3>
                <p className="mt-2 text-sm text-muted">{item.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
