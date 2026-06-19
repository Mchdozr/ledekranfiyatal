import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/quote-schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Geçersiz form verisi" },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // TODO: Üretimde burada e-posta gönderimi (Resend/Nodemailer) ve
    // veritabanı kaydı (Supabase) yapılır. ENV: QUOTE_NOTIFY_EMAIL,
    // RESEND_API_KEY veya SUPABASE_URL/SUPABASE_ANON_KEY.
    const payload = {
      ...data,
      receivedAt: new Date().toISOString(),
    };

    if (process.env.NODE_ENV !== "production") {
      console.log("[quote] yeni talep:", payload);
    }

    // E-posta servisi yapılandırılmışsa gönder (placeholder).
    const webhook = process.env.QUOTE_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Sunucu hatası" },
      { status: 500 },
    );
  }
}
