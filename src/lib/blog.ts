export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  faqs: { q: string; a: string }[];
  content: string;
};

export const posts: BlogPost[] = [
  {
    slug: "led-ekran-fiyatlari-2025-rehberi",
    title: "LED Ekran Fiyatları 2025 Rehberi: Maliyeti Belirleyen 9 Faktör",
    description:
      "LED ekran fiyatlarını belirleyen pixel pitch, m², parlaklık ve montaj gibi faktörler. 2025 için güncel fiyat aralıkları ve teklif alma rehberi.",
    excerpt:
      "LED ekran fiyatı neye göre değişir? Pixel pitch'ten montaja, kontrol sisteminden garantiye kadar maliyeti belirleyen 9 faktörü ve 2025 fiyat mantığını açıklıyoruz.",
    date: "2025-01-20",
    readingTime: "8 dk",
    category: "Fiyat Rehberi",
    image: "/images/dis-mekan-led-video-wall.png",
    imageAlt: "Dış mekân LED video wall reklam ekranı ile LED ekran fiyatları rehberi",
    keywords: ["led ekran fiyat", "led ekran fiyatları", "led ekran fiyatları 2025"],
    faqs: [
      { q: "LED ekran fiyatı neye göre belirlenir?", a: "Başlıca pixel pitch, toplam m², iç/dış mekân olması, parlaklık, kontrol sistemi, kabin kalitesi, montaj ve garanti kalemlerine göre belirlenir." },
      { q: "En çok hangi kalem fiyatı etkiler?", a: "Pixel pitch ve toplam alan (m²) en belirleyici kalemlerdir; pitch küçüldükçe birim m² maliyeti hızla artar." },
      { q: "Net fiyatı nasıl öğrenirim?", a: "İhtiyacınızı fiyat al formuyla iletmeniz yeterli; birden fazla tedarikçiden teklif toplayıp en uygununu karşılaştırmalı sunuyoruz." },
    ],
    content: `
<p>LED ekran almak isteyen herkesin ilk sorusu aynıdır: <strong>LED ekran fiyatı ne kadar?</strong> Net bir liste fiyatı vermek mümkün değildir, çünkü LED ekran fiyatı tek bir ürün fiyatı değil; pixel pitch, alan, parlaklık, kontrol sistemi, montaj ve garanti gibi onlarca değişkenin toplamıdır. Bu rehberde 2025 yılı için LED ekran fiyatlarını belirleyen tüm faktörleri ve doğru bütçeyi nasıl çıkaracağınızı açıklıyoruz.</p>

<h2>LED ekran fiyatı neden tek bir rakam değildir?</h2>
<p>Bir LED ekran projesi, birbirinden çok farklı bileşenlerin bir araya gelmesiyle oluşur. Aynı boyuttaki iki ekran, pixel pitch ve kullanım yerine göre kat kat farklı fiyatlanabilir. Bu yüzden &quot;P metrekare kaç TL?&quot; sorusunun cevabı projeden projeye değişir. Doğru yaklaşım, ihtiyaç tanımını netleştirip karşılaştırmalı teklif almaktır.</p>

<h2>Fiyatı belirleyen 9 temel faktör</h2>

<h3>1. Pixel pitch (piksel aralığı)</h3>
<p>Pixel pitch, iki LED arasındaki mesafedir ve milimetre ile ifade edilir (P2, P4, P10 gibi). Pitch küçüldükçe aynı alanda çok daha fazla LED kullanılır; bu da birim m² maliyetini ciddi şekilde artırır. P1.5 bir fine pitch ekran ile P10 bir dış mekân ekranın metrekare maliyeti arasında birkaç kat fark olabilir.</p>

<h3>2. Toplam alan (m²)</h3>
<p>Ekranın genişlik × yükseklik değeri toplam metrekareyi verir. Alan büyüdükçe toplam tutar artar; ancak ölçek büyüdükçe birim m² maliyeti bir miktar düşebilir. Bu nedenle projenin gerçek ölçüsünü net belirlemek bütçe için kritiktir.</p>

<h3>3. İç mekân mı, dış mekân mı?</h3>
<p>Dış mekân ekranlar; 5.000+ nit parlaklık, IP65 su/toz koruması ve dayanıklı kabin gerektirdiği için iç mekân ekranlardan daha maliyetlidir. İç mekân ekranlar daha düşük parlaklık ve koruma sınıfıyla daha ekonomik olabilir.</p>

<h3>4. Parlaklık (nit)</h3>
<p>Doğrudan güneş gören cepheler için yüksek nit değeri şarttır. Parlaklık arttıkça LED ve sürücü maliyeti yükselir. İhtiyacınızdan fazla parlaklık almak gereksiz maliyet, az parlaklık ise okunabilirlik sorunu yaratır.</p>

<h3>5. Kontrol ve sürücü sistemi</h3>
<p>Novastar veya Colorlight gibi sending card ve receiver kartları, görüntü kalitesini ve refresh rate'i doğrudan etkiler. Yüksek refresh (≥3.840 Hz), kamera önünde titremesiz görüntü için gereklidir ve fiyata yansır.</p>

<h3>6. Kabin kalitesi ve malzeme</h3>
<p>Die-cast alüminyum kabinler; hafiflik, ısı yönetimi ve montaj hassasiyeti açısından avantajlıdır. Kabin kalitesi hem fiyatı hem de uzun vadeli dayanıklılığı belirler.</p>

<h3>7. Montaj ve altyapı</h3>
<p>Çelik konstrüksiyon, askı sistemi, elektrik altyapısı ve işçilik ayrı bir kalemdir. Yüksekte veya zorlu cephelerde montaj maliyeti artar. Bu kalem çoğu zaman göz ardı edilir ama toplam bütçenin önemli bir bölümünü oluşturabilir.</p>

<h3>8. Garanti ve servis</h3>
<p>Garanti süresi, yedek modül stoğu ve servis hızı fiyatı etkiler. Daha uzun garanti ve yerinde servis, başlangıç maliyetini artırsa da toplam sahip olma maliyetini düşürür.</p>

<h3>9. İçerik yönetimi ve yazılım</h3>
<p>Uzaktan içerik yönetimi, oynatıcı ve yazılım lisansları da bütçeye dahildir. Reklam amaçlı kullanılan ekranlarda içerik yönetim sistemi önemli bir değer katar.</p>

<h2>2025 fiyat mantığı: bütçeyi nasıl çıkarırsınız?</h2>
<p>Doğru bütçe için şu adımları izleyin: önce kullanım yerini (iç/dış) ve izleme mesafesini belirleyin, ardından bu mesafeye uygun pixel pitch aralığını seçin, sonra toplam m²'yi hesaplayın. Bu üç bilgi, fiyatın yaklaşık %80'ini belirler. Geri kalanı montaj, garanti ve içerik kalemleridir.</p>

<h2>Sık yapılan fiyat hataları</h2>
<ul>
<li><strong>Sadece panel fiyatına bakmak:</strong> Montaj, kontrol ve garanti dahil edilmediğinde bütçe şişer.</li>
<li><strong>Gereğinden küçük pitch seçmek:</strong> Uzaktan izlenen bir ekranda çok düşük pitch para israfıdır.</li>
<li><strong>Tek tedarikçiden teklif almak:</strong> Karşılaştırma yapılmadığında ortalamanın üzerinde ödeme riski oluşur.</li>
</ul>

<h2>En uygun fiyatı nasıl alırsınız?</h2>
<p>LED ekran pazarında fiyatlar tedarikçiden tedarikçiye ciddi şekilde değişir. Tek tek firmalarla görüşmek yerine ihtiyacınızı tek bir formla bize iletin; biz birden fazla tedarikçiden teklif toplayıp teknik olarak karşılaştırır ve ihtiyacınıza en uygun fiyatlı çözümü size sunarız. Böylece hem zaman kazanır hem de gerçek piyasa fiyatını görürsünüz.</p>
`,
  },
  {
    slug: "ic-mekan-vs-dis-mekan-led-ekran-farklari",
    title: "İç Mekân ve Dış Mekân LED Ekran Farkları: Hangisini Seçmeli?",
    description:
      "İç mekân ve dış mekân LED ekran arasındaki parlaklık, IP koruma, pixel pitch ve fiyat farkları. Projeniz için doğru tipi seçme rehberi.",
    excerpt:
      "Parlaklık, IP koruma, pixel pitch ve maliyet açısından iç mekân ve dış mekân LED ekranlar nasıl ayrışır? Projeniz için doğru tipi seçmenin yolunu anlatıyoruz.",
    date: "2025-02-04",
    readingTime: "7 dk",
    category: "Teknik Rehber",
    image: "/images/ic-mekan-avm-led-ekran.png",
    imageAlt: "İç mekân AVM LED ekranı ile iç ve dış mekân farkları karşılaştırması",
    keywords: ["iç mekan led ekran fiyat", "dış mekan led ekran fiyat", "led ekran farkları"],
    faqs: [
      { q: "İç mekân ekranı dışarıda kullanılır mı?", a: "Önerilmez. İç mekân ekranlar düşük parlaklık ve IP korumasına sahip olduğundan güneş ve yağışta yetersiz kalır." },
      { q: "Dış mekân ekranı içeride kullanılabilir mi?", a: "Teknik olarak mümkün ancak yüksek parlaklık gözü yorar ve maliyet açısından gereksizdir." },
      { q: "Hangisi daha pahalı?", a: "Dış mekân ekranlar yüksek parlaklık ve IP65 koruma nedeniyle genellikle daha maliyetlidir." },
    ],
    content: `
<p>LED ekran projelerinde verilen ilk ve en kritik karar, ekranın <strong>iç mekân mı yoksa dış mekân mı</strong> kullanılacağıdır. Bu karar; parlaklıktan koruma sınıfına, pixel pitch'ten fiyata kadar projenin tamamını şekillendirir. Yanlış tip seçimi hem bütçe hem de okunabilirlik açısından ciddi sorunlara yol açar.</p>

<h2>Temel fark: parlaklık (nit)</h2>
<p>En belirgin fark parlaklıktır. İç mekân ekranlar kontrollü aydınlatma ortamında çalıştığı için 600–1.200 nit yeterlidir. Dış mekân ekranlar ise doğrudan güneş ışığı altında okunabilmek için 5.000–8.000 nit parlaklık gerektirir. Bu fark, LED ve sürücü maliyetine doğrudan yansır.</p>

<h2>IP koruma sınıfı</h2>
<p>Dış mekân ekranlar yağmur, toz ve neme karşı korunmalıdır. Bu nedenle ön ve arka yüzeyde IP65 koruma standardı aranır. İç mekân ekranlarda ise IP30–IP40 yeterlidir. IP koruma, dış mekân panelin dayanıklılığını ve ömrünü belirleyen en önemli teknik kriterdir.</p>

<h2>Pixel pitch ve izleme mesafesi</h2>
<p>İç mekân ekranlar genellikle yakından izlenir; bu yüzden P1.2–P4 gibi düşük pitch değerleri tercih edilir. Dış mekân ekranlar uzaktan izlendiği için P4–P10 aralığı yeterli ve ekonomiktir. İzleme mesafesi arttıkça daha yüksek pitch seçmek hem görüntü kalitesinden ödün vermeden hem de maliyetten tasarruf sağlar.</p>

<h2>Kabin ve soğutma</h2>
<p>Dış mekân kabinler su geçirmez, dayanıklı ve genellikle aktif/pasif soğutmaya sahiptir. İç mekân kabinler daha ince, hafif ve çoğunlukla fansız (sessiz) tasarlanır. Toplantı odası veya stüdyo gibi sessizlik gereken yerlerde fansız iç mekân panel önemli bir avantajdır.</p>

<h2>Fiyat karşılaştırması</h2>
<p>Genel kural olarak dış mekân ekranlar, yüksek parlaklık ve koruma gereksinimleri nedeniyle iç mekân ekranlardan daha maliyetlidir. Ancak iç mekân fine pitch ekranlar, çok düşük pitch nedeniyle dış mekân ekranlardan dahi pahalı olabilir. Bu yüzden fiyatı tek başına iç/dış ayrımı değil, pitch ile birlikte değerlendirmek gerekir.</p>

<h2>Hangi durumda hangisi?</h2>
<ul>
<li><strong>AVM ortak alanı, mağaza, lobi, toplantı odası:</strong> İç mekân ekran.</li>
<li><strong>Bina cephesi, billboard, meydan, stadyum:</strong> Dış mekân ekran.</li>
<li><strong>Cam cephe ve vitrin:</strong> Transparent (şeffaf) ekran, ortam koşuluna göre.</li>
<li><strong>Etkinlik ve sahne:</strong> İç/dış panel seçenekli rental ekran.</li>
</ul>

<h2>Sık yapılan hata: yanlış ortam için ekran almak</h2>
<p>En sık karşılaşılan hata, maliyeti düşürmek için dış mekâna iç mekân ekran koymaktır. Sonuç; güneşte okunmayan, neme dayanamayan ve kısa sürede arızalanan bir ekrandır. Doğru tip, uzun vadede en ekonomik çözümdür.</p>

<h2>Doğru kararı birlikte verelim</h2>
<p>İç mi dış mı, hangi pitch, hangi parlaklık? Bu soruların net cevabı projenizin detaylarında gizlidir. Fiyat al formunu doldurun; ihtiyacınızı analiz edip doğru tipi belirleyelim ve birden fazla tedarikçiden en uygun teklifi karşılaştırmalı sunalım.</p>
`,
  },
  {
    slug: "pixel-pitch-nasil-secilir",
    title: "Pixel Pitch Nasıl Seçilir? İzleme Mesafesine Göre Doğru Pitch",
    description:
      "Pixel pitch nedir, izleme mesafesine göre P2, P4, P10 nasıl seçilir? Doğru pitch ile hem görüntü kalitesi hem de bütçeyi optimize etme rehberi.",
    excerpt:
      "Pixel pitch, LED ekranın netliğini ve fiyatını belirleyen en kritik değerdir. İzleme mesafesine göre doğru pitch'i nasıl seçeceğinizi adım adım anlatıyoruz.",
    date: "2025-02-18",
    readingTime: "7 dk",
    category: "Teknik Rehber",
    image: "/images/led-pixel-makro-rgb.png",
    imageAlt: "LED ekran piksellerinin makro çekimi ile pixel pitch seçim rehberi",
    keywords: ["pixel pitch nedir", "p10 led ekran fiyat", "pixel pitch seçimi"],
    faqs: [
      { q: "Pixel pitch nedir?", a: "İki LED merkezinin arasındaki mesafedir, milimetre ile ifade edilir. P2.5, iki piksel arasının 2,5 mm olduğu anlamına gelir." },
      { q: "Düşük pitch her zaman daha mı iyi?", a: "Hayır. Uzaktan izlenen bir ekranda düşük pitch fark edilmez ve gereksiz maliyet oluşturur. Doğru pitch, izleme mesafesine göre seçilendir." },
      { q: "P10 ne için uygun?", a: "P10, 15 metre ve üzeri mesafeden izlenen büyük dış mekân ekranlar için ekonomik ve yeterli bir seçimdir." },
    ],
    content: `
<p>LED ekran satın alırken duyacağınız en teknik terim <strong>pixel pitch</strong>tir. Doğru pitch seçimi, hem ekranınızın ne kadar net görüneceğini hem de ne kadar ödeyeceğinizi belirler. Bu rehberde pixel pitch'in ne olduğunu ve izleme mesafesine göre nasıl seçileceğini sade bir dille anlatıyoruz.</p>

<h2>Pixel pitch nedir?</h2>
<p>Pixel pitch, ekrandaki iki komşu pikselin merkezleri arasındaki mesafedir ve milimetre cinsinden ölçülür. P2.5 ifadesi, pikseller arası mesafenin 2,5 mm olduğunu gösterir. Değer küçüldükçe pikseller sıklaşır, görüntü netleşir; değer büyüdükçe pikseller seyrekleşir ve ekran ancak uzaktan net görünür.</p>

<h2>Pitch ile çözünürlük ilişkisi</h2>
<p>Aynı boyuttaki iki ekrandan pitch'i düşük olan, çok daha fazla piksel barındırır ve daha yüksek çözünürlük sunar. Ancak bu daha fazla LED, sürücü ve maliyet demektir. Bu yüzden &quot;ne kadar düşük o kadar iyi&quot; yaklaşımı yanlıştır; amaç, izleme mesafesine uygun en ekonomik pitch'i bulmaktır.</p>

<h2>İzleme mesafesine göre pitch seçimi</h2>
<p>Pratik bir başlangıç kuralı: minimum ideal izleme mesafesi (metre), pitch değerine yaklaşık olarak eşittir. Yani P4 bir ekran için ideal izleme mesafesi yaklaşık 4 metreden başlar. Aşağıdaki yaklaşık eşleştirme çoğu proje için yol göstericidir:</p>
<ul>
<li><strong>P0.9 – P1.5 (Fine pitch):</strong> 1–3 m. Kontrol odası, kurumsal lobi, stüdyo.</li>
<li><strong>P1.8 – P2.5:</strong> 2–4 m. AVM ortak alanı, mağaza, toplantı odası.</li>
<li><strong>P3 – P4:</strong> 4–8 m. Sahne, iç mekân büyük ekran, showroom.</li>
<li><strong>P5 – P6:</strong> 8–12 m. Dış mekân orta ölçek, cephe.</li>
<li><strong>P8 – P10:</strong> 12 m+ . Billboard, meydan, stadyum.</li>
</ul>

<h2>Yakından izlenen ekranda yüksek pitch hatası</h2>
<p>2 metreden izlenecek bir toplantı odası ekranında P6 kullanmak, pikselleri tek tek görünür kılar ve görüntüyü kaba gösterir. Bu mesafede P1.5–P2.5 gerekir. Tersine, 20 metreden izlenen bir cephe ekranında P2 kullanmak, gözle fark edilmeyecek bir netliğe yüksek bütçe harcamak demektir.</p>

<h2>Pitch dışında dikkat edilecekler</h2>
<p>Doğru pitch tek başına yeterli değildir. Refresh rate (kamera önünde titremesizlik için ≥3.840 Hz), parlaklık (ortam ışığına uygun nit), gri seviye ve kalibrasyon da nihai görüntü kalitesini belirler. Özellikle yayın ve canlı kayıt yapılacak ekranlarda yüksek refresh rate şarttır.</p>

<h2>Bütçe ve pitch dengesi</h2>
<p>Pitch küçüldükçe metrekare maliyeti hızla artar. Bu nedenle doğru strateji, izleme mesafesini gerçekçi belirleyip o mesafeye uygun en yüksek (yani en ekonomik) pitch'i seçmektir. Böylece görüntü kalitesinden ödün vermeden bütçeyi optimize edersiniz.</p>

<h2>Pitch seçiminde emin değil misiniz?</h2>
<p>İzleme mesafenizi ve kullanım yerinizi fiyat al formunda belirtmeniz yeterli; size en uygun pixel pitch aralığını önerip farklı tedarikçilerden karşılaştırmalı teklif sunalım. Pixel pitch karşılaştırmasının tamamı için <a href="/pixel-pitch-rehberi">pixel pitch rehberi</a> sayfamıza da göz atabilirsiniz.</p>
`,
  },
  {
    slug: "led-ekran-kurulum-maliyeti-neleri-kapsar",
    title: "LED Ekran Kurulum Maliyeti Neleri Kapsar?",
    description:
      "LED ekran kurulum maliyetini oluşturan konstrüksiyon, montaj, elektrik, kontrol ve test kalemleri. Sürpriz maliyetlerden kaçınma rehberi.",
    excerpt:
      "Panel fiyatı buzdağının görünen kısmı. LED ekran kurulum maliyetini oluşturan konstrüksiyon, montaj, elektrik ve test kalemlerini tek tek açıklıyoruz.",
    date: "2025-03-05",
    readingTime: "6 dk",
    category: "Fiyat Rehberi",
    image: "/images/led-kurulum-teknisyen.png",
    imageAlt: "Teknisyenlerin LED video wall kurulumu ile kurulum maliyeti rehberi",
    keywords: ["led ekran kurulum maliyeti", "led ekran montaj fiyat", "led ekran fiyat"],
    faqs: [
      { q: "Kurulum maliyeti panel fiyatına dahil mi?", a: "Genellikle hayır. Konstrüksiyon, montaj işçiliği ve elektrik altyapısı ayrı kalemlerdir; teklif alırken bunların dahil olup olmadığını netleştirmek gerekir." },
      { q: "En büyük kurulum kalemi nedir?", a: "Çelik konstrüksiyon ve yüksekte montaj işçiliği, kurulum maliyetinin en büyük kalemleri arasındadır." },
      { q: "Kurulumu kendim yaptırabilir miyim?", a: "Mümkün ancak garanti ve güvenlik açısından deneyimli ekiple çalışmak önerilir. Teklife montajı dahil ederek karşılaştırma yapabilirsiniz." },
    ],
    content: `
<p>LED ekran bütçesi hazırlarken en sık yapılan hata, sadece panel fiyatına odaklanmaktır. Oysa <strong>LED ekran kurulum maliyeti</strong>; konstrüksiyondan elektrik altyapısına, montaj işçiliğinden teste kadar birçok kalemi kapsar ve toplam bütçenin önemli bir bölümünü oluşturabilir. Bu rehberde kurulum maliyetini oluşturan tüm kalemleri açıklıyoruz.</p>

<h2>1. Taşıyıcı konstrüksiyon</h2>
<p>Ekranın monte edileceği çelik konstrüksiyon veya askı sistemi, kurulumun temelidir. Cephe, duvar veya zemin montajına göre tasarlanır. Statik hesabı ve malzeme kalitesi hem güvenliği hem de maliyeti belirler. Büyük dış mekân ekranlarda konstrüksiyon, tek başına ciddi bir kalemdir.</p>

<h2>2. Montaj işçiliği</h2>
<p>Kabinlerin hizalanması, sabitlenmesi ve modüllerin birleştirilmesi uzman işçilik gerektirir. Yüksekte çalışma, vinç veya iskele ihtiyacı işçilik maliyetini artırır. Hatalı montaj; görüntüde kesiklik, gölgelenme ve uzun vadede arıza demektir.</p>

<h2>3. Elektrik altyapısı</h2>
<p>LED ekranlar belirli bir güç çeker ve düzenli, topraklanmış bir besleme hattı gerektirir. Pano, kablolama, sigorta ve gerektiğinde regülatör/UPS bu kaleme dahildir. Yetersiz elektrik altyapısı, görüntü dalgalanması ve donanım ömrünün kısalmasına yol açar.</p>

<h2>4. Kontrol ve sinyal sistemi</h2>
<p>Sending card, receiver kartları, sinyal kabloları ve içerik oynatıcı bilgisayar/medya oynatıcı kurulumu da maliyetin parçasıdır. Uzaktan içerik yönetimi isteniyorsa internet bağlantısı ve yazılım kurulumu eklenir.</p>

<h2>5. Kalibrasyon ve test</h2>
<p>Kurulum sonrası renk kalibrasyonu, parlaklık ayarı ve modül uyumlandırma yapılır. Bu adım, ekranın tek parça ve homojen görünmesini sağlar. Test süreci atlandığında renk farkları ve ölü pikseller fark edilmeden teslim alınabilir.</p>

<h2>6. Lojistik ve nakliye</h2>
<p>Panellerin sahaya taşınması, ambalaj ve gerektiğinde gümrük kalemleri de göz önünde bulundurulmalıdır. Özellikle şehir dışı projelerde nakliye, bütçeye eklenmesi gereken bir kalemdir.</p>

<h2>7. Garanti, servis ve yedek modül</h2>
<p>Kurulumun ardından devreye giren garanti ve servis anlaşması, toplam sahip olma maliyetini etkiler. Yedek modül stoğu, olası arızalarda ekranın hızlı onarılmasını sağlar ve uzun vadede tasarruf getirir.</p>

<h2>Sürpriz maliyetlerden nasıl kaçınılır?</h2>
<ul>
<li><strong>Teklifin kapsamını netleştirin:</strong> Panel, konstrüksiyon, montaj ve elektriğin dahil olup olmadığını sorun.</li>
<li><strong>Saha keşfi isteyin:</strong> Montaj zorluğu ancak yerinde görülerek doğru fiyatlanır.</li>
<li><strong>Garanti şartlarını okuyun:</strong> Süre, kapsam ve servis hızı net olmalı.</li>
<li><strong>Karşılaştırmalı teklif alın:</strong> Tek tedarikçi yerine birden fazla teklifi yan yana değerlendirin.</li>
</ul>

<h2>Toplam maliyeti birlikte hesaplayalım</h2>
<p>LED ekran projenizde sürprizle karşılaşmamak için panelden montaja kadar tüm kalemleri kapsayan, karşılaştırmalı teklifler sunuyoruz. İhtiyacınızı fiyat al formuyla iletin; net ve şeffaf bir maliyet tablosuyla dönelim.</p>
`,
  },
  {
    slug: "avm-ler-icin-led-ekran-cozumleri",
    title: "AVM'ler İçin LED Ekran Çözümleri: Gelir ve Deneyim",
    description:
      "AVM'ler için iç mekân, transparent ve cephe LED ekran çözümleri. Reklam geliri, marka deneyimi ve doğru pixel pitch seçimi rehberi.",
    excerpt:
      "AVM'lerde LED ekran hem güçlü bir reklam geliri hem de marka deneyimi aracıdır. Ortak alandan cam cepheye doğru çözümü ve pitch seçimini anlatıyoruz.",
    date: "2025-03-22",
    readingTime: "7 dk",
    category: "Kullanım Alanları",
    image: "/images/ic-mekan-avm-led-ekran.png",
    imageAlt: "AVM içinde iç mekân LED reklam ekranı çözümü",
    keywords: ["avm led ekran", "iç mekan led ekran fiyat", "led ekran reklam"],
    faqs: [
      { q: "AVM'de LED ekran gelir getirir mi?", a: "Evet. Kiralanabilir LED reklam alanları, yüksek yaya trafiği sayesinde AVM'ler için sürdürülebilir bir gelir kalemi oluşturur." },
      { q: "Atrium için hangi pitch uygun?", a: "Uzaktan izlenen atrium ekranlarında P3–P4, yakından izlenen kat geçişlerinde P1.5–P2.5 uygundur." },
      { q: "Vitrin için şeffaf ekran mantıklı mı?", a: "Evet. Transparent ekran, vitrin görünürlüğünü korurken dikkat çekici dijital içerik sergilemenizi sağlar." },
    ],
    content: `
<p>Alışveriş merkezleri, yüksek yaya trafiği ve uzun ziyaret süreleriyle dijital ekran için en verimli ortamlardan biridir. Doğru kurgulanan bir <strong>AVM LED ekran çözümü</strong>; hem kiralanabilir reklam alanı sayesinde gelir getirir hem de ziyaretçi deneyimini güçlendirir. Bu yazıda AVM'lerde hangi alanda hangi ekranın kullanılacağını ele alıyoruz.</p>

<h2>AVM'de LED ekranın iki işlevi</h2>
<p>AVM'lerde LED ekranlar iki temel amaca hizmet eder. Birincisi <strong>reklam geliri</strong>: ortak alanlardaki ekranlar markalara kiralanarak düzenli gelir oluşturur. İkincisi <strong>marka deneyimi</strong>: kampanya, yönlendirme ve etkinlik içerikleriyle ziyaretçi deneyimi zenginleşir, kalış süresi artar.</p>

<h2>Ortak alan ve atrium ekranları</h2>
<p>Atrium ve geniş ortak alanlar, AVM'nin en görünür reklam noktalarıdır. Uzaktan izlendikleri için P3–P4 pitch çoğu zaman yeterli ve ekonomiktir. Asılı (hanging) veya cephe montajlı büyük ekranlar, tüm katlardan görünerek maksimum etki yaratır.</p>

<h2>Kat geçişleri ve mağaza önleri</h2>
<p>Yürüyen merdiven başları ve mağaza girişleri yakından izlenir. Buralarda P1.5–P2.5 fine/standart iç mekân ekranlar, metin ve kampanya detaylarının net görünmesini sağlar. Yüksek yaya trafiği nedeniyle bu noktalar reklam için değerlidir.</p>

<h2>Cam cephe ve vitrin: transparent ekran</h2>
<p>AVM cam cepheleri ve mağaza vitrinleri için <a href="/urunler/transparent-led-ekran">transparent (şeffaf) LED ekran</a> idealdir. %70–90 şeffaflık oranı sayesinde vitrin görünürlüğünü ve doğal ışığı korurken dikkat çekici dijital içerik sergilenir. Ferah görünüm ve güçlü görsel etki bir arada elde edilir.</p>

<h2>Dış cephe ve giriş ekranları</h2>
<p>AVM dış cephesi ve ana girişler, dışarıdan gelen ziyaretçiyi karşılar. Bu alanlarda yüksek parlaklıklı IP65 <a href="/urunler/dis-mekan-led-ekran">dış mekân LED ekran</a> kullanılır. Kampanya ve etkinlik duyuruları ile cephe canlı bir reklam yüzeyine dönüşür.</p>

<h2>İçerik yönetimi ve merkezi kontrol</h2>
<p>Birden fazla ekranın olduğu AVM'lerde merkezi içerik yönetim sistemi şarttır. Tek panelden tüm ekranların içeriği planlanır, kampanya saatleri zamanlanır ve reklam rotasyonu yönetilir. Bu, hem operasyonel kolaylık hem de reklam geliri takibi sağlar.</p>

<h2>Doğru AVM çözümü için ihtiyaç analizi</h2>
<p>Her AVM'nin mimarisi, yaya akışı ve hedefi farklıdır. Bu yüzden tek tip çözüm yerine alana özel kurgu gerekir. <a href="/kullanim-alanlari/avm">AVM kullanım alanı</a> sayfamızda detayları bulabilir, fiyat al formuyla projenizi ileterek birden fazla tedarikçiden karşılaştırmalı ve ihtiyacınıza en uygun fiyatlı teklifi alabilirsiniz.</p>
`,
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const sortedPosts = () =>
  [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
