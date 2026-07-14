"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
} from "@/lib/admin-auth";
import { getSupabase } from "@/lib/supabase";
import { getCallMode } from "@/lib/call-mode";
import { simulateMockCalls, triggerCallsForRequest } from "@/lib/calls";
import { normalizePhone } from "@/lib/phone";
import type { QuoteRequest } from "@/lib/db-types";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || password !== expected) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(next)}`);
  }

  const c = await cookies();
  c.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  const c = await cookies();
  c.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

function parseList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createSupplier(formData: FormData) {
  const supabase = getSupabase();
  const rawPhone = String(formData.get("phone") ?? "").trim();
  await supabase.from("suppliers").insert({
    name: String(formData.get("name") ?? "").trim(),
    phone: normalizePhone(rawPhone) ?? rawPhone,
    city: String(formData.get("city") ?? "").trim() || null,
    usage_types: parseList(formData.get("usage_types")),
    product_types: parseList(formData.get("product_types")),
    priority: Number(formData.get("priority") ?? 0) || 0,
    active: formData.get("active") === "on",
    notes: String(formData.get("notes") ?? "").trim() || null,
  });
  revalidatePath("/admin/suppliers");
}

export async function updateSupplier(formData: FormData) {
  const supabase = getSupabase();
  const id = String(formData.get("id"));
  const rawPhone = String(formData.get("phone") ?? "").trim();
  await supabase
    .from("suppliers")
    .update({
      name: String(formData.get("name") ?? "").trim(),
      phone: normalizePhone(rawPhone) ?? rawPhone,
      city: String(formData.get("city") ?? "").trim() || null,
      usage_types: parseList(formData.get("usage_types")),
      product_types: parseList(formData.get("product_types")),
      priority: Number(formData.get("priority") ?? 0) || 0,
      active: formData.get("active") === "on",
      notes: String(formData.get("notes") ?? "").trim() || null,
    })
    .eq("id", id);
  revalidatePath("/admin/suppliers");
}

export async function deleteSupplier(formData: FormData) {
  const supabase = getSupabase();
  await supabase.from("suppliers").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/suppliers");
}

export async function updateSettings(formData: FormData) {
  const supabase = getSupabase();
  await supabase.from("app_settings").upsert({
    key: "call",
    value: {
      recordingEnabled: formData.get("recordingEnabled") === "on",
      disclosureEnabled: formData.get("disclosureEnabled") === "on",
      maxConcurrentCalls: Number(formData.get("maxConcurrentCalls") ?? 5) || 5,
    },
    updated_at: new Date().toISOString(),
  });
  revalidatePath("/admin/settings");
}

export async function retryCalls(formData: FormData) {
  const requestId = String(formData.get("requestId"));
  const mode = getCallMode();

  if (mode === "mock" || mode === "web") {
    await simulateMockCalls(requestId);
  } else if (mode === "phone") {
    const supabase = getSupabase();
    const { data } = await supabase
      .from("quote_requests")
      .select("*")
      .eq("id", requestId)
      .single();
    if (data) {
      await triggerCallsForRequest(data as QuoteRequest);
    }
  }
  // web modunda gerçek telefon araması yok; /admin/test üzerinden mikrofon testi yapılır.

  revalidatePath(`/admin/requests/${requestId}`);
}

export async function archiveRequest(formData: FormData) {
  const requestId = String(formData.get("requestId"));
  const supabase = getSupabase();
  await supabase.from("quote_requests").update({ status: "archived" }).eq("id", requestId);
  revalidatePath("/admin");
  revalidatePath(`/admin/requests/${requestId}`);
}
