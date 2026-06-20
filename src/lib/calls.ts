import Retell from "retell-sdk";
import { getSupabase, getCallSettings } from "@/lib/supabase";
import type { QuoteRequest, Supplier, UsageType } from "@/lib/db-types";
import type { TestScenario } from "@/lib/test-scenarios";

let retellClient: Retell | null = null;

function getRetell(): Retell {
  if (retellClient) return retellClient;
  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) throw new Error("RETELL_API_KEY tanımlı değil.");
  retellClient = new Retell({ apiKey });
  return retellClient;
}

const usageLabels: Record<UsageType, string> = {
  "ic-mekan": "İç Mekân LED Ekran",
  "dis-mekan": "Dış Mekân LED Ekran",
  kiralama: "Rental (Kiralık) LED Ekran",
  "emin-degilim": "LED Ekran",
};

function productLabel(usageType: string): string {
  return usageLabels[usageType as UsageType] ?? "LED Ekran";
}

export function buildDynamicVariables(
  params: {
    supplierName: string;
    usageType: string;
    width?: string | null;
    height?: string | null;
    area?: string | null;
    distance?: string | null;
    pixelPitch?: string | null;
    application: string;
    city: string;
    installation?: string | null;
  },
  disclosure: string,
): Record<string, string> {
  return {
    supplier_name: params.supplierName,
    product: productLabel(params.usageType),
    usage_type: params.usageType,
    width: params.width ?? "",
    height: params.height ?? "",
    area: params.area ?? "",
    distance: params.distance ?? "",
    pixel_pitch: params.pixelPitch ?? "bilmiyorum",
    application: params.application,
    city: params.city,
    installation: params.installation ?? "emin değil",
    disclosure,
  };
}

function varsFromQuote(req: QuoteRequest, supplier: Supplier, disclosure: string) {
  return buildDynamicVariables(
    {
      supplierName: supplier.name,
      usageType: req.usage_type,
      width: req.width,
      height: req.height,
      area: req.area,
      distance: req.distance,
      pixelPitch: req.pixel_pitch,
      application: req.application,
      city: req.city,
      installation: req.installation,
    },
    disclosure,
  );
}

export function varsFromScenario(scenario: TestScenario, disclosure: string) {
  return buildDynamicVariables(
    {
      supplierName: scenario.supplierName,
      usageType: scenario.usageType,
      width: scenario.width,
      height: scenario.height,
      area: scenario.area,
      distance: scenario.distance,
      pixelPitch: scenario.pixelPitch,
      application: scenario.application,
      city: scenario.city,
      installation: scenario.installation,
    },
    disclosure,
  );
}

async function disclosureText(): Promise<string> {
  const settings = await getCallSettings();
  return settings.disclosureEnabled
    ? "Görüşme başında kısaca kendini tanıt: ledekranfiyatal.com adına fiyat araştırması yaptığını ve görüşmenin kalite amacıyla kaydedilebileceğini belirt."
    : "";
}

/** Talebe uygun, aktif tedarikçileri öncelik sırasına göre döndürür. */
export async function matchSuppliers(req: QuoteRequest): Promise<Supplier[]> {
  const settings = await getCallSettings();
  const envMax = Number(process.env.MAX_CONCURRENT_CALLS);
  const limit = Number.isFinite(envMax) && envMax > 0 ? envMax : settings.maxConcurrentCalls;

  const { data, error } = await getSupabase()
    .from("suppliers")
    .select("*")
    .eq("active", true)
    .order("priority", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) throw error;
  const suppliers = (data ?? []) as Supplier[];

  const matched = suppliers.filter(
    (s) => s.usage_types.length === 0 || s.usage_types.includes(req.usage_type),
  );

  return matched.slice(0, limit);
}

const DEMO_SUPPLIER_IDS = [
  "00000000-0000-4000-a000-000000000001",
  "00000000-0000-4000-a000-000000000002",
];

/** Mock mod: sahte fiyatlarla call_session oluşturur (Retell/Twilio yok). */
export async function simulateMockCalls(requestId: string): Promise<{ sessions: number }> {
  const supabase = getSupabase();
  const { data: req } = await supabase
    .from("quote_requests")
    .select("*")
    .eq("id", requestId)
    .single();
  if (!req) throw new Error("Talep bulunamadı.");

  const { data: suppliers } = await supabase
    .from("suppliers")
    .select("*")
    .in("id", DEMO_SUPPLIER_IDS);

  const list = (suppliers ?? []) as Supplier[];
  if (list.length === 0) {
    throw new Error(
      "Demo tedarikçiler yok. Supabase'de 0002_demo_suppliers.sql migration'ını çalıştırın.",
    );
  }

  const mockPrices = [
    { price: 18500, lead: 21, warranty: 2, install: true },
    { price: 16200, lead: 14, warranty: 3, install: false },
  ];

  const rows = list.map((s, i) => {
    const m = mockPrices[i % mockPrices.length];
    return {
      request_id: requestId,
      supplier_id: s.id,
      retell_call_id: `mock_${requestId.slice(0, 8)}_${i}`,
      status: "completed" as const,
      price: m.price,
      currency: "TRY",
      price_unit: "m2" as const,
      lead_time_days: m.lead,
      warranty_years: m.warranty,
      includes_installation: m.install,
      is_reachable: true,
      summary: "[MOCK] Simüle edilmiş tedarikçi yanıtı — gerçek arama yapılmadı.",
      raw_analysis: { mode: "mock", simulated: true },
      started_at: new Date().toISOString(),
      ended_at: new Date().toISOString(),
    };
  });

  await supabase.from("call_sessions").delete().eq("request_id", requestId);
  const { error } = await supabase.from("call_sessions").insert(rows);
  if (error) throw error;

  await supabase.from("quote_requests").update({ status: "completed" }).eq("id", requestId);
  return { sessions: rows.length };
}

/** Ücretsiz test: tarayıcı mikrofonu ile Retell web call başlatır. */
export async function startWebTestCall(scenario: TestScenario): Promise<{
  accessToken: string;
  callId: string;
}> {
  const agentId = process.env.RETELL_AGENT_ID;
  if (!agentId) throw new Error("RETELL_AGENT_ID tanımlı değil.");

  const disclosure = await disclosureText();
  const retell = getRetell();
  const call = await retell.call.createWebCall({
    agent_id: agentId,
    metadata: { mode: "web_test", scenario_id: scenario.id },
    retell_llm_dynamic_variables: varsFromScenario(scenario, disclosure),
  });

  return { accessToken: call.access_token, callId: call.call_id };
}

/**
 * Canlı telefon: talep için eşleşen tedarikçileri eş zamanlı arar.
 * Yalnızca CALL_MODE=phone iken formdan otomatik çağrılır.
 */
export async function triggerCallsForRequest(req: QuoteRequest): Promise<{
  triggered: number;
  failed: number;
}> {
  const supabase = getSupabase();
  const disclosure = await disclosureText();
  const suppliers = await matchSuppliers(req);

  if (suppliers.length === 0) {
    return { triggered: 0, failed: 0 };
  }

  const fromNumber = process.env.RETELL_FROM_NUMBER;
  const agentId = process.env.RETELL_AGENT_ID;
  if (!fromNumber || !agentId) {
    throw new Error("RETELL_FROM_NUMBER ve RETELL_AGENT_ID tanımlı olmalı.");
  }

  const { data: sessions, error: insertErr } = await supabase
    .from("call_sessions")
    .insert(
      suppliers.map((s) => ({
        request_id: req.id,
        supplier_id: s.id,
        status: "queued",
      })),
    )
    .select("id, supplier_id");

  if (insertErr) throw insertErr;

  const retell = getRetell();
  const sessionBySupplier = new Map(
    (sessions ?? []).map((row) => [row.supplier_id as string, row.id as string]),
  );

  const results = await Promise.allSettled(
    suppliers.map(async (supplier) => {
      const sessionId = sessionBySupplier.get(supplier.id);
      try {
        const call = await retell.call.createPhoneCall({
          from_number: fromNumber,
          to_number: supplier.phone,
          override_agent_id: agentId,
          metadata: { request_id: req.id, supplier_id: supplier.id, session_id: sessionId },
          retell_llm_dynamic_variables: varsFromQuote(req, supplier, disclosure),
        });

        await supabase
          .from("call_sessions")
          .update({ retell_call_id: call.call_id, status: "ringing" })
          .eq("id", sessionId);
      } catch (err) {
        await supabase
          .from("call_sessions")
          .update({
            status: "failed",
            error: err instanceof Error ? err.message : "Çağrı başlatılamadı",
          })
          .eq("id", sessionId);
        throw err;
      }
    }),
  );

  const triggered = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.length - triggered;

  await supabase.from("quote_requests").update({ status: "calling" }).eq("id", req.id);

  return { triggered, failed };
}
