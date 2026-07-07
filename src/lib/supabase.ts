import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { type CallSettings, defaultCallSettings } from "@/lib/db-types";

// Sunucu tarafi client. service_role anahtari RLS'i bypass eder; ASLA istemciye sizdirilmez.
let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceKey = getSupabaseServiceKey();

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase yapılandırması eksik: SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY tanımlanmalı.",
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY),
  );
}

/** Vercel teşhisi — key değerini açmadan türünü döner. */
export function describeSupabaseKeyKind(): string {
  const raw =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY ?? "";
  const key = raw.trim();

  if (!key) return "missing";
  if (key.startsWith("sb_secret_")) return "secret (ok)";
  if (key.startsWith("sb_publishable_")) return "publishable (yanlis — secret gerekli)";
  if (key.startsWith("eyJ")) return "legacy-jwt (service_role olmali, anon degil)";
  return "unknown-format";
}

export function getSupabaseServiceKey(): string | undefined {
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  return key?.trim() || undefined;
}

export async function getCallSettings(): Promise<CallSettings> {
  if (!isSupabaseConfigured()) return defaultCallSettings;
  try {
    const { data } = await getSupabase()
      .from("app_settings")
      .select("value")
      .eq("key", "call")
      .single();
    return { ...defaultCallSettings, ...((data?.value as Partial<CallSettings>) ?? {}) };
  } catch {
    return defaultCallSettings;
  }
}
