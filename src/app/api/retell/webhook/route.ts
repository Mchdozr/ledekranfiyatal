import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { CallStatus, PriceUnit } from "@/lib/db-types";

export const runtime = "nodejs";

type RetellCall = {
  call_id?: string;
  call_status?: string;
  disconnection_reason?: string;
  transcript?: string;
  recording_url?: string;
  start_timestamp?: number;
  end_timestamp?: number;
  metadata?: { session_id?: string; request_id?: string; supplier_id?: string };
  call_analysis?: {
    call_summary?: string;
    custom_analysis_data?: Record<string, unknown>;
  };
};

type RetellWebhook = { event?: string; call?: RetellCall };

function verifySignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.RETELL_WEBHOOK_SECRET || process.env.RETELL_API_KEY;
  if (!secret) {
    console.warn("[retell-webhook] imza sırrı tanımsız, doğrulama atlanıyor (yalnızca dev).");
    return true;
  }
  if (!signature) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function toNumber(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v.replace(/[^0-9.,]/g, "").replace(",", "."));
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function toBool(v: unknown): boolean | null {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") {
    const s = v.toLowerCase();
    if (["true", "evet", "yes", "1"].includes(s)) return true;
    if (["false", "hayır", "hayir", "no", "0"].includes(s)) return false;
  }
  return null;
}

function normalizeUnit(v: unknown): PriceUnit | null {
  const s = String(v ?? "").toLowerCase();
  if (s.includes("m2") || s.includes("m²") || s.includes("metrekare")) return "m2";
  if (s.includes("adet") || s.includes("panel")) return "adet";
  if (s.includes("toplam") || s.includes("total")) return "toplam";
  if (s) return "bilinmiyor";
  return null;
}

function normalizeCurrency(v: unknown): string | null {
  const s = String(v ?? "").toUpperCase();
  if (s.includes("TRY") || s.includes("TL") || s.includes("₺")) return "TRY";
  if (s.includes("USD") || s.includes("$") || s.includes("DOLAR")) return "USD";
  if (s.includes("EUR") || s.includes("€") || s.includes("EURO")) return "EUR";
  return s ? s.slice(0, 8) : null;
}

function statusFromDisconnect(reason: string | undefined): CallStatus {
  switch (reason) {
    case "dial_no_answer":
      return "no_answer";
    case "voicemail_reached":
      return "voicemail";
    case "dial_busy":
    case "dial_failed":
    case "error_llm_websocket_open":
    case "error_unknown":
      return "failed";
    default:
      return "completed";
  }
}

export async function POST(request: Request) {
  const raw = await request.text();
  const signature = request.headers.get("x-retell-signature");

  if (!verifySignature(raw, signature)) {
    return NextResponse.json({ ok: false, error: "İmza doğrulanamadı" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, persisted: false });
  }

  let payload: RetellWebhook;
  try {
    payload = JSON.parse(raw) as RetellWebhook;
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz JSON" }, { status: 400 });
  }

  const call = payload.call;
  if (!call) return NextResponse.json({ ok: true });

  const supabase = getSupabase();
  const sessionId = call.metadata?.session_id;

  const update: Record<string, unknown> = {};

  switch (payload.event) {
    case "call_started":
      update.status = "in_progress";
      if (call.start_timestamp) update.started_at = new Date(call.start_timestamp).toISOString();
      break;

    case "call_ended": {
      update.status = statusFromDisconnect(call.disconnection_reason);
      if (call.end_timestamp) update.ended_at = new Date(call.end_timestamp).toISOString();
      if (call.transcript) update.transcript = call.transcript;
      if (call.recording_url) update.recording_url = call.recording_url;
      break;
    }

    case "call_analyzed": {
      const cd = call.call_analysis?.custom_analysis_data ?? {};
      update.price = toNumber(cd.price);
      update.price_unit = normalizeUnit(cd.price_unit);
      update.currency = normalizeCurrency(cd.currency) ?? "TRY";
      update.lead_time_days = toNumber(cd.lead_time_days);
      update.warranty_years = toNumber(cd.warranty_years);
      update.includes_installation = toBool(cd.includes_installation);
      update.is_reachable = toBool(cd.is_reachable);
      update.summary = call.call_analysis?.call_summary ?? (cd.summary as string | undefined) ?? null;
      if (call.transcript) update.transcript = call.transcript;
      if (call.recording_url) update.recording_url = call.recording_url;
      update.raw_analysis = cd;
      // no_answer/voicemail değilse tamamlandı.
      update.status = toBool(cd.is_reachable) === false ? "no_answer" : "completed";
      break;
    }

    default:
      return NextResponse.json({ ok: true, ignored: payload.event });
  }

  const query = supabase.from("call_sessions").update(update);
  const { error } = sessionId
    ? await query.eq("id", sessionId)
    : await query.eq("retell_call_id", call.call_id ?? "");

  if (error) {
    console.error("[retell-webhook] güncelleme hatası:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  // İlgili talebin tüm çağrıları bittiyse status=completed yap.
  if (payload.event === "call_analyzed" && call.metadata?.request_id) {
    await maybeCompleteRequest(call.metadata.request_id);
  }

  return NextResponse.json({ ok: true });
}

async function maybeCompleteRequest(requestId: string): Promise<void> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("call_sessions")
    .select("status")
    .eq("request_id", requestId);
  if (!data) return;
  const active = data.some((s) =>
    ["queued", "ringing", "in_progress"].includes(s.status as string),
  );
  if (!active) {
    await supabase.from("quote_requests").update({ status: "completed" }).eq("id", requestId);
  }
}
