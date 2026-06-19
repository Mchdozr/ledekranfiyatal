import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { BlogCard } from "@/components/BlogCard";
import { Reveal } from "@/components/Reveal";
import { CTABanner } from "@/components/CTABanner";
import { sortedPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "LED Ekran Blog: Fiyat, Teknik ve Sektör Rehberleri",
  description:
    "LED ekran fiyatları, pixel pitch seçimi, kurulum maliyeti ve sektörel çözümler hakkında güncel rehber içerikleri.",
  path: "/blog",
  keywords: ["led ekran blog", "led ekran rehber", "led ekran fiyat"],
});

export default function BlogPage() {
  const posts = sortedPosts();
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="LED Ekran Rehberleri"
        description="Fiyat, teknik seçim, kurulum ve sektörel çözümler hakkında doğru kararı vermenizi sağlayacak güncel içerikler."
        breadcrumb={[{ name: "Blog", path: "/blog" }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CTABanner />
    </>
  );
}
