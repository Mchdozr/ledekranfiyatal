import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Supplier } from "@/lib/db-types";
import { createSupplier, updateSupplier, deleteSupplier } from "@/app/admin/actions";
import { Plus, Trash2, Save } from "lucide-react";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded-lg border border-white/15 bg-navy-900/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-bright focus:outline-none";

export default async function SuppliersPage() {
  if (!isSupabaseConfigured()) {
    return <p className="text-muted">Supabase yapılandırılmadı.</p>;
  }

  const supabase = getSupabase();
  const { data } = await supabase
    .from("suppliers")
    .select("*")
    .order("priority", { ascending: false })
    .order("created_at", { ascending: true });
  const suppliers = (data ?? []) as Supplier[];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">Tedarikçiler</h1>
      <p className="mt-1 text-sm text-muted">
        Aranacak firmalar. Kullanım tipleri ve ürünler virgülle ayrılır (boş = tümü).
      </p>

      {/* Yeni ekle */}
      <form
        action={createSupplier}
        className="mt-6 rounded-2xl border border-cyan-bright/20 bg-navy-800/50 p-5"
      >
        <h2 className="mb-3 flex items-center gap-2 font-semibold text-white">
          <Plus className="h-4 w-4 text-cyan-bright" /> Yeni tedarikçi
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <input name="name" required placeholder="Firma adı *" className={inputCls} />
          <input name="phone" required placeholder="+90 5xx xxx xx xx *" className={inputCls} />
          <input name="city" placeholder="Şehir" className={inputCls} />
          <input
            name="usage_types"
            placeholder="ic-mekan, dis-mekan, kiralama"
            className={inputCls}
          />
          <input name="product_types" placeholder="ürün slug (ops.)" className={inputCls} />
          <input
            name="priority"
            type="number"
            defaultValue={0}
            placeholder="Öncelik"
            className={inputCls}
          />
          <input name="notes" placeholder="Not" className={`${inputCls} sm:col-span-2`} />
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" name="active" defaultChecked className="h-4 w-4 accent-cyan-bright" />
            Aktif
          </label>
        </div>
        <button
          type="submit"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-cyan-bright px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-white"
        >
          <Plus className="h-4 w-4" /> Ekle
        </button>
      </form>

      {/* Liste */}
      <div className="mt-6 space-y-3">
        {suppliers.length === 0 && (
          <p className="rounded-2xl border border-white/10 bg-navy-800/40 p-6 text-center text-muted">
            Henüz tedarikçi eklenmedi.
          </p>
        )}
        {suppliers.map((s) => (
          <form
            key={s.id}
            action={updateSupplier}
            className="rounded-2xl border border-white/10 bg-navy-800/50 p-4"
          >
            <input type="hidden" name="id" value={s.id} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <input name="name" defaultValue={s.name} className={inputCls} />
              <input name="phone" defaultValue={s.phone} className={inputCls} />
              <input name="city" defaultValue={s.city ?? ""} placeholder="Şehir" className={inputCls} />
              <input
                name="usage_types"
                defaultValue={s.usage_types.join(", ")}
                placeholder="kullanım tipleri"
                className={inputCls}
              />
              <input
                name="product_types"
                defaultValue={s.product_types.join(", ")}
                placeholder="ürünler"
                className={inputCls}
              />
              <input name="priority" type="number" defaultValue={s.priority} className={inputCls} />
              <input
                name="notes"
                defaultValue={s.notes ?? ""}
                placeholder="Not"
                className={`${inputCls} sm:col-span-2`}
              />
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  name="active"
                  defaultChecked={s.active}
                  className="h-4 w-4 accent-cyan-bright"
                />
                Aktif
              </label>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm text-white hover:border-cyan-bright/50"
              >
                <Save className="h-4 w-4 text-cyan-bright" /> Kaydet
              </button>
              <button
                type="submit"
                formAction={deleteSupplier}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-300 hover:border-red-400/50 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" /> Sil
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
