import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { footerNav, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-navy-950">
      <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
      <Container className="relative py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-9" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              LED ekran ihtiyacınızı tek formla iletin; birden fazla tedarikçiden teklif
              toplar, karşılaştırır ve size en uygun fiyatlı çözümü sunarız.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a href={`tel:${site.phone}`} className="flex items-center gap-2 text-slate-300 hover:text-cyan-bright">
                <Phone className="h-4 w-4 text-cyan-bright" /> {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-slate-300 hover:text-cyan-bright">
                <Mail className="h-4 w-4 text-cyan-bright" /> {site.email}
              </a>
              <span className="flex items-center gap-2 text-slate-300">
                <MapPin className="h-4 w-4 text-cyan-bright" /> {site.address}
              </span>
            </div>
          </div>

          {Object.values(footerNav).map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-cyan-bright"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.brand} — {site.name}. Tüm hakları saklıdır.
          </p>
          <p className="text-xs">
            Fiyat garantisi değil; en uygun teklif karşılaştırması sunulur.
          </p>
        </div>
      </Container>
    </footer>
  );
}
