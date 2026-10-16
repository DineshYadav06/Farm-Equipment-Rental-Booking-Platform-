"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import {
  findNearestLocation,
  saveStoredLocation,
  STORAGE_KEY_LOCATION_DISMISSED,
  STORAGE_KEY_LOCATION
} from "@/services/location";
import { MapPin, Navigation, Compass, AlertCircle, X, ShieldCheck } from "lucide-react";

interface LocationPromptModalProps {
  onOpenManualPicker: () => void;
}

export const LocationPromptModal: React.FC<LocationPromptModalProps> = ({
  onOpenManualPicker
}) => {
  const { t, setSelectedLocation } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if location is already saved or already dismissed
    const hasLocation = localStorage.getItem(STORAGE_KEY_LOCATION);
    const hasDismissed =
      sessionStorage.getItem(STORAGE_KEY_LOCATION_DISMISSED) ||
      localStorage.getItem(STORAGE_KEY_LOCATION_DISMISSED);

    if (!hasLocation && !hasDismissed) {
      // Small delay so it appears gently after initial page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY_LOCATION_DISMISSED, "true");
      localStorage.setItem(STORAGE_KEY_LOCATION_DISMISSED, "true");
    } catch {
      // Storage unavailable
    }
  };

  const handleAllowLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setErrorMessage(t("common", "location.geoUnsupported") || "Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);
        const { latitude, longitude } = position.coords;
        const result = findNearestLocation(latitude, longitude);

        if (!result) {
          setErrorMessage(
            t("common", "location.outOfIndia") ||
              "Location appears outside India. Please select your district manually."
          );
          return;
        }

        const stored = {
          stateCode: result.stateCode,
          state: result.state,
          districtCode: result.districtCode,
          district: result.district,
          blockCode: result.blockCode,
          block: result.block,
          lat2: result.lat2,
          lng2: result.lng2
        };

        saveStoredLocation(stored);
        setSelectedLocation(stored);
        handleDismiss();
      },
      (error) => {
        setLoading(false);
        if (error.code === error.PERMISSION_DENIED) {
          setErrorMessage(
            t("common", "location.permissionDenied") ||
              "Location permission was denied. You can select your district manually."
          );
        } else if (error.code === error.TIMEOUT) {
          setErrorMessage(
            t("common", "location.timeout") ||
              "Location request timed out. Please try manual selection."
          );
        } else {
          setErrorMessage(
            t("common", "location.unavailable") ||
              "Location unavailable. Please select your district manually."
          );
        }
      },
      {
        enableHighAccuracy: false, // Low accuracy is enough (~1km)
        timeout: 10000,
        maximumAge: 600000
      }
    );
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-prompt-title"
      className="fixed inset-x-4 bottom-4 md:inset-auto md:bottom-6 md:right-6 md:w-96 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div className="bg-white dark:bg-[#1a211b] border border-slate-200 dark:border-[#2e382f] shadow-2xl rounded-2xl p-4 sm:p-5 text-slate-800 dark:text-slate-200 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label={t("common", "utility.close") || "Close"}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Header Icon + Title */}
        <div className="flex items-start gap-3 mb-2.5">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 shrink-0">
            <Compass className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 id="location-prompt-title" className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {t("common", "location.promptTitle") || "Find Equipment & Weather Nearby"}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              {t("common", "location.promptDesc") ||
                "Allow location to show nearby machines and live local agricultural weather."}
            </p>
          </div>
        </div>

        {/* Error notice if denied/failed */}
        {errorMessage && (
          <div className="mb-3 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-start gap-2 text-xs text-amber-800 dark:text-amber-300">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <button
            type="button"
            onClick={handleAllowLocation}
            disabled={loading}
            className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs disabled:opacity-50"
          >
            <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              {loading
                ? t("common", "utility.loading") || "Locating..."
                : t("common", "location.allowLocation") || "Allow Location"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              handleDismiss();
              onOpenManualPicker();
            }}
            className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span>{t("common", "location.chooseManually") || "Choose Manually"}</span>
          </button>
        </div>

        {/* Privacy Note */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 min-w-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
            <span className="truncate">{t("common", "location.privacyNote") || "Rounded to ~1 km. Never shared."}</span>
          </div>
          <Link
            href="/privacy"
            className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold shrink-0"
          >
            {t("common", "nav.privacy") || "Privacy Policy"}
          </Link>
        </div>
      </div>
    </div>
  );
};
