import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";

// Yetki kontrolü proxy.ts tarafından yapılır (matcher: /api/admin/:path*).
export async function GET(_req: NextRequest, ctx: RouteContext<"/api/admin/requests/[id]">) {
  const { id } = await ctx.params;
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Yapılandırılmadı" }, { status: 503 });
  }

  const supabase = getSupabase();
  const [{ data: req }, { data: sessions }] = await Promise.all([
    supabase.from("quote_requests").select("status").eq("id", id).single(),
    supabase
      .from("call_sessions")
      .select("*, supplier:suppliers(name, city, phone)")
      .eq("request_id", id)
      .order("created_at", { ascending: true }),
  ]);

  return NextResponse.json({
    ok: true,
    requestStatus: req?.status ?? null,
    sessions: sessions ?? [],
  });
}
