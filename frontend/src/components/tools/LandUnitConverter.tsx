"use client";

import React, { useState } from "react";
import { ALL_LAND_UNITS, convertLandArea, LandUnitRegistryEntry } from "@/content/land-units";
import { useTranslation } from "@/i18n/context";
import { ArrowRightLeft, ShieldCheck, AlertTriangle, ExternalLink } from "lucide-react";

export const LandUnitConverter: React.FC = () => {
  const { formatNumber } = useTranslation();
  const [amount, setAmount] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>("acre");
  const [toUnit, setToUnit] = useState<string>("bigha_pb");

  const result = convertLandArea(amount || 0, fromUnit, toUnit);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-[#16a34a]" />
            <span>Agricultural Land Unit Converter</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Convert land areas across official SI units and verified regional revenue standards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
        {/* From Area + Unit */}
        <div className="md:col-span-3 space-y-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Land Area
          </label>
          <div className="flex rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden focus-within:ring-2 focus-within:ring-[#16a34a]">
            <input
              type="number"
              min="0.01"
              step="any"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-1/2 p-2.5 text-sm font-bold bg-transparent text-slate-900 dark:text-white focus:outline-hidden"
              placeholder="1"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-1/2 p-2.5 text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-l border-slate-300 dark:border-slate-700 focus:outline-hidden"
            >
              {ALL_LAND_UNITS.map((u) => (
                <option key={u.unitKey} value={u.unitKey}>
                  {u.name} {u.stateName ? `(${u.stateName})` : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center pt-2 md:pt-6">
          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap units"
            className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* To Unit */}
        <div className="md:col-span-3 space-y-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Convert To
          </label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-[#16a34a] focus:outline-hidden"
          >
            {ALL_LAND_UNITS.map((u) => (
              <option key={u.unitKey} value={u.unitKey}>
                {u.name} {u.stateName ? `(${u.stateName})` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result Card */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Equivalent Measurement:
            </div>
            <div className="text-2xl font-black text-[#14532d] dark:text-emerald-400 mt-0.5">
              {formatNumber(result.converted)} {result.toEntry?.name}
            </div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            1 {result.fromEntry?.name} = {formatNumber(parseFloat(((result.fromEntry?.toSqMeters || 1) / (result.toEntry?.toSqMeters || 1)).toFixed(4)))} {result.toEntry?.name}
          </div>
        </div>

        {/* Verification Status & Registry Source */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            {result.toEntry?.status === "verified" ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Revenue Standard
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-800">
                <AlertTriangle className="w-3.5 h-3.5" />
                Approximate regional variation (verify locally)
              </span>
            )}
          </div>

          {result.toEntry?.sourceUrl && (
            <a
              href={result.toEntry.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-400 hover:text-[#16a34a] font-medium"
            >
              <span>Source: {result.toEntry.sourceName}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
