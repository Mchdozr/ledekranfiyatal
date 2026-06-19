export const pixelPitchRows: { value: string; highlight?: boolean }[][] = [
  [{ value: "P1.2" }, { value: "1–2 m" }, { value: "Kontrol odası, lobi" }, { value: "Ultra yüksek", highlight: true }],
  [{ value: "P1.5" }, { value: "1.5–3 m" }, { value: "Kurumsal, stüdyo" }, { value: "Çok yüksek" }],
  [{ value: "P2.5" }, { value: "2.5–5 m" }, { value: "AVM, mağaza" }, { value: "Yüksek" }],
  [{ value: "P4" }, { value: "4–8 m" }, { value: "Sahne, iç mekân" }, { value: "Orta-yüksek" }],
  [{ value: "P6" }, { value: "6–12 m" }, { value: "Dış mekân cephe" }, { value: "Orta" }],
  [{ value: "P10" }, { value: "12 m+" }, { value: "Billboard, stadyum" }, { value: "Ekonomik", highlight: true }],
];

export const pixelPitchHeaders = ["Pixel Pitch", "İdeal Mesafe", "Tipik Kullanım", "Çözünürlük"];

export const priceGuideRows: { value: string; highlight?: boolean }[][] = [
  [{ value: "İç Mekân Standart" }, { value: "P2.5 – P4" }, { value: "AVM, mağaza, ofis" }, { value: "Ekonomik", highlight: true }],
  [{ value: "İç Mekân Fine Pitch" }, { value: "P0.9 – P1.5" }, { value: "Kontrol odası, lobi" }, { value: "Yüksek" }],
  [{ value: "Dış Mekân" }, { value: "P4 – P10" }, { value: "Cephe, billboard" }, { value: "Orta-yüksek" }],
  [{ value: "Rental" }, { value: "P2.6 – P4.8" }, { value: "Etkinlik, sahne" }, { value: "Kiralama/Satış" }],
  [{ value: "Transparent" }, { value: "P3.9 – P10.4" }, { value: "Vitrin, cam cephe" }, { value: "Orta-yüksek" }],
  [{ value: "Curved" }, { value: "P1.5 – P4.8" }, { value: "Mimari, showroom" }, { value: "Projeye özel" }],
];

export const priceGuideHeaders = ["Ekran Tipi", "Pixel Pitch", "Kullanım", "Bütçe Seviyesi"];

export const testimonials = [
  {
    name: "Emre Yıldız",
    role: "AVM Pazarlama Müdürü",
    location: "İstanbul",
    text: "Atrium ekranı için 5 farklı firmayla tek tek görüşmek yerine tek form doldurduk. Bir gün içinde karşılaştırmalı teklifler elimizdeydi ve bütçemizin altında kaldık.",
  },
  {
    name: "Selin Kaya",
    role: "Etkinlik Ajansı Kurucusu",
    location: "İzmir",
    text: "Konser sahnemiz için rental LED ekran lazımdı. Teknik detayları doğru sordukları için yanlış pitch almaktan kurtulduk. Süreç gerçekten hızlıydı.",
  },
  {
    name: "Murat Demir",
    role: "Belediye Proje Sorumlusu",
    location: "Ankara",
    text: "Meydan ekranı için şartnameye uygun, IP65 dış mekân tekliflerini derleyip sundular. Karşılaştırma tablosu karar vermemizi çok kolaylaştırdı.",
  },
  {
    name: "Aylin Şahin",
    role: "Otel Genel Müdürü",
    location: "Antalya",
    text: "Lobi karşılama duvarı için fine pitch önerdiler ve gerekçesini net açıkladılar. Sektörü gerçekten bilen bir ekiple çalışmak güven verdi.",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "İhtiyacınızı tek formda bildirin",
    text: "İç/dış mekân, boyut, izleme mesafesi ve kullanım alanını birkaç adımda iletin. Teknik terim bilmenize gerek yok; 'bilmiyorum' seçenekleriyle ilerleyebilirsiniz.",
  },
  {
    step: "02",
    title: "Tedarikçilerden teklif toplarız",
    text: "Talebinizi ağımızdaki uygun LED ekran tedarikçilerine iletir, teknik şartlara uygun teklifleri toplarız. Siz tek tek firmayla uğraşmazsınız.",
  },
  {
    step: "03",
    title: "Teklifleri karşılaştırırız",
    text: "Gelen teklifleri fiyat, teknik özellik, garanti ve montaj açısından yan yana değerlendirir; size en uygun seçenekleri ayıklarız.",
  },
  {
    step: "04",
    title: "En uygun çözümü size sunarız",
    text: "İhtiyacınıza en uygun fiyatlı çözümü, şeffaf bir karşılaştırmayla paylaşırız. Kararı siz verirsiniz; baskı yok.",
  },
];

export const homeFaqs = [
  {
    q: "LED ekran fiyatını gerçekten ücretsiz mi öğreniyorum?",
    a: "Evet. Fiyat al formunu doldurmak ve karşılaştırmalı teklif almak tamamen ücretsizdir. Herhangi bir ön ödeme veya zorunluluk yoktur.",
  },
  {
    q: "Kaç firmadan teklif topluyorsunuz?",
    a: "Talebinize uygun, ağımızdaki birden fazla tedarikçiden teklif toplarız. Amacımız tek bir fiyat değil, karşılaştırılabilir birkaç seçenek sunmaktır.",
  },
  {
    q: "Ne kadar sürede dönüş alırım?",
    a: "Çoğu talebe 24 saat içinde dönüş yapıyoruz. Proje karmaşıklığına göre teknik keşif gerektiren durumlarda süre değişebilir.",
  },
  {
    q: "Hangi tür LED ekranlar için teklif alabilirim?",
    a: "İç mekân, dış mekân, rental, fine pitch, transparent ve curved dahil tüm LED ekran tiplerinde teklif topluyoruz.",
  },
  {
    q: "Pixel pitch veya teknik detayları bilmiyorum, sorun olur mu?",
    a: "Hayır. Formda 'bilmiyorum' seçenekleri mevcut. İzleme mesafesi ve kullanım alanına göre size doğru pixel pitch'i öneririz.",
  },
  {
    q: "Montaj ve kurulum hizmeti de dahil mi?",
    a: "Talebinize göre montaj, kurulum ve bakım kalemlerini de tedarikçilerden isteyip karşılaştırmalı olarak sunabiliriz.",
  },
  {
    q: "Türkiye'nin her yerine hizmet veriyor musunuz?",
    a: "Evet. Türkiye genelindeki projeler için uygun tedarikçilerden teklif topluyoruz. Şehrinizi formda belirtmeniz yeterli.",
  },
  {
    q: "Verdiğiniz fiyat kesin fiyat mı?",
    a: "Sunulan teklifler tedarikçi fiyatlarına dayanır. Biz fiyat garantisi değil, en uygun teklif karşılaştırması sunarız; nihai sözleşme tedarikçiyle yapılır.",
  },
];

export const whyUs = [
  {
    title: "Tek form, çok teklif",
    text: "Onlarca firmayı tek tek aramak yerine tek formla birden fazla tedarikçiden teklif toplarsınız.",
  },
  {
    title: "Teknik danışmanlık",
    text: "Pixel pitch, parlaklık ve IP koruma gibi kararlarda doğru tercihi yapmanız için yönlendiririz.",
  },
  {
    title: "Şeffaf karşılaştırma",
    text: "Teklifleri fiyat, teknik özellik ve garanti açısından yan yana, anlaşılır şekilde sunarız.",
  },
  {
    title: "Hız ve kolaylık",
    text: "Genellikle 24 saat içinde dönüş; pazarlık ve takip yükünü biz üstleniriz.",
  },
];
