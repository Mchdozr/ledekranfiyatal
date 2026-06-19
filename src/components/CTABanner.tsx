import { Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function CTABanner({
  title = "LED ekran fiyatınızı dakikalar içinde öğrenin",
  description = "Tek formu doldurun, birden fazla tedarikçiden topladığımız teklifleri karşılaştırıp size en uygun fiyatlı çözümü sunalım.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-cyan-bright/20 bg-gradient-to-br from-navy-800 to-navy-950 px-6 py-12 text-center sm:px-12 sm:py-16">
            <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
            <div
              className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-cyan-bright/20 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:text-lg">
                {description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/fiyat-al" variant="amber" size="lg">
                  Ücretsiz Fiyat Al
                </ButtonLink>
                <ButtonLink href={`tel:${site.phone}`} variant="outline" size="lg">
                  <Phone className="h-5 w-5" /> {site.phoneDisplay}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
