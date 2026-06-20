"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import { testScenarios } from "@/lib/test-scenarios";
import { Mic, MicOff, PhoneOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CallState = "idle" | "connecting" | "active" | "ended" | "error";

export function VoiceTestClient({ canWebTest }: { canWebTest: boolean }) {
  const clientRef = useRef<RetellWebClient | null>(null);
  const [scenarioId, setScenarioId] = useState(testScenarios[0]?.id ?? "");
  const [callState, setCallState] = useState<CallState>("idle");
  const [muted, setMuted] = useState(false);
  const [agentTalking, setAgentTalking] = useState(false);
  const [error, setError] = useState("");
  const [transcript, setTranscript] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      clientRef.current?.stopCall();
    };
  }, []);

  const startCall = useCallback(async () => {
    if (!canWebTest) return;
    setError("");
    setTranscript([]);
    setCallState("connecting");

    try {
      const res = await fetch("/api/admin/test-call/web", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId }),
      });
      const json = (await res.json()) as {
        ok: boolean;
        accessToken?: string;
        error?: string;
      };

      if (!json.ok || !json.accessToken) {
        throw new Error(json.error ?? "Token alınamadı");
      }

      const client = new RetellWebClient();
      clientRef.current = client;

      client.on("call_started", () => setCallState("active"));
      client.on("call_ended", () => setCallState("ended"));
      client.on("agent_start_talking", () => setAgentTalking(true));
      client.on("agent_stop_talking", () => setAgentTalking(false));
      client.on("update", (u: { transcript?: { role: string; content: string }[] }) => {
        if (u.transcript?.length) {
          const last = u.transcript[u.transcript.length - 1];
          setTranscript((prev) => [...prev.slice(-20), `${last.role}: ${last.content}`]);
        }
      });
      client.on("error", (e: string | Error) => {
        setError(typeof e === "string" ? e : e.message);
        setCallState("error");
      });

      await client.startCall({ accessToken: json.accessToken });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bağlantı hatası");
      setCallState("error");
    }
  }, [canWebTest, scenarioId]);

  const stopCall = () => {
    clientRef.current?.stopCall();
    setCallState("ended");
    setAgentTalking(false);
  };

  const toggleMute = () => {
    if (!clientRef.current) return;
    if (muted) {
      clientRef.current.unmute();
    } else {
      clientRef.current.mute();
    }
    setMuted(!muted);
  };

  const scenario = testScenarios.find((s) => s.id === scenarioId);

  return (
    <div className="rounded-2xl border border-cyan-bright/20 bg-navy-800/50 p-6">
      <h2 className="font-display text-lg font-bold text-white">Mikrofonla asistan testi</h2>
      <p className="mt-1 text-sm text-muted">
        Telefon hattı yok — Retell ücretsiz kredinle tarayıcıdan konuşursun. Sen tedarikçi rolünde ol,
        asistan fiyat sorsun.
      </p>

      {!canWebTest ? (
        <p className="mt-4 rounded-lg border border-amber-warm/30 bg-amber-warm/5 px-4 py-3 text-sm text-amber-warm">
          RETELL_API_KEY ve RETELL_AGENT_ID .env.local dosyasına eklenmeli.
        </p>
      ) : (
        <>
          <div className="mt-4">
            <label className="mb-1.5 block text-sm text-slate-300">Test senaryosu</label>
            <select
              value={scenarioId}
              onChange={(e) => setScenarioId(e.target.value)}
              disabled={callState === "connecting" || callState === "active"}
              className="w-full rounded-xl border border-white/15 bg-navy-900/60 px-4 py-3 text-sm text-white focus:border-cyan-bright focus:outline-none"
            >
              {testScenarios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            {scenario && (
              <p className="mt-2 text-xs text-slate-500">
                {scenario.city} · {scenario.application} · {scenario.width}×{scenario.height} m ·{" "}
                {scenario.pixelPitch}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {callState === "idle" || callState === "ended" || callState === "error" ? (
              <button
                type="button"
                onClick={startCall}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-bright px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-white"
              >
                <Mic className="h-5 w-5" /> Konuşmayı başlat
              </button>
            ) : callState === "connecting" ? (
              <span className="inline-flex items-center gap-2 text-cyan-bright">
                <Loader2 className="h-5 w-5 animate-spin" /> Bağlanıyor…
              </span>
            ) : (
              <>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white hover:border-cyan-bright/50"
                >
                  {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  {muted ? "Sesi aç" : "Sustur"}
                </button>
                <button
                  type="button"
                  onClick={stopCall}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300 hover:bg-red-500/20"
                >
                  <PhoneOff className="h-4 w-4" /> Bitir
                </button>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 text-xs",
                    agentTalking ? "text-cyan-bright" : "text-slate-500",
                  )}
                >
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      agentTalking ? "animate-pulse bg-cyan-bright" : "bg-slate-600",
                    )}
                  />
                  {agentTalking ? "Asistan konuşuyor" : "Dinliyor"}
                </span>
              </>
            )}
          </div>

          {error && (
            <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          {transcript.length > 0 && (
            <div className="mt-4 max-h-48 overflow-y-auto rounded-xl border border-white/10 bg-navy-900/50 p-3">
              {transcript.map((line, i) => (
                <p key={i} className="text-xs text-slate-400">
                  {line}
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
