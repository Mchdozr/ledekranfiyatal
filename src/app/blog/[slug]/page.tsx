import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Container, SectionHeading } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { BlogCard } from "@/components/BlogCard";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { posts, getPost, sortedPosts } from "@/lib/blog";
import { buildMetadata, faqJsonLd, articleJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.image,
    keywords: post.keywords,
    type: "article",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = sortedPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={[articleJsonLd(post), faqJsonLd(post.faqs)]} />
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        breadcrumb={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <article className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-cyan-bright" />
              {new Date(post.date).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-cyan-bright" /> {post.readingTime} okuma
            </span>
          </div>

          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
            <Image src={post.image} alt={post.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
          </div>

          <div
            className="prose-led mt-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 rounded-2xl border border-amber-warm/25 bg-amber-warm/5 p-6 text-center">
            <h2 className="font-display text-xl font-bold text-white">
              LED ekran fiyatınızı öğrenmek ister misiniz?
            </h2>
            <p className="mt-2 text-sm text-muted">
              İhtiyacınızı iletin; birden fazla tedarikçiden en uygun teklifi karşılaştırıp sunalım.
            </p>
            <ButtonLink href="/fiyat-al" variant="amber" className="mt-5">
              Ücretsiz Fiyat Al <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </article>

      <section className="py-8">
        <Container className="max-w-3xl">
          <SectionHeading align="left" eyebrow="SSS" title="Sık sorulan sorular" />
          <div className="mt-8">
            <FAQAccordion faqs={post.faqs} />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-white">İlgili içerikler</h2>
            <Link href="/blog" className="text-sm font-semibold text-cyan-bright hover:underline">
              Tüm yazılar →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
