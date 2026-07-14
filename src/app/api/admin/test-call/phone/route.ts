import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { startPhoneTestCall } from "@/lib/calls";
import { canPhoneTest } from "@/lib/call-mode";
import { getTestScenario, testScenarios } from "@/lib/test-scenarios";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { normalizePhone } from "@/lib/phone";

export const runtime = "nodejs";

// Yetki kontrolü proxy.ts tarafından yapılır (matcher: /api/admin/:path*).
export async function POST(request: Request) {
  if (!canPhoneTest()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "RETELL_API_KEY, RETELL_AGENT_ID ve RETELL_FROM_NUMBER tanımlı olmalı (canlı telefon).",
      },
      { status: 503 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Supabase yapılandırılmadı." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as { toNumber?: string; scenarioId?: string };

    const phone = normalizePhone(body.toNumber);
    if (!phone) {
      return NextResponse.json(
        { ok: false, error: "Geçerli bir telefon numarası girin (ör. 0555 111 22 33)." },
        { status: 400 },
      );
    }

    const scenarioId = body.scenarioId ?? testScenarios[0]?.id;
    const scenario = scenarioId ? getTestScenario(scenarioId) : undefined;
    if (!scenario) {
      return NextResponse.json({ ok: false, error: "Geçersiz senaryo" }, { status: 400 });
    }

    const { testCallId, callId } = await startPhoneTestCall(phone, scenario);
    return NextResponse.json({ ok: true, testCallId, callId, toNumber: phone });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Telefon testi başlatılamadı";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// Test aramasının güncel durumunu döner (polling).
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "id gerekli" }, { status: 400 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Yapılandırılmadı" }, { status: 503 });
  }

  const { data, error } = await getSupabase()
    .from("test_calls")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ ok: false, error: "Test kaydı bulunamadı" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, testCall: data });
}
