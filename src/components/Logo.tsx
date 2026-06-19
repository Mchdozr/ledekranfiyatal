import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="grid h-8 w-8 shrink-0 grid-cols-3 grid-rows-3 gap-[2px] rounded-lg bg-navy-800 p-[5px] ring-1 ring-cyan-bright/40"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <span
            key={i}
            className="rounded-[1px]"
            style={{
              background:
                i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#0066ff" : "#ffb020",
              opacity: [0, 2, 4, 6, 8].includes(i) ? 1 : 0.45,
            }}
          />
        ))}
      </span>
      <span className="font-display text-lg font-bold leading-none tracking-tight text-white">
        m<span className="text-cyan-bright">Led</span>
      </span>
    </span>
  );
}
