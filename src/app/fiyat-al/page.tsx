import type { Metadata } from "next";
import { ShieldCheck, Clock, Layers, Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MultiStepQuoteForm } from "@/components/MultiStepQuoteForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Ücretsiz LED Ekran Fiyat Teklifi Al",
  description:
    "İhtiyacınızı tek formda bildirin; birden fazla tedarikçiden teklif toplayıp en uygun fiyatlı LED ekran çözümünü 24 saat içinde sunalım. Ücretsiz.",
  path: "/fiyat-al",
  keywords: ["led ekran fiyat al", "led ekran teklif al", "led ekran fiyat"],
});

const trust = [
  { icon: ShieldCheck, text: "Ücretsiz ve bağlayıcı değil" },
  { icon: Clock, text: "24 saat içinde dönüş" },
  { icon: Layers, text: "Birden fazla tedarikçiden teklif" },
  { icon: Lock, text: "KVKK uyumlu, verileriniz güvende" },
];

export default function FiyatAlPage() {
  return (
    <div className="relative">
      <div className="bg-radial-glow absolute inset-x-0 top-0 h-96" aria-hidden />
      <Container className="relative py-12 sm:py-16">
        <Breadcrumb items={[{ name: "Fiyat Al", path: "/fiyat-al" }]} />
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-bright/30 bg-cyan-bright/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-bright">
              Ücretsiz Teklif
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              LED ekran fiyatınızı dakikalar içinde alın
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Formu doldurun; ihtiyacınızı analiz edip ağımızdaki uygun tedarikçilere
              iletelim. Gelen teklifleri sizin için karşılaştırıp en uygun fiyatlı çözümü
              sunalım. Tek tek firmayla uğraşmanıza gerek yok.
            </p>
            <ul className="mt-8 space-y-3">
              {trust.map((t) => (
                <li key={t.text} className="flex items-center gap-3 text-sm text-slate-200">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800 text-cyan-bright ring-1 ring-white/10">
                    <t.icon className="h-4 w-4" />
                  </span>
                  {t.text}
                </li>
              ))}
            </ul>
          </div>

          <MultiStepQuoteForm />
        </div>
      </Container>
    </div>
  );
}
