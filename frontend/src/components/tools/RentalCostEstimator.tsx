"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ALL_LAND_UNITS, convertLandArea } from "@/content/land-units";
import { Equipment } from "@/types";
import { useTranslation } from "@/i18n/context";
import { Calculator, AlertCircle, Info, UserCheck, Clock, Calendar, ArrowRight } from "lucide-react";

interface RentalCostEstimatorProps {
  equipment?: Equipment;
}

export const RentalCostEstimator: React.FC<RentalCostEstimatorProps> = ({ equipment }) => {
  const { formatPrice, formatNumber } = useTranslation();

  // If no equipment passed, use benchmark options
  const [selectedCategory, setSelectedCategory] = useState<string>("Tractor");
  const [landArea, setLandArea] = useState<number>(3);
  const [landUnit, setLandUnit] = useState<string>("acre");
  const [rateType, setRateType] = useState<"hourly" | "daily">("hourly");
  const [duration, setDuration] = useState<number>(6); // hours or days
  const [withDriver, setWithDriver] = useState<boolean>(true);

  // Benchmarks if no specific equipment
  const benchmarks: Record<string, { hourly: number; daily: number; hp: number }> = {
    Tractor: { hourly: 80000, daily: 550000, hp: 50 }, // 800/hr, 5500/day in paise
    Harvester: { hourly: 220000, daily: 1600000, hp: 100 },
    Rotavator: { hourly: 60000, daily: 400000, hp: 45 },
    LaserLeveler: { hourly: 90000, daily: 650000, hp: 55 }
  };

  const activeHourlyRate = equipment ? equipment.hourly_rate : benchmarks[selectedCategory]?.hourly || 80000;
  const activeDailyRate = equipment ? equipment.daily_rate : benchmarks[selectedCategory]?.daily || 550000;

  // Convert land area to standard acres for work-time estimation
  const acresEquivalent = convertLandArea(landArea, landUnit, "acre").converted;

  // Driver fee estimate: ₹100/hr (10000 paise) or ₹600/day (60000 paise)
  const driverRate = rateType === "hourly" ? 10000 : 60000;

  // Base equipment cost
  const baseRate = rateType === "hourly" ? activeHourlyRate : activeDailyRate;
  const baseCost = baseRate * duration;
  const driverCost = withDriver ? driverRate * duration : 0;
  const totalEstimatedCost = baseCost + driverCost;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[#16a34a]" />
          <span>Rental Cost Estimator</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Calculate estimated machinery expenditure based on your farm acreage, duration, and operator needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Machine selection if standalone */}
        {!equipment && (
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Machine Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-[#16a34a] focus:outline-hidden"
            >
              <option value="Tractor">Tractor (50 HP Standard)</option>
              <option value="Harvester">Combine Harvester (Paddy, Wheat)</option>
              <option value="Rotavator">Rotavator and Tiller</option>
              <option value="LaserLeveler">Laser Land Leveler</option>
            </select>
          </div>
        )}

        {/* Land Size & Unit */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Total Farm Area
          </label>
          <div className="flex rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden focus-within:ring-2 focus-within:ring-[#16a34a]">
            <input
              type="number"
              min="0.5"
              step="any"
              value={landArea}
              onChange={(e) => setLandArea(parseFloat(e.target.value) || 0)}
              className="w-1/2 p-2.5 text-sm font-bold bg-transparent text-slate-900 dark:text-white focus:outline-hidden"
            />
            <select
              value={landUnit}
              onChange={(e) => setLandUnit(e.target.value)}
              className="w-1/2 p-2.5 text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-l border-slate-300 dark:border-slate-700 focus:outline-hidden"
            >
              {ALL_LAND_UNITS.map((u) => (
                <option key={u.unitKey} value={u.unitKey}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div className="text-[11px] text-slate-400">
            Equivalent: ~{formatNumber(acresEquivalent)} Acres
          </div>
        </div>

        {/* Rate Type */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Hiring Basis
          </label>
          <div className="flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => {
                setRateType("hourly");
                setDuration(6);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                rateType === "hourly"
                  ? "bg-white dark:bg-slate-700 text-[#14532d] dark:text-emerald-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Hourly Rate</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setRateType("daily");
                setDuration(1);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                rateType === "daily"
                  ? "bg-white dark:bg-slate-700 text-[#14532d] dark:text-emerald-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Daily Rate</span>
            </button>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            {rateType === "hourly" ? "Estimated Hours" : "Number of Days"}
          </label>
          <input
            type="number"
            min="1"
            max={rateType === "hourly" ? 72 : 30}
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10) || 1)}
            className="w-full p-2.5 text-sm font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#16a34a] focus:outline-hidden"
          />
        </div>
      </div>

      {/* Driver Toggle */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-[#16a34a]" />
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Include Experienced Operator / Driver
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Adds operator allowance (~{rateType === "hourly" ? "₹100/hr" : "₹600/day"})
            </div>
          </div>
        </div>
        <input
          type="checkbox"
          checked={withDriver}
          onChange={(e) => setWithDriver(e.target.checked)}
          className="w-4 h-4 rounded text-[#16a34a] focus:ring-[#16a34a]"
        />
      </div>

      {/* Cost Breakdown & Output */}
      <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
            Base Rental ({duration} {rateType === "hourly" ? "hours" : "days"}):
          </span>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {formatPrice(baseCost)}
          </span>
        </div>

        {withDriver && (
          <div className="flex items-baseline justify-between text-xs text-slate-600 dark:text-slate-400">
            <span>Operator Allowance:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {formatPrice(driverCost)}
            </span>
          </div>
        )}

        <div className="pt-2 border-t border-emerald-200 dark:border-emerald-900 flex items-baseline justify-between">
          <div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">
              Estimated Total Cost
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              All taxes & charges estimated
            </div>
          </div>
          <div className="text-2xl font-black text-[#14532d] dark:text-emerald-400">
            {formatPrice(totalEstimatedCost)}
          </div>
        </div>
      </div>

      {/* Statutory / Compliance Disclaimer */}
      <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-300 text-xs leading-relaxed">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
        <div>
          <strong>Estimate only.</strong> Actual owner rates apply. Fuel charges and operator allowances may vary depending on local soil conditions, crop height, and field terrain.
        </div>
      </div>
    </div>
  );
};
