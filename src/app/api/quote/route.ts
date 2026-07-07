import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/quote-schema";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { triggerCallsForRequest } from "@/lib/calls";
import { shouldAutoCallOnQuote } from "@/lib/call-mode";
import type { QuoteRequest } from "@/lib/db-types";

export const runtime = "nodejs";

function mapSupabaseInsertError(error: { code?: string; message?: string } | null) {
  const code = error?.code ?? "";
  const msg = error?.message ?? "";

  if (
    code === "PGRST301" ||
    msg.includes("Invalid API key") ||
    msg.includes("JWT")
  ) {
    return "Supabase API anahtarı geçersiz. Vercel'de service_role (secret) key kullanın.";
  }
  if (code === "42P01" || msg.includes("does not exist")) {
    return "Veritabanı tabloları bulunamadı. Supabase SQL migration çalıştırın.";
  }
  return "Talep kaydedilemedi";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Geçersiz form verisi" },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // Harici webhook (opsiyonel/geriye dönük).
    const webhook = process.env.QUOTE_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, receivedAt: new Date().toISOString() }),
      }).catch(() => null);
    }

    if (!isSupabaseConfigured()) {
      if (process.env.NODE_ENV !== "production") {
        console.log("[quote] Supabase yapılandırılmadı, talep kaydedilmedi:", data);
      }
      return NextResponse.json({ ok: true, persisted: false });
    }

    const supabase = getSupabase();
    const { data: inserted, error } = await supabase
      .from("quote_requests")
      .insert({
        usage_type: data.usageType,
        width: data.width ?? null,
        height: data.height ?? null,
        area: data.area ?? null,
        distance: data.distance ?? null,
        pixel_pitch: data.pixelPitch ?? null,
        application: data.application,
        city: data.city,
        installation: data.installation ?? null,
        notes: data.notes ?? null,
        full_name: data.fullName,
        phone: data.phone,
        email: data.email,
        kvkk: data.kvkk,
        marketing: data.marketing ?? false,
        status: "new",
      })
      .select("*")
      .single();

    if (error || !inserted) {
      console.error("[quote] kayıt hatası:", error);
      const message = mapSupabaseInsertError(error);
      return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }

    // Yalnızca CALL_MODE=phone iken otomatik telefon araması (test modunda arama yapılmaz).
    if (shouldAutoCallOnQuote()) {
      try {
        await triggerCallsForRequest(inserted as QuoteRequest);
      } catch (err) {
        console.error("[quote] çağrı tetikleme hatası:", err);
      }
    }

    return NextResponse.json({
      ok: true,
      persisted: true,
      requestId: inserted.id,
      autoCall: shouldAutoCallOnQuote(),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Sunucu hatası" }, { status: 500 });
  }
}
