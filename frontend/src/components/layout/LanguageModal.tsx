"use client";

import React, { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { LOCALES_LIST, LocaleCode, SUPPORTED_LOCALES } from "@/i18n/config";
import { Globe, Volume2, MapPin, X, Check } from "lucide-react";

export const LanguageModal: React.FC = () => {
  const {
    locale,
    setLocale,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
    speak,
    t
  } = useTranslation();

  const [detectingState, setDetectingState] = useState<string | null>(null);

  if (!isLanguageModalOpen) return null;

  // Optional Geolocation detection helper
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Location is not supported by your browser.");
      return;
    }
    setDetectingState("Detecting...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        let detected: LocaleCode = "hi";
        let stateName = "Northern Region";

        // Approximations for major Indian agricultural states
        if (lat > 29.5 && lng < 77.0) {
          detected = "pa";
          stateName = "Punjab / Haryana";
        } else if (lat > 18.0 && lat < 21.5 && lng < 76.0) {
          detected = "mr";
          stateName = "Maharashtra";
        } else if (lat > 20.0 && lat < 24.5 && lng < 73.5) {
          detected = "gu";
          stateName = "Gujarat";
        } else if (lat > 8.0 && lat < 13.5 && lng > 77.0) {
          detected = "ta";
          stateName = "Tamil Nadu";
        } else if (lat > 8.5 && lat < 12.5 && lng < 77.5) {
          detected = "ml";
          stateName = "Kerala";
        } else if (lat > 11.5 && lat < 18.5 && lng > 74.0 && lng < 78.5) {
          detected = "kn";
          stateName = "Karnataka";
        } else if (lat > 14.0 && lat < 19.5 && lng > 78.0) {
          detected = "te";
          stateName = "Andhra Pradesh / Telangana";
        } else if (lat > 18.5 && lat < 22.5 && lng > 83.0) {
          detected = "or";
          stateName = "Odisha";
        } else if (lat > 21.5 && lat < 27.0 && lng > 86.0) {
          detected = "bn";
          stateName = "West Bengal";
        } else if (lat > 25.0 && lng > 90.0) {
          detected = "as";
          stateName = "Assam";
        }

        setDetectingState(`Detected: ${stateName}`);
        setLocale(detected);
        setTimeout(() => {
          setIsLanguageModalOpen(false);
          setDetectingState(null);
        }, 1200);
      },
      () => {
        setDetectingState(null);
        alert("Location access denied or unavailable.");
      }
    );
  };

  const playLanguageAudio = (l: typeof LOCALES_LIST[0], e: React.MouseEvent) => {
    e.stopPropagation();
    speak(`${l.nativeName}. ${l.tagline}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lang-modal-title"
    >
      <div className="bg-[#fafaf5] rounded-3xl max-w-3xl w-full border-2 border-[#14532d] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="bg-[#14532d] text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#16a34a] flex items-center justify-center text-white shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 id="lang-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight">
                अपनी भाषा चुनें / Select Your Language
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
                FarmRentHub supports 12 Indian regional languages.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLanguageModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            aria-label="Close language selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location Auto-Suggest Helper Strip */}
        <div className="bg-[#fef3c7] border-b border-[#d97706]/20 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#78350f] font-medium">
            <MapPin className="w-4 h-4 text-[#d97706] shrink-0" />
            <span>
              {detectingState || "राज्य के अनुसार भाषा स्वतः चुनें (Auto-suggest based on location):"}
            </span>
          </div>
          <button
            onClick={handleDetectLocation}
            className="px-3 py-1 rounded-xl bg-[#d97706] text-white font-bold hover:bg-[#b45309] transition-colors"
          >
            Detect State
          </button>
        </div>

        {/* 12 Big Language Buttons Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {LOCALES_LIST.map((l) => {
            const isSelected = locale === l.code;
            return (
              <button
                key={l.code}
                onClick={() => {
                  setLocale(l.code);
                  setIsLanguageModalOpen(false);
                }}
                className={`p-4 rounded-2xl border-2 text-left flex flex-col justify-between transition-all group relative ${
                  isSelected
                    ? "bg-[#dcfce7] border-[#16a34a] shadow-md ring-2 ring-[#16a34a]/30"
                    : "bg-white border-[#e2e8f0] hover:border-[#16a34a] hover:bg-[#fafaf5]"
                }`}
              >
                {/* Audio Pronunciation Button */}
                <button
                  type="button"
                  onClick={(e) => playLanguageAudio(l, e)}
                  className="absolute top-2.5 right-2.5 p-1 rounded-full text-[#78716c] hover:text-[#14532d] hover:bg-emerald-100 transition-colors"
                  title={`Listen to ${l.name} name`}
                  aria-label={`Listen to ${l.name} pronunciation`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#14532d] leading-tight">
                    {l.nativeName}
                  </div>
                  <div className="text-xs font-semibold text-[#44403c] mt-0.5">
                    {l.name}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-[#78716c] flex items-center justify-between">
                  <span>{l.defaultRegion.split("/")[0]}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#16a34a] font-black" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Footer Note */}
        <div className="bg-[#f5f5ed] border-t border-[#e2e8f0] px-6 py-3.5 text-center text-xs text-[#78716c]">
          <span>
            You can change your language anytime using the language button in the top bar.
          </span>
        </div>
      </div>
    </div>
  );
};
