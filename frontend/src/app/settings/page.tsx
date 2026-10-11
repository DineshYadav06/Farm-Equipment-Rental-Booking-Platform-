"use client";

import React, { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { LOCALES_LIST } from "@/i18n/config";
import { LAND_UNITS } from "@/i18n/formatters";
import {
  Globe,
  Hash,
  Type,
  Sliders,
  CheckCircle2,
  MapPin,
  Eye,
  ShieldCheck
} from "lucide-react";

export default function SettingsPage() {
  const {
    t,
    locale,
    setLocale,
    useNativeDigits,
    setUseNativeDigits,
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    simpleMode,
    setSimpleMode
  } = useTranslation();

  const [selectedLandUnit, setSelectedLandUnit] = useState("acre");
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1 space-y-6">
      {/* Title */}
      <div>
        <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
          {t("common", "nav.settings")} (प्राथमिकताएं व सेटिंग्स)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Customize your display language, numeral scripts, text scaling, and regional land measurement units.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 text-xs">
        {/* 1. Language Preference */}
        <div className="space-y-2 border-b border-slate-100 pb-5">
          <label className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#14532d]" />
            <span>Platform Language (मंच की भाषा - 12 भारतीय भाषाएं)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            {LOCALES_LIST.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLocale(l.code)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  locale === l.code
                    ? "bg-[#dcfce7] border-[#16a34a] font-bold text-[#14532d]"
                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="text-sm font-bold">{l.nativeName}</div>
                <div className="text-[10px] text-slate-400">{l.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Number Digit Style Toggle (123 vs Indic Digits) */}
        <div className="space-y-2 border-b border-slate-100 pb-5">
          <label className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Hash className="w-4 h-4 text-[#14532d]" />
            <span>Number Display Style (अंकों की शैली)</span>
          </label>
          <p className="text-slate-500 text-xs">
            Choose whether to show numbers and prices in Latin numerals (123) or local Indic script (१२३ / ੧੨੩).
          </p>
          <div className="flex gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
              <input
                type="radio"
                name="digits"
                checked={!useNativeDigits}
                onChange={() => setUseNativeDigits(false)}
                className="text-[#14532d]"
              />
              <span>Standard Latin Digits: 1, 2, 3, 4 (Recommended for prices)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
              <input
                type="radio"
                name="digits"
                checked={useNativeDigits}
                onChange={() => setUseNativeDigits(true)}
                className="text-[#14532d]"
              />
              <span>Native Script Digits: ०, १, २, ३</span>
            </label>
          </div>
        </div>

        {/* 3. Text Scaling & Simple Mode */}
        <div className="space-y-4 border-b border-slate-100 pb-5">
          <label className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Type className="w-4 h-4 text-[#14532d]" />
            <span>Accessibility & Reading Size (अक्षर आकार व सरल मोड)</span>
          </label>

          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-700">Text Size:</span>
            <div className="inline-flex rounded-xl border border-slate-300 p-1 bg-slate-50">
              <button
                type="button"
                onClick={() => setTextSize("sm")}
                className={`px-3 py-1 rounded-lg font-bold text-xs ${
                  textSize === "sm" ? "bg-[#14532d] text-white" : "text-slate-700"
                }`}
              >
                Small (A-)
              </button>
              <button
                type="button"
                onClick={() => setTextSize("md")}
                className={`px-3 py-1 rounded-lg font-bold text-xs ${
                  textSize === "md" ? "bg-[#14532d] text-white" : "text-slate-700"
                }`}
              >
                Standard (A)
              </button>
              <button
                type="button"
                onClick={() => setTextSize("lg")}
                className={`px-3 py-1 rounded-lg font-bold text-xs ${
                  textSize === "lg" ? "bg-[#14532d] text-white" : "text-slate-700"
                }`}
              >
                Large (A+)
              </button>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={simpleMode}
              onChange={(e) => setSimpleMode(e.target.checked)}
              className="w-4 h-4 text-[#14532d] rounded"
            />
            <div>
              <span className="font-bold text-slate-900 block">
                Enable Simple Mode (सरल मोड - बड़े बटन व आसान लेआउट)
              </span>
              <span className="text-slate-500">
                Optimized high-clarity interface with fewer choices per screen for low-literacy farmers.
              </span>
            </div>
          </label>
        </div>

        {/* 4. Regional Land Measurement Unit */}
        <div className="space-y-2">
          <label className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#14532d]" />
            <span>Default Land Unit for Machine Quotes (भूमि मापक इकाई)</span>
          </label>
          <select
            value={selectedLandUnit}
            onChange={(e) => setSelectedLandUnit(e.target.value)}
            className="w-full sm:w-80 px-3 py-2 border border-slate-300 rounded-xl font-semibold bg-white"
          >
            {Object.values(LAND_UNITS).map((u) => (
              <option key={u.key} value={u.key}>
                {u.key.toUpperCase()} ({u.regions.join(", ")})
              </option>
            ))}
          </select>
        </div>

        {/* Save Button */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-100">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold rounded-xl shadow-xs transition-colors"
          >
            Save Preferences (सेटिंग्स सहेजें)
          </button>

          {saveToast && (
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Preferences saved!</span>
            </span>
          )}
        </div>
      </div>
    </main>
  );
}
