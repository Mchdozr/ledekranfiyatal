import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { type CallSettings, defaultCallSettings } from "@/lib/db-types";

// Sunucu tarafi client. service_role anahtari RLS'i bypass eder; ASLA istemciye sizdirilmez.
let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
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
