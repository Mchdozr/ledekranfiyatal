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

Bkz. `.env.example`. Tamamı opsiyoneldir; tanımlanmazsa analytics yüklenmez, form bildirimi sadece sunucu log'una yazılır.

- `NEXT_PUBLIC_SITE_URL` — Canonical/sitemap için site adresi
- `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA_ID` — Google Tag Manager / GA4
- `QUOTE_WEBHOOK_URL` — Form gönderimlerinin iletileceği webhook
- `RESEND_API_KEY` / `QUOTE_NOTIFY_EMAIL` — E-posta entegrasyonu (placeholder)

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
    api/quote/route.ts           # Form API
    sitemap.ts robots.ts manifest.ts not-found.tsx icon.svg
  components/                    # Header, Footer, Hero, kartlar, slider, form vb.
  lib/                           # site, products, usecases, projects, blog, content, seo, schema
public/images/                  # Optimize görseller (next/image)
```

## Fiyat Al Formu

`/fiyat-al` — 4 adımlı wizard (Kullanım → Boyut → Proje → İletişim) + teşekkür ekranı.
Zod ile adım bazlı doğrulama, KVKK onayı zorunlu. Gönderim `POST /api/quote`'a gider;
`dataLayer.push({ event: "quote_submit" })` ile dönüşüm event'i tetiklenir.

> Üretimde `src/app/api/quote/route.ts` içine e-posta (Resend/Nodemailer) ve
> veritabanı (Supabase) entegrasyonu eklenebilir; placeholder hazırdır.

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
