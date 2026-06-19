"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin, Ruler, Grid3x3 } from "lucide-react";
import { projects, projectFilters, type Project } from "@/lib/projects";

export function ProjectGallery() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<Project | null>(null);

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {projectFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filter === f.value
                ? "bg-cyan-bright text-navy-900"
                : "border border-white/15 text-slate-300 hover:border-cyan-bright/50 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.button
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActive(p)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 text-left"
            >
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-navy-900/80 px-3 py-1 text-xs font-semibold text-cyan-bright backdrop-blur">
                {p.typeLabel}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display text-base font-bold text-white">{p.title}</h3>
                <p className="mt-1 text-xs text-slate-300">
                  {p.location} · {p.area} · {p.pitch}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/90 p-4 backdrop-blur"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-navy-800"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy-900/80 text-white hover:text-cyan-bright"
                aria-label="Kapat"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative aspect-video">
                <Image src={active.image} alt={active.imageAlt} fill className="object-cover" sizes="100vw" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-white">{active.title}</h3>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-cyan-bright" /> {active.location}</span>
                  <span className="flex items-center gap-1.5"><Ruler className="h-4 w-4 text-cyan-bright" /> {active.area}</span>
                  <span className="flex items-center gap-1.5"><Grid3x3 className="h-4 w-4 text-cyan-bright" /> {active.pitch}</span>
                  <span className="rounded-full bg-white/5 px-3 py-0.5">{active.sector}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
