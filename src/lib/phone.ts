// Telefon numarası E.164 normalizasyonu (Türkiye odaklı).
// Retell/Twilio E.164 (+905xxxxxxxxx) bekler; bu yardımcı yerel girişleri düzeltir.

const E164 = /^\+[1-9]\d{7,14}$/;

/**
 * Girişi E.164'e normalize eder. Türkiye varsayımı: 0 veya 5 ile başlayan
 * 10-11 haneli numaralar +90 ile tamamlanır. Uluslararası +.. girişleri korunur.
 * Geçersizse null döner.
 */
export function normalizePhone(input: string | null | undefined): string | null {
  if (!input) return null;

  let s = input.replace(/[\s()\-.]/g, "").trim();
  if (!s) return null;

  if (s.startsWith("00")) s = `+${s.slice(2)}`;

  if (s.startsWith("+")) {
    return E164.test(s) ? s : null;
  }

  // Yalnızca rakam kaldı.
  if (!/^\d+$/.test(s)) return null;

  // 90xxxxxxxxxx (ülke kodu, + yok)
  if (s.startsWith("90") && s.length === 12) {
    const out = `+${s}`;
    return E164.test(out) ? out : null;
  }

  // 0 5xx xxx xx xx -> +90 5xx...
  if (s.startsWith("0") && s.length === 11) {
    const out = `+90${s.slice(1)}`;
    return E164.test(out) ? out : null;
  }

  // 5xx xxx xx xx (baştaki 0 yok) -> +90 5xx...
  if (s.length === 10 && s.startsWith("5")) {
    const out = `+90${s}`;
    return E164.test(out) ? out : null;
  }

  return null;
}

export function isValidE164(input: string | null | undefined): boolean {
  return typeof input === "string" && E164.test(input);
}
