"use client";

import React, { useState } from "react";
import { Equipment } from "@/types";
import {
  X,
  Star,
  MapPin,
  ShieldCheck,
  UserCheck,
  Fuel,
  Gauge,
  Calendar,
  CheckCircle2,
  Phone,
  FileCheck
} from "lucide-react";

interface EquipmentDetailsModalProps {
  equipment: Equipment | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (equipment: Equipment) => void;
  lang?: "en" | "hi";
}

export const EquipmentDetailsModal: React.FC<EquipmentDetailsModalProps> = ({
  equipment,
  isOpen,
  onClose,
  onBookNow,
  lang = "en"
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !equipment) return null;

  const isHi = lang === "hi";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
              {equipment.category} • {equipment.brand}
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
              {equipment.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main Photo & Thumbnails */}
          <div className="space-y-2">
            <div className="h-56 sm:h-64 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={equipment.images[activeImageIndex] || equipment.images[0]}
                alt={equipment.title}
                className="w-full h-full object-cover"
              />
            </div>
            {equipment.images.length > 1 && (
              <div className="flex gap-2">
                {equipment.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-14 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? "border-emerald-600 scale-102" : "border-slate-200 opacity-70"
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Specifications Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              {isHi ? "तकनीकी विवरण" : "Technical Specifications"}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500">{isHi ? "मॉडल वर्ष" : "Year"}</div>
                <div className="font-bold text-slate-800">{equipment.year}</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500">{isHi ? "इंजन क्षमता" : "Power"}</div>
                <div className="font-bold text-slate-800">{equipment.hp ? `${equipment.hp} HP` : "N/A"}</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500">{isHi ? "ईंधन प्रकार" : "Fuel / Drive"}</div>
                <div className="font-bold text-slate-800">{equipment.fuel_type}</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500">{isHi ? "मशीन स्थिति" : "Condition"}</div>
                <div className="font-bold text-emerald-700">{equipment.condition}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              {isHi ? "विवरण व उपयोग" : "Overview & Suitable Operations"}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
              {equipment.description}
            </p>
          </div>

          {/* Owner & Trust Details */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                {equipment.owner_name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 text-sm">{equipment.owner_name}</span>
                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-200/70 px-1.5 py-0.2 rounded-md">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    Verified
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-0.5 flex items-center gap-2">
                  <span>{equipment.city}, {equipment.state}</span>
                  <span>•</span>
                  <span>{equipment.owner_phone}</span>
                </div>
              </div>
            </div>

            <div className="text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-emerald-200/60">
              <div className="text-[10px] text-slate-500">{isHi ? "मालिक रेटिंग" : "Owner Score"}</div>
              <div className="flex items-center sm:justify-end gap-1 text-sm font-extrabold text-slate-900">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>{equipment.average_rating.toFixed(1)} / 5.0</span>
                <span className="text-xs font-normal text-slate-500">({equipment.total_bookings} rentals)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Price and Booking Action */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">
              {isHi ? "किराया दर" : "Rental Rate"}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-emerald-800">
                ₹{equipment.daily_rate.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-slate-500">/{isHi ? "दिन" : "day"}</span>
              <span className="text-xs text-slate-400 ml-1">
                (₹{equipment.hourly_rate}/{isHi ? "घंटा" : "hr"})
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {isHi ? "बंद करें" : "Close"}
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(equipment);
              }}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all"
            >
              {isHi ? "अभी बुक करें" : "Book This Machine"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
