"use client";

import React, { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { LOCALES_LIST, LocaleCode } from "@/i18n/config";
import { Dropdown } from "./Dropdown";
import { Globe, Check, ChevronDown } from "lucide-react";

export const LanguageDropdown: React.FC<{
  buttonSize?: "sm" | "md";
  showChevron?: boolean;
}> = ({ buttonSize = "sm", showChevron = true }) => {
  const { locale, setLocale, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentMeta = LOCALES_LIST.find((item) => item.code === locale) || LOCALES_LIST[0];

  const handleSelectLanguage = (code: LocaleCode) => {
    setLocale(code);
    setIsOpen(false);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      align="end"
      className="w-56 max-h-80 overflow-y-auto"
      trigger={(open, toggle, ref) => (
        <button
          ref={ref}
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={`${t("common", "utility.language")}: ${currentMeta.nativeName}`}
          className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 transition-all font-medium text-xs shadow-2xs ${
            buttonSize === "md" ? "min-h-[44px] px-3.5 py-2" : "px-3 py-1 min-h-[30px]"
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
          <span className="font-semibold text-xs tracking-normal">{currentMeta.nativeName}</span>
          {showChevron && (
            <ChevronDown
              className={`w-3 h-3 text-[#78716c] transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          )}
        </button>
      )}
    >
      <div className="py-1" role="none">
        <div className="px-3 py-1.5 text-[11px] font-semibold text-[#78716c] border-b border-[#e5e5df] mb-1">
          {t("common", "utility.language")}
        </div>
        {LOCALES_LIST.map((lang) => {
          const isSelected = lang.code === locale;
          return (
            <button
              key={lang.code}
              type="button"
              role="menuitem"
              onClick={() => handleSelectLanguage(lang.code)}
              className={`w-full flex items-center justify-between px-3 py-2 text-start rounded-xl text-xs transition-colors ${
                isSelected
                  ? "bg-[#f3f4f0] text-[#14532d] font-bold"
                  : "text-[#1e3a5f] hover:bg-[#fafaf5]"
              }`}
            >
              <div className="flex flex-col">
                <span className="font-semibold">{lang.nativeName}</span>
                <span className="text-[10px] text-[#78716c]">{lang.name}</span>
              </div>
              {isSelected && (
                <Check className="w-4 h-4 text-[#14532d] shrink-0" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </Dropdown>
  );
};
