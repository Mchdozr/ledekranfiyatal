import { NextResponse } from "next/server";
import { startWebTestCall } from "@/lib/calls";
import { canWebTest } from "@/lib/call-mode";
import { getTestScenario, testScenarios } from "@/lib/test-scenarios";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!canWebTest()) {
    return NextResponse.json(
      {
        ok: false,
        error: "RETELL_API_KEY ve RETELL_AGENT_ID .env.local dosyasında tanımlı olmalı.",
      },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as { scenarioId?: string };
    const scenarioId = body.scenarioId ?? testScenarios[0]?.id;
    const scenario = scenarioId ? getTestScenario(scenarioId) : undefined;

    if (!scenario) {
      return NextResponse.json({ ok: false, error: "Geçersiz senaryo" }, { status: 400 });
    }

    const { accessToken, callId } = await startWebTestCall(scenario);
    return NextResponse.json({ ok: true, accessToken, callId, scenario: scenario.label });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Web çağrı başlatılamadı";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
