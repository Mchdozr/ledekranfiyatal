import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Gizlilik Politikası",
  description:
    "ledekranfiyatal.com gizlilik politikası. Kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu öğrenin.",
  path: "/gizlilik-politikasi",
});

const html = `
<p>${site.brand} olarak gizliliğinize önem veriyoruz. Bu Gizlilik Politikası, ${site.name} üzerinden toplanan bilgilerin nasıl kullanıldığını açıklar.</p>

<h2>1. Topladığımız Bilgiler</h2>
<p>Fiyat al ve iletişim formları aracılığıyla ad soyad, telefon, e-posta ve projenize ilişkin teknik bilgileri toplarız. Ayrıca site kullanımına dair anonim analitik veriler toplanabilir.</p>

<h2>2. Bilgilerin Kullanımı</h2>
<ul>
<li>Talebinize uygun tedarikçilerden teklif toplamak ve sunmak,</li>
<li>Sizinle iletişim kurmak,</li>
<li>Hizmetlerimizi geliştirmek,</li>
<li>Yasal yükümlülükleri yerine getirmek.</li>
</ul>

<h2>3. Bilgilerin Paylaşımı</h2>
<p>Verileriniz yalnızca teklif sürecini yürütmek için gerekli tedarikçilerle paylaşılır. Bilgilerinizi pazarlama amacıyla üçüncü taraflara satmayız.</p>

<h2>4. Çerezler</h2>
<p>Web sitemiz, deneyiminizi iyileştirmek için çerezler kullanabilir. Detaylar için <a href="/cerez-politikasi">Çerez Politikası</a> sayfamızı inceleyebilirsiniz.</p>

<h2>5. Veri Güvenliği</h2>
<p>Verilerinizi yetkisiz erişime karşı korumak için uygun teknik ve idari tedbirleri alırız. Site SSL ile şifrelenmiş bağlantı üzerinden sunulur.</p>

<h2>6. Haklarınız</h2>
<p>Kişisel verilerinize ilişkin haklarınız için <a href="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</a> sayfamıza bakabilir, ${site.email} adresinden bize ulaşabilirsiniz.</p>

<h2>7. Değişiklikler</h2>
<p>Bu politika zaman zaman güncellenebilir. Güncel sürüm her zaman bu sayfada yayımlanır.</p>
`;

export default function Page() {
  return (
    <LegalLayout
      title="Gizlilik Politikası"
      breadcrumbName="Gizlilik Politikası"
      breadcrumbPath="/gizlilik-politikasi"
      html={html}
    />
  );
}
