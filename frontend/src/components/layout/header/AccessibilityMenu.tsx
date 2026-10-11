"use client";

import React, { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Dropdown } from "./Dropdown";
import { Accessibility, ChevronDown } from "lucide-react";

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
      className="w-72 p-3 space-y-3"
      trigger={(open, toggle, ref) => (
        <button
          ref={ref}
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={t("common", "utility.accessibilityMenu")}
          className="inline-flex items-center gap-1.5 px-3 py-1 min-h-[30px] rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 transition-all font-medium text-xs shadow-2xs"
        >
          <Accessibility className="w-3.5 h-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
          <span className="font-semibold text-xs hidden sm:inline">
            {t("common", "utility.accessibilityMenu")}
          </span>
          <ChevronDown
            className={`w-3 h-3 text-[#78716c] transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      )}
    >
      <div role="none" className="space-y-3">
        <div className="pb-1.5 border-b border-[#e5e5df]">
          <span className="font-bold text-xs text-[#1e3a5f]">
            {t("common", "utility.accessibilityMenu")}
          </span>
        </div>

        {/* 1. Text Size Scaling */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-[#78716c]">
            {t("common", "utility.textSize")}
          </span>
          <div className="flex items-center gap-1.5 bg-[#f3f4f0] p-1 rounded-xl">
            <button
              type="button"
              onClick={() => handleTextSize("sm")}
              aria-pressed={textSize === "sm"}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                textSize === "sm"
                  ? "bg-white text-[#14532d] shadow-xs"
                  : "text-[#1e3a5f] hover:bg-white/50"
              }`}
            >
              {t("common", "utility.textSmall")} (A-)
            </button>
            <button
              type="button"
              onClick={() => handleTextSize("md")}
              aria-pressed={textSize === "md"}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                textSize === "md"
                  ? "bg-white text-[#14532d] shadow-xs"
                  : "text-[#1e3a5f] hover:bg-white/50"
              }`}
            >
              {t("common", "utility.textDefault")} (A)
            </button>
            <button
              type="button"
              onClick={() => handleTextSize("lg")}
              aria-pressed={textSize === "lg"}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                textSize === "lg"
                  ? "bg-white text-[#14532d] shadow-xs"
                  : "text-[#1e3a5f] hover:bg-white/50"
              }`}
            >
              {t("common", "utility.textLarge")} (A+)
            </button>
          </div>
        </div>

        {/* 2. High Contrast Toggle */}
        <div className="flex items-center justify-between pt-1 border-t border-[#e5e5df]">
          <span className="text-xs font-medium text-[#1e3a5f]">
            {t("common", "utility.highContrast")}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={highContrast}
            onClick={handleContrastToggle}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#14532d] ${
              highContrast ? "bg-[#14532d]" : "bg-[#d6d3d1]"
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                highContrast ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* 3. Simple Mode Toggle */}
        <div className="flex items-center justify-between pt-1 border-t border-[#e5e5df]">
          <span className="text-xs font-medium text-[#1e3a5f]">
            {t("common", "utility.simpleMode")}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={simpleMode}
            onClick={handleSimpleModeToggle}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#14532d] ${
              simpleMode ? "bg-[#14532d]" : "bg-[#d6d3d1]"
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                simpleMode ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* 4. Digit Style Toggle (123 / Native Indic Digits) */}
        <div className="flex items-center justify-between pt-1 border-t border-[#e5e5df]">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-[#1e3a5f]">
              {t("common", "utility.digitsToggle")}
            </span>
            <span className="text-[10px] text-[#78716c]">
              {useNativeDigits ? t("common", "utility.digitsNative") : t("common", "utility.digitsLatin")}
            </span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={useNativeDigits}
            onClick={handleDigitToggle}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#14532d] ${
              useNativeDigits ? "bg-[#14532d]" : "bg-[#d6d3d1]"
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                useNativeDigits ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </Dropdown>
  );
};
