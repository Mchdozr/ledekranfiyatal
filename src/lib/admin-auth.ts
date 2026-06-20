import crypto from "node:crypto";

export const ADMIN_COOKIE = "lef_admin";
const PREFIX = "admin";
// 7 gün
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "dev-only-secret";
}

export function createSessionToken(): string {
  const payload = `${PREFIX}.${Date.now()}`;
  const sig = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const idx = token.lastIndexOf(".");
  if (idx < 0) return false;
  const payload = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  if (!payload.startsWith(`${PREFIX}.`)) return false;
  const expected = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
