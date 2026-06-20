import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { getCallMode } from "@/lib/call-mode";
import type { CallSession, QuoteRequest } from "@/lib/db-types";
import { retryCalls, archiveRequest } from "@/app/admin/actions";
import { LiveCalls } from "./LiveCalls";
import { ArrowLeft, RefreshCw, Archive, Mail, Phone, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

type SessionWithSupplier = CallSession & {
  supplier: { name: string; city: string | null; phone: string } | null;
};

export default async function RequestDetail(props: PageProps<"/admin/requests/[id]">) {
  if (!isSupabaseConfigured()) notFound();
  const { id } = await props.params;
  const supabase = getSupabase();

  const { data: request } = await supabase
    .from("quote_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (!request) notFound();
  const req = request as QuoteRequest;
  const callMode = getCallMode();
  const retryLabel = callMode === "phone" ? "Yeniden ara" : "Simüle et";

  const { data: sessions } = await supabase
    .from("call_sessions")
    .select("*, supplier:suppliers(name, city, phone)")
    .eq("request_id", id)
    .order("created_at", { ascending: true });

  const dims = [
    req.width && `G:${req.width}m`,
    req.height && `Y:${req.height}m`,
    req.area && `${req.area}m²`,
    req.distance && `${req.distance}m mesafe`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div>
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Tüm talepler
      </Link>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* Talep özeti */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-navy-800/50 p-5">
            <h1 className="font-display text-xl font-bold text-white">{req.full_name}</h1>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              <a href={`tel:${req.phone}`} className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-cyan-bright" /> {req.phone}
              </a>
              <a href={`mailto:${req.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-cyan-bright" /> {req.email}
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan-bright" /> {req.city}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-navy-800/50 p-5 text-sm">
            <h2 className="mb-3 font-semibold text-white">Proje</h2>
            <dl className="space-y-2 text-slate-300">
              <Row label="Kullanım" value={req.usage_type} />
              <Row label="Alan" value={req.application} />
              <Row label="Ölçü" value={dims || "—"} />
              <Row label="Pixel pitch" value={req.pixel_pitch || "—"} />
              <Row label="Montaj" value={req.installation || "—"} />
              {req.notes && <Row label="Not" value={req.notes} />}
            </dl>
          </div>

          <div className="flex gap-2">
            <form action={retryCalls} className="flex-1">
              <input type="hidden" name="requestId" value={req.id} />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white hover:border-cyan-bright/50"
              >
                <RefreshCw className="h-4 w-4 text-cyan-bright" /> {retryLabel}
              </button>
            </form>
            <form action={archiveRequest}>
              <input type="hidden" name="requestId" value={req.id} />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm text-slate-300 hover:border-red-400/50 hover:text-red-300"
              >
                <Archive className="h-4 w-4" /> Arşivle
              </button>
            </form>
          </div>
        </aside>

        {/* Canlı çağrılar */}
        <section>
          <LiveCalls
            requestId={req.id}
            initialSessions={(sessions ?? []) as SessionWithSupplier[]}
          />
        </section>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right text-slate-200">{value}</dd>
    </div>
  );
}
