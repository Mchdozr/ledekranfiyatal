export type ProductSpec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  priceHint: string;
  intro: string;
  highlights: string[];
  specs: ProductSpec[];
  useCases: string[];
  faqs: { q: string; a: string }[];
  keywords: string[];
};

export const products: Product[] = [
  {
    slug: "ic-mekan-led-ekran",
    name: "İç Mekân LED Ekran",
    shortName: "İç Mekân",
    tagline: "Yüksek çözünürlük, yakın izleme mesafesi",
    excerpt:
      "Mağaza, AVM, toplantı odası ve stüdyolar için yüksek piksel yoğunluklu, parlaklığı ortam ışığına optimize edilmiş iç mekân LED ekranlar.",
    image: "/images/ic-mekan-avm-led-ekran.png",
    imageAlt: "Türkiye'de bir AVM içinde kurulu iç mekân LED ekran reklam panosu",
    priceHint: "Pitch ve m²'ye göre değişir — formla net teklif alın",
    intro:
      "İç mekân LED ekranlar, kontrollü aydınlatma ortamlarında yakın mesafeden izlenmek üzere tasarlanır. P1.2–P4 aralığındaki düşük pixel pitch değerleri sayesinde metinler ve detaylar net görünür. Mağaza vitrininden kurumsal lobiye, yayın stüdyosundan toplantı odasına kadar geniş bir kullanım yelpazesi sunar.",
    highlights: [
      "Düşük pixel pitch ile keskin görüntü (P1.2 – P4)",
      "Ortam ışığına uygun 600–1200 nit parlaklık",
      "Geniş izleme açısı ve yüksek kontrast",
      "Sessiz, fansız soğutma seçenekleri",
    ],
    specs: [
      { label: "Pixel Pitch", value: "P1.2 / P1.5 / P1.8 / P2.5 / P4" },
      { label: "Parlaklık", value: "600 – 1.200 nit" },
      { label: "Refresh Rate", value: "≥ 3.840 Hz" },
      { label: "IP Koruma", value: "IP30 – IP40 (iç mekân)" },
      { label: "Kabin", value: "Alüminyum / die-cast, ince profil" },
      { label: "Kontrol", value: "Novastar / Colorlight sending card" },
    ],
    useCases: ["AVM ve mağaza", "Kurumsal lobi", "Toplantı & konferans", "Yayın stüdyosu"],
    faqs: [
      {
        q: "İç mekân LED ekranda hangi pixel pitch'i seçmeliyim?",
        a: "İzleme mesafenize bağlıdır. 2–3 metre mesafe için P1.5–P2.5, 4 metre ve üzeri için P2.5–P4 idealdir. Net öneri için fiyat al formunu doldurmanız yeterli.",
      },
      {
        q: "İç mekân ekran parlaklığı yeterli olur mu?",
        a: "İç mekânda genellikle 600–1.200 nit yeterlidir. Vitrin gibi gün ışığı alan alanlarda daha yüksek nit değerli paneller öneririz.",
      },
      {
        q: "Toplantı odası için fine pitch mi gerekli?",
        a: "Yakın mesafede sunum yapılacaksa P1.2–P1.8 fine pitch önerilir; metinlerin keskinliği belirgin şekilde artar.",
      },
      {
        q: "Kurulum ve bakım hizmeti veriyor musunuz?",
        a: "Evet, teklif toplarken montaj ve bakım kalemlerini de tedarikçilerden isteyip karşılaştırmalı olarak sunuyoruz.",
      },
    ],
    keywords: ["iç mekan led ekran fiyat", "iç mekan led ekran", "fine pitch led ekran fiyat"],
  },
  {
    slug: "dis-mekan-led-ekran",
    name: "Dış Mekân LED Ekran",
    shortName: "Dış Mekân",
    tagline: "Yüksek parlaklık, hava koşullarına dayanıklı",
    excerpt:
      "Bina cephesi, reklam panosu ve stadyum için 5.000+ nit parlaklığa ve IP65 korumaya sahip dayanıklı dış mekân LED ekranlar.",
    image: "/images/dis-mekan-led-video-wall.png",
    imageAlt: "Türkiye'de bir meydanda dış mekân LED video wall reklam ekranı",
    priceHint: "P ölçüsü, m² ve parlaklığa göre — formla net teklif alın",
    intro:
      "Dış mekân LED ekranlar; doğrudan güneş ışığı altında bile okunabilirlik için 5.000 nit ve üzeri parlaklık, yağmur ve toza karşı IP65 koruma ile üretilir. Bina cephesi, billboard, meydan ve stadyum gibi uzak mesafeden izlenen alanlar için P4–P10 pitch değerleri tercih edilir.",
    highlights: [
      "5.000 – 8.000 nit yüksek parlaklık",
      "IP65 ön/arka su ve toz koruması",
      "Geniş sıcaklık aralığında çalışma",
      "Otomatik parlaklık sensörü ile enerji tasarrufu",
    ],
    specs: [
      { label: "Pixel Pitch", value: "P3 / P4 / P5 / P6 / P8 / P10" },
      { label: "Parlaklık", value: "5.000 – 8.000 nit" },
      { label: "Refresh Rate", value: "≥ 3.840 Hz" },
      { label: "IP Koruma", value: "IP65 (ön ve arka)" },
      { label: "Kabin", value: "Su geçirmez die-cast alüminyum" },
      { label: "Kontrol", value: "Novastar + multimedya oynatıcı" },
    ],
    useCases: ["Bina cephesi", "Reklam panosu / billboard", "Stadyum", "Meydan & cadde"],
    faqs: [
      {
        q: "Dış mekân LED ekranda hangi parlaklık gerekir?",
        a: "Doğrudan güneş gören cephelerde en az 6.000 nit önerilir. Gölgede kalan alanlarda 4.500–5.000 nit yeterli olabilir.",
      },
      {
        q: "P8 mi P10 mu seçmeliyim?",
        a: "İzleme mesafesi uzadıkça daha yüksek pitch ekonomiktir. 15 m+ mesafede P8–P10 fiyat/performans olarak avantajlıdır.",
      },
      {
        q: "Dış mekân ekran kaç yıl dayanır?",
        a: "Kaliteli IP65 paneller doğru bakımla 100.000 saat ve üzeri LED ömrü sunar; tedarikçi garanti süreleri teklifte belirtilir.",
      },
      {
        q: "Reklam içeriğini uzaktan yönetebilir miyim?",
        a: "Evet, 4G/internet üzerinden içerik yönetim yazılımı ile uzaktan içerik güncelleme mümkündür.",
      },
    ],
    keywords: ["dış mekan led ekran fiyat", "p10 led ekran fiyat", "dış mekan led ekran"],
  },
  {
    slug: "rental-led-ekran",
    name: "Rental (Kiralık) LED Ekran",
    shortName: "Rental",
    tagline: "Hızlı kurulum, etkinlik ve sahne için",
    excerpt:
      "Konser, fuar, lansman ve etkinlikler için hızlı kurulan, taşınabilir, hizalama hassasiyeti yüksek rental LED ekran ve video wall çözümleri.",
    image: "/images/led-kurulum-teknisyen.png",
    imageAlt: "Sahne arkasında modüler rental LED video wall kuran teknisyenler",
    priceHint: "Kiralama süresi ve m²'ye göre — formla net teklif alın",
    intro:
      "Rental LED ekranlar; hızlı montaj-demontaj, hafif kabin tasarımı ve hassas hizalama mekanizmalarıyla etkinlik sektörünün ihtiyaçlarına yanıt verir. Konser sahnelerinden fuar standlarına, kurumsal lansmanlardan TV setlerine kadar kısa süreli yüksek görsel etki gerektiren projeler için idealdir.",
    highlights: [
      "Hızlı kurulum için hafif die-cast kabin",
      "Hassas hizalama (curve lock) mekanizması",
      "Asılabilir (hanging) ve istiflenebilir montaj",
      "Kiralama veya satın alma esnekliği",
    ],
    specs: [
      { label: "Pixel Pitch", value: "P2.6 / P2.9 / P3.9 / P4.8" },
      { label: "Parlaklık", value: "1.500 – 5.000 nit (iç/dış)" },
      { label: "Refresh Rate", value: "≥ 3.840 Hz" },
      { label: "Kabin Boyutu", value: "500×500 / 500×1000 mm" },
      { label: "Ağırlık", value: "~6–8 kg/kabin" },
      { label: "Montaj", value: "Hanging bar + ground stack" },
    ],
    useCases: ["Konser & festival", "Fuar standı", "Kurumsal lansman", "TV & yayın seti"],
    faqs: [
      {
        q: "Rental LED ekran kiralama mı satın alma mı avantajlı?",
        a: "Yılda birkaç etkinlik için kiralama, sürekli kullanım için satın alma daha ekonomiktir. Her iki senaryo için de karşılaştırmalı teklif sunuyoruz.",
      },
      {
        q: "Kurulum ne kadar sürer?",
        a: "Modüler kabin yapısı sayesinde orta ölçekli bir sahne ekranı birkaç saatte kurulabilir; ekip ve içerik desteği teklife eklenebilir.",
      },
      {
        q: "İç ve dış etkinlikte aynı panel kullanılır mı?",
        a: "Dış mekân etkinliklerinde IP korumalı ve yüksek nitli paneller gerekir. İhtiyacınıza göre doğru paneli öneririz.",
      },
      {
        q: "Operatör/teknik ekip dahil mi?",
        a: "İsteğe bağlı olarak kurulum, operatör ve içerik hizmetlerini de tedarikçilerden talep edip teklifinize dahil ediyoruz.",
      },
    ],
    keywords: ["led ekran kiralama fiyat", "rental led ekran", "sahne led ekran kiralama"],
  },
  {
    slug: "fine-pitch-led-ekran",
    name: "Fine Pitch LED Ekran",
    shortName: "Fine Pitch",
    tagline: "Ultra yüksek çözünürlük, yakın izleme",
    excerpt:
      "Kontrol odaları, kurumsal lobiler ve premium showroom'lar için P0.9–P1.5 ultra ince pixel pitch'li fine pitch LED ekranlar.",
    image: "/images/led-pixel-makro-rgb.png",
    imageAlt: "Fine pitch LED ekran piksellerinin kırmızı yeşil mavi makro yakın çekimi",
    priceHint: "Pitch küçüldükçe artar — formla net teklif alın",
    intro:
      "Fine pitch LED ekranlar, çok yakın mesafeden izleme gerektiren ortamlar için 1 mm civarı ve altı pixel pitch ile üretilir. Kontrol/komuta merkezleri, kurumsal karşılama alanları ve yüksek prestijli showroom'larda LCD video wall'ların çerçevesiz, kesintisiz alternatifidir.",
    highlights: [
      "P0.9 – P1.5 ultra ince pixel pitch",
      "Çerçevesiz, kesintisiz dev görüntü",
      "Yüksek gri seviye ve düşük parlaklıkta net renk",
      "Flicker-free, göz yormayan görüntü",
    ],
    specs: [
      { label: "Pixel Pitch", value: "P0.9 / P1.2 / P1.5" },
      { label: "Parlaklık", value: "600 – 800 nit" },
      { label: "Refresh Rate", value: "≥ 3.840 Hz" },
      { label: "Gri Seviye", value: "16–18 bit" },
      { label: "Bakım", value: "Önden bakım (front service)" },
      { label: "Kontrol", value: "Novastar COEX / yüksek seviye" },
    ],
    useCases: ["Kontrol & komuta merkezi", "Kurumsal lobi", "Premium showroom", "Yayın stüdyosu"],
    faqs: [
      {
        q: "Fine pitch ile normal iç mekân ekran farkı nedir?",
        a: "Fine pitch, 1 mm civarı pixel pitch ile çok yakından bile pikselin görünmediği ultra net görüntü sunar; fiyatı buna bağlı olarak yüksektir.",
      },
      {
        q: "Fine pitch LCD video wall'a göre avantajı ne?",
        a: "Çerçeve (bezel) olmadığı için tamamen kesintisiz tek bir görüntü elde edilir; uzun ömür ve bakım kolaylığı sağlar.",
      },
      {
        q: "Hangi izleme mesafesi için uygundur?",
        a: "Genellikle 1–3 metre yakın mesafe izleme için idealdir. Mesafeniz artıyorsa daha ekonomik pitch öneririz.",
      },
      {
        q: "Fiyatı neden daha yüksek?",
        a: "Birim alandaki LED ve sürücü yoğunluğu çok daha fazladır. Yine de farklı tedarikçilerden en uygun teklifi karşılaştırıyoruz.",
      },
    ],
    keywords: ["fine pitch led ekran fiyat", "fine pitch led ekran", "kontrol odası led ekran"],
  },
  {
    slug: "transparent-led-ekran",
    name: "Transparent (Şeffaf) LED Ekran",
    shortName: "Transparent",
    tagline: "Cam cephe için %70+ şeffaflık",
    excerpt:
      "Mağaza vitrinleri ve cam cepheler için arkadaki görüşü kapatmayan, %70+ şeffaflık oranına sahip transparent LED ekranlar.",
    image: "/images/led-ekran-3d-illustrasyon.png",
    imageAlt: "Şeffaf LED ekran teknolojisini gösteren modern 3D illüstrasyon",
    priceHint: "Şeffaflık oranı ve m²'ye göre — formla net teklif alın",
    intro:
      "Transparent LED ekranlar, ince şerit (strip) yapısı sayesinde yüksek geçirgenlik sunar ve cam cephelerin arkasına monte edildiğinde doğal ışığı ve görüşü büyük ölçüde korur. Mağaza vitrinleri, AVM cam yüzeyleri ve mimari cephe projelerinde dikkat çekici, ferah bir reklam alanı oluşturur.",
    highlights: [
      "%70 – %90 şeffaflık oranı",
      "Hafif yapı, cam cepheye kolay montaj",
      "Doğal ışığı engellemeyen ince tasarım",
      "Mağaza vitrini ve mimari cephe için ideal",
    ],
    specs: [
      { label: "Pixel Pitch", value: "P3.9 / P7.8 / P10.4" },
      { label: "Şeffaflık", value: "%70 – %90" },
      { label: "Parlaklık", value: "4.000 – 6.000 nit" },
      { label: "Ağırlık", value: "~12 kg/m²" },
      { label: "Montaj", value: "Cam arkası / askı sistemi" },
      { label: "Kontrol", value: "Asenkron + uzaktan içerik" },
    ],
    useCases: ["Mağaza vitrini", "AVM cam cephe", "Mimari cephe", "Showroom"],
    faqs: [
      {
        q: "Transparent LED ekran ne kadar şeffaf?",
        a: "Model ve pitch'e göre %70–90 arası şeffaflık sunar; arkadaki vitrin ürünleri ve manzara büyük ölçüde görünür kalır.",
      },
      {
        q: "Cam cepheye nasıl monte edilir?",
        a: "Genellikle camın iç yüzeyine askı veya ray sistemiyle monte edilir; mevcut cepheye göre montaj çözümü tedarikçiden istenir.",
      },
      {
        q: "Gündüz okunur mu?",
        a: "Yüksek nitli modeller gündüz vitrin arkasında dahi okunur; konumunuza göre doğru parlaklığı öneririz.",
      },
      {
        q: "Hangi içerikler uygun?",
        a: "Logo, animasyon, kampanya ve marka içerikleri en iyi sonucu verir; yoğun küçük metinler için pitch seçimi önemlidir.",
      },
    ],
    keywords: ["transparent led ekran fiyat", "şeffaf led ekran", "vitrin led ekran"],
  },
  {
    slug: "curved-led-ekran",
    name: "Curved (Kavisli) LED Ekran",
    shortName: "Curved",
    tagline: "Kavisli ve sarmal mimari görseller",
    excerpt:
      "Sütun, kemer ve sarmal mimari yüzeyler için iç/dış bükey açılarla kurulabilen, dikkat çeken kavisli LED ekran çözümleri.",
    image: "/images/led-is-ortakligi.png",
    imageAlt: "Modern LED ekran önünde iş ortaklığı anlaşması el sıkışması",
    priceHint: "Kavis açısı ve m²'ye göre — formla net teklif alın",
    intro:
      "Curved LED ekranlar, özel kabin kilit mekanizmaları sayesinde iç ve dış bükey açılarda kurularak sütun, kemer, tünel ve sarmal mimari yüzeyleri saran etkileyici görüntüler oluşturur. Mağaza, lobi, müze ve deneyim alanlarında güçlü bir görsel kimlik sağlar.",
    highlights: [
      "Ayarlanabilir iç/dış bükey kavis açısı",
      "Sütun ve sarmal yüzeylere sarma imkânı",
      "Kesintisiz, çerçevesiz görüntü akışı",
      "İç ve dış mekân panel seçenekleri",
    ],
    specs: [
      { label: "Pixel Pitch", value: "P1.5 / P2.5 / P3.9 / P4.8" },
      { label: "Kavis Açısı", value: "Kabin başına ±5° – ±10°" },
      { label: "Parlaklık", value: "800 – 5.000 nit" },
      { label: "Kabin", value: "Curve lock mekanizmalı" },
      { label: "Bakım", value: "Önden / arkadan bakım" },
      { label: "Kontrol", value: "Novastar / Colorlight" },
    ],
    useCases: ["Mağaza & showroom", "Lobi & resepsiyon", "Müze & deneyim alanı", "Etkinlik sahnesi"],
    faqs: [
      {
        q: "Curved LED ekran ne kadar kavis yapabilir?",
        a: "Kabin kilit mekanizmasıyla kademeli açılar verilerek tam silindir veya sarmal yüzeyler dahi oluşturulabilir.",
      },
      {
        q: "Kavisli ekranda görüntü bozulur mu?",
        a: "Doğru kalibrasyon ve içerik haritalama ile kavis boyunca kesintisiz, bozulmasız görüntü elde edilir.",
      },
      {
        q: "İç ve dış mekânda kullanılabilir mi?",
        a: "Evet, IP korumalı dış mekân ve yüksek çözünürlüklü iç mekân kavisli panel seçenekleri mevcuttur.",
      },
      {
        q: "Fiyatı düz ekrana göre çok mu yüksek?",
        a: "Özel kabin mekanizması nedeniyle bir miktar fark olur; farklı tedarikçilerden en uygun teklifi karşılaştırıyoruz.",
      },
    ],
    keywords: ["curved led ekran fiyat", "kavisli led ekran", "sarmal led ekran"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
