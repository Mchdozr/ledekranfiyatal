import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";

export function LegalLayout({
  title,
  breadcrumbName,
  breadcrumbPath,
  updated = "Haziran 2026",
  html,
}: {
  title: string;
  breadcrumbName: string;
  breadcrumbPath: string;
  updated?: string;
  html: string;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Yasal"
        title={title}
        breadcrumb={[{ name: breadcrumbName, path: breadcrumbPath }]}
      />
      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <p className="mb-8 text-sm text-muted">Son güncelleme: {updated}</p>
          <div className="prose-led" dangerouslySetInnerHTML={{ __html: html }} />
        </Container>
      </section>
    </>
  );
}
