export type CallMode = "mock" | "web" | "phone";

const modeLabels: Record<CallMode, string> = {
  mock: "Simülasyon (ücretsiz, Retell yok)",
  web: "Web test (Retell $10 kredi, telefon yok)",
  phone: "Canlı telefon (Twilio + Retell)",
};

export function callModeLabel(mode: CallMode): string {
  return modeLabels[mode];
}

/** Ortamdan çağrı modunu çözümler. Varsayılan: telefon hattı yoksa web/test. */
export function getCallMode(): CallMode {
  const raw = process.env.CALL_MODE?.toLowerCase();
  if (raw === "mock" || raw === "web" || raw === "phone") return raw;

  const hasRetell = Boolean(process.env.RETELL_API_KEY && process.env.RETELL_AGENT_ID);
  const hasPhone = Boolean(process.env.RETELL_FROM_NUMBER);

  if (hasRetell && hasPhone) return "phone";
  if (hasRetell) return "web";
  return "mock";
}

export function shouldAutoCallOnQuote(): boolean {
  return getCallMode() === "phone";
}

export function canWebTest(): boolean {
  return Boolean(process.env.RETELL_API_KEY && process.env.RETELL_AGENT_ID);
}
