import { NextResponse } from "next/server";
import { getCallMode, callModeLabel, canWebTest } from "@/lib/call-mode";

export const runtime = "nodejs";

export async function GET() {
  const mode = getCallMode();
  return NextResponse.json({
    ok: true,
    mode,
    modeLabel: callModeLabel(mode),
    canWebTest: canWebTest(),
    hasSupabase: Boolean(
      process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
    ),
    hasRetell: Boolean(process.env.RETELL_API_KEY && process.env.RETELL_AGENT_ID),
    hasPhone: Boolean(process.env.RETELL_FROM_NUMBER),
  });
}
