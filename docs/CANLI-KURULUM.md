# Canlı Arama Kurulumu (ücretsiz test) + "Beni Ara"

Bu rehber, AI'nın gerçek telefon araması yapmasını sağlar ve **önce kendi numaranı arayarak** ücretsiz test etmeni anlatır. Retell agent detayları için `docs/retell-agent.md`.

> Not: Retell + Twilio üretimde ücretlidir. Aşağıdaki adımlar **ücretsiz deneme kredileriyle** (Retell trial + Twilio trial) kendi numaranı test etmek içindir. Sürekli tedarikçi araması ileride ücretli plan gerektirir.

## Gereken anahtarlar (Secrets)

Cloud Agent panelinde sağdaki **Secrets** bölümüne ekle (prod'da Vercel env):

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- `RETELL_API_KEY`, `RETELL_AGENT_ID`, `RETELL_FROM_NUMBER`
- `RETELL_WEBHOOK_SECRET` (Retell agent'ta belirlediğin imza sırrı)
- `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`
- `CALL_MODE=phone`
- `NEXT_PUBLIC_SITE_URL=https://<vercel-domain>`

## Adım adım

### 1. Supabase (ücretsiz)
1. supabase.com → yeni proje.
2. SQL Editor → `supabase/migrations/0001_init.sql`, `0002_demo_suppliers.sql`, `0003_test_calls.sql` sırayla çalıştır.
3. Settings → API → `Project URL` = `SUPABASE_URL`, `service_role` secret key = `SUPABASE_SERVICE_ROLE_KEY`.

### 2. Retell (ücretsiz deneme)
1. retellai.com → hesap (≈$10 kredi).
2. Agent oluştur (tr-TR) — prompt + Post-Call Analysis alanları `docs/retell-agent.md`'deki gibi.
3. Webhook URL: `https://<vercel-domain>/api/retell/webhook`, imza sırrını `RETELL_WEBHOOK_SECRET`'e yaz.
4. `RETELL_API_KEY`, `RETELL_AGENT_ID` al.

### 3. Twilio (ücretsiz deneme) → telefon hattı
1. twilio.com → trial hesap.
2. **Verified Caller IDs** → kendi numaranı doğrula (trial'da sadece doğrulanmış numaralar aranabilir — self-test için ideal).
3. Bir numara al (trial numara) ve Retell'e bağla (Retell → Phone Numbers → import from Twilio / BYO SIP).
4. Bu numarayı `RETELL_FROM_NUMBER`'a (E.164) yaz.

> TR (+90) numaralara arama caller-ID regülasyonuna tabidir (`docs/retell-agent.md` §1). Test için kendi doğrulanmış numaran yeterli.

### 4. Vercel deploy (ücretsiz) → public webhook
1. Repoyu Vercel'e bağla, yukarıdaki env'leri gir, deploy et.
2. `NEXT_PUBLIC_SITE_URL` ve Retell webhook URL'ini deploy edilen domain'e göre ayarla.

## "Beni Ara" testi
1. Deploy sonrası `https://<domain>/admin/login` → `ADMIN_PASSWORD` ile gir.
2. **Asistan testi** → **Beni Ara** kartı.
3. Numaranı gir (0555… veya +90…) → senaryo seç → **Beni ara**.
4. Telefonun çalar; sen tedarikçi rolünde cevap ver, asistan fiyat sorar.
5. Görüşme bitince durum + fiyat + transkript + (kayıt açıksa) ses kaydı kartta görünür.

Sonuçlar `test_calls` tablosuna yazılır; müşteri talep verisine karışmaz.

## Canlıya geçiş (tedarikçi araması)
- `/admin/tedarikçiler`'e **gerçek** tedarikçileri ekle; `[TEST]` demo satırlarını pasifleştir (canlı akış bunları zaten aramaz).
- `CALL_MODE=phone` iken formdan gelen her talep, eşleşen tedarikçileri otomatik arar.
