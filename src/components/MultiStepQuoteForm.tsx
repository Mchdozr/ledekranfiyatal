"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ArrowLeft,
  ArrowRight,
  Loader2,
  PartyPopper,
  Phone,
  MessageCircle,
  Monitor,
  Sun,
  CalendarClock,
  HelpCircle,
} from "lucide-react";
import {
  quoteSchema,
  type QuoteForm,
  usageOptions,
  pitchOptions,
  applicationOptions,
} from "@/lib/quote-schema";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const steps = ["Kullanım", "Boyut", "Proje", "İletişim"];
const usageIcons = [Monitor, Sun, CalendarClock, HelpCircle];

const inputBase =
  "w-full rounded-xl border border-white/15 bg-navy-900/60 px-4 py-3 text-white placeholder:text-slate-500 transition-colors focus:border-cyan-bright focus:outline-none focus:ring-2 focus:ring-cyan-bright/30";

function Field({
  label,
  error,
  children,
  htmlFor,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-200">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function MultiStepQuoteForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuoteForm>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    defaultValues: { installation: "emin-degilim", marketing: false },
  });

  const usageType = watch("usageType");

  const stepFields: (keyof QuoteForm)[][] = [
    ["usageType"],
    [],
    ["application", "city"],
    ["fullName", "phone", "email", "kvkk"],
  ];

  const next = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: QuoteForm) => {
    setServerError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error ?? "fail");
      }
      if (typeof window !== "undefined") {
        (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
          event: "quote_submit",
          usageType: data.usageType,
          application: data.application,
          city: data.city,
        });
      }
      setDone(true);
    } catch (err) {
      const detail = err instanceof Error && err.message !== "fail" ? err.message : "";
      setServerError(
        detail ||
          "Talebiniz gönderilemedi. Lütfen tekrar deneyin veya telefonla ulaşın.",
      );
    }
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-success/30 bg-navy-800/60 p-8 text-center sm:p-12"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
          <PartyPopper className="h-8 w-8" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold text-white sm:text-3xl">
          Talebiniz alındı!
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Teşekkürler. İhtiyacınızı tedarikçilere ilettik. Genellikle{" "}
          <strong className="text-white">{site.stats.responseHours}</strong> içinde
          karşılaştırmalı teklifle size dönüş yapacağız.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-success px-6 font-semibold text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-5 w-5" /> WhatsApp&apos;tan yaz
          </a>
          <a
            href={`tel:${site.phone}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-6 font-semibold text-white hover:bg-white/5"
          >
            <Phone className="h-5 w-5 text-cyan-bright" /> {site.phoneDisplay}
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-navy-800/50 p-6 sm:p-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((label, i) => (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    i < step
                      ? "bg-success text-white"
                      : i === step
                        ? "bg-cyan-bright text-navy-900"
                        : "bg-navy-900 text-slate-500 ring-1 ring-white/10",
                  )}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "mt-1.5 hidden text-xs sm:block",
                    i === step ? "text-white" : "text-slate-500",
                  )}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 flex-1 rounded transition-colors",
                    i < step ? "bg-success" : "bg-white/10",
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1 */}
            {step === 0 && (
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  LED ekranı nerede kullanacaksınız?
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Doğru çözümü belirlememiz için ilk adım.
                </p>
                <Controller
                  control={control}
                  name="usageType"
                  render={({ field }) => (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {usageOptions.map((opt, i) => {
                        const Icon = usageIcons[i];
                        const selected = field.value === opt.value;
                        return (
                          <button
                            type="button"
                            key={opt.value}
                            onClick={() => field.onChange(opt.value)}
                            className={cn(
                              "flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
                              selected
                                ? "border-cyan-bright bg-cyan-bright/10"
                                : "border-white/10 bg-navy-900/40 hover:border-white/25",
                            )}
                          >
                            <span
                              className={cn(
                                "mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                                selected
                                  ? "bg-cyan-bright text-navy-900"
                                  : "bg-navy-800 text-cyan-bright",
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </span>
                            <span>
                              <span className="block font-semibold text-white">{opt.label}</span>
                              <span className="mt-0.5 block text-xs text-muted">{opt.desc}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
                {errors.usageType && (
                  <p className="mt-2 text-xs text-red-400">{errors.usageType.message}</p>
                )}
              </div>
            )}

            {/* Step 2 */}
            {step === 1 && (
              <div>
                <h2 className="font-display text-xl font-bold text-white">Boyut ve mesafe</h2>
                <p className="mt-1 text-sm text-muted">
                  Yaklaşık değerler yeterli. Bilmediğiniz alanları boş bırakabilirsiniz.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Genişlik (metre)" htmlFor="width">
                    <input id="width" inputMode="decimal" placeholder="Örn. 4" className={inputBase} {...register("width")} />
                  </Field>
                  <Field label="Yükseklik (metre)" htmlFor="height">
                    <input id="height" inputMode="decimal" placeholder="Örn. 2.5" className={inputBase} {...register("height")} />
                  </Field>
                  <Field label="veya Toplam Alan (m²)" htmlFor="area">
                    <input id="area" inputMode="decimal" placeholder="Örn. 10" className={inputBase} {...register("area")} />
                  </Field>
                  <Field label="İzleme Mesafesi (metre)" htmlFor="distance">
                    <input id="distance" inputMode="decimal" placeholder="Örn. 5" className={inputBase} {...register("distance")} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Pixel Pitch Tercihi" htmlFor="pixelPitch">
                      <select id="pixelPitch" className={inputBase} defaultValue="bilmiyorum" {...register("pixelPitch")}>
                        {pitchOptions.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 2 && (
              <div>
                <h2 className="font-display text-xl font-bold text-white">Proje detayı</h2>
                <p className="mt-1 text-sm text-muted">Projenizi biraz daha tanıyalım.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Kullanım Alanı" error={errors.application?.message} htmlFor="application">
                    <select id="application" className={inputBase} defaultValue="" {...register("application")}>
                      <option value="" disabled>
                        Seçiniz
                      </option>
                      {applicationOptions.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Şehir / İl" error={errors.city?.message} htmlFor="city">
                    <input id="city" placeholder="Örn. İstanbul" className={inputBase} {...register("city")} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Montaj gerekli mi?" htmlFor="installation">
                      <select id="installation" className={inputBase} {...register("installation")}>
                        <option value="evet">Evet, montaj dahil olsun</option>
                        <option value="hayir">Hayır, sadece ürün</option>
                        <option value="emin-degilim">Emin değilim</option>
                      </select>
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Ek notlar (opsiyonel)" htmlFor="notes">
                      <textarea
                        id="notes"
                        rows={3}
                        placeholder="Projeyle ilgili eklemek istedikleriniz..."
                        className={cn(inputBase, "resize-none")}
                        {...register("notes")}
                      />
                    </Field>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 3 && (
              <div>
                <h2 className="font-display text-xl font-bold text-white">İletişim bilgileri</h2>
                <p className="mt-1 text-sm text-muted">
                  Teklifleri iletebilmemiz için size nasıl ulaşalım?
                </p>
                <div className="mt-6 grid gap-4">
                  <Field label="Ad Soyad" error={errors.fullName?.message} htmlFor="fullName">
                    <input id="fullName" placeholder="Adınız ve soyadınız" className={inputBase} {...register("fullName")} />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Telefon" error={errors.phone?.message} htmlFor="phone">
                      <input id="phone" inputMode="tel" placeholder="+90 5__ ___ __ __" className={inputBase} {...register("phone")} />
                    </Field>
                    <Field label="E-posta" error={errors.email?.message} htmlFor="email">
                      <input id="email" type="email" placeholder="ornek@email.com" className={inputBase} {...register("email")} />
                    </Field>
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-navy-900/40 p-4">
                    <input type="checkbox" className="mt-1 h-4 w-4 accent-cyan-bright" {...register("kvkk")} />
                    <span className="text-sm text-slate-300">
                      <a href="/kvkk-aydinlatma-metni" target="_blank" className="text-cyan-bright underline">
                        KVKK Aydınlatma Metni
                      </a>
                      &apos;ni okudum; verilerimin teklif amacıyla işlenmesine onay veriyorum. *
                    </span>
                  </label>
                  {errors.kvkk && <p className="-mt-2 text-xs text-red-400">{errors.kvkk.message}</p>}

                  <label className="flex cursor-pointer items-start gap-3">
                    <input type="checkbox" className="mt-1 h-4 w-4 accent-cyan-bright" {...register("marketing")} />
                    <span className="text-sm text-muted">
                      Kampanya ve bilgilendirmelerden haberdar olmak istiyorum (opsiyonel).
                    </span>
                  </label>
                </div>
                {serverError && (
                  <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {serverError}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <Button type="button" variant="outline" onClick={back}>
              <ArrowLeft className="h-4 w-4" /> Geri
            </Button>
          ) : (
            <span />
          )}

          {step < steps.length - 1 ? (
            <Button type="button" onClick={next}>
              İleri <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" variant="amber" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Gönderiliyor
                </>
              ) : (
                <>
                  Teklifimi Al <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
