"use client";

import React from "react";
import { useTranslation } from "@/i18n/context";
import { LOCALES_LIST } from "@/i18n/config";
import { Phone, Eye, Globe, Volume2, VolumeX, ShieldAlert } from "lucide-react";

export const GovUtilityBar: React.FC = () => {
  const {
    locale,
    setLocale,
    t,
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    useNativeDigits,
    setUseNativeDigits,
    simpleMode,
    setSimpleMode,
    isSpeaking,
    stopSpeaking,
    setIsLanguageModalOpen
  } = useTranslation();

  return (
    <aside aria-label="Accessibility & Utility Toolbar" className="w-full bg-[#1e3a5f] text-white text-xs select-none">
      {/* 1. National Tricolor Strip (4px) */}
      <div className="h-1 w-full grid grid-cols-3" role="presentation">
        <div className="bg-[#ff9933]" />
        <div className="bg-[#ffffff]" />
        <div className="bg-[#138808]" />
      </div>

      {/* 2. Accessible Utility Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Skip to content & Kisan Helpline */}
        <div className="flex items-center gap-4">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:bg-amber-400 focus:text-black focus:px-2 focus:py-1 focus:rounded font-bold text-xs z-50"
          >
            {t("common", "utility.skipToContent")}
          </a>

          <div className="flex items-center gap-1.5 text-emerald-200">
            <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-medium hidden sm:inline">
              {t("common", "utility.helplineLabel")}:
            </span>
            <a
              href="tel:18001801551"
              className="font-bold text-amber-300 hover:underline tracking-wider"
              aria-label="Farmer Toll-Free Helpline Number 1800-180-1551"
            >
              1800-180-1551
            </a>
          </div>

          {/* Simple Mode Toggle */}
          <button
            onClick={() => setSimpleMode(!simpleMode)}
            className={`hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
              simpleMode
                ? "bg-amber-400 text-stone-900"
                : "bg-blue-900/60 text-slate-200 hover:bg-blue-800"
            }`}
            title="Simplified interface with larger text for easy booking"
          >
            <span>{simpleMode ? "✓ Simple Mode (सरल)" : "Simple Mode"}</span>
          </button>
        </div>

        {/* Right: Accessibility controls, Digit Style & Language */}
        <div className="flex items-center gap-3">
          {/* Stop audio if playing */}
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="inline-flex items-center gap-1 bg-red-600 text-white px-2 py-0.5 rounded text-[11px] font-bold animate-pulse"
              title="Stop Voice Narration"
            >
              <VolumeX className="w-3 h-3" />
              <span>{t("common", "actions.stopListening")}</span>
            </button>
          )}

          {/* Text Size (A- A A+) */}
          <div className="inline-flex items-center rounded bg-blue-900/80 p-0.5 border border-blue-700/50">
            <span className="sr-only">{t("common", "utility.textSize")}</span>
            <button
              onClick={() => setTextSize("sm")}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                textSize === "sm" ? "bg-amber-400 text-stone-900" : "text-slate-200 hover:text-white"
              }`}
              title="Small Text"
              aria-label="Decrease text size"
            >
              A-
            </button>
            <button
              onClick={() => setTextSize("md")}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                textSize === "md" ? "bg-amber-400 text-stone-900" : "text-slate-200 hover:text-white"
              }`}
              title="Standard Text"
              aria-label="Default text size"
            >
              A
            </button>
            <button
              onClick={() => setTextSize("lg")}
              className={`px-1.5 py-0.5 rounded text-[13px] font-black ${
                textSize === "lg" ? "bg-amber-400 text-stone-900" : "text-slate-200 hover:text-white"
              }`}
              title="Large Text"
              aria-label="Increase text size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`p-1 rounded text-[11px] font-medium inline-flex items-center gap-1 ${
              highContrast ? "bg-amber-400 text-stone-900" : "hover:text-amber-300"
            }`}
            title={highContrast ? t("common", "utility.normalContrast") : t("common", "utility.highContrast")}
            aria-label="Toggle high contrast accessibility mode"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">
              {highContrast ? "High Contrast On" : "Contrast"}
            </span>
          </button>

          {/* Native Digits Toggle: 123 vs Indic Script */}
          <button
            onClick={() => setUseNativeDigits(!useNativeDigits)}
            className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-blue-900/60 hover:bg-blue-800 text-[11px] font-mono border border-blue-700/50"
            title="Toggle between Latin (123) and Native Indic digits"
          >
            <span>{useNativeDigits ? "१२३ / ੧੨੩" : "123"}</span>
          </button>

          {/* Language Selector Dropdown & Full Modal Launcher */}
          <div className="relative inline-flex items-center">
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#14532d] hover:bg-[#16a34a] text-white px-2.5 py-1 rounded font-bold text-xs border border-emerald-500/50 shadow-xs transition-colors"
              aria-label="Open Indian Language Chooser"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>{LOCALES_LIST.find((l) => l.code === locale)?.nativeName || "भाषा"}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
