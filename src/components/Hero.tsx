"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, PlayCircle, ShieldCheck, Clock, Layers } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

const COLS = 14;
const ROWS = 8;
const colors = ["#00d4ff", "#0066ff", "#ffb020", "#10b981"];

function LedGrid() {
  const reduce = useReducedMotion();
  const cells = Array.from({ length: COLS * ROWS });
  return (
    <div
      className="absolute inset-0 grid opacity-[0.55]"
      style={{
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      }}
      aria-hidden
    >
      {cells.map((_, i) => {
        const color = colors[i % colors.length];
        return (
          <motion.span
            key={i}
            className="m-[3px] rounded-[3px]"
            style={{ background: color }}
            initial={{ opacity: 0.06 }}
            animate={
              reduce
                ? { opacity: 0.12 }
                : { opacity: [0.05, 0.5, 0.05] }
            }
            transition={
              reduce
                ? { duration: 0 }
                : {
                    duration: 3 + (i % 5),
                    repeat: Infinity,
                    delay: (i % 11) * 0.18,
                    ease: "easeInOut",
                  }
            }
          />
        );
      })}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-950" aria-hidden />
      <LedGrid />
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-900/85 to-navy-900"
        aria-hidden
      />
      <div
        className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-neon/25 blur-[120px]"
        aria-hidden
      />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-bright/30 bg-navy-900/60 px-4 py-1.5 text-xs font-semibold text-cyan-bright backdrop-blur sm:text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-bright opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-bright" />
            </span>
            {site.stats.suppliers} tedarikçiden tek formla teklif
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            LED Ekran Fiyatını{" "}
            <span className="text-gradient">Tek Tıkla Karşılaştırın</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            İç mekândan dış mekâna, rentaldan fine pitch&apos;e kadar tüm LED ekran
            ihtiyaçlarınız için birden fazla firmadan teklif topluyor, karşılaştırıyor ve
            size <strong className="text-white">en uygun fiyatlı çözümü</strong> sunuyoruz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <ButtonLink href="/fiyat-al" variant="amber" size="lg">
              Ücretsiz Fiyat Al
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/nasil-calisir" variant="outline" size="lg">
              <PlayCircle className="h-5 w-5" /> Nasıl Çalışır?
            </ButtonLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" /> Ücretsiz ve bağlayıcı değil
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-bright" /> {site.stats.responseHours} içinde dönüş
            </span>
            <span className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-amber-warm" /> Karşılaştırmalı teklif
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
