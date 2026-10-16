"use client";

import React, { useState, useEffect } from "react";
import { Equipment } from "@/types";
import { useTranslation } from "@/i18n/context";
import { SourceNote } from "@/components/ui/SourceNote";
import { savedEquipmentService } from "@/services/saved";
import { compareService } from "@/services/compare";
import {
  Star,
  MapPin,
  ShieldCheck,
  UserCheck,
  Gauge,
  Fuel,
  Heart,
  Scale
} from "lucide-react";

interface EquipmentCardProps {
  equipment: Equipment;
  onBookNow: (equipment: Equipment) => void;
  onViewDetails: (equipment: Equipment) => void;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({
  equipment,
  onBookNow,
  onViewDetails
}) => {
  const { t, formatPrice, formatNumber } = useTranslation();
  const [isSaved, setIsSaved] = useState(false);
  const [isComparing, setIsComparing] = useState(false);

  useEffect(() => {
    let mounted = true;
    savedEquipmentService.isSaved(equipment.id).then((saved) => {
      if (mounted) setIsSaved(saved);
    });
    setIsComparing(compareService.isComparing(equipment.id));

    const handleSavedChange = () => {
      savedEquipmentService.isSaved(equipment.id).then((saved) => {
        if (mounted) setIsSaved(saved);
      });
    };

    const handleCompareChange = () => {
      if (mounted) {
        setIsComparing(compareService.isComparing(equipment.id));
      }
    };

    window.addEventListener("farmrenthub_saved_changed", handleSavedChange);
    window.addEventListener("farmrenthub_compare_changed", handleCompareChange);

    return () => {
      mounted = false;
      window.removeEventListener("farmrenthub_saved_changed", handleSavedChange);
      window.removeEventListener("farmrenthub_compare_changed", handleCompareChange);
    };
  }, [equipment.id]);

  const handleToggleSaved = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSaved = await savedEquipmentService.toggleSaved(equipment.id);
    setIsSaved(nextSaved);
  };

  const handleToggleCompare = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const res = compareService.toggleCompare(equipment.id);
    if (!res.success && res.reason) {
      alert(res.reason);
    }
  };

  return (
    <article className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-[#16a34a] dark:hover:border-[#16a34a] transition-all duration-200 overflow-hidden text-left">
      {/* Image & Status Badges */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={equipment.images[0] || "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1c?auto=format&fit=crop&w=600&q=80"}
          alt={equipment.title}
          className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* Distance Badge */}
        {equipment.distance_km !== undefined && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs text-slate-800 dark:text-slate-200 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs border border-slate-200 dark:border-slate-700">
            <MapPin className="w-3 h-3 text-[#16a34a] shrink-0" />
            <span>{formatNumber(equipment.distance_km)} {t("common", "units.km")}</span>
          </div>
        )}

        {/* Top Right Actions: Availability Badge + Save Heart Button */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
          {equipment.is_available ? (
            <span className="flex items-center gap-1 bg-[#14532d] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available</span>
            </span>
          ) : (
            <span className="bg-slate-800 text-slate-200 text-[11px] font-semibold px-2 py-0.5 rounded-full">
              Booked
            </span>
          )}

          <button
            type="button"
            onClick={handleToggleSaved}
            aria-label={isSaved ? "Remove from saved machines" : "Save this machine"}
            className={`p-1.5 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
              isSaved
                ? "bg-rose-50 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400"
                : "bg-white/90 text-slate-600 hover:text-rose-600 dark:bg-slate-900/90 dark:text-slate-300"
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-rose-500 text-rose-500" : ""}`} />
          </button>
        </div>

        {/* Driver / Operator Badge */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="inline-flex items-center gap-1 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
            <UserCheck className="w-3 h-3 text-emerald-400" />
            <span>
              {equipment.with_driver
                ? t("common", "badges.withDriver")
                : t("common", "badges.withoutDriver")}
            </span>
          </span>
        </div>

        {/* Compare Checkbox */}
        <div className="absolute bottom-2.5 right-2.5">
          <label className="flex items-center gap-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs text-slate-800 dark:text-slate-200 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs border border-slate-200 dark:border-slate-700 cursor-pointer select-none hover:border-[#16a34a]">
            <input
              type="checkbox"
              checked={isComparing}
              onChange={handleToggleCompare}
              className="w-3.5 h-3.5 rounded border-slate-300 text-[#16a34a] focus:ring-[#16a34a]"
            />
            <Scale className="w-3 h-3 text-[#16a34a]" />
            <span>Compare</span>
          </label>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#14532d] dark:text-emerald-400 bg-[#dcfce7] dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-[#16a34a]/30">
            {equipment.category}
          </span>

          <div className="flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-slate-200 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-900">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{equipment.average_rating.toFixed(1)}</span>
            <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">
              ({formatNumber(equipment.total_reviews)})
            </span>
          </div>
        </div>

        {/* Machine Title */}
        <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-1 group-hover:text-[#14532d] dark:group-hover:text-emerald-400 transition-colors">
          {equipment.title}
        </h3>

        {/* Specs Row */}
        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-[11px] font-medium mt-1.5 pb-2.5 border-b border-slate-100 dark:border-slate-800">
          {equipment.hp && (
            <div className="flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatNumber(equipment.hp)} {t("common", "units.hp")}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Fuel className="w-3.5 h-3.5 text-slate-400" />
            <span>{equipment.fuel_type}</span>
          </div>
          <div className="flex items-center gap-1 ms-auto text-slate-700 dark:text-slate-300 font-semibold truncate max-w-[120px]">
            <span>{equipment.city}</span>
          </div>
        </div>

        {/* Owner Trust Note & Sample Data Badge */}
        <div className="flex items-center justify-between gap-1 mt-2 text-[11px] text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1 truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
            <span className="truncate">
              Owner: <strong className="text-slate-800 dark:text-slate-200 font-semibold">{equipment.owner_name}</strong>
            </span>
          </div>

          {/* Sample Data Badge if sample listing */}
          <SourceNote registryId="price-tractor-50hp-sample" compact={true} />
        </div>

        {/* Price & Actions */}
        <div className="mt-auto pt-3 flex items-end justify-between gap-2 border-t border-slate-100/80 dark:border-slate-800">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              Rental Rate
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-[#14532d] dark:text-emerald-400">
                {formatPrice(equipment.daily_rate)}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                /{t("common", "units.perDay")}
              </span>
            </div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {formatPrice(equipment.hourly_rate)}/{t("common", "units.perHour")}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onViewDetails(equipment)}
              className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#14532d] dark:hover:text-emerald-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-2.5 py-2 rounded-xl transition-colors"
            >
              {t("common", "actions.viewDetails")}
            </button>
            <button
              onClick={() => onBookNow(equipment)}
              className="text-xs font-bold text-white bg-[#14532d] hover:bg-[#16a34a] px-3.5 py-2 rounded-xl shadow-xs hover:shadow transition-all active:scale-95"
            >
              {t("common", "actions.bookNow")}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
