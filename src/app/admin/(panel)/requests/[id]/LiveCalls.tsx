"use client";

import { useEffect, useState } from "react";
import { Loader2, Phone, CheckCircle2, XCircle, Trophy, FileText } from "lucide-react";
import {
  type CallSession,
  type CallStatus,
  callStatusLabel,
  isActiveCall,
} from "@/lib/db-types";

type SessionWithSupplier = CallSession & {
  supplier: { name: string; city: string | null; phone: string } | null;
};

function fmtPrice(p: number | null, currency: string | null): string {
  if (p == null) return "—";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency || "TRY",
    maximumFractionDigits: 0,
  }).format(p);
}

const badgeColor: Record<CallStatus, string> = {
  queued: "bg-slate-500/15 text-slate-300",
  ringing: "bg-blue-neon/20 text-cyan-bright",
  in_progress: "bg-amber-warm/15 text-amber-warm",
  completed: "bg-success/15 text-success",
  failed: "bg-red-500/15 text-red-300",
  no_answer: "bg-white/5 text-slate-400",
  voicemail: "bg-white/5 text-slate-400",
};

function StatusIcon({ status }: { status: CallStatus }) {
  if (isActiveCall(status)) {
    return status === "queued" ? (
      <Phone className="h-4 w-4" />
    ) : (
      <Loader2 className="h-4 w-4 animate-spin" />
    );
  }
  if (status === "completed") return <CheckCircle2 className="h-4 w-4" />;
  return <XCircle className="h-4 w-4" />;
}

export function LiveCalls({
  requestId,
  initialSessions,
}: {
  requestId: string;
  initialSessions: SessionWithSupplier[];
}) {
  const [sessions, setSessions] = useState<SessionWithSupplier[]>(initialSessions);
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (!live) return;
    let active = true;

    const tick = async () => {
      try {
        const res = await fetch(`/api/admin/requests/${requestId}`, { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as { sessions: SessionWithSupplier[] };
        if (!active) return;
        setSessions(json.sessions);
        const anyActive = json.sessions.some((s) => isActiveCall(s.status));
        if (!anyActive) setLive(false);
      } catch {
        // sessiz geç
      }
    };

    const interval = setInterval(tick, 4000);
    void tick();
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [requestId, live]);

  const withPrice = sessions
    .filter((s) => s.price != null)
    .sort((a, b) => (a.price as number) - (b.price as number));
  const without = sessions.filter((s) => s.price == null);
  const best = withPrice[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-white">
          Çağrılar ({sessions.length})
        </h2>
        {live ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-cyan-bright">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-bright" /> Canlı
          </span>
        ) : (
          <span className="text-xs text-slate-500">Tamamlandı</span>
        )}
      </div>

      {best && (
        <div className="rounded-2xl border border-success/30 bg-success/5 p-5">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-success">
            <Trophy className="h-4 w-4" /> En uygun teklif
          </span>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="font-display text-2xl font-bold text-white">
                {best.supplier?.name ?? "Tedarikçi"}
              </p>
              <p className="text-sm text-muted">
                {best.lead_time_days ? `${best.lead_time_days} gün teslim · ` : ""}
                {best.warranty_years ? `${best.warranty_years} yıl garanti · ` : ""}
                {best.includes_installation ? "montaj dahil" : "montaj hariç"}
              </p>
            </div>
            <span className="font-display text-3xl font-bold text-success">
              {fmtPrice(best.price, best.currency)}
            </span>
          </div>
        </div>
      )}

      {withPrice.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-navy-800/60 text-left text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">Tedarikçi</th>
                <th className="px-4 py-3 text-right">Fiyat</th>
                <th className="px-4 py-3 text-right">Teslim</th>
                <th className="px-4 py-3 text-right">Garanti</th>
                <th className="px-4 py-3 text-center">Montaj</th>
              </tr>
            </thead>
            <tbody>
              {withPrice.map((s, i) => (
                <tr
                  key={s.id}
                  className={`border-t border-white/5 ${i === 0 ? "bg-success/5" : ""}`}
                >
                  <td className="px-4 py-3 font-medium text-white">
                    {s.supplier?.name ?? "—"}
                    <span className="ml-2 text-xs text-slate-500">{s.price_unit ?? ""}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-white">
                    {fmtPrice(s.price, s.currency)}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-300">
                    {s.lead_time_days ? `${s.lead_time_days} gün` : "—"}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-300">
                    {s.warranty_years ? `${s.warranty_years} yıl` : "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {s.includes_installation == null
                      ? "—"
                      : s.includes_installation
                        ? "✓"
                        : "✕"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="space-y-2">
        {without.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-navy-800/40 px-4 py-3"
          >
            <div className="min-w-0">
              <p className="font-medium text-white">{s.supplier?.name ?? "Tedarikçi"}</p>
              {s.summary && <p className="truncate text-xs text-muted">{s.summary}</p>}
              {s.error && <p className="truncate text-xs text-red-400">{s.error}</p>}
            </div>
            <span
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs ${badgeColor[s.status]}`}
            >
              <StatusIcon status={s.status} />
              {callStatusLabel(s.status)}
            </span>
          </div>
        ))}
      </div>

      {sessions.some((s) => s.transcript) && (
        <details className="rounded-2xl border border-white/10 bg-navy-800/40 p-4">
          <summary className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-200">
            <FileText className="h-4 w-4 text-cyan-bright" /> Görüşme transkriptleri
          </summary>
          <div className="mt-4 space-y-4">
            {sessions
              .filter((s) => s.transcript)
              .map((s) => (
                <div key={s.id}>
                  <p className="text-xs font-semibold text-cyan-bright">{s.supplier?.name}</p>
                  <pre className="mt-1 whitespace-pre-wrap text-xs text-slate-400">
                    {s.transcript}
                  </pre>
                </div>
              ))}
          </div>
        </details>
      )}
    </div>
  );
}
