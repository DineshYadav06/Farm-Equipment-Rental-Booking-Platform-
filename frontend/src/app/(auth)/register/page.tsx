"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { LOCALES_LIST } from "@/i18n/config";
import { Logo } from "@/components/ui/Logo";
import { ShieldCheck, ArrowRight, UserCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { t, locale, localeMeta } = useTranslation();

  const [role, setRole] = useState<"farmer" | "owner">("farmer");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("Punjab");
  const [district, setDistrict] = useState("Ludhiana");
  const [preferredLang, setPreferredLang] = useState(locale);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "owner") {
      router.push("/owner/dashboard");
    } else {
      router.push("/farmer/dashboard");
    }
  };

  return (
    <main className="min-h-[85vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <Logo variant="horizontal" size="lg" tagline={localeMeta.tagline} />
        </Link>
        <h1 className="mt-6 text-2xl font-black text-[var(--heading)] tracking-tight">
          {locale === "hi" ? "नया खाता बनाएं" : "Create New Account"}
        </h1>
        <p className="mt-1 text-xs text-[var(--muted)]">
          {locale === "hi"
            ? "भारत के सत्यापित कृषि उपकरण नेटवर्क से जुड़ें"
            : "Join India's verified agricultural equipment network"}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[var(--surface)] text-[var(--text)] py-8 px-6 shadow-xl rounded-3xl border border-[var(--border)] sm:px-10">
          {/* Role Selector Tabs */}
          <div className="flex bg-[var(--bg-wheat)] p-1 rounded-2xl mb-6 border border-[var(--border)]">
            <button
              type="button"
              onClick={() => setRole("farmer")}
              className={`w-1/2 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                role === "farmer"
                  ? "bg-[#14532d] text-white shadow-xs"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {locale === "hi" ? "किसान" : "Farmer"}
            </button>
            <button
              type="button"
              onClick={() => setRole("owner")}
              className={`w-1/2 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                role === "owner"
                  ? "bg-[#14532d] text-white shadow-xs"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {locale === "hi" ? "उपकरण मालिक" : "Equipment Owner"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[var(--text)] mb-1">
                {locale === "hi" ? "पूरा नाम" : "Full Name"}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={locale === "hi" ? "उदा. सुखविंदर सिंह" : "e.g. Ramesh Patel"}
                className="w-full px-3 py-2.5 border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded-xl focus:ring-2 focus:ring-[#16a34a] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-[var(--text)] mb-1">
                {locale === "hi" ? "10 अंकों का मोबाइल नंबर" : "10-Digit Mobile Number"}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-bold text-[var(--muted)]">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="98765 43210"
                  className="w-full pl-12 pr-3 py-2.5 border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded-xl font-medium focus:ring-2 focus:ring-[#16a34a] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[var(--text)] mb-1">
                  {locale === "hi" ? "राज्य" : "State"}
                </label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded-xl font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-[var(--text)] mb-1">
                  {locale === "hi" ? "ज़िला" : "District"}
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded-xl font-medium"
                />
              </div>
            </div>

            {/* Preferred Language Field */}
            <div>
              <label className="block font-bold text-[var(--text)] mb-1">
                {locale === "hi" ? "पसंदीदा भाषा" : "Preferred Notification Language"}
              </label>
              <select
                value={preferredLang}
                onChange={(e) => setPreferredLang(e.target.value as typeof locale)}
                className="w-full px-3 py-2.5 border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] rounded-xl font-semibold"
              >
                {LOCALES_LIST.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold py-3 rounded-xl shadow-xs transition-colors mt-2 cursor-pointer"
            >
              <span>{locale === "hi" ? "पंजीकरण पूर्ण करें" : "Create Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[var(--border)] text-center text-xs text-[var(--muted)]">
            {locale === "hi" ? "पहले से खाता है? " : "Already have an account? "}
            <Link href="/login" className="font-bold text-[#14532d] dark:text-emerald-400 hover:underline">
              {t("common", "nav.login")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
