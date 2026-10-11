"use client";

import React, { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { LocationPicker } from "./LocationPicker";
import { MapPin, ChevronDown } from "lucide-react";

export const LocationChip: React.FC<{
  className?: string;
  variant?: "desktop" | "mobile";
}> = ({ className = "", variant = "desktop" }) => {
  const { selectedLocation, t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayText = `${selectedLocation?.district || "Ludhiana"}, ${
    selectedLocation?.state || "Punjab"
  }`;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
        aria-label={`${t("common", "location.changeLocation")}: ${displayText}`}
        className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-slate-50/80 text-slate-800 hover:bg-slate-100 hover:border-slate-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 transition-all font-medium shrink-0 shadow-2xs ${
          variant === "mobile"
            ? "w-full justify-between px-3.5 py-2.5 text-xs min-h-[44px]"
            : "px-3 py-1 text-xs min-h-[32px]"
        } ${className}`}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
          <span className="font-semibold truncate text-xs">{displayText}</span>
        </div>
        <ChevronDown className="w-3 h-3 text-slate-500 shrink-0" aria-hidden="true" />
      </button>

      <LocationPicker
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
