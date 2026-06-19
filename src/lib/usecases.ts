export type UseCase = {
  slug: string;
  name: string;
  tagline: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  intro: string;
  benefits: string[];
  recommended: { product: string; pitch: string; note: string }[];
  faqs: { q: string; a: string }[];
};

export const useCases: UseCase[] = [
  {
    slug: "avm",
    name: "AVM & Alışveriş Merkezleri",
    tagline: "Yüksek yaya trafiğinde dikkat çeken reklam",
    excerpt: "AVM ortak alanları, mağaza vitrinleri ve cephe için yüksek görünürlüklü LED ekran çözümleri.",
    image: "/images/ic-mekan-avm-led-ekran.png",
    imageAlt: "AVM içinde yüksek çözünürlüklü iç mekân LED reklam ekranı",
    intro:
      "Alışveriş merkezleri, yüksek yaya trafiği nedeniyle reklam geliri ve marka deneyimi için ideal alanlardır. İç mekân fine pitch ekranlar ortak alanlarda, transparent ekranlar cam cephelerde, yüksek nitli paneller ise atriumlarda etkili sonuç verir.",
    benefits: [
      "Yüksek yaya trafiğinde maksimum görünürlük",
      "Kiralanabilir reklam alanı ile ek gelir",
      "Vitrin ve cephe için şeffaf çözümler",
      "Merkezi içerik yönetimi",
    ],
    recommended: [
      { product: "ic-mekan-led-ekran", pitch: "P1.5 – P2.5", note: "Ortak alan ve kat geçişleri" },
      { product: "transparent-led-ekran", pitch: "P3.9 – P7.8", note: "Cam cephe ve vitrin" },
      { product: "fine-pitch-led-ekran", pitch: "P0.9 – P1.5", note: "Premium karşılama alanı" },
    ],
    faqs: [
      { q: "AVM için hangi pixel pitch uygun?", a: "Yakın izlenen ortak alanlarda P1.5–P2.5, atrium gibi uzak alanlarda P3–P4 uygundur." },
      { q: "Reklam geliri için uygun mu?", a: "Evet, kiralanabilir LED reklam alanları AVM'ler için güçlü bir gelir kalemidir." },
      { q: "Kurulum AVM çalışırken yapılabilir mi?", a: "Genellikle gece/kapalı saatlerde planlanır; tedarikçiyle iş takvimi netleştirilir." },
      { q: "Bakım hizmeti veriliyor mu?", a: "Evet, periyodik bakım kalemleri teklife dahil edilebilir." },
    ],
  },
  {
    slug: "stadyum",
    name: "Stadyum & Spor Tesisleri",
    tagline: "Perimeter, skorboard ve tribün ekranları",
    excerpt: "Stadyumlar için yüksek parlaklıklı, geniş açılı perimeter ve dev skorboard LED ekran çözümleri.",
    image: "/images/dis-mekan-led-video-wall.png",
    imageAlt: "Stadyum için yüksek parlaklıklı dış mekân LED video wall",
    intro:
      "Spor tesisleri; perimeter (saha kenarı) reklam bantları, dev skorboard ekranları ve tribün bilgilendirme panoları için yüksek parlaklık, geniş izleme açısı ve dayanıklılık gerektirir. Açık stadyumlarda IP65 dış mekân paneller standarttır.",
    benefits: [
      "Gün ışığında okunan 6.000+ nit parlaklık",
      "Geniş izleme açısı ile tüm tribünlere ulaşım",
      "Darbe ve hava koşullarına dayanıklı kabin",
      "Canlı skor, tekrar ve reklam yönetimi",
    ],
    recommended: [
      { product: "dis-mekan-led-ekran", pitch: "P6 – P10", note: "Skorboard ve tribün ekranı" },
      { product: "rental-led-ekran", pitch: "P3.9 – P4.8", note: "Geçici etkinlik kurulumları" },
    ],
    faqs: [
      { q: "Perimeter ekranlar için hangi pitch?", a: "Saha kenarı bantlarında genellikle P6–P10 tercih edilir." },
      { q: "Açık stadyumda IP koruması şart mı?", a: "Evet, IP65 ön/arka koruma açık stadyumlar için zorunludur." },
      { q: "Canlı yayın entegrasyonu mümkün mü?", a: "Evet, uygun kontrol kartı ve oynatıcılarla canlı kaynak yönetilebilir." },
      { q: "Dev ekranlar ne kadar sürede kurulur?", a: "Proje ölçeğine göre değişir; tedarikçiden iş takvimi alıp teklifte sunuyoruz." },
    ],
  },
  {
    slug: "otel",
    name: "Otel & Turizm",
    tagline: "Lobi, balo salonu ve dış cephe ekranları",
    excerpt: "Oteller için lobi karşılama, balo salonu sahne ve dış cephe tanıtım LED ekran çözümleri.",
    image: "/images/led-is-ortakligi.png",
    imageAlt: "Otel lobisinde kurulu premium LED ekran çözümü",
    intro:
      "Oteller; lobi karşılama duvarları, balo/konferans salonu sahne ekranları ve dış cephe tanıtımı için prestijli, sessiz çalışan ve kolay yönetilen LED çözümleri arar. Fine pitch ekranlar lobi prestiji, rental paneller etkinlik esnekliği sağlar.",
    benefits: [
      "Prestijli karşılama deneyimi",
      "Balo/konferans salonu için esnek sahne ekranı",
      "Sessiz, fansız iç mekân panel seçeneği",
      "Etkinliklerde kiralama esnekliği",
    ],
    recommended: [
      { product: "fine-pitch-led-ekran", pitch: "P1.2 – P1.5", note: "Lobi karşılama duvarı" },
      { product: "rental-led-ekran", pitch: "P2.9 – P3.9", note: "Balo salonu & etkinlik" },
    ],
    faqs: [
      { q: "Lobi için hangi ekran uygun?", a: "Yakından izlenen lobiler için fine pitch P1.2–P1.5 prestijli sonuç verir." },
      { q: "Balo salonu ekranı sabit mi olmalı?", a: "Etkinliğe göre değişen kullanımda rental paneller daha esnektir." },
      { q: "Sessiz çalışan model var mı?", a: "Evet, fansız iç mekân panelleri sessiz ortamlar için idealdir." },
      { q: "Dış cephe tanıtımı yapılabilir mi?", a: "IP65 dış mekân panelleriyle cephe tanıtım ekranı kurulabilir." },
    ],
  },
  {
    slug: "hastane",
    name: "Hastane & Sağlık",
    tagline: "Yönlendirme, bilgilendirme ve bekleme alanı",
    excerpt: "Hastaneler için yönlendirme, sıra/bilgilendirme ve bekleme alanı LED ekran çözümleri.",
    image: "/images/led-ekran-3d-illustrasyon.png",
    imageAlt: "Sağlık kurumu için bilgilendirme LED ekranı 3D illüstrasyonu",
    intro:
      "Sağlık kuruluşları; hasta yönlendirme, sıra/bilgilendirme ve bekleme alanı içerikleri için göz yormayan, flicker-free ve kolay yönetilen ekranlara ihtiyaç duyar. Düşük parlaklıkta net görüntü ve güvenilir 7/24 çalışma önceliklidir.",
    benefits: [
      "Flicker-free, göz yormayan görüntü",
      "7/24 güvenilir çalışma",
      "Hasta yönlendirme ve sıra yönetimi",
      "Merkezi, kolay içerik güncelleme",
    ],
    recommended: [
      { product: "ic-mekan-led-ekran", pitch: "P1.8 – P2.5", note: "Bekleme & bilgilendirme" },
      { product: "fine-pitch-led-ekran", pitch: "P1.2 – P1.5", note: "Karşılama & yönlendirme" },
    ],
    faqs: [
      { q: "Hastane için göz sağlığı önemli mi?", a: "Evet, flicker-free yüksek refresh paneller uzun süreli bakışta göz yormaz." },
      { q: "7/24 çalışabilir mi?", a: "Kaliteli paneller kesintisiz çalışmaya uygundur; garanti süreleri teklifte belirtilir." },
      { q: "Sıra yönetimine entegre olur mu?", a: "Uygun yazılımlarla sıra ve bilgilendirme sistemlerine entegre edilebilir." },
      { q: "Hangi parlaklık uygun?", a: "İç mekân koşullarına göre genellikle 600–1.000 nit yeterlidir." },
    ],
  },
  {
    slug: "belediye",
    name: "Belediye & Kamu",
    tagline: "Meydan, bilgilendirme ve duyuru ekranları",
    excerpt: "Belediyeler için meydan, park ve cadde bilgilendirme/duyuru dış mekân LED ekran çözümleri.",
    image: "/images/turkiye-led-network-harita.png",
    imageAlt: "Türkiye genelinde belediye LED ekran ağını gösteren dijital harita",
    intro:
      "Belediyeler ve kamu kurumları; meydan, park ve caddelerde duyuru, bilgilendirme ve etkinlik yayını için dayanıklı, yüksek parlaklıklı ve uzaktan yönetilebilen dış mekân ekranlar tercih eder. Enerji verimliliği ve uzun ömür kamu projelerinde önceliklidir.",
    benefits: [
      "Meydan ve caddede yüksek görünürlük",
      "Uzaktan içerik ve duyuru yönetimi",
      "Otomatik parlaklık ile enerji tasarrufu",
      "Dayanıklı IP65 dış mekân yapı",
    ],
    recommended: [
      { product: "dis-mekan-led-ekran", pitch: "P5 – P10", note: "Meydan ve cadde ekranı" },
    ],
    faqs: [
      { q: "Kamu ihalesine uygun teklif alır mıyım?", a: "Teknik şartnamenize uygun, karşılaştırmalı tedarikçi tekliflerini derliyoruz." },
      { q: "Uzaktan yönetim mümkün mü?", a: "Evet, internet üzerinden merkezi içerik ve duyuru yönetimi sağlanır." },
      { q: "Enerji tüketimi yüksek mi?", a: "Otomatik parlaklık ve verimli sürücülerle tüketim önemli ölçüde düşürülür." },
      { q: "Garanti ve bakım dahil mi?", a: "Garanti ve periyodik bakım kalemleri teklife dahil edilebilir." },
    ],
  },
  {
    slug: "etkinlik",
    name: "Etkinlik & Sahne",
    tagline: "Konser, fuar ve lansman için rental çözüm",
    excerpt: "Konser, fuar ve lansmanlar için hızlı kurulan, taşınabilir rental LED ekran ve sahne çözümleri.",
    image: "/images/led-kurulum-teknisyen.png",
    imageAlt: "Sahnede modüler rental LED ekran kuran teknik ekip",
    intro:
      "Etkinlik sektörü; konser, fuar, lansman ve festivallerde hızlı kurulan, hafif ve hassas hizalanan rental LED ekranlara ihtiyaç duyar. İç ve dış mekân panel seçenekleriyle her etkinliğe uygun, güçlü görsel etki sağlanır.",
    benefits: [
      "Hızlı kurulum ve demontaj",
      "Asılabilir ve istiflenebilir montaj",
      "Hassas hizalama ile kusursuz görüntü",
      "Kiralama veya satın alma esnekliği",
    ],
    recommended: [
      { product: "rental-led-ekran", pitch: "P2.6 – P4.8", note: "Sahne ve fuar ekranı" },
      { product: "curved-led-ekran", pitch: "P2.5 – P3.9", note: "Sarmal sahne dekoru" },
    ],
    faqs: [
      { q: "Etkinlik için kiralama mı uygun?", a: "Tek seferlik etkinliklerde kiralama, tekrarlı kullanımda satın alma avantajlıdır." },
      { q: "Açık hava konseri için panel farklı mı?", a: "Evet, IP korumalı ve yüksek nitli paneller dış mekân için gereklidir." },
      { q: "Operatör desteği var mı?", a: "Kurulum, operatör ve içerik hizmetleri teklife eklenebilir." },
      { q: "Sahne tasarımına uyarlanır mı?", a: "Curved ve modüler panellerle özel sahne formları oluşturulabilir." },
    ],
  },
];

export function getUseCase(slug: string) {
  return useCases.find((u) => u.slug === slug);
}
