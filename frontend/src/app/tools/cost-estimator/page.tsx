"use client";

import React from "react";
import Link from "next/link";
import { RentalCostEstimator } from "@/components/tools/RentalCostEstimator";
import { ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";

export default function CostEstimatorPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div>
        <Link
          href="/equipment"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 mb-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Equipment</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Farm Machinery Rental Cost Estimator
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Estimate budget for hiring tractors, combine harvesters, laser levelers, and rotavators before booking.
        </p>
      </div>

      <RentalCostEstimator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#16a34a]" />
            <span>Need Land Unit Conversion?</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Convert your state-specific Bigha, Guntha, or Kanal into standard Acres with our official land converter.
          </p>
          <Link
            href="/tools/land-converter"
            className="inline-block text-xs font-bold text-[#14532d] dark:text-emerald-400 hover:underline pt-1"
          >
            Open Land Unit Converter →
          </Link>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
            <span>Escrow Protected Hiring</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            All rentals booked on FarmRentHub hold your advance payment safely in escrow until the machine arrives at your farm and you inspect it.
          </p>
          <Link
            href="/how-it-works"
            className="inline-block text-xs font-bold text-[#14532d] dark:text-emerald-400 hover:underline pt-1"
          >
            Learn about Escrow Protection →
          </Link>
        </div>
      </div>
    </main>
  );
}
