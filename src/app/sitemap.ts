import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { useCases } from "@/lib/usecases";
import { posts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1, freq: "weekly" as const },
    { path: "/fiyat-al", priority: 0.95, freq: "monthly" as const },
    { path: "/nasil-calisir", priority: 0.8, freq: "monthly" as const },
    { path: "/urunler", priority: 0.85, freq: "weekly" as const },
    { path: "/kullanim-alanlari", priority: 0.85, freq: "weekly" as const },
    { path: "/fiyat-rehberi", priority: 0.85, freq: "monthly" as const },
    { path: "/pixel-pitch-rehberi", priority: 0.8, freq: "monthly" as const },
    { path: "/projeler", priority: 0.7, freq: "monthly" as const },
    { path: "/blog", priority: 0.8, freq: "weekly" as const },
    { path: "/hakkimizda", priority: 0.6, freq: "yearly" as const },
    { path: "/sss", priority: 0.6, freq: "monthly" as const },
    { path: "/iletisim", priority: 0.6, freq: "yearly" as const },
    { path: "/gizlilik-politikasi", priority: 0.3, freq: "yearly" as const },
    { path: "/kvkk-aydinlatma-metni", priority: 0.3, freq: "yearly" as const },
    { path: "/cerez-politikasi", priority: 0.3, freq: "yearly" as const },
    { path: "/kullanim-kosullari", priority: 0.3, freq: "yearly" as const },
  ];

  const productRoutes = products.map((p) => ({
    path: `/urunler/${p.slug}`,
    priority: 0.8,
    freq: "monthly" as const,
  }));

  const useCaseRoutes = useCases.map((u) => ({
    path: `/kullanim-alanlari/${u.slug}`,
    priority: 0.7,
    freq: "monthly" as const,
  }));

  const blogRoutes = posts.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.7,
    freq: "monthly" as const,
    lastModified: new Date(p.date),
  }));

  type Route = {
    path: string;
    priority: number;
    freq: "weekly" | "monthly" | "yearly";
    lastModified?: Date;
  };

  const all: Route[] = [
    ...staticRoutes,
    ...productRoutes,
    ...useCaseRoutes,
    ...blogRoutes,
  ];

  return all.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: r.lastModified ?? now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
