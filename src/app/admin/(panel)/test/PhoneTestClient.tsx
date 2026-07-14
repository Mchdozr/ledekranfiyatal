"use client";

import { useCallback, useRef, useState } from "react";
import { PhoneCall, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { testScenarios } from "@/lib/test-scenarios";
import {
  type CallStatus,
  type TestCall,
  callStatusLabel,
  isActiveCall,
} from "@/lib/db-types";
import { cn } from "@/lib/utils";

type Phase = "idle" | "starting" | "polling" | "done" | "error";

const badgeColor: Record<CallStatus, string> = {
  queued: "bg-slate-500/15 text-slate-300",
  ringing: "bg-blue-neon/20 text-cyan-bright",
  in_progress: "bg-amber-warm/15 text-amber-warm",
  completed: "bg-success/15 text-success",
  failed: "bg-red-500/15 text-red-300",
  no_answer: "bg-white/5 text-slate-400",
  voicemail: "bg-white/5 text-slate-400",
};

function fmtPrice(p: number | null, currency: string | null): string {
  if (p == null) return "—";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency || "TRY",
    maximumFractionDigits: 0,
  }).format(p);
}

export function PhoneTestClient({ canPhoneTest }: { canPhoneTest: boolean }) {
  const [toNumber, setToNumber] = useState("");
  const [scenarioId, setScenarioId] = useState(testScenarios[0]?.id ?? "");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [testCall, setTestCall] = useState<TestCall | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const poll = useCallback(
    (id: string) => {
      stopPolling();
      const startedAt = Date.now();
      pollRef.current = setInterval(async () => {
        // 5 dk sonra otomatik dur.
        if (Date.now() - startedAt > 5 * 60_000) {
          stopPolling();
          setPhase("done");
          return;
        }
        try {
          const res = await fetch(`/api/admin/test-call/phone?id=${id}`, {
            cache: "no-store",
          });
          const json = (await res.json()) as { ok: boolean; testCall?: TestCall };
          if (json.ok && json.testCall) {
            setTestCall(json.testCall);
            if (!isActiveCall(json.testCall.status)) {
              stopPolling();
              setPhase("done");
            }
          }
        } catch {
          // sessiz geç, bir sonraki tick tekrar dener
        }
      }, 3000);
    },
    [stopPolling],
  );

  const startCall = useCallback(async () => {
    if (!canPhoneTest) return;
    setError("");
    setTestCall(null);
    setPhase("starting");
    try {
      const res = await fetch("/api/admin/test-call/phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toNumber, scenarioId }),
      });
      const json = (await res.json()) as {
        ok: boolean;
        testCallId?: string;
        error?: string;
      };
      if (!json.ok || !json.testCallId) {
        throw new Error(json.error ?? "Arama başlatılamadı");
      }
      setPhase("polling");
      poll(json.testCallId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bağlantı hatası");
      setPhase("error");
    }
  }, [canPhoneTest, toNumber, scenarioId, poll]);

  const busy = phase === "starting" || phase === "polling";
  const scenario = testScenarios.find((s) => s.id === scenarioId);

  return (
    <section className="rounded-2xl border border-amber-warm/25 bg-navy-800/50 p-6">
      <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
        <PhoneCall className="h-5 w-5 text-amber-warm" /> Beni Ara (canlı telefon testi)
      </h2>
      <p className="mt-1 text-sm text-muted">
        Kendi numaranı gir; asistan seni <strong className="text-white">gerçekten arasın</strong>.
        Sen tedarikçi rolünde cevap ver, fiyat versin. Sonuç aşağıda görünür.
      </p>

      {!canPhoneTest ? (
        <p className="mt-4 rounded-lg border border-amber-warm/30 bg-amber-warm/5 px-4 py-3 text-sm text-amber-warm">
          Bu test için <code>RETELL_API_KEY</code>, <code>RETELL_AGENT_ID</code> ve{" "}
          <code>RETELL_FROM_NUMBER</code> tanımlı olmalı.
        </p>
      ) : (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Telefon numaran</label>
              <input
                type="tel"
                inputMode="tel"
                value={toNumber}
                onChange={(e) => setToNumber(e.target.value)}
                disabled={busy}
                placeholder="0555 111 22 33"
                className="w-full rounded-xl border border-white/15 bg-navy-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-warm focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Test senaryosu</label>
              <select
                value={scenarioId}
                onChange={(e) => setScenarioId(e.target.value)}
                disabled={busy}
                className="w-full rounded-xl border border-white/15 bg-navy-900/60 px-4 py-3 text-sm text-white focus:border-amber-warm focus:outline-none"
              >
                {testScenarios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {scenario && (
            <p className="mt-2 text-xs text-slate-500">
              {scenario.city} · {scenario.application} · {scenario.width}×{scenario.height} m ·{" "}
              {scenario.pixelPitch}
            </p>
          )}

          <div className="mt-5">
            <button
              type="button"
              onClick={startCall}
              disabled={busy || toNumber.trim().length < 7}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-warm px-6 py-3 text-sm font-semibold text-navy-900 hover:brightness-110 disabled:opacity-50"
            >
              {busy ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <PhoneCall className="h-5 w-5" />
              )}
              {phase === "starting"
                ? "Arama başlatılıyor…"
                : phase === "polling"
                  ? "Aranıyor…"
                  : "Beni ara"}
            </button>
          </div>

          {error && (
            <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          {testCall && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-navy-900/50 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">{testCall.to_number}</span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs",
                    badgeColor[testCall.status],
                  )}
                >
                  {isActiveCall(testCall.status) ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : testCall.status === "completed" ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5" />
                  )}
                  {callStatusLabel(testCall.status)}
                </span>
              </div>

              {testCall.price != null && (
                <p className="mt-3 font-display text-2xl font-bold text-success">
                  {fmtPrice(testCall.price, testCall.currency)}
                  {testCall.price_unit ? (
                    <span className="ml-2 text-sm font-normal text-slate-400">
                      / {testCall.price_unit}
                    </span>
                  ) : null}
                </p>
              )}

              {(testCall.lead_time_days || testCall.warranty_years) && (
                <p className="mt-1 text-sm text-muted">
                  {testCall.lead_time_days ? `${testCall.lead_time_days} gün teslim · ` : ""}
                  {testCall.warranty_years ? `${testCall.warranty_years} yıl garanti · ` : ""}
                  {testCall.includes_installation == null
                    ? ""
                    : testCall.includes_installation
                      ? "montaj dahil"
                      : "montaj hariç"}
                </p>
              )}

              {testCall.summary && (
                <p className="mt-3 text-sm text-slate-300">{testCall.summary}</p>
              )}

              {testCall.error && (
                <p className="mt-3 text-sm text-red-400">{testCall.error}</p>
              )}

              {testCall.recording_url && (
                <audio controls src={testCall.recording_url} className="mt-3 w-full" />
              )}

              {testCall.transcript && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-sm text-cyan-bright">
                    Görüşme transkripti
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap text-xs text-slate-400">
                    {testCall.transcript}
                  </pre>
                </details>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
