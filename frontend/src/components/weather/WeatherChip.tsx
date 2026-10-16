"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/i18n/context";
import { CurrentWeather } from "@/services/weather";
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  Snowflake,
  Wind,
  Droplets,
  Thermometer,
  Calendar,
  ExternalLink,
  RefreshCw,
  X
} from "lucide-react";

interface WeatherChipProps {
  className?: string;
  variant?: "desktop" | "mobile";
  onOpenLocationPicker?: () => void;
}

export const WeatherChip: React.FC<WeatherChipProps> = ({
  className = "",
  variant = "desktop",
  onOpenLocationPicker
}) => {
  const { t, selectedLocation } = useTranslation();
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Approximate default coordinates if not set in location
  const lat = (selectedLocation as any)?.lat2 || 30.90;
  const lng = (selectedLocation as any)?.lng2 || 75.85;

  const fetchWeather = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lng=${lng}`, {
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Low-end devices optimization: fetch after paint
    const timer = setTimeout(() => {
      fetchWeather();
    }, 200);
    return () => clearTimeout(timer);
  }, [lat, lng]);

  // Outside click handler
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutside);
    }
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  const getWeatherIcon = (code?: number, className = "w-3.5 h-3.5") => {
    if (code === undefined || code === null) return <Sun className={className} aria-hidden="true" />;
    if (code === 0) return <Sun className={`${className} text-amber-500`} aria-hidden="true" />;
    if (code === 1 || code === 2) return <CloudSun className={`${className} text-amber-500`} aria-hidden="true" />;
    if (code === 3) return <Cloud className={`${className} text-slate-500`} aria-hidden="true" />;
    if (code === 45 || code === 48) return <CloudFog className={`${className} text-slate-400`} aria-hidden="true" />;
    if (code >= 51 && code <= 55) return <CloudDrizzle className={`${className} text-blue-400`} aria-hidden="true" />;
    if (code >= 61 && code <= 65) return <CloudRain className={`${className} text-blue-500`} aria-hidden="true" />;
    if (code >= 71 && code <= 77) return <Snowflake className={`${className} text-cyan-300`} aria-hidden="true" />;
    if (code >= 80 && code <= 82) return <CloudRain className={`${className} text-blue-600`} aria-hidden="true" />;
    if (code >= 95) return <CloudLightning className={`${className} text-amber-600`} aria-hidden="true" />;
    return <Cloud className={className} aria-hidden="true" />;
  };

  const getConditionName = (conditionKey?: string) => {
    if (!conditionKey) return t("common", "weather.cloudy") || "Partly Cloudy";
    return t("common", conditionKey) || "Fair";
  };

  return (
    <div className={`relative inline-block ${className}`} ref={popoverRef}>
      {/* Weather Trigger Chip */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`${t("common", "weather.label") || "Weather"}: ${
          weather ? `${weather.temperature}°C, ${getConditionName(weather.conditionKey)}` : "Forecast"
        }`}
        className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium shrink-0 shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 ${
          variant === "mobile"
            ? "px-2.5 py-1 text-xs min-h-[36px]"
            : "px-2.5 py-1 text-xs min-h-[30px]"
        }`}
      >
        {loading ? (
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-400" aria-hidden="true" />
        ) : error || !weather ? (
          <Cloud className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
        ) : (
          getWeatherIcon(weather.weatherCode)
        )}

        <span className="font-semibold text-xs whitespace-nowrap">
          {weather ? `${weather.temperature}°C` : "--°C"}
        </span>
      </button>

      {/* Popover / Modal with Weather Details */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={t("common", "weather.title") || "Weather Forecast"}
          className={`z-50 bg-white dark:bg-[#1a211b] border border-slate-200 dark:border-[#2e382f] shadow-xl p-4 text-xs animate-in fade-in zoom-in-95 duration-100 ${
            variant === "mobile"
              ? "fixed inset-x-2 bottom-4 max-w-sm mx-auto rounded-2xl"
              : "absolute left-0 mt-2 w-80 rounded-2xl"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {selectedLocation?.district || "Ludhiana"}, {selectedLocation?.state || "Punjab"}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {t("common", "weather.title") || "Agricultural Weather"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t("common", "utility.close") || "Close"}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {error || !weather ? (
            <div className="py-4 text-center">
              <Cloud className="w-8 h-8 text-slate-400 mx-auto mb-2" aria-hidden="true" />
              <p className="font-medium text-slate-700 dark:text-slate-300">
                {t("common", "weather.unavailable") || "Weather is not available right now"}
              </p>
              <button
                type="button"
                onClick={fetchWeather}
                className="mt-3 px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-medium hover:bg-emerald-800 inline-flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t("common", "utility.retry") || "Retry"}</span>
              </button>
            </div>
          ) : (
            <>
              {/* Current Overview */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#141c16] mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white dark:bg-[#1a211b] border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                    {getWeatherIcon(weather.weatherCode, "w-6 h-6")}
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 dark:text-slate-100">
                      {weather.temperature}°C
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                      {getConditionName(weather.conditionKey)}
                    </div>
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                  <div>
                    {t("common", "weather.feelsLike") || "Feels like"}:{" "}
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {weather.apparentTemperature}°C
                    </span>
                  </div>
                  <div>
                    {t("common", "weather.rainChance") || "Rain"}:{" "}
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {weather.precipitationProbability}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Facts Grid */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="p-2 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0" aria-hidden="true" />
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                      {t("common", "weather.humidity") || "Humidity"}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {weather.humidity}%
                    </span>
                  </div>
                </div>
                <div className="p-2 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <Wind className="w-3.5 h-3.5 text-teal-500 shrink-0" aria-hidden="true" />
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                      {t("common", "weather.windSpeed") || "Wind Speed"}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {weather.windSpeed} km/h
                    </span>
                  </div>
                </div>
              </div>

              {/* 3-Day Forecast */}
              {weather.forecast && weather.forecast.length > 0 && (
                <div className="mb-3">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                    <span>{t("common", "weather.threeDay") || "3-Day Forecast"}</span>
                  </span>
                  <div className="space-y-1.5">
                    {weather.forecast.map((day, idx) => (
                      <div
                        key={day.date}
                        className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50/70 dark:bg-[#141c16]/70 text-[11px]"
                      >
                        <span className="text-slate-600 dark:text-slate-400 font-medium w-16">
                          {idx === 0
                            ? t("common", "weather.today") || "Today"
                            : new Date(day.date).toLocaleDateString("en-IN", { weekday: "short" })}
                        </span>
                        <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                          {getWeatherIcon(day.weatherCode, "w-3.5 h-3.5")}
                          <span>{day.precipitationProbability}%</span>
                        </div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {day.maxTemp}° – {day.minTemp}°
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Links & Credit */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <span>
                    {t("common", "weather.updated") || "Updated"}: {weather.lastUpdated}
                  </span>
                  {onOpenLocationPicker && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        onOpenLocationPicker();
                      }}
                      className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold"
                    >
                      {t("common", "location.change") || "Change Location"}
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between text-[9px] text-slate-400">
                  <span>{weather.credit}</span>
                  <a
                    href="https://mausam.imd.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-slate-500 dark:text-slate-400 hover:underline"
                  >
                    <span>IMD Mausam</span>
                    <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
