"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "@/i18n/context";
import { EQUIPMENT_TAXONOMY } from "@/content/equipment-taxonomy";
import { fetchEquipmentList } from "@/services/api";
import { BookingModal } from "@/components/booking/BookingModal";
import { Equipment } from "@/types";
import {
  MapPin,
  Navigation,
  Sliders,
  Filter,
  Star,
  CheckCircle2,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export default function MapDiscoveryPage() {
  const { t, formatPrice, formatNumber, locale } = useTranslation();

  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [selectedRadius, setSelectedRadius] = useState<number>(35);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activePinEq, setActivePinEq] = useState<Equipment | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchEquipmentList(selectedCategory, "")
      .then((data) => {
        if (mounted) {
          setEquipmentList(data);
          setActivePinEq(data[0] || null);
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [selectedCategory]);

  const filteredEquipment = equipmentList.filter(
    (e) => (e.distance_km || 0) <= selectedRadius
  );

  // Simulated GPS visual pin coordinates on map canvas
  const pinCoordinates = [
    { top: "32%", left: "45%" },
    { top: "28%", left: "64%" },
    { top: "58%", left: "36%" },
    { top: "42%", left: "72%" },
    { top: "66%", left: "62%" },
    { top: "25%", left: "24%" },
    { top: "50%", left: "20%" },
    { top: "70%", left: "46%" },
    { top: "38%", left: "55%" },
    { top: "60%", left: "78%" }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1 flex flex-col">
      {/* Title */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
          <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
            {t("common", "nav.map")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Discover tractors and implements available for hire within your village or block radius.
          </p>
        </div>

        {/* Radius Filter Slider */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3 text-xs font-bold">
          <span className="text-slate-700">Radius: {formatNumber(selectedRadius)} km</span>
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={selectedRadius}
            onChange={(e) => setSelectedRadius(parseInt(e.target.value, 10))}
            className="w-32 accent-[#14532d]"
          />
        </div>
      </div>

      {/* Main Map Box */}
      <div className="relative w-full rounded-3xl overflow-hidden border-2 border-slate-300 bg-slate-900 shadow-xl min-h-[580px] flex flex-col justify-between">
        {/* Map Vector Texture */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="rural-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#22c55e" strokeWidth="0.8" opacity="0.3" />
                <circle cx="30" cy="30" r="1.5" fill="#eab308" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rural-grid)" />
          </svg>
        </div>

        {/* Map HUD Control Header */}
        <div className="relative z-10 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-b from-slate-950/90 to-transparent">
          <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700 text-xs text-emerald-400 font-bold shadow-md">
            <Navigation className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>GPS Center: Ludhiana Block (Punjab Zone)</span>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1 rounded-full font-bold transition-colors ${
                selectedCategory === "all"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
              }`}
            >
              All
            </button>
            {EQUIPMENT_TAXONOMY.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3 py-1 rounded-full font-bold transition-colors ${
                  selectedCategory === cat.name
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {cat.names[locale] || cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Map Pulsing Pins Grid */}
        <div className="relative z-10 flex-1 w-full h-full min-h-[400px]">
          {filteredEquipment.slice(0, pinCoordinates.length).map((eq, idx) => {
            const pos = pinCoordinates[idx];
            const isSelected = activePinEq?.id === eq.id;

            return (
              <div
                key={eq.id}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setActivePinEq(eq)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              >
                {/* Outer radar pulse */}
                <div
                  className={`absolute -inset-2 rounded-full ${
                    isSelected ? "bg-amber-400/40 animate-ping" : "bg-emerald-500/20"
                  }`}
                />

                {/* Pin Icon Bubble */}
                <div
                  className={`relative px-2.5 py-1 rounded-full font-bold text-[11px] shadow-lg flex items-center gap-1 border transition-transform group-hover:scale-110 ${
                    isSelected
                      ? "bg-amber-400 text-stone-900 border-white scale-110"
                      : "bg-[#14532d] text-white border-emerald-400/80"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate max-w-[80px]">{eq.category}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Pin Sliding Drawer / Bottom Floating Card */}
        {activePinEq && (
          <div className="relative z-20 p-4 sm:p-5 bg-slate-950/90 backdrop-blur-md border-t border-slate-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                <img
                  src={activePinEq.images[0]}
                  alt={activePinEq.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  {activePinEq.category}
                </span>
                <h4 className="font-bold text-sm sm:text-base text-white">{activePinEq.title}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span>{activePinEq.city}</span>
                  <span>•</span>
                  <span>{formatNumber(activePinEq.distance_km || 10)} km away</span>
                  <span>•</span>
                  <span className="text-amber-400 font-bold flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
                    <span>{activePinEq.average_rating.toFixed(1)}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Rental Rate</span>
                <div className="text-lg font-black text-amber-400">
                  {formatPrice(activePinEq.daily_rate)}/day
                </div>
              </div>

              <button
                onClick={() => setBookingOpen(true)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
              >
                {t("common", "actions.bookNow")}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        equipment={activePinEq}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </main>
  );
}
