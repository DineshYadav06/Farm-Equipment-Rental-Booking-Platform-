"use client";

import React from "react";
import Link from "next/link";
import { MandiWidget } from "@/components/mandi/MandiWidget";
import { SourceNote } from "@/components/ui/SourceNote";
import { ArrowLeft, TrendingUp, ShieldCheck, ExternalLink } from "lucide-react";

export default function MandiPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <Link
          href="/equipment"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 mb-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Equipment</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-[#16a34a]" />
          <span>Daily Mandi Market Prices (APMC)</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Wholesale agricultural commodity prices and daily arrivals from regulated agricultural market committees (APMCs) across India.
        </p>
      </div>

      <MandiWidget compact={false} />

      {/* Official Source & Methodology */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Official Data Source
          </h2>
          <SourceNote registryId="mandi-agmarknet-portal" compact={false} />
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Price quotations reflect modal rates reported daily by the Directorate of Marketing and Inspection (DMI), Ministry of Agriculture & Farmers Welfare via Agmarknet. Rates are updated hourly during market trading sessions.
        </p>
      </div>
    </main>
  );
}
