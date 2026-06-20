# ledekranfiyatal.com — Yol Haritası

## Tamamlanan (MVP altyapı)

- [x] Multi-step teklif formu + Supabase kaydı
- [x] Tedarikçi CRUD (`/admin/suppliers`)
- [x] Admin paneli (talepler, fiyat karşılaştırma, canlı polling)
- [x] Retell entegrasyonu iskeleti (telefon + webhook)
- [x] 3 test modu: `mock` | `web` | `phone`
- [x] Ücretsiz test: `/admin/test` (mikrofon + mock simülasyon)
- [x] Supabase migration'ları (`0001_init`, `0002_demo_suppliers`)

---

## Şu an — Senin yapman gerekenler (test aşaması)


| #   | Görev                                                         | Durum    |
| --- | ------------------------------------------------------------- | -------- |
| 1   | `.env.local` doldur (Supabase URL + secret key + admin şifre) | yapıldı  |
| 2   | `CALL_MODE=mock` ile form + admin testi                       | Devam    |
| 3   | `/admin/test` → Simüle et → fiyatları gör                     | Bekliyor |


---

## Faz 2 — Sesli asistan testi (ücretsiz / düşük maliyet)


| #   | Görev                                             | Not                             |
| --- | ------------------------------------------------- | ------------------------------- |
| 1   | Retell hesabı aç ($10 kredi)                      | retellai.com                    |
| 2   | Türkçe agent oluştur (`docs/retell-agent.md`)     | tr-TR, prompt + extraction      |
| 3   | `.env.local`: `RETELL_API_KEY`, `RETELL_AGENT_ID` |                                 |
| 4   | `CALL_MODE=web`                                   | Telefon hattı gerekmez          |
| 5   | `/admin/test` → mikrofonla konuş                  | Sen tedarikçi rolünde cevap ver |
| 6   | Prompt/ses ayarını iyileştir                      | İnsanî Türkçe, kısa cümleler    |


---

## Faz 3 — Canlı telefon aramaları


| #   | Görev                                                         | Not                                         |
| --- | ------------------------------------------------------------- | ------------------------------------------- |
| 1   | Twilio hesabı + numara                                        | TR regülasyonu: Türk caller ID kullanılamaz |
| 2   | Numarayı Retell'e bağla                                       | `RETELL_FROM_NUMBER`                        |
| 3   | Webhook URL: `https://ledekranfiyatal.com/api/retell/webhook` | Deploy sonrası                              |
| 4   | `CALL_MODE=phone`                                             | Formdan otomatik paralel arama              |
| 5   | Gerçek tedarikçileri `/admin/suppliers`'a ekle                | Demo `[TEST]` firmaları devre dışı          |


---

## Faz 4 — Üretim & operasyon


| #   | Görev                                                      |
| --- | ---------------------------------------------------------- |
| 1   | Vercel deploy + env değişkenleri                           |
| 2   | Domain bağlama (ledekranfiyatal.com)                       |
| 3   | KVKK metinlerini hukuk onayı                               |
| 4   | Müşteriye manuel dönüş süreci (admin panel → WhatsApp/tel) |
| 5   | İsteğe bağlı: e-posta bildirimi (Resend)                   |


---

## Ortam modları özeti

```
CALL_MODE=mock   → Sadece sahte fiyat (Retell yok)
CALL_MODE=web    → Tarayıcı mikrofon testi (Retell kredi)
CALL_MODE=phone  → Gerçek tedarikçi araması (Twilio + Retell)
```

Bkz. `.env.example`, `docs/retell-agent.md`