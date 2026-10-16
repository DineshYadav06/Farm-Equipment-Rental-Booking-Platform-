"use client";

import React, { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { useTheme } from "@/components/theme/ThemeContext";
import { Dropdown } from "./Dropdown";
import { Accessibility, ChevronDown, Sun, Moon, Laptop } from "lucide-react";
import { ThemeMode } from "@/constants/tokens";

export const AccessibilityMenu: React.FC = () => {
  const {
    t,
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    simpleMode,
    setSimpleMode,
    useNativeDigits,
    setUseNativeDigits
  } = useTranslation();

  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Persistence helper
  const persistSetting = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
      document.cookie = `${key}=${value}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore
    }
  };

  const handleTextSize = (size: "sm" | "md" | "lg") => {
    setTextSize(size);
    persistSetting("farmrenthub_text_size", size);
  };

  const handleContrastToggle = () => {
    const nextVal = !highContrast;
    setHighContrast(nextVal);
    persistSetting("farmrenthub_contrast", nextVal ? "high" : "normal");
  };

  const handleSimpleModeToggle = () => {
    const nextVal = !simpleMode;
    setSimpleMode(nextVal);
    persistSetting("farmrenthub_simple", String(nextVal));
  };

  const handleDigitToggle = () => {
    const nextVal = !useNativeDigits;
    setUseNativeDigits(nextVal);
    persistSetting("farmrenthub_native_digits", String(nextVal));
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      align="end"
      className="w-72 p-3 space-y-3 bg-white dark:bg-[#1a211b] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-[#2e382f]"
      trigger={(open, toggle, ref) => (
        <button
          ref={ref}
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={t("common", "utility.accessibilityMenu") || "Accessibility Options"}
          className="inline-flex items-center gap-1.5 px-3 py-1 min-h-[30px] rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 transition-colors font-medium text-xs shadow-2xs"
        >
          <Accessibility className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
          <span className="font-semibold text-xs hidden sm:inline">
            {t("common", "utility.accessibilityMenu") || "Accessibility"}
          </span>
          <ChevronDown
            className={`w-3 h-3 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      )}
    >
      <div role="none" className="space-y-3">
        <div className="pb-1.5 border-b border-slate-100 dark:border-slate-800">
          <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
            {t("common", "utility.accessibilityMenu") || "Accessibility"}
          </span>
        </div>

        {/* 1. Theme Selection: Light, Dark, System */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {t("common", "theme.title") || "Theme"}
          </span>
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {(["light", "dark", "system"] as ThemeMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setTheme(mode)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center justify-center gap-1 ${
                  theme === mode
                    ? "bg-white dark:bg-[#14532d] text-emerald-800 dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700"
                }`}
              >
                {mode === "light" && <Sun className="w-3 h-3 text-amber-600" />}
                {mode === "dark" && <Moon className="w-3 h-3 text-amber-400" />}
                {mode === "system" && <Laptop className="w-3 h-3 text-slate-400" />}
                <span className="capitalize">{t("common", `theme.${mode}`) || mode}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Text Size Scaling */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {t("common", "utility.textSize") || "Text Size"}
          </span>
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => handleTextSize("sm")}
              aria-pressed={textSize === "sm"}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                textSize === "sm"
                  ? "bg-white dark:bg-[#14532d] text-emerald-800 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700"
              }`}
            >
              {t("common", "utility.textSmall") || "A-"}
            </button>
            <button
              type="button"
              onClick={() => handleTextSize("md")}
              aria-pressed={textSize === "md"}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                textSize === "md"
                  ? "bg-white dark:bg-[#14532d] text-emerald-800 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700"
              }`}
            >
              {t("common", "utility.textDefault") || "A"}
            </button>
            <button
              type="button"
              onClick={() => handleTextSize("lg")}
              aria-pressed={textSize === "lg"}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                textSize === "lg"
                  ? "bg-white dark:bg-[#14532d] text-emerald-800 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700"
              }`}
            >
              {t("common", "utility.textLarge") || "A+"}
            </button>
          </div>
        </div>

        {/* 3. High Contrast Toggle */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
            {t("common", "utility.highContrast") || "High Contrast"}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={highContrast}
            onClick={handleContrastToggle}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 ${
              highContrast ? "bg-emerald-700" : "bg-slate-300 dark:bg-slate-700"
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                highContrast ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* 4. Simple Mode Toggle */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
            {t("common", "utility.simpleMode") || "Simple Mode"}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={simpleMode}
            onClick={handleSimpleModeToggle}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 ${
              simpleMode ? "bg-emerald-700" : "bg-slate-300 dark:bg-slate-700"
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                simpleMode ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* 5. Digit Style Toggle (123 / Native Indic Digits) */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
              {t("common", "utility.digitsToggle") || "Number Style"}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              {useNativeDigits ? t("common", "utility.digitsNative") || "Native Digits" : t("common", "utility.digitsLatin") || "123 (Latin)"}
            </span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={useNativeDigits}
            onClick={handleDigitToggle}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 ${
              useNativeDigits ? "bg-emerald-700" : "bg-slate-300 dark:bg-slate-700"
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                useNativeDigits ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </Dropdown>
  );
};
