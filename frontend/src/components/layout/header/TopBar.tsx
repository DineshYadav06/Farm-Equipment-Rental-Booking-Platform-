"use client";

import React from "react";
import { useTranslation } from "@/i18n/context";
import { SITE_CONFIG } from "@/content/site-config";
import { LanguageDropdown } from "./LanguageDropdown";
import { AccessibilityMenu } from "./AccessibilityMenu";
import { Phone } from "lucide-react";

export const TopBar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <aside
      aria-label="Government Utility & Accessibility Toolbar"
      className="bg-slate-50/95 border-b border-slate-200/80 text-slate-700 text-xs select-none transition-all duration-200"
    >
      {/* 1. First Tab Stop: Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-4 focus:z-50 focus:bg-emerald-800 focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:shadow-xl focus:font-bold focus:ring-2 focus:ring-amber-500"
      >
        {t("common", "utility.skipToContent")}
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-3">
        {/* Left: Toll-Free Helpline Pill Badge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900">
            <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
            <span className="font-medium text-[11px] text-emerald-800">
              {t("common", "utility.kisanHelpline")}:
            </span>
            <a
              href={SITE_CONFIG.helplineTel}
              className="font-bold text-emerald-700 hover:text-emerald-900 hover:underline tracking-wide"
              aria-label={`${t("common", "utility.kisanHelpline")} ${SITE_CONFIG.helplineNumber}`}
            >
              {SITE_CONFIG.helplineNumber}
            </a>
          </div>
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-500">
            • {t("common", "brand.portalType") || "Kisan Portal"}
          </span>
        </div>

        {/* Right: Language Dropdown & Accessibility Menu */}
        <div className="flex items-center gap-2">
          <LanguageDropdown />
          <AccessibilityMenu />
        </div>
      </div>
    </aside>
  );
};
