"use client";

import React from "react";
import { EquipmentCategoryTaxonomy } from "@/content/equipment-taxonomy";
import { useTranslation } from "@/i18n/context";
import { AppImage } from "@/components/ui/AppImage";
import {
  Tractor,
  Shovel,
  Sprout,
  ShieldAlert,
  Droplets,
  Scissors,
  RotateCw,
  Layers,
  Truck,
  Flower,
  Milk,
  Hammer,
  Zap,
  Cpu,
  ArrowRight
} from "lucide-react";

interface CategoryCardProps {
  category: EquipmentCategoryTaxonomy;
  isSelected?: boolean;
  onSelect: (category: EquipmentCategoryTaxonomy) => void;
  count?: number;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Tractor,
  Shovel,
  Sprout,
  ShieldAlert,
  Droplets,
  Scissors,
  RotateCw,
  Layers,
  Truck,
  Flower,
  Milk,
  Hammer,
  Zap,
  Cpu
};

const SLUG_TO_IMAGE_ID: Record<string, string> = {
  tractor: "cat-tractor",
  "land-preparation": "cat-rotavator",
  "sowing-planting": "cat-seed-drill",
  "crop-protection": "cat-sprayer",
  harvesting: "cat-combine",
  "post-harvest": "cat-thresher",
  irrigation: "cat-pump-set",
  drone: "cat-drone",
  cultivator: "cat-cultivator",
  "laser-leveller": "cat-laser-leveller",
  "paddy-transplanter": "cat-paddy-transplanter",
  baler: "cat-baler",
  trolley: "cat-trolley",
  "chaff-cutter": "cat-chaff-cutter"
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected = false,
  onSelect,
  count = 12
}) => {
  const { locale, formatNumber, t } = useTranslation();
  const IconComponent = ICON_MAP[category.iconName] || Tractor;

  // Localized script name for this category
  const localizedName = category.names[locale] || category.name;
  const imageId = SLUG_TO_IMAGE_ID[category.slug] || "cat-tractor";

  const rateUnitKey =
    category.defaultRateUnit === "hour"
      ? "units.perHour"
      : category.defaultRateUnit === "day"
      ? "units.perDay"
      : category.defaultRateUnit === "acre"
      ? "units.perAcre"
      : "units.perQuintal";

  return (
    <button
      type="button"
      onClick={() => onSelect(category)}
      className={`group relative flex flex-col p-3 rounded-2xl border text-left transition-all duration-200 select-none cursor-pointer ${
        isSelected
          ? "bg-[#dcfce7] dark:bg-[#143d22] border-[#16a34a] ring-2 ring-[#16a34a]/30 shadow-md"
          : "bg-[var(--surface)] border-[var(--border)] hover:border-[#16a34a] hover:bg-[var(--bg-wheat)] hover:shadow-xs"
      }`}
    >
      {/* Category Image with Lucide Icon Overlay Badge */}
      <div className="relative w-full rounded-xl overflow-hidden mb-2.5">
        <AppImage
          imageId={imageId}
          className="w-full"
          imgClassName="rounded-xl group-hover:scale-105 transition-transform duration-300"
          showCredit={false}
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
        <div
          className={`absolute top-2 left-2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors shadow-sm backdrop-blur-xs z-10 ${
            isSelected
              ? "bg-[#14532d] text-white"
              : "bg-white/95 text-[#14532d] group-hover:bg-[#14532d] group-hover:text-white"
          }`}
        >
          <IconComponent className="w-4 h-4" />
        </div>

        <span className="absolute bottom-2 right-2 text-[10px] font-bold text-slate-700 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-2xs z-10">
          {formatNumber(count)} {t("home", "stats.machines")}
        </span>
      </div>

      <h4 className="font-bold text-[var(--text)] text-sm leading-snug group-hover:text-[#14532d] dark:group-hover:text-emerald-400">
        {localizedName}
      </h4>

      <div className="mt-2.5 pt-2 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-bold text-[#14532d] dark:text-emerald-400">
        <span>{t("common", rateUnitKey)}</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </button>
  );
};
