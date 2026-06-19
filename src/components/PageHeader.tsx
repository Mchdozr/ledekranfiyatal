import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/Breadcrumb";

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: { name: string; path: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="bg-radial-glow absolute inset-0" aria-hidden />
      <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
      <Container className="relative py-12 sm:py-16">
        {breadcrumb && (
          <div className="mb-6">
            <Breadcrumb items={breadcrumb} />
          </div>
        )}
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-bright/30 bg-cyan-bright/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-bright">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
