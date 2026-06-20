# ledekranfiyatal.com

Türkiye odaklı, LED ekran satın almak isteyenler için **fiyat karşılaştırma ve teklif toplama platformu**. Kullanıcı ihtiyacını tek formda bildirir; platform birden fazla tedarikçiden teklif toplar, karşılaştırır ve en uygun fiyatlı çözümü sunar.

Marka: **mLed** · Domain: **ledekranfiyatal.com**

## Teknoloji

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` design tokens)
- **Framer Motion** (scroll reveal, sayaçlar, geçişler, `prefers-reduced-motion` desteği)
- **React Hook Form + Zod** (multi-step fiyat formu doğrulama)
- **lucide-react** ikonlar
- SEO: `next/metadata`, dinamik `sitemap.ts`, `robots.ts`, JSON-LD (Organization, WebSite+SearchAction, Service, FAQPage, BreadcrumbList, Article)
- Vercel uyumlu yapı

## Kurulum

```bash
npm install
cp .env.example .env.local   # değerleri doldurun (opsiyonel)
npm run dev                  # http://localhost:3000
```

## Komutlar

| Komut | Açıklama |
|------|----------|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Production build |
| `npm run start` | Production sunucusu |
| `npm run lint` | ESLint |

## Ortam Değişkenleri

Bkz. `.env.example` ve `docs/ROADMAP.md`.

**Zorunlu (admin + veritabanı):** `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`

**Çağrı modu:** `CALL_MODE=mock` | `web` | `phone` — bkz. `docs/ROADMAP.md`

**Retell (web/phone):** `RETELL_API_KEY`, `RETELL_AGENT_ID`, `RETELL_FROM_NUMBER` (phone)

**Opsiyonel:** analytics, webhook, e-posta — `.env.example`

## Proje Yapısı

```
src/
  app/
    page.tsx                     # Ana sayfa
    fiyat-al/                    # Multi-step teklif formu
    nasil-calisir/
    urunler/ + [slug]/           # Ürün hub + 6 kategori
    kullanim-alanlari/ + [slug]/ # Sektör hub + dinamik
    fiyat-rehberi/ pixel-pitch-rehberi/
    blog/ + [slug]/              # Blog + 5 makale
    projeler/ hakkimizda/ sss/ iletisim/
    gizlilik-politikasi/ kvkk-aydinlatma-metni/
    cerez-politikasi/ kullanim-kosullari/
    api/quote/route.ts           # Form API → Supabase
    api/retell/webhook/          # Retell callback
    admin/                       # Admin paneli + test
  lib/                           # site, calls, supabase, call-mode
docs/ROADMAP.md                  # Sonraki adımlar planı
docs/retell-agent.md             # Retell agent kurulumu
supabase/migrations/             # DB şema
```

## Fiyat Al Formu

`/fiyat-al` — 4 adımlı wizard (Kullanım → Boyut → Proje → İletişim) + teşekkür ekranı.
Zod ile adım bazlı doğrulama, KVKK onayı zorunlu. Gönderim `POST /api/quote` → Supabase.
`CALL_MODE=phone` iken eşleşen tedarikçilere otomatik Retell araması başlar; `mock`/`web` için `/admin/test` kullanın.

> Yol haritası: `docs/ROADMAP.md`

## SEO

- Her sayfada unique title/description, canonical, OG/Twitter
- JSON-LD şemaları otomatik enjekte edilir
- `sitemap.xml` ve `robots.txt` dinamik üretilir
- `tr-TR` dil, mobile-first responsive, font `display: swap`, `next/image` (AVIF/WebP)

## Deploy (Vercel)

1. Repoyu Vercel'e bağlayın
2. Environment Variables: `NEXT_PUBLIC_SITE_URL` ve (opsiyonel) analytics/webhook
3. Otomatik build & deploy

## Notlar

- "Fiyat garantisi değil, en uygun teklif karşılaştırması" ilkesi tüm yasal metinlere yansıtılmıştır.
- Tüm metinler Türkçe ve LED ekran sektörüne uygun gerçek içeriktir.
