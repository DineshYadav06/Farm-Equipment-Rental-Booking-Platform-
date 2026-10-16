"use client";

import React, { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { LocationPicker } from "./LocationPicker";
import { MapPin, ChevronDown } from "lucide-react";

export const LocationChip: React.FC<{
  className?: string;
  variant?: "desktop" | "mobile";
  onOpenPicker?: () => void;
}> = ({ className = "", variant = "desktop", onOpenPicker }) => {
  const { selectedLocation, t } = useTranslation();
  const [internalOpen, setInternalOpen] = useState(false);

  const displayText = `${selectedLocation?.district || "Ludhiana"}, ${
    selectedLocation?.state || "Punjab"
  }`;

  const handleClick = () => {
    if (onOpenPicker) {
      onOpenPicker();
    } else {
      setInternalOpen(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-haspopup="dialog"
        aria-label={`${t("common", "location.changeLocation") || "Change location"}: ${displayText}`}
        className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 transition-colors font-medium shrink-0 shadow-2xs ${
          variant === "mobile"
            ? "w-full justify-between px-3 py-1.5 text-xs min-h-[36px]"
            : "px-2.5 py-1 text-xs min-h-[30px]"
        } ${className}`}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
          <span className="font-semibold truncate text-xs max-w-[140px] sm:max-w-[180px]">{displayText}</span>
        </div>
        <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" aria-hidden="true" />
      </button>

      {!onOpenPicker && (
        <LocationPicker
          isOpen={internalOpen}
          onClose={() => setInternalOpen(false)}
        />
      )}
    </>
  );
};
