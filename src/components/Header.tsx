"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { mainNav, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-navy-900/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:h-18 sm:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label={site.brand}>
          <Logo className="h-9 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana menü">
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-cyan-bright" : "text-slate-200 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-2 text-sm font-medium text-slate-200 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4 text-cyan-bright" />
            {site.phoneDisplay}
          </a>
          <ButtonLink href="/fiyat-al" variant="amber" size="sm">
            Ücretsiz Fiyat Al
          </ButtonLink>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy-900/98 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobil menü">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-slate-200 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-slate-200"
            >
              <Phone className="h-4 w-4 text-cyan-bright" />
              {site.phoneDisplay}
            </a>
            <ButtonLink href="/fiyat-al" variant="amber" className="mt-2 w-full">
              Ücretsiz Fiyat Al
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
