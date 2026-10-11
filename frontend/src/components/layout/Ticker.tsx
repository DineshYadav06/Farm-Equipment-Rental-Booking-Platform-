"use client";

import React, { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Bell, Pause, Play, ChevronRight } from "lucide-react";

export const Ticker: React.FC = () => {
  const { t } = useTranslation();
  const [isPaused, setIsPaused] = useState(false);

  const title = t("home", "ticker.advisoryTitle");
  const item1 = t("home", "ticker.item1");
  const item2 = t("home", "ticker.item2");
  const item3 = t("home", "ticker.item3");

  const tickerItems = [item1, item2, item3].filter(Boolean);

  return (
    <div
      className="bg-[#fef3c7] border-y border-[#d97706]/30 text-[#1c1917] text-xs font-medium py-1.5 px-4 overflow-hidden relative select-none"
      aria-label="Agricultural announcement ticker"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Fixed Title Tag */}
        <div className="flex items-center gap-1.5 shrink-0 bg-[#d97706] text-white px-2 py-0.5 rounded font-bold text-[11px] tracking-wide uppercase shadow-xs">
          <Bell className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{title}</span>
          <span className="sm:hidden">सूचना:</span>
        </div>

        {/* Scrolling Ticker Track */}
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
          <div
            className={`whitespace-nowrap flex items-center gap-8 text-[#44403c] transition-all ${
              isPaused ? "" : "animate-[marquee_35s_linear_infinite]"
            }`}
          >
            {tickerItems.map((text, idx) => (
              <span key={idx} className="inline-flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-[#d97706] inline shrink-0" />
                <span className="hover:text-[#14532d] hover:underline font-medium">
                  {text}
                </span>
              </span>
            ))}
            {/* Repeated for continuous seamless scroll */}
            {tickerItems.map((text, idx) => (
              <span key={`dup-${idx}`} className="inline-flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-[#d97706] inline shrink-0" />
                <span className="hover:text-[#14532d] hover:underline font-medium">
                  {text}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Accessible Pause / Play Button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-1 rounded text-[#78716c] hover:text-[#1c1917] shrink-0"
          title={isPaused ? "Play scrolling ticker" : "Pause scrolling ticker"}
          aria-label={isPaused ? "Play ticker" : "Pause ticker"}
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
