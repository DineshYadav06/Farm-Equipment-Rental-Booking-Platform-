"use client";

import React from "react";
import Link from "next/link";
import { LandUnitConverter } from "@/components/tools/LandUnitConverter";
import { ALL_LAND_UNITS } from "@/content/land-units";
import { ArrowLeft, BookOpen, ShieldCheck, HelpCircle } from "lucide-react";

export default function LandConverterPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/equipment"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 mb-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Equipment</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Agricultural Land Measurement Converter
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Accurately calculate farm land area across Bigha, Guntha, Acre, Hectare, Kanal, and Cents according to official State Revenue Department definitions.
        </p>
      </div>

      {/* Main Converter Tool */}
      <LandUnitConverter />

      {/* Reference Table of Factors */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#16a34a]" />
          <span>Official State Conversion Directory</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Land measurement units vary across Indian states. The table below lists the conversion factors to Square Metres (sq m) and Acres recognized in state land revenue codes.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400">
                <th className="p-3 font-bold">Unit Name</th>
                <th className="p-3 font-bold">Region or State</th>
                <th className="p-3 font-bold">Square Metres (sq m)</th>
                <th className="p-3 font-bold">Equivalent in Acres</th>
                <th className="p-3 font-bold">Official Authority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {ALL_LAND_UNITS.map((u) => {
                const inAcres = (u.toSqMeters / 4046.8564).toFixed(4);
                return (
                  <tr key={u.unitKey} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      {u.name}
                    </td>
                    <td className="p-3">{u.stateName || "National Standard"}</td>
                    <td className="p-3 font-mono">{u.toSqMeters.toLocaleString("en-IN")} sq m</td>
                    <td className="p-3 font-mono">{inAcres} Acre</td>
                    <td className="p-3 text-[11px] text-slate-500">{u.sourceName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
