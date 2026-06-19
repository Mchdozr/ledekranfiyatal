import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductCategoryCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/urunler/${product.slug}`}
      className="glow-border group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-800/60 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-navy-900/80 px-3 py-1 text-xs font-semibold text-cyan-bright backdrop-blur">
          {product.shortName}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-white">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{product.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-bright">
          Detaylar ve fiyat
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
