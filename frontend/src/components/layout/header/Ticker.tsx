"use client";

import React, { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { SITE_CONFIG } from "@/content/site-config";
import { CONTENT_REGISTRY } from "@/content/registry";
import { Pause, Play, ChevronRight, ShieldCheck } from "lucide-react";

export const Ticker: React.FC<{
  prefersReducedMotion?: boolean;
}> = ({ prefersReducedMotion = false }) => {
  const { t } = useTranslation();
  const [isPaused, setIsPaused] = useState(false);

  // If feature flag is off, do not render
  if (!SITE_CONFIG.showTicker) {
    return null;
  }

  // Load verified items from content registry (max 3)
  const verifiedSchemes = [
    CONTENT_REGISTRY["scheme-smam-chc"],
    CONTENT_REGISTRY["scheme-crm-stubble"],
    CONTENT_REGISTRY["scheme-solar-kusum"]
  ].filter((item) => item && item.status === "verified");

  // Construct short verified messages (mentioning official portal URL)
  const messages = [
    "Sub-Mission on Agricultural Mechanization: Subsidy is available under SMAM. Check farmech.dac.gov.in",
    "Crop Residue Management: Assistance for happy seeder and straw balers. Check agricoop.nic.in",
    "PM-KUSUM Scheme: Solar agriculture pump financial assistance. Check pmkusum.mnre.gov.in"
  ];

  const shouldAnimate = !prefersReducedMotion && !isPaused;

  return (
    <aside
      aria-label="Official Agricultural Announcement Ticker"
      className="bg-gradient-to-r from-amber-50/90 via-emerald-50/40 to-amber-50/90 border-y border-amber-200/70 text-slate-800 text-xs font-medium py-1.5 px-4 overflow-hidden relative select-none transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Verified Badge Tag */}
        <div className="flex items-center gap-1.5 shrink-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-2.5 py-0.5 rounded-full font-bold text-[11px] tracking-wide shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Official Advisory</span>
          <span className="sm:hidden">Advisory</span>
        </div>

        {/* Ticker Content Track */}
        <div
          className="flex-1 overflow-hidden relative cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          tabIndex={0}
          role="region"
          aria-live="polite"
        >
          {/* On Mobile (< 1024px): Single static line */}
          <div className="flex lg:hidden items-center gap-2 text-[#1e3a5f] font-medium truncate">
            <ChevronRight className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
            <span className="truncate text-xs">{messages[0]}</span>
          </div>

          {/* On Desktop (>= 1024px): Smooth animated marquee or static on prefers-reduced-motion */}
          <div className="hidden lg:block overflow-hidden w-full">
            {prefersReducedMotion ? (
              <div className="flex items-center gap-2 text-[#1e3a5f] font-medium truncate">
                <ChevronRight className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
                <span>{messages[0]}</span>
              </div>
            ) : (
              <div
                className={`whitespace-nowrap flex items-center gap-8 text-slate-700 transition-all ${
                  shouldAnimate ? "animate-[marquee_40s_linear_infinite]" : ""
                }`}
              >
                {messages.map((text, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-amber-600 inline shrink-0" />
                    <span className="hover:text-emerald-800 font-medium transition-colors">{text}</span>
                  </span>
                ))}
                {/* Duplicate track for seamless loop */}
                {messages.map((text, idx) => (
                  <span key={`dup-${idx}`} className="inline-flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-amber-600 inline shrink-0" />
                    <span className="hover:text-emerald-800 font-medium transition-colors">{text}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Accessible Play / Pause Button */}
        {!prefersReducedMotion && (
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={
              isPaused
                ? t("common", "utility.playTicker")
                : t("common", "utility.pauseTicker")
            }
            className="p-1 rounded-md text-[#78716c] hover:text-[#1e3a5f] hover:bg-black/5 shrink-0 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#d97706]"
          >
            {isPaused ? (
              <Play className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Pause className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </aside>
  );
};
