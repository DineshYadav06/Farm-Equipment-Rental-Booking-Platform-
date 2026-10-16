"use client";

import React, { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { SITE_CONFIG } from "@/content/site-config";
import { LocationChip } from "./LocationChip";
import { WeatherChip } from "@/components/weather/WeatherChip";
import { LocationPicker } from "./LocationPicker";
import { LanguageDropdown } from "./LanguageDropdown";
import { AccessibilityMenu } from "./AccessibilityMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Phone } from "lucide-react";

export const TopBar: React.FC = () => {
  const { t } = useTranslation();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  return (
    <>
      <aside
        aria-label="Government Utility & Accessibility Toolbar"
        className="bg-slate-50/95 dark:bg-[#151b16] border-b border-slate-200/80 dark:border-[#2e382f] text-slate-700 dark:text-slate-300 text-xs select-none transition-colors duration-150"
      >
        {/* 1. First Tab Stop: Skip to Main Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-4 focus:z-50 focus:bg-emerald-800 focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:shadow-xl focus:font-bold focus:ring-2 focus:ring-amber-500"
        >
          {t("common", "utility.skipToContent") || "Skip to main content"}
        </a>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-3">
          {/* Left: Location Chip + Weather Chip + Helpline */}
          <div className="flex items-center gap-2 min-w-0">
            {/* Location Chip */}
            <LocationChip onOpenPicker={() => setIsLocationModalOpen(true)} />

            {/* Weather Chip */}
            <WeatherChip onOpenLocationPicker={() => setIsLocationModalOpen(true)} />

            {/* Toll-Free Helpline Pill Badge */}
            <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-300 shrink-0">
              <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
              <span className="font-medium text-[11px] text-emerald-800 dark:text-emerald-300">
                {t("common", "utility.kisanHelpline") || "Helpline"}:
              </span>
              <a
                href={SITE_CONFIG.helplineTel}
                className="font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-200 hover:underline tracking-wide"
                aria-label={`${t("common", "utility.kisanHelpline") || "Helpline"} ${SITE_CONFIG.helplineNumber}`}
              >
                {SITE_CONFIG.helplineNumber}
              </a>
            </div>
          </div>

          {/* Right: Theme Toggle + Language Dropdown + Accessibility Menu */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <LanguageDropdown />
            <AccessibilityMenu />
          </div>
        </div>
      </aside>

      {/* Shared Location Picker Modal */}
      <LocationPicker
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
};
