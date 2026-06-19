import { z } from "zod";

export const quoteSchema = z.object({
  usageType: z.enum(["ic-mekan", "dis-mekan", "kiralama", "emin-degilim"], {
    message: "Lütfen kullanım tipini seçin",
  }),
  width: z.string().optional(),
  height: z.string().optional(),
  area: z.string().optional(),
  distance: z.string().optional(),
  pixelPitch: z.string().optional(),
  application: z.string().min(1, "Lütfen kullanım alanını seçin"),
  city: z.string().min(2, "Lütfen şehir girin"),
  installation: z.enum(["evet", "hayir", "emin-degilim"]).optional(),
  notes: z.string().max(1000).optional(),
  fullName: z.string().min(2, "Ad soyad zorunludur"),
  phone: z
    .string()
    .min(10, "Geçerli bir telefon numarası girin")
    .regex(/^[0-9+()\s-]+$/, "Geçerli bir telefon numarası girin"),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  kvkk: z.literal(true, { message: "Devam etmek için KVKK onayı gereklidir" }),
  marketing: z.boolean().optional(),
});

export type QuoteForm = z.infer<typeof quoteSchema>;

export const usageOptions = [
  { value: "ic-mekan", label: "İç Mekân", desc: "Mağaza, AVM, ofis, toplantı odası" },
  { value: "dis-mekan", label: "Dış Mekân", desc: "Cephe, billboard, meydan, stadyum" },
  { value: "kiralama", label: "Kiralama / Rental", desc: "Konser, fuar, etkinlik, sahne" },
  { value: "emin-degilim", label: "Emin Değilim", desc: "Doğru çözümü birlikte belirleyelim" },
];

export const pitchOptions = [
  { value: "bilmiyorum", label: "Bilmiyorum (öneri istiyorum)" },
  { value: "P1.5", label: "P1.5 - Fine pitch" },
  { value: "P2.5", label: "P2.5 - İç mekân" },
  { value: "P4", label: "P4 - İç/dış genel" },
  { value: "P6", label: "P6 - Dış mekân" },
  { value: "P10", label: "P10 - Uzak mesafe" },
];

export const applicationOptions = [
  "AVM / Alışveriş Merkezi",
  "Mağaza / Perakende",
  "Toplantı / Konferans Odası",
  "Stadyum / Spor Tesisi",
  "Otel / Turizm",
  "Belediye / Kamu",
  "Etkinlik / Sahne / Konser",
  "Bina Cephesi / Reklam Panosu",
  "Hastane / Sağlık",
  "Diğer",
];
