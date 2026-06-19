"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/content";

export function TestimonialSlider() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const t = testimonials[idx];

  const go = (d: number) => {
    setDir(d);
    setIdx((p) => (p + d + testimonials.length) % testimonials.length);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 glass p-8 sm:p-10">
        <Quote className="h-10 w-10 text-cyan-bright/40" />
        <div className="relative mt-4 min-h-[160px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={idx}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-warm text-amber-warm" />
                ))}
              </div>
              <p className="mt-4 text-lg leading-relaxed text-white">“{t.text}”</p>
              <div className="mt-6">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-muted">
                  {t.role} · {t.location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-cyan-bright hover:text-cyan-bright"
          aria-label="Önceki yorum"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > idx ? 1 : -1);
                setIdx(i);
              }}
              aria-label={`${i + 1}. yoruma git`}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-6 bg-cyan-bright" : "w-2 bg-white/25"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-cyan-bright hover:text-cyan-bright"
          aria-label="Sonraki yorum"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
