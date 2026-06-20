"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FlaskConical, Loader2 } from "lucide-react";

export function MockSimulateButton({
  requestId,
  requestLabel,
}: {
  requestId: string;
  requestLabel: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const run = async () => {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/test-call/mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; sessions?: number };
      if (!json.ok) throw new Error(json.error);
      setMsg(`${json.sessions} sahte teklif oluşturuldu.`);
      router.refresh();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Hata");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-navy-900/40 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate font-medium text-white">{requestLabel}</p>
        <p className="text-xs text-slate-500">{requestId.slice(0, 8)}…</p>
      </div>
      <div className="flex items-center gap-3">
        {msg && <span className="text-xs text-success">{msg}</span>}
        <button
          type="button"
          onClick={run}
          disabled={loading}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm text-white hover:border-cyan-bright/50 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FlaskConical className="h-4 w-4 text-cyan-bright" />
          )}
          Simüle et
        </button>
      </div>
    </div>
  );
}
