"use client";

import React, { use } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MOCK_EQUIPMENT } from "@/constants/data";
import { Star, MapPin, ArrowLeft } from "lucide-react";

export default function EquipmentDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const equipment = MOCK_EQUIPMENT.find((e) => e.id === id) || MOCK_EQUIPMENT[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar
        currentLang="en"
        onToggleLang={() => {}}
        activeRole="farmer"
        onToggleRole={() => {}}
        selectedCity="Ludhiana, Punjab"
        onSelectCity={() => {}}
        onOpenNotifications={() => {}}
        onOpenListEquipment={() => {}}
        onScrollToSection={() => {}}
      />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {equipment.category}
              </span>
              <h1 className="text-2xl font-black text-slate-900 mt-1">{equipment.title}</h1>
            </div>
            <div className="flex items-center gap-1 text-sm font-extrabold text-amber-600 bg-amber-50 px-3 py-1 rounded-xl">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>{equipment.average_rating.toFixed(1)}</span>
              <span className="text-xs text-slate-500">({equipment.total_reviews} reviews)</span>
            </div>
          </div>

          <div className="h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src={equipment.images[0]}
              alt={equipment.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400">Year</span>
              <div className="font-bold text-slate-800">{equipment.year}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400">Power</span>
              <div className="font-bold text-slate-800">{equipment.hp ? `${equipment.hp} HP` : "N/A"}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400">Fuel</span>
              <div className="font-bold text-slate-800">{equipment.fuel_type}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400">Condition</span>
              <div className="font-bold text-emerald-700">{equipment.condition}</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Description</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {equipment.description}
            </p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500">Daily Rental Fee</span>
              <div className="text-2xl font-black text-emerald-800">
                ₹{equipment.daily_rate.toLocaleString("en-IN")}/day
              </div>
            </div>
            <Link
              href="/"
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Book from Marketplace
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
