import Link from "next/link";
import { Home, Search, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center">
      <div className="bg-radial-glow absolute inset-0" aria-hidden />
      <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
      <Container className="relative py-20 text-center">
        <p className="font-display text-7xl font-bold text-gradient sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
          Aradığınız sayfa bulunamadı
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Sayfa taşınmış veya kaldırılmış olabilir. Aşağıdan devam edebilir ya da hemen
          ücretsiz fiyat teklifi alabilirsiniz.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/fiyat-al" variant="amber" size="lg">
            Ücretsiz Fiyat Al <ArrowRight className="h-5 w-5" />
          </ButtonLink>
          <ButtonLink href="/" variant="outline" size="lg">
            <Home className="h-5 w-5" /> Ana Sayfa
          </ButtonLink>
        </div>
        <div className="mx-auto mt-12 flex max-w-xl flex-wrap items-center justify-center gap-2">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/10 bg-navy-800/50 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-cyan-bright/50 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
          <Search className="h-4 w-4" /> İhtiyacınız olanı bulamadınız mı? Bize ulaşın.
        </div>
      </Container>
    </div>
  );
}
