# Retell AI Agent Kurulumu

Bu döküman, tedarikçileri arayıp LED ekran fiyatı toplayan Türkçe sesli asistanın Retell tarafındaki yapılandırmasıdır. Canlı çağrı Retell altyapısında çalışır; bizim backend yalnızca çağrıyı tetikler ve webhook ile sonucu alır.

## 1. Telefon hattı (kritik)

Türkiye'ye (+90) giden çağrılarda Türk caller ID veya anonim numara **kullanılamaz** (regülasyon). Twilio Transit CallerID de 31 May 2026'da kapandı.

- Twilio'da bir numara satın al (TR veya yurtdışı), Retell'e bağla (BYO SIP trunk veya Retell native Twilio import).
- Bu numara `RETELL_FROM_NUMBER` (E.164) olarak `.env.local`'e yazılır.

## 2. Agent oluşturma

Retell Dashboard > Agents > Create:

- Language: `tr-TR` (Türkçe)
- Voice: doğal bir Türkçe ses (ElevenLabs Türkçe önerilir)
- Response Engine: Retell LLM (GPT-4o veya benzeri)
- Webhook URL: `https://<DOMAIN>/api/retell/webhook`
- Agent ID'yi `RETELL_AGENT_ID`'e yaz.

## 3. Dinamik değişkenler

Backend her çağrıda `retell_llm_dynamic_variables` içinde şunları gönderir (prompt içinde `{{degisken}}` ile kullan):

- `supplier_name` - aranan firma adı
- `product` - ürün tipi (ör. Dış Mekân LED Ekran)
- `usage_type` - kullanım (iç/dış/kiralama)
- `width`, `height`, `area`, `distance` - ölçüler (boş olabilir)
- `pixel_pitch` - tercih (ör. P4 / bilmiyorum)
- `application` - kullanım alanı (ör. Bina Cephesi)
- `city` - şehir
- `installation` - montaj isteği
- `disclosure` - çağrı başı bilgilendirme metni (KVKK ayarına göre dolu/boş)

> Müşterinin adı/telefonu/e-postası tedarikçiye **gönderilmez**.

## 4. Prompt (sistem)

```
Sen "ledekranfiyatal.com" adına çalışan bir satın alma uzmanısın. Görevin LED ekran tedarikçilerinden net fiyat teklifi almak. Doğal, kibar ve profesyonel konuş; kısa ve net ol.

{{disclosure}}

Bir LED ekran projesi için fiyat araştırıyorsun. Detaylar:
- Firma: {{supplier_name}}
- Ürün: {{product}} ({{usage_type}})
- Ölçü: {{width}}m x {{height}}m, alan {{area}} m², izleme mesafesi {{distance}} m
- Pixel pitch tercihi: {{pixel_pitch}}
- Kullanım alanı: {{application}}, şehir: {{city}}
- Montaj: {{installation}}

Hedeflerin (sırayla öğren):
1. Bu özelliklerde m² (veya toplam) fiyatı nedir? Hangi para biriminde?
2. Teslim süresi kaç gün?
3. Garanti süresi kaç yıl?
4. Fiyata montaj dahil mi?

Fiyat alamazsan e-posta ile teklif gönderebilmeleri için projeyi kısaca özetle ve görüşmeyi nazikçe bitir. Karşı taraf meşgulse veya ilgilenmiyorsa ısrar etme.
```

## 5. Post-Call Analysis (structured extraction)

Agent > Post-Call Analysis > Custom Analysis Data. Aşağıdaki alanları **birebir bu isimlerle** tanımla (webhook bunları okur):

| Field name | Type | Açıklama |
| --- | --- | --- |
| `price` | Number | Verilen birim/toplam fiyat. Net rakam yoksa boş. |
| `price_unit` | Enum: `m2`,`adet`,`toplam`,`bilinmiyor` | Fiyatın birimi |
| `currency` | Enum: `TRY`,`USD`,`EUR` | Para birimi |
| `lead_time_days` | Number | Teslim süresi (gün) |
| `warranty_years` | Number | Garanti (yıl) |
| `includes_installation` | Boolean | Montaj dahil mi |
| `is_reachable` | Boolean | Yetkiliye ulaşılıp fiyat konuşuldu mu |
| `summary` | String | Görüşmenin kısa özeti |

## 6. Webhook olayları

Retell şu olayları gönderir: `call_started`, `call_ended`, `call_analyzed`. Fiyat verisi `call_analyzed` olayında `call.call_analysis.custom_analysis_data` içinde gelir. İmza `x-retell-signature` header'ı ile doğrulanır (`RETELL_API_KEY`).

## 7. Ücretsiz test (telefon yok)

Projede 3 mod vardır (`CALL_MODE` env):

| Mod | Ne yapar | Maliyet |
| --- | --- | --- |
| `mock` | Admin'den sahte fiyat simülasyonu | $0 |
| `web` | Tarayıcı mikrofonu + Retell web call | Retell $10 kredi |
| `phone` | Gerçek tedarikçi araması | Retell + Twilio |

**Test adımları:**

1. `.env.local`: `CALL_MODE=web`, `RETELL_API_KEY`, `RETELL_AGENT_ID` (telefon numarası **gerekmez**)
2. Supabase migration'ları çalıştır
3. `/admin/test` → senaryo seç → **Konuşmayı başlat** (sen tedarikçi rolünde cevap ver)
4. Mock için: formdan talep oluştur → **Simüle et** (Retell bile gerekmez)

Canlıya geçiş: Twilio numarası ekle → `CALL_MODE=phone`
