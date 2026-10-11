"use client";

import React, { useState } from "react";
import { LOCALES_LIST, LocaleCode } from "@/i18n/config";
import { Globe, CheckCircle2, AlertCircle, FileText, Check } from "lucide-react";

import hiCommon from "@/messages/hi/common.json";
import enCommon from "@/messages/en/common.json";
import paCommon from "@/messages/pa/common.json";
import mrCommon from "@/messages/mr/common.json";
import taCommon from "@/messages/ta/common.json";
import teCommon from "@/messages/te/common.json";
import bnCommon from "@/messages/bn/common.json";
import guCommon from "@/messages/gu/common.json";
import knCommon from "@/messages/kn/common.json";
import mlCommon from "@/messages/ml/common.json";
import orCommon from "@/messages/or/common.json";
import asCommon from "@/messages/as/common.json";

const TRANSLATION_MAP: Record<LocaleCode, Record<string, unknown>> = {
  hi: hiCommon,
  en: enCommon,
  pa: paCommon,
  mr: mrCommon,
  ta: taCommon,
  te: teCommon,
  bn: bnCommon,
  gu: guCommon,
  kn: knCommon,
  ml: mlCommon,
  or: orCommon,
  as: asCommon
};

export default function DevTranslationsPage() {
  const [selectedLocale, setSelectedLocale] = useState<LocaleCode>("pa");

  const currentDict = TRANSLATION_MAP[selectedLocale] || {};
  const meta = (currentDict._meta as { status?: string }) || {};

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1 space-y-6 text-xs text-slate-700">
      <div>
        <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
          i18n Review Dashboard (भाषा सत्यापन समीक्षा)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Internal development tool for native linguists and state agronomy cells to verify translations.
        </p>
      </div>

      {/* Language Selector Buttons */}
      <div className="flex flex-wrap gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        {LOCALES_LIST.map((l) => (
          <button
            key={l.code}
            onClick={() => setSelectedLocale(l.code)}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
              selectedLocale === l.code
                ? "bg-[#14532d] text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <span>{l.nativeName} ({l.name})</span>
          </button>
        ))}
      </div>

      {/* Language Status Overview */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Active Locale: {selectedLocale.toUpperCase()} - {LOCALES_LIST.find((l) => l.code === selectedLocale)?.nativeName}
            </h2>
            <span className="text-[11px] text-slate-500">
              Script: {LOCALES_LIST.find((l) => l.code === selectedLocale)?.script} • Default Region: {LOCALES_LIST.find((l) => l.code === selectedLocale)?.defaultRegion}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Status: {meta.status || "reviewed"}</span>
          </span>
        </div>

        {/* Translation Keys JSON Preview */}
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
            Loaded Namespaces & Keys:
          </span>
          <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl overflow-x-auto text-[11px] font-mono leading-relaxed max-h-[400px]">
            {JSON.stringify(currentDict, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}
