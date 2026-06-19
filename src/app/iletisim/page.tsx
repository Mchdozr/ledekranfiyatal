import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "İletişim | LED Ekran Fiyat Teklifi",
  description:
    "LED ekran ihtiyacınız için bize ulaşın. Telefon, e-posta ve WhatsApp ile iletişime geçin veya ücretsiz fiyat teklifi formunu doldurun.",
  path: "/iletisim",
  keywords: ["led ekran iletişim", "led ekran fiyat al"],
});

export default function IletisimPage() {
  const cards = [
    { icon: Phone, title: "Telefon", value: site.phoneDisplay, href: `tel:${site.phone}` },
    { icon: MessageCircle, title: "WhatsApp", value: "Hızlı yanıt için yazın", href: `https://wa.me/${site.whatsapp}` },
    { icon: Mail, title: "E-posta", value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <>
      <PageHeader
        eyebrow="İletişim"
        title="Bize ulaşın"
        description="Sorularınız için bize istediğiniz kanaldan ulaşabilir ya da en hızlı sonuç için ücretsiz fiyat teklifi formunu doldurabilirsiniz."
        breadcrumb={[{ name: "İletişim", path: "/iletisim" }]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-3">
            {cards.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glow-border group rounded-2xl border border-white/10 bg-navy-800/50 p-6 transition-all hover:-translate-y-1"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-bright/10 text-cyan-bright">
                  <c.icon className="h-6 w-6" />
                </span>
                <h2 className="mt-4 font-display font-bold text-white">{c.title}</h2>
                <p className="mt-1 text-sm text-muted">{c.value}</p>
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-6 rounded-3xl border border-white/10 bg-navy-800/40 p-6 sm:p-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-bold text-white">Çalışma bilgileri</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-cyan-bright" /> {site.address}
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-cyan-bright" /> Hafta içi 09:00 – 18:00
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-cyan-bright" /> {site.phoneDisplay}
                </li>
              </ul>
              <p className="mt-4 text-sm text-muted">
                Firma: <strong className="text-white">{site.brand}</strong> — Türkiye geneli LED
                ekran tedarikçi ağı.
              </p>
            </div>
            <div className="flex flex-col justify-center rounded-2xl border border-amber-warm/25 bg-amber-warm/5 p-6 text-center">
              <h3 className="font-display text-lg font-bold text-white">
                En hızlı yöntem: fiyat al formu
              </h3>
              <p className="mt-2 text-sm text-muted">
                İhtiyacınızı birkaç adımda iletin, karşılaştırmalı teklifle dönelim.
              </p>
              <ButtonLink href="/fiyat-al" variant="amber" className="mt-5 self-center">
                Ücretsiz Fiyat Al
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
