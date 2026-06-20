import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import { logoutAction } from "@/app/admin/actions";
import { LayoutDashboard, Building2, Settings, LogOut, Mic } from "lucide-react";
import { getCallMode, callModeLabel } from "@/lib/call-mode";

export const metadata = { title: "Admin", robots: { index: false } };

const navItems = [
  { href: "/admin", label: "Talepler", icon: LayoutDashboard },
  { href: "/admin/test", label: "Asistan testi", icon: Mic },
  { href: "/admin/suppliers", label: "Tedarikçiler", icon: Building2 },
  { href: "/admin/settings", label: "Ayarlar", icon: Settings },
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const c = await cookies();
  if (!verifyToken(c.get(ADMIN_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  const mode = getCallMode();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-navy-800/50 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-bright/50 hover:text-white"
              >
                <Icon className="h-4 w-4 text-cyan-bright" />
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-slate-500 sm:inline">{callModeLabel(mode)}</span>
          <form action={logoutAction}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-red-400/50 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" /> Çıkış
          </button>
        </form>
        </div>
      </div>
      {children}
    </div>
  );
}
