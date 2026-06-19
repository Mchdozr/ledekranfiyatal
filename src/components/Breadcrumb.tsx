import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export function Breadcrumb({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Ana Sayfa", path: "/" }, ...items];
  return (
    <nav aria-label="breadcrumb" className="text-sm">
      <JsonLd data={breadcrumbJsonLd(all)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        {all.map((item, i) => {
          const last = i === all.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span className="text-slate-300">{item.name}</span>
              ) : (
                <Link href={item.path} className="transition-colors hover:text-cyan-bright">
                  {item.name}
                </Link>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
