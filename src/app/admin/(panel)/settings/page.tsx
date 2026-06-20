import { getCallSettings, isSupabaseConfigured } from "@/lib/supabase";
import { updateSettings } from "@/app/admin/actions";
import { getCallMode, callModeLabel } from "@/lib/call-mode";
import { Save, ShieldAlert } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  if (!isSupabaseConfigured()) {
    return <p className="text-muted">Supabase yapılandırılmadı.</p>;
  }
  const settings = await getCallSettings();
  const mode = getCallMode();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-white">Ayarlar</h1>
      <p className="mt-1 text-sm text-muted">Çağrı motoru ve yasal parametreler.</p>

      <p className="mt-4 text-sm text-slate-400">
        Çağrı modu: <strong className="text-white">{callModeLabel(mode)}</strong> (
        <code className="text-cyan-bright">CALL_MODE</code> env). Test için{" "}
        <Link href="/admin/test" className="text-cyan-bright underline">
          Asistan testi
        </Link>
        .
      </p>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-warm/30 bg-amber-warm/5 p-4 text-sm text-amber-warm/90">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
        <p>
          KVKK uyarısı: AI sesli aramalarda görüşme başında bilgilendirme yapılması ve kayıt için
          rıza alınması önerilir. &quot;Bilgilendirme&quot; açıkken asistan kendini tanıtır ve kaydı belirtir.
        </p>
      </div>

      <form action={updateSettings} className="mt-6 space-y-5 rounded-2xl border border-white/10 bg-navy-800/50 p-6">
        <Toggle
          name="disclosureEnabled"
          checked={settings.disclosureEnabled}
          title="Çağrı başı bilgilendirme"
          desc="Asistan, ledekranfiyatal.com adına aradığını ve görüşmenin kaydedilebileceğini belirtir."
        />
        <Toggle
          name="recordingEnabled"
          checked={settings.recordingEnabled}
          title="Çağrı kaydı"
          desc="Görüşme kayıtları admin panelinde saklanır ve transkript çıkarılır."
        />
        <div>
          <label className="block text-sm font-medium text-slate-200">
            Eş zamanlı maksimum çağrı
          </label>
          <p className="mb-2 text-xs text-muted">Bir talep için aynı anda aranacak tedarikçi sayısı.</p>
          <input
            name="maxConcurrentCalls"
            type="number"
            min={1}
            max={20}
            defaultValue={settings.maxConcurrentCalls}
            className="w-32 rounded-lg border border-white/15 bg-navy-900/60 px-3 py-2 text-sm text-white focus:border-cyan-bright focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-bright px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-white"
        >
          <Save className="h-4 w-4" /> Kaydet
        </button>
      </form>
    </div>
  );
}

function Toggle({
  name,
  checked,
  title,
  desc,
}: {
  name: string;
  checked: boolean;
  title: string;
  desc: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        name={name}
        defaultChecked={checked}
        className="mt-1 h-5 w-5 accent-cyan-bright"
      />
      <span>
        <span className="block font-medium text-white">{title}</span>
        <span className="block text-xs text-muted">{desc}</span>
      </span>
    </label>
  );
}
