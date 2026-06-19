"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

function parse(value: string) {
  const match = value.match(/([\d.,]+)/);
  if (!match) return { num: null as number | null, prefix: "", suffix: value };
  const numStr = match[1];
  const num = parseFloat(numStr.replace(/\./g, "").replace(",", "."));
  const idx = value.indexOf(numStr);
  return {
    num,
    prefix: value.slice(0, idx),
    suffix: value.slice(idx + numStr.length),
    decimals: numStr.includes(",") ? 1 : 0,
  };
}

function Stat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState("0");
  const { num, prefix, suffix } = parse(value);

  useEffect(() => {
    if (!inView || num === null) {
      if (num === null) setDisplay(value);
      return;
    }
    if (reduce) {
      setDisplay(Math.round(num).toLocaleString("tr-TR"));
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(num * eased).toLocaleString("tr-TR"));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num, reduce, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-bold text-white sm:text-5xl">
        <span className="text-cyan-bright">{prefix}</span>
        {num === null ? value : display}
        <span className="text-cyan-bright">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </div>
  );
}

export function StatsCounter({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
      {stats.map((s) => (
        <Stat key={s.label} {...s} />
      ))}
    </div>
  );
}
