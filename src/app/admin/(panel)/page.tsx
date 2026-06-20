import Link from "next/link";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { CallSession, QuoteRequest } from "@/lib/db-types";
import { ChevronRight, Phone, TrendingDown } from "lucide-react";

export const dynamic = "force-dynamic";

function fmtPrice(p: number | null, currency: string | null): string {
  if (p == null) return "—";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency || "TRY",
    maximumFractionDigits: 0,
  }).format(p);
}

const statusBadge: Record<string, string> = {
  new: "bg-slate-500/15 text-slate-300",
  calling: "bg-amber-warm/15 text-amber-warm",
  completed: "bg-success/15 text-success",
  archived: "bg-white/5 text-slate-500",
};

export default async function AdminDashboard() {
  if (!isSupabaseConfigured()) {
    return <SetupNotice />;
  }

  const supabase = getSupabase();
  const { data: requests } = await supabase
    .from("quote_requests")
    .select("*")
    .neq("status", "archived")
    .order("created_at", { ascending: false })
    .limit(100);

  const reqs = (requests ?? []) as QuoteRequest[];
  const ids = reqs.map((r) => r.id);

  const { data: sessions } = ids.length
    ? await supabase.from("call_sessions").select("*").in("request_id", ids)
    : { data: [] };

  const byRequest = new Map<string, CallSession[]>();
  for (const s of (sessions ?? []) as CallSession[]) {
    const arr = byRequest.get(s.request_id) ?? [];
    arr.push(s);
    byRequest.set(s.request_id, arr);
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">Teklif Talepleri</h1>
      <p className="mt-1 text-sm text-muted">
        Müşteri talepleri ve tedarikçilerden toplanan fiyatlar.
      </p>

      {reqs.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-white/10 bg-navy-800/40 p-8 text-center text-muted">
          Henüz talep yok.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {reqs.map((r) => {
            const calls = byRequest.get(r.id) ?? [];
            const prices = calls
              .filter((c) => c.price != null)
              .map((c) => c.price as number);
            const best = prices.length ? Math.min(...prices) : null;
            const bestCall = calls.find((c) => c.price === best);
            const done = calls.filter((c) => c.status === "completed").length;

            return (
              <Link
                key={r.id}
                href={`/admin/requests/${r.id}`}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-navy-800/50 p-4 transition-colors hover:border-cyan-bright/40"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{r.full_name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${statusBadge[r.status]}`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-muted">
                    {r.application} · {r.city} · {r.usage_type}
                  </p>
                </div>

                <div className="hidden items-center gap-1 text-sm text-slate-300 sm:flex">
                  <Phone className="h-4 w-4 text-cyan-bright" />
                  {done}/{calls.length}
                </div>

                <div className="text-right">
                  {best != null ? (
                    <span className="inline-flex items-center gap-1 font-display text-lg font-bold text-success">
                      <TrendingDown className="h-4 w-4" />
                      {fmtPrice(best, bestCall?.currency ?? "TRY")}
                    </span>
                  ) : (
                    <span className="text-sm text-muted">fiyat bekleniyor</span>
                  )}
                </div>

                <ChevronRight className="h-5 w-5 shrink-0 text-slate-500" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SetupNotice() {
  return (
    <div className="rounded-2xl border border-amber-warm/30 bg-amber-warm/5 p-8">
      <h1 className="font-display text-xl font-bold text-white">Kurulum gerekli</h1>
      <p className="mt-2 text-sm text-muted">
        Supabase yapılandırması bulunamadı. <code className="text-cyan-bright">.env.local</code>{" "}
        dosyasına <code className="text-cyan-bright">SUPABASE_URL</code> ve{" "}
        <code className="text-cyan-bright">SUPABASE_SERVICE_ROLE_KEY</code> ekleyip{" "}
        <code className="text-cyan-bright">supabase/migrations/0001_init.sql</code> dosyasını
        çalıştırın.
      </p>
    </div>
  );
}
