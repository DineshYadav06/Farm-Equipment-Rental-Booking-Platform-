"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "@/i18n/context";
import { LOCALES_LIST } from "@/i18n/config";
import { ALL_LAND_UNITS } from "@/content/land-units";
import { searchAlertsService, SearchAlert } from "@/services/alerts";
import {
  Globe,
  Hash,
  Type,
  Sliders,
  CheckCircle2,
  MapPin,
  Eye,
  ShieldCheck,
  Bell,
  Trash2
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
  const [alerts, setAlerts] = useState<SearchAlert[]>([]);

  const loadAlerts = async () => {
    const list = await searchAlertsService.getAlerts();
    setAlerts(list);
  };

  useEffect(() => {
    loadAlerts();

    const handleAlertsChanged = () => {
      loadAlerts();
    };

    window.addEventListener("farmrenthub_alerts_changed", handleAlertsChanged);
    return () => {
      window.removeEventListener("farmrenthub_alerts_changed", handleAlertsChanged);
    };
  }, []);

  const handleDeleteAlert = async (id: string) => {
    await searchAlertsService.deleteAlert(id);
    loadAlerts();
  };

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1 space-y-6">
      {/* Title */}
      <div>
        <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] dark:text-white tracking-tight">
          {t("common", "nav.settings")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Customize your display language, numeral scripts, text scaling, regional land measurement units, and saved search notifications.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 text-xs">
        {/* 1. Language Preference */}
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
          <label className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#14532d] dark:text-emerald-400" />
            <span>Platform Language</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            {LOCALES_LIST.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLocale(l.code)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  locale === l.code
                    ? "bg-[#dcfce7] dark:bg-emerald-950/60 border-[#16a34a] font-bold text-[#14532d] dark:text-emerald-400"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200"
                }`}
              >
                <div className="text-sm font-bold">{l.nativeName}</div>
                <div className="text-[10px] text-slate-400">{l.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Number Digit Style Toggle (123 vs Indic Digits) */}
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
          <label className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Hash className="w-4 h-4 text-[#14532d] dark:text-emerald-400" />
            <span>Number Display Style</span>
          </label>
          <p className="text-slate-500 dark:text-slate-400 text-xs">
            Choose whether to show numbers and prices in standard Latin numerals (123) or local Indic script digits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800 dark:text-slate-200">
              <input
                type="radio"
                name="digits"
                checked={!useNativeDigits}
                onChange={() => setUseNativeDigits(false)}
                className="text-[#14532d]"
              />
              <span>Standard Latin Digits: 1, 2, 3, 4</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800 dark:text-slate-200">
              <input
                type="radio"
                name="digits"
                checked={useNativeDigits}
                onChange={() => setUseNativeDigits(true)}
                className="text-[#14532d]"
              />
              <span>Native Indic Script Digits</span>
            </label>
          </div>
        </div>

        {/* 3. Accessibility & Display Mode */}
        <div className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <label className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#14532d] dark:text-emerald-400" />
            <span>Accessibility & Visual Modes</span>
          </label>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-slate-400" />
              <span className="font-bold text-slate-700 dark:text-slate-300">Text Scaling:</span>
              <div className="flex gap-1">
                {(["sm", "md", "lg"] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setTextSize(sz)}
                    className={`px-3 py-1 rounded-lg border uppercase font-bold text-xs ${
                      textSize === sz
                        ? "bg-[#14532d] text-white border-[#14532d]"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 ms-auto">
              <Eye className="w-4 h-4 text-slate-400" />
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="w-4 h-4 text-[#14532d] rounded"
                />
                <span>High Contrast Mode</span>
              </label>
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
              <span className="font-bold text-slate-900 dark:text-white block">
                Enable Simple Mode
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                Optimized high-clarity interface with fewer choices per screen for ease of use.
              </span>
            </div>
          </label>
        </div>

        {/* 4. Regional Land Measurement Unit */}
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
          <label className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#14532d] dark:text-emerald-400" />
            <span>Default Land Unit for Machine Quotes</span>
          </label>
          <select
            value={selectedLandUnit}
            onChange={(e) => setSelectedLandUnit(e.target.value)}
            className="w-full sm:w-80 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-xl font-semibold bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            {ALL_LAND_UNITS.map((u) => (
              <option key={u.unitKey} value={u.unitKey}>
                {u.name} {u.stateName ? `(${u.stateName})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* 5. Saved Search Alerts (A10) */}
        <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center justify-between">
            <label className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#14532d] dark:text-emerald-400" />
              <span>Saved Search Alerts ({alerts.length})</span>
            </label>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs">
            Receive notification alerts when new machinery is registered matching your search criteria.
          </p>

          {alerts.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs text-center">
              No active search alerts. You can save alerts on empty catalog search results.
            </div>
          ) : (
            <div className="space-y-2">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-xs">
                      {alert.query}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {alert.category ? `Category: ${alert.category} • ` : ""}
                      Created: {new Date(alert.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteAlert(alert.id)}
                    aria-label="Delete alert"
                    className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold rounded-xl shadow-xs transition-colors"
          >
            Save Preferences
          </button>

          {saveToast && (
            <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Preferences saved!</span>
            </span>
          )}
        </div>
      </div>
    </main>
  );
}
