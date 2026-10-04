import React from "react";
import { Equipment } from "@/types";
import { Star, MapPin, ShieldCheck, UserCheck, Calendar, Clock, Gauge, Fuel } from "lucide-react";

interface EquipmentCardProps {
  equipment: Equipment;
  onBookNow: (equipment: Equipment) => void;
  onViewDetails: (equipment: Equipment) => void;
  lang?: "en" | "hi";
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({
  equipment,
  onBookNow,
  onViewDetails,
  lang = "en"
}) => {
  const isHi = lang === "hi";

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 overflow-hidden">
      {/* Image & Badges */}
      <div className="relative h-50 sm:h-54 w-full overflow-hidden bg-slate-100">
        <img
          src={equipment.images[0]}
          alt={equipment.title}
          className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* Distance Badge */}
        {equipment.distance_km !== undefined && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-slate-200/60">
            <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>{equipment.distance_km} km {isHi ? "दूर" : "away"}</span>
          </div>
        )}

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          {equipment.is_available ? (
            <span className="flex items-center gap-1 bg-emerald-600/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-200 animate-ping" />
              {isHi ? "उपलब्ध" : "Available"}
            </span>
          ) : (
            <span className="bg-slate-800/90 text-slate-200 text-[11px] font-semibold px-2.5 py-1 rounded-full">
              {isHi ? "आरक्षित" : "Booked"}
            </span>
          )}
        </div>

        {/* Driver/Operator Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
            <UserCheck className="w-3 h-3 text-emerald-400" />
            {equipment.with_driver
              ? isHi ? "चालक सहित" : "With Operator"
              : isHi ? "मशीन केवल" : "Self Drive"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4.5 sm:p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
            {equipment.category}
          </span>

          <div className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{equipment.average_rating.toFixed(1)}</span>
            <span className="text-[10px] font-normal text-slate-500">
              ({equipment.total_reviews})
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-emerald-800 transition-colors">
          {equipment.title}
        </h3>

        {/* Specs Pill row */}
        <div className="flex items-center gap-3 text-slate-500 text-[11px] font-medium mt-2 pb-3 border-b border-slate-100">
          {equipment.hp && (
            <div className="flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              <span>{equipment.hp} HP</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Fuel className="w-3.5 h-3.5 text-slate-400" />
            <span>{equipment.fuel_type}</span>
          </div>
          <div className="flex items-center gap-1 ml-auto text-slate-600 font-semibold">
            <span>{equipment.city}</span>
          </div>
        </div>

        {/* Owner Trust Note */}
        <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-slate-600">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="truncate">
            {isHi ? "मालिक:" : "Owner:"} <strong className="text-slate-800">{equipment.owner_name}</strong>
          </span>
        </div>

        {/* Price & Actions */}
        <div className="mt-auto pt-3.5 flex items-end justify-between gap-2">
          <div>
            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">
              {isHi ? "किराया दर" : "Rental Rate"}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-emerald-800">
                ₹{equipment.daily_rate.toLocaleString("en-IN")}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                /{isHi ? "दिन" : "day"}
              </span>
            </div>
            <div className="text-[11px] font-medium text-slate-500">
              ₹{equipment.hourly_rate}/{isHi ? "घंटा" : "hr"}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onViewDetails(equipment)}
              className="text-xs font-bold text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors"
            >
              {isHi ? "विवरण" : "Details"}
            </button>
            <button
              onClick={() => onBookNow(equipment)}
              className="text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-3.5 py-2 rounded-xl shadow-xs hover:shadow transition-all active:scale-97"
            >
              {isHi ? "बुक करें" : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
