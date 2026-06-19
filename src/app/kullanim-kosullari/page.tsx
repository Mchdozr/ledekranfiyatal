import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Kullanım Koşulları",
  description:
    "ledekranfiyatal.com kullanım koşulları. Platformu kullanırken geçerli olan şartlar ve sorumluluk kapsamı.",
  path: "/kullanim-kosullari",
});

const html = `
<p>${site.name} platformunu kullanarak aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Lütfen dikkatle okuyunuz.</p>

<h2>1. Hizmetin Kapsamı</h2>
<p>${site.brand}, LED ekran almak isteyen kullanıcıları tedarikçilerle buluşturan bir teklif toplama ve karşılaştırma platformudur. Platform, doğrudan ürün satışı yapmaz; tedarikçilerden gelen teklifleri derler ve sunar.</p>

<h2>2. Fiyat ve Teklifler</h2>
<p>Platform üzerinden sunulan bilgiler ve teklifler bağlayıcı bir satış sözleşmesi oluşturmaz. Sunulan rakamlar tedarikçi tekliflerine dayanır ve değişebilir. <strong>Fiyat garantisi verilmez; en uygun teklif karşılaştırması sunulur.</strong> Nihai sözleşme, kullanıcı ile tedarikçi arasında yapılır.</p>

<h2>3. Kullanıcı Yükümlülükleri</h2>
<ul>
<li>Formlarda doğru ve güncel bilgi vermek,</li>
<li>Platformu yasalara uygun şekilde kullanmak,</li>
<li>Üçüncü kişilerin haklarını ihlal etmemek.</li>
</ul>

<h2>4. Sorumluluğun Sınırlandırılması</h2>
<p>Platform, tedarikçilerin sunduğu ürün ve hizmetlerin kalitesinden doğrudan sorumlu değildir. Tedarikçi seçimi ve sözleşme kullanıcının kendi takdirindedir. Platform, içeriğin doğruluğu için makul çabayı gösterir ancak kesintisizlik veya hatasızlık garantisi vermez.</p>

<h2>5. Fikri Mülkiyet</h2>
<p>Sitedeki tüm içerik, tasarım ve marka unsurları ${site.brand}&apos;e aittir ve izinsiz kullanılamaz.</p>

<h2>6. Değişiklikler</h2>
<p>Bu koşullar önceden bildirilmeksizin güncellenebilir. Güncel sürüm her zaman bu sayfada yayımlanır.</p>

<h2>7. İletişim</h2>
<p>Sorularınız için ${site.email} adresinden veya ${site.phoneDisplay} numarasından bize ulaşabilirsiniz.</p>
`;

export default function Page() {
  return (
    <LegalLayout
      title="Kullanım Koşulları"
      breadcrumbName="Kullanım Koşulları"
      breadcrumbPath="/kullanim-kosullari"
      html={html}
    />
  );
}
