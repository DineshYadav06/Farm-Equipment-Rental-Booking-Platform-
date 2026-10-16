"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { AppImage } from "@/components/ui/AppImage";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  const { t, locale } = useTranslation();

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-72 max-w-full mb-4">
        <AppImage
          imageId="illustration-404"
          className="w-full"
          showCredit={false}
        />
      </div>

      <div className="inline-block h-1 w-12 bg-[#d97706] mb-3 rounded-full" />
      <h1 className="text-2xl sm:text-3xl font-black text-[var(--heading)] tracking-tight">
        404 - {locale === "hi" ? "पृष्ठ नहीं मिला" : "Page Not Found"}
      </h1>
      <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md mx-auto mt-2 leading-relaxed">
        {locale === "hi"
          ? "आप जिस पृष्ठ की तलाश कर रहे हैं वह स्थानांतरित कर दिया गया है या मौजूद नहीं है।"
          : "The field plot or page you are looking for has been moved or does not exist in our database."}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>{locale === "hi" ? "मुखपृष्ठ पर लौटें" : "Return to Homepage"}</span>
        </Link>
        <Link
          href="/equipment"
          className="px-6 py-3 bg-[var(--surface)] hover:bg-[var(--bg-wheat)] text-[var(--text)] font-bold text-xs rounded-xl border border-[var(--border)] flex items-center gap-2 transition-colors"
        >
          <Compass className="w-4 h-4" />
          <span>{locale === "hi" ? "उपकरण सूची देखें" : "Browse Equipment Catalog"}</span>
        </Link>
      </div>
    </main>
  );
}
