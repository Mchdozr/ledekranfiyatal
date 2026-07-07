import { NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET() {
  const configured = isSupabaseConfigured();
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "") ?? null;

  if (!configured) {
    return NextResponse.json({
      ok: false,
      supabase: { configured: false, connected: false },
      hint: "SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY Vercel env'e ekleyin.",
    });
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("quote_requests").select("id").limit(1);

    if (error) {
      return NextResponse.json({
        ok: false,
        supabase: {
          configured: true,
          connected: false,
          code: error.code,
          hint: mapError(error),
        },
        urlHost: url ? new URL(url).hostname : null,
      });
    }

    return NextResponse.json({
      ok: true,
      supabase: { configured: true, connected: true },
      urlHost: url ? new URL(url).hostname : null,
      callMode: process.env.CALL_MODE ?? "auto",
    });
  } catch {
    return NextResponse.json({
      ok: false,
      supabase: { configured: true, connected: false },
      hint: "Supabase bağlantısı kurulamadı.",
    });
  }
}

function mapError(error: { code?: string; message?: string }) {
  const msg = error.message ?? "";
  if (
    error.code === "PGRST301" ||
    msg.includes("Invalid API key") ||
    msg.includes("JWT")
  ) {
    return "service_role (secret) key kullanın — anon/publishable değil.";
  }
  if (error.code === "42P01" || msg.includes("does not exist")) {
    return "Migration çalıştırın (quote_requests tablosu yok).";
  }
  return msg || "Bilinmeyen Supabase hatası";
}
