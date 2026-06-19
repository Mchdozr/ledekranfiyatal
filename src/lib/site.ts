export const site = {
  name: "ledekranfiyatal.com",
  brand: "mLed",
  shortName: "ledekranfiyatal",
  url: "https://ledekranfiyatal.com",
  description:
    "LED ekran fiyatını tek formla karşılaştırın. Birden fazla tedarikçiden teklif topluyor, ihtiyacınıza en uygun fiyatlı LED ekran çözümünü size sunuyoruz.",
  slogan: "LED ekran fiyatını tek tıkla karşılaştırın",
  phone: "+905498002510",
  phoneDisplay: "+90 549 800 25 10",
  email: "mucahid.ozer.7@hotmail.com",
  whatsapp: "905498002510",
  address: "İstanbul, Türkiye",
  locale: "tr-TR",
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
  stats: {
    suppliers: "40+",
    projects: "1.200+",
    responseHours: "24 saat",
    avgSaving: "%22",
  },
} as const;

export const mainNav = [
  { label: "Ürünler", href: "/urunler" },
  { label: "Kullanım Alanları", href: "/kullanim-alanlari" },
  { label: "Nasıl Çalışır", href: "/nasil-calisir" },
  { label: "Fiyat Rehberi", href: "/fiyat-rehberi" },
  { label: "Projeler", href: "/projeler" },
  { label: "Blog", href: "/blog" },
];

export const footerNav = {
  urunler: {
    title: "Ürünler",
    links: [
      { label: "İç Mekân LED Ekran", href: "/urunler/ic-mekan-led-ekran" },
      { label: "Dış Mekân LED Ekran", href: "/urunler/dis-mekan-led-ekran" },
      { label: "Rental LED Ekran", href: "/urunler/rental-led-ekran" },
      { label: "Fine Pitch LED Ekran", href: "/urunler/fine-pitch-led-ekran" },
      { label: "Transparent LED Ekran", href: "/urunler/transparent-led-ekran" },
      { label: "Curved LED Ekran", href: "/urunler/curved-led-ekran" },
    ],
  },
  kurumsal: {
    title: "Kurumsal",
    links: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Nasıl Çalışır", href: "/nasil-calisir" },
      { label: "Projeler", href: "/projeler" },
      { label: "Blog", href: "/blog" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
  rehber: {
    title: "Rehberler",
    links: [
      { label: "Fiyat Rehberi", href: "/fiyat-rehberi" },
      { label: "Pixel Pitch Rehberi", href: "/pixel-pitch-rehberi" },
      { label: "Kullanım Alanları", href: "/kullanim-alanlari" },
      { label: "Sık Sorulan Sorular", href: "/sss" },
    ],
  },
  yasal: {
    title: "Yasal",
    links: [
      { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
      { label: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni" },
      { label: "Çerez Politikası", href: "/cerez-politikasi" },
      { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
    ],
  },
};
