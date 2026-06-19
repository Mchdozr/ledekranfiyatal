import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { UseCase } from "@/lib/usecases";

export function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <Link
      href={`/kullanim-alanlari/${useCase.slug}`}
      className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border border-white/10"
    >
      <Image
        src={useCase.image}
        alt={useCase.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
      <div className="relative p-5">
        <h3 className="flex items-center justify-between gap-2 font-display text-lg font-bold text-white">
          {useCase.name}
          <ArrowUpRight className="h-5 w-5 text-cyan-bright opacity-0 transition-opacity group-hover:opacity-100" />
        </h3>
        <p className="mt-1 text-sm text-slate-300">{useCase.tagline}</p>
      </div>
    </Link>
  );
}
