import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "KVKK Aydınlatma Metni",
  description:
    "ledekranfiyatal.com kişisel verilerin korunması (KVKK) aydınlatma metni. Verilerinizin hangi amaçla işlendiğini ve haklarınızı öğrenin.",
  path: "/kvkk-aydinlatma-metni",
});

const html = `
<p>İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında, veri sorumlusu sıfatıyla ${site.brand} (&quot;Platform&quot;) tarafından hazırlanmıştır. Amacımız, ${site.name} üzerinden topladığımız kişisel verilerin işlenmesine ilişkin sizi bilgilendirmektir.</p>

<h2>1. Veri Sorumlusu</h2>
<p>Kişisel verileriniz, veri sorumlusu olarak ${site.brand} tarafından aşağıda açıklanan kapsamda işlenebilecektir. İletişim: ${site.phoneDisplay}, ${site.email}.</p>

<h2>2. İşlenen Kişisel Veriler</h2>
<ul>
<li><strong>Kimlik ve iletişim bilgileri:</strong> Ad soyad, telefon numarası, e-posta adresi.</li>
<li><strong>Talep bilgileri:</strong> Projeye ilişkin teknik tercihler, kullanım alanı, şehir ve ek notlar.</li>
<li><strong>İşlem güvenliği bilgileri:</strong> Form gönderim zamanı gibi teknik kayıtlar.</li>
</ul>

<h2>3. Kişisel Verilerin İşlenme Amaçları</h2>
<ul>
<li>Talebinize uygun LED ekran tedarikçilerinden teklif toplanması ve size sunulması,</li>
<li>Sizinle iletişime geçilmesi ve teklif sürecinin yürütülmesi,</li>
<li>Hizmet kalitesinin ölçülmesi ve iyileştirilmesi,</li>
<li>Açık rıza vermeniz hâlinde kampanya ve bilgilendirmelerin iletilmesi.</li>
</ul>

<h2>4. Verilerin Aktarılması</h2>
<p>Kişisel verileriniz, yalnızca teklif sürecini yürütmek amacıyla ve gerekli olduğu ölçüde, talebinize uygun LED ekran tedarikçileriyle paylaşılabilir. Veriler, yasal yükümlülükler dışında üçüncü taraflara pazarlama amacıyla satılmaz.</p>

<h2>5. Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h2>
<p>Verileriniz, web sitemizdeki formlar ve iletişim kanalları aracılığıyla elektronik ortamda toplanır. Hukuki sebep; sözleşmenin kurulması/ifası, meşru menfaat ve açık rızanızdır.</p>

<h2>6. KVKK Kapsamındaki Haklarınız</h2>
<p>KVKK&apos;nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, düzeltilmesini veya silinmesini isteme, işlenmesine itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz.</p>

<h2>7. Başvuru</h2>
<p>Haklarınızı kullanmak için ${site.email} adresine başvurabilirsiniz. Talebiniz en kısa sürede ve en geç 30 gün içinde sonuçlandırılacaktır.</p>
`;

export default function Page() {
  return (
    <LegalLayout
      title="KVKK Aydınlatma Metni"
      breadcrumbName="KVKK Aydınlatma Metni"
      breadcrumbPath="/kvkk-aydinlatma-metni"
      html={html}
    />
  );
}
