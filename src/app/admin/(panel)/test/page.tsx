import Link from "next/link";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { getCallMode, callModeLabel, canWebTest, canPhoneTest } from "@/lib/call-mode";
import type { QuoteRequest } from "@/lib/db-types";
import { VoiceTestClient } from "./VoiceTestClient";
import { PhoneTestClient } from "./PhoneTestClient";
import { MockSimulateButton } from "./MockSimulateButton";
import { Info, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TestPage() {
  const mode = getCallMode();
  const webOk = canWebTest();
  const phoneOk = canPhoneTest();

  let recentRequests: QuoteRequest[] = [];
  if (isSupabaseConfigured()) {
    const { data } = await getSupabase()
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8);
    recentRequests = (data ?? []) as QuoteRequest[];
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Asistan testi</h1>
        <p className="mt-1 text-sm text-muted">Ücretsiz test — telefon hattı gerekmez.</p>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-cyan-bright/25 bg-cyan-bright/5 p-4 text-sm">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-cyan-bright" />
        <div className="text-slate-300">
          <p>
            Aktif mod: <strong className="text-white">{callModeLabel(mode)}</strong>
          </p>
          <p className="mt-1 text-xs text-muted">
            Form gönderildiğinde otomatik arama yalnızca{" "}
            <code className="text-cyan-bright">CALL_MODE=phone</code> iken çalışır. Test aşamasında
            form sadece talebi kaydeder.
          </p>
        </div>
      </div>

      <PhoneTestClient canPhoneTest={phoneOk} />

      <VoiceTestClient canWebTest={webOk} />

      <section className="rounded-2xl border border-white/10 bg-navy-800/50 p-6">
        <h2 className="font-display text-lg font-bold text-white">Mock simülasyon</h2>
        <p className="mt-1 text-sm text-muted">
          Retell bile olmadan admin panelini test et. Sahte fiyatlar oluşturur (
          <code className="text-xs text-cyan-bright">0002_demo_suppliers.sql</code> gerekli).
        </p>

        {!isSupabaseConfigured() ? (
          <p className="mt-4 text-sm text-muted">Supabase yapılandırılmadı.</p>
        ) : recentRequests.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            Önce{" "}
            <Link href="/fiyat-al" className="text-cyan-bright underline">
              fiyat-al
            </Link>{" "}
            formundan bir talep oluştur.
          </p>
        ) : (
          <div className="mt-4 space-y-2">
            {recentRequests.map((r) => (
              <MockSimulateButton
                key={r.id}
                requestId={r.id}
                requestLabel={`${r.full_name} — ${r.application}, ${r.city}`}
              />
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-white/10 bg-navy-800/40 p-5 text-sm text-slate-400">
        <h3 className="font-semibold text-white">Kurulum özeti</h3>
        <ol className="mt-3 list-inside list-decimal space-y-2 text-xs">
          <li>
            Retell hesabı aç → Agent oluştur (tr-TR) →{" "}
            <code className="text-cyan-bright">RETELL_API_KEY</code> +{" "}
            <code className="text-cyan-bright">RETELL_AGENT_ID</code>
          </li>
          <li>Buradan mikrofonla test et (ücretsiz kredi)</li>
          <li>
            Twilio numarası ekle → <code>RETELL_FROM_NUMBER</code> +{" "}
            <code>CALL_MODE=phone</code> → yukarıdan <strong>Beni Ara</strong> ile kendini test et
          </li>
          <li>
            Ayrıntılı ücretsiz kurulum: <code className="text-cyan-bright">docs/CANLI-KURULUM.md</code>
          </li>
        </ol>
        <a
          href="https://docs.retellai.com/deploy/web-call"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-xs text-cyan-bright hover:underline"
        >
          Retell web call dokümantasyonu <ExternalLink className="h-3 w-3" />
        </a>
      </section>
    </div>
  );
}
