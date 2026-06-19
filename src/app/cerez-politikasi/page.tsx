import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Çerez Politikası",
  description:
    "ledekranfiyatal.com çerez politikası. Hangi çerezleri kullandığımızı ve çerez tercihlerinizi nasıl yönetebileceğinizi öğrenin.",
  path: "/cerez-politikasi",
});

const html = `
<p>Bu Çerez Politikası, web sitemizde çerezlerin nasıl ve neden kullanıldığını açıklar.</p>

<h2>1. Çerez Nedir?</h2>
<p>Çerezler, ziyaret ettiğiniz web siteleri tarafından cihazınıza kaydedilen küçük metin dosyalarıdır. Sitenin düzgün çalışmasını ve deneyiminizin iyileştirilmesini sağlar.</p>

<h2>2. Kullandığımız Çerez Türleri</h2>
<ul>
<li><strong>Zorunlu çerezler:</strong> Sitenin temel işlevleri için gereklidir.</li>
<li><strong>Performans/analitik çerezler:</strong> Site kullanımını anonim olarak ölçmek için kullanılır (örn. Google Analytics).</li>
<li><strong>İşlevsellik çerezleri:</strong> Tercihlerinizi hatırlamak için kullanılabilir.</li>
</ul>

<h2>3. Çerezleri Yönetme</h2>
<p>Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz. Zorunlu çerezlerin engellenmesi sitenin bazı bölümlerinin çalışmamasına yol açabilir.</p>

<h2>4. Üçüncü Taraf Çerezleri</h2>
<p>Analitik ve performans ölçümü için üçüncü taraf hizmetleri (örn. Google Analytics) çerez kullanabilir. Bu hizmetlerin kendi gizlilik politikaları geçerlidir.</p>

<h2>5. Güncellemeler</h2>
<p>Bu politika güncellenebilir; güncel sürüm her zaman bu sayfada yer alır.</p>
`;

export default function Page() {
  return (
    <LegalLayout
      title="Çerez Politikası"
      breadcrumbName="Çerez Politikası"
      breadcrumbPath="/cerez-politikasi"
      html={html}
    />
  );
}
