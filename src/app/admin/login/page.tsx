import { loginAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { Lock } from "lucide-react";

export const metadata = { title: "Admin Giriş", robots: { index: false } };

export default async function AdminLoginPage(props: PageProps<"/admin/login">) {
  const sp = await props.searchParams;
  const hasError = sp.error === "1";
  const next = typeof sp.next === "string" ? sp.next : "/admin";

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4">
      <div className="w-full rounded-3xl border border-white/10 bg-navy-800/50 p-8">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-bright/15 text-cyan-bright">
          <Lock className="h-6 w-6" />
        </span>
        <h1 className="text-center font-display text-2xl font-bold text-white">Admin Paneli</h1>
        <p className="mt-1 text-center text-sm text-muted">Devam etmek için parolayı girin.</p>

        <form action={loginAction} className="mt-6 space-y-4">
          <input type="hidden" name="next" value={next} />
          <input
            type="password"
            name="password"
            required
            autoFocus
            placeholder="Parola"
            className="w-full rounded-xl border border-white/15 bg-navy-900/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-bright focus:outline-none focus:ring-2 focus:ring-cyan-bright/30"
          />
          {hasError && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              Parola hatalı.
            </p>
          )}
          <Button type="submit" className="w-full">
            Giriş Yap
          </Button>
        </form>
      </div>
    </div>
  );
}
