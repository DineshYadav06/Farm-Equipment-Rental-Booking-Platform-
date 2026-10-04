"use client";

import React, { useState } from "react";
import { Equipment } from "@/types";
import {
  MapPin,
  Navigation,
  Layers,
  Search,
  Filter,
  Star,
  CheckCircle2,
  Compass,
  Maximize2
} from "lucide-react";

interface MapDiscoveryProps {
  equipmentList: Equipment[];
  selectedCity: string;
  onBookNow: (equipment: Equipment) => void;
  lang?: "en" | "hi";
}

export const MapDiscovery: React.FC<MapDiscoveryProps> = ({
  equipmentList,
  selectedCity,
  onBookNow,
  lang = "en"
}) => {
  const [selectedRadius, setSelectedRadius] = useState<number>(25);
  const [activePinEquipment, setActivePinEquipment] = useState<Equipment | null>(
    equipmentList[0] || null
  );
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");

  const isHi = lang === "hi";

  const categories = ["All", "Tractor", "Harvester", "Rotavator", "Seed Drill", "Sprayer"];

  const filteredEquipment = equipmentList.filter((e) => {
    const matchesCategory =
      selectedCategoryFilter === "All" || e.category.toLowerCase() === selectedCategoryFilter.toLowerCase();
    const matchesRadius = (e.distance_km || 0) <= selectedRadius;
    return matchesCategory && matchesRadius;
  });

  // Simulated GPS Coordinates for Visual Map Grid
  const pinPositions = [
    { top: "34%", left: "42%" },
    { top: "25%", left: "62%" },
    { top: "60%", left: "38%" },
    { top: "45%", left: "75%" },
    { top: "68%", left: "65%" },
    { top: "28%", left: "22%" },
    { top: "52%", left: "20%" },
    { top: "72%", left: "48%" }
  ];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl">
      {/* Map Control Bar Top */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200/80 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Compass className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {isHi ? "आपकी वर्तमान कृषि लोकेशन" : "Farmer GPS Location"}
            </div>
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{selectedCity} (Live Discovery Mode)</span>
            </div>
          </div>
        </div>

        {/* Radius Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <span className="text-[11px] font-bold text-slate-500 px-2">
            {isHi ? "दायरा:" : "Radius:"}
          </span>
          {[5, 15, 25, 50].map((radius) => (
            <button
              key={radius}
              onClick={() => setSelectedRadius(radius)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedRadius === radius
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {radius} km
            </button>
          ))}
        </div>

        {/* Category Filter Pills on Map */}
        <div className="hidden xl:flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200/60">
          {categories.slice(0, 4).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition-colors ${
                selectedCategoryFilter === cat
                  ? "bg-slate-900 text-white font-bold"
                  : "text-slate-600 hover:bg-slate-200/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Styled Agricultural Map Canvas */}
      <div className="relative h-110 sm:h-130 w-full overflow-hidden bg-[#e5ece2]">
        {/* SVG Topographical & Agricultural Farm Fields Background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="farm-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <rect width="60" height="60" fill="#eaf0e6" stroke="#d5e1cf" strokeWidth="1" />
              <line x1="0" y1="30" x2="60" y2="30" stroke="#d5e1cf" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="30" y1="0" x2="30" y2="60" stroke="#d5e1cf" strokeWidth="0.5" strokeDasharray="3 3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#farm-grid)" />
          {/* Main Road Network */}
          <path
            d="M -100 200 Q 300 180, 600 320 T 1400 280"
            stroke="#cbd5e1"
            strokeWidth="18"
            fill="none"
          />
          <path
            d="M -100 200 Q 300 180, 600 320 T 1400 280"
            stroke="#f8fafc"
            strokeWidth="10"
            fill="none"
          />
          {/* Secondary Village Road */}
          <path
            d="M 400 -50 Q 420 300, 750 600"
            stroke="#e2e8f0"
            strokeWidth="8"
            fill="none"
          />
          {/* Irrigation Canal Waterway */}
          <path
            d="M 50 550 Q 350 400, 800 480 T 1300 300"
            stroke="#93c5fd"
            strokeWidth="6"
            strokeOpacity="0.7"
            fill="none"
          />
        </svg>

        {/* Center Farmer Location Marker */}
        <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <span className="absolute h-16 w-16 rounded-full bg-emerald-500/20 animate-ping" />
            <span className="absolute h-10 w-10 rounded-full bg-emerald-600/30" />
            <div className="relative w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <Navigation className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
          <div className="mt-1 bg-emerald-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            {isHi ? "आप यहां हैं" : "Your Farm"}
          </div>
        </div>

        {/* Dynamic Nearby Equipment Pins */}
        {filteredEquipment.map((eq, index) => {
          const pos = pinPositions[index % pinPositions.length];
          const isSelected = activePinEquipment?.id === eq.id;

          return (
            <div
              key={eq.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute z-15 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200"
              onClick={() => setActivePinEquipment(eq)}
            >
              <div
                className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-md transition-all ${
                  isSelected
                    ? "bg-emerald-800 text-white ring-4 ring-emerald-500/30 scale-110"
                    : "bg-white text-slate-800 hover:bg-emerald-50 border border-slate-200"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    eq.is_available ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                />
                <span className="text-[11px] font-extrabold whitespace-nowrap">
                  {eq.category}: ₹{eq.daily_rate}/d
                </span>
              </div>
            </div>
          );
        })}

        {/* Floating Equipment Preview Overlay on Selected Pin */}
        {activePinEquipment && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-25 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-xl transition-all">
            <div className="flex items-center gap-3">
              <img
                src={activePinEquipment.images[0]}
                alt={activePinEquipment.title}
                className="w-18 h-18 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {activePinEquipment.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{activePinEquipment.average_rating.toFixed(1)}</span>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-900 truncate mt-1">
                  {activePinEquipment.title}
                </h4>

                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-0.5 text-emerald-800 font-bold">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    {activePinEquipment.distance_km} km away
                  </span>
                  <span>•</span>
                  <span>{activePinEquipment.city}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-base font-extrabold text-emerald-800">
                  ₹{activePinEquipment.daily_rate.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-slate-500"> /day</span>
              </div>

              <button
                onClick={() => onBookNow(activePinEquipment)}
                className="text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-4 py-2 rounded-xl shadow-xs transition-colors"
              >
                {isHi ? "अभी बुक करें" : "Book This Machine"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
