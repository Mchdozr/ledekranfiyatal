import { NextResponse } from "next/server";
import { simulateMockCalls } from "@/lib/calls";
import { isSupabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Supabase yapılandırılmadı." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as { requestId?: string };
    if (!body.requestId) {
      return NextResponse.json({ ok: false, error: "requestId gerekli" }, { status: 400 });
    }

    const result = await simulateMockCalls(body.requestId);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Simülasyon başarısız";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
