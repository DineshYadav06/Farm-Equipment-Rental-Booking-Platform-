"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { EQUIPMENT_TAXONOMY } from "@/content/equipment-taxonomy";
import { AppImage } from "@/components/ui/AppImage";
import {
  Tractor,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  PlusCircle
} from "lucide-react";

export default function ListYourEquipmentPage() {
  const router = useRouter();
  const { t, formatPrice, formatNumber, locale } = useTranslation();

  // Earnings Estimator States
  const [selectedMachineType, setSelectedMachineType] = useState("Tractor");
  const [rentalDaysPerMonth, setRentalDaysPerMonth] = useState(12);
  const [dailyRateEstimate, setDailyRateEstimate] = useState(7000);

  const estimatedMonthlyGross = rentalDaysPerMonth * dailyRateEstimate;
  const estimatedNetEarnings = Math.round(estimatedMonthlyGross * 0.95); // 95% net to owner

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1 space-y-8">
      {/* Title & Visual Banner Card */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#fafaf5] p-6 rounded-3xl border border-[#e5e5df]">
        <div className="space-y-2 flex-1">
          <div className="inline-block h-1 w-12 bg-[#d97706] mb-1 rounded-full" />
          <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
            List Your Equipment & Earn (अपनी मशीन पंजीकृत करें)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Turn your idle tractors, combine harvesters, and implements into regular monthly income with verified farmer bookings.
          </p>
        </div>
        <div className="w-full sm:w-64 shrink-0">
          <AppImage
            imageId="owner-cta"
            className="w-full rounded-2xl overflow-hidden shadow-sm"
            imgClassName="rounded-2xl"
            showCredit={false}
          />
        </div>
      </div>

      {/* Earnings Estimator Widget */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#16a34a] shadow-lg space-y-6 text-xs">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#14532d]" />
          <span>Estimated Monthly Earnings Calculator (मासिक आय कैलकुलेटर)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Machine Category</label>
            <select
              value={selectedMachineType}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedMachineType(val);
                if (val === "Harvester") setDailyRateEstimate(18000);
                else if (val === "Rotavator") setDailyRateEstimate(5000);
                else setDailyRateEstimate(7000);
              }}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-semibold bg-white"
            >
              {EQUIPMENT_TAXONOMY.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.names[locale] || c.name} ({c.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between font-bold text-slate-700 mb-1.5">
              <span>Rental Days per Month:</span>
              <span className="text-[#14532d]">{rentalDaysPerMonth} Days</span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              value={rentalDaysPerMonth}
              onChange={(e) => setRentalDaysPerMonth(parseInt(e.target.value, 10))}
              className="w-full accent-[#14532d]"
            />
          </div>

          <div>
            <div className="flex justify-between font-bold text-slate-700 mb-1.5">
              <span>Daily Rate Charged:</span>
              <span className="text-[#14532d]">{formatPrice(dailyRateEstimate)}/day</span>
            </div>
            <input
              type="range"
              min="2000"
              max="25000"
              step="500"
              value={dailyRateEstimate}
              onChange={(e) => setDailyRateEstimate(parseInt(e.target.value, 10))}
              className="w-full accent-[#14532d]"
            />
          </div>
        </div>

        {/* Calculated Results Strip */}
        <div className="p-5 rounded-2xl bg-[#dcfce7]/60 border border-[#16a34a]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Estimated Net Monthly Earnings
            </span>
            <div className="text-3xl font-black text-[#14532d]">
              {formatPrice(estimatedNetEarnings)}
              <span className="text-xs font-semibold text-slate-600"> / month</span>
            </div>
          </div>

          <Link
            href="/register"
            className="px-6 py-3 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold rounded-xl shadow-md transition-all shrink-0 flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register as Equipment Owner</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
