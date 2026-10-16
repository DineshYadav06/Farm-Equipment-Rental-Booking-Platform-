"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "@/i18n/context";
import { SITE_CONFIG } from "@/content/site-config";
import { Pause, Play, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

export const Ticker: React.FC<{
  prefersReducedMotion?: boolean;
}> = ({ prefersReducedMotion = false }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Verified official advisory messages
  const messages = [
    "Sub-Mission on Agricultural Mechanization: Subsidy is available under SMAM. Check farmech.dac.gov.in",
    "Crop Residue Management: Assistance for happy seeder and straw balers. Check agricoop.nic.in",
    "PM-KUSUM Scheme: Solar agriculture pump financial assistance. Check pmkusum.mnre.gov.in"
  ];

  // Rotate messages smoothly every 6 seconds if not paused
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, isPaused, messages.length]);

  if (!SITE_CONFIG.showTicker) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? messages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  return (
    <aside
      aria-label="Official Agricultural Announcement Ticker"
      className="bg-amber-50/90 dark:bg-amber-950/40 border-y border-amber-200/80 dark:border-amber-900/60 text-slate-800 dark:text-slate-200 text-xs py-1.5 px-4 select-none transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Verified Badge Tag */}
        <div className="flex items-center gap-1.5 shrink-0 bg-amber-600 text-white px-2.5 py-0.5 rounded-full font-bold text-[11px] tracking-wide shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Official Advisory</span>
          <span className="sm:hidden">Advisory</span>
        </div>

        {/* Advisory Message Text (Clean, complete, never cut in half) */}
        <div
          className="flex-1 overflow-hidden min-w-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium truncate">
            <span className="truncate text-xs font-medium">
              {messages[currentIndex]}
            </span>
          </div>
        </div>

        {/* Navigation & Pause Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline">
            {currentIndex + 1}/{messages.length}
          </span>

          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous advisory"
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next advisory"
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? "Resume announcements" : "Pause announcements"}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors ml-0.5"
          >
            {isPaused ? (
              <Play className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Pause className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};
