"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { fetchEquipmentById } from "@/services/api";
import { Equipment } from "@/types";
import { compareService } from "@/services/compare";
import { BookingModal } from "@/components/booking/BookingModal";
import {
  ArrowLeft,
  Scale,
  X,
  Plus,
  CheckCircle2,
  XCircle,
  Star,
  Fuel,
  Gauge,
  MapPin,
  ShieldCheck,
  UserCheck
} from "lucide-react";

function CompareContent() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids") || "";
  const { t, formatPrice, formatNumber } = useTranslation();

  const [items, setItems] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForBooking, setSelectedForBooking] = useState<Equipment | null>(null);

  useEffect(() => {
    let mounted = true;
    const ids = idsParam ? idsParam.split(",").filter(Boolean) : compareService.getCompareIds();

    if (ids.length === 0) {
      setItems([]);
      setLoading(false);
      return;
    }

    Promise.all(ids.map((id) => fetchEquipmentById(id))).then((results) => {
      if (mounted) {
        setItems(results.filter((eq): eq is Equipment => eq !== null));
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [idsParam]);

  const handleRemove = (id: string) => {
    compareService.removeCompare(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-500">
        Loading comparison...
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#14532d] dark:text-emerald-400 mx-auto flex items-center justify-center">
          <Scale className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">No Machines Selected for Comparison</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Select up to 3 machines using the "Compare" checkbox on any equipment card to see their specifications side-by-side.
        </p>
        <Link
          href="/equipment"
          className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#14532d] hover:bg-[#16a34a] px-5 py-2.5 rounded-xl shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Equipment Catalog</span>
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/equipment"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Equipment</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-7 h-7 text-[#16a34a]" />
            <span>Side-by-Side Equipment Comparison</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Comparing {items.length} of 3 maximum machines. Compare rates, engine power, and operator terms.
          </p>
        </div>

        {items.length < 3 && (
          <Link
            href="/equipment"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14532d] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 px-4 py-2.5 rounded-xl border border-[#16a34a]/30 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add another machine</span>
          </Link>
        )}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <th className="p-4 w-48 min-w-[180px] text-xs font-bold text-slate-500 uppercase tracking-wider sticky left-0 bg-slate-50 dark:bg-slate-800/90 backdrop-blur-xs z-10">
                Specification
              </th>
              {items.map((item) => (
                <th key={item.id} className="p-4 min-w-[260px] max-w-[320px] align-top">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="absolute top-0 right-0 p-1 text-slate-400 hover:text-rose-500 rounded-full"
                      aria-label="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="h-36 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
                      <img
                        src={item.images[0] || "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1c?auto=format&fit=crop&w=600&q=80"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#14532d] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1 line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.city}, {item.state}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-700 dark:text-slate-300">
            {/* Daily Rate */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10">
                Daily Rate
              </td>
              {items.map((item) => (
                <td key={item.id} className="p-4">
                  <div className="text-base font-black text-[#14532d] dark:text-emerald-400">
                    {formatPrice(item.daily_rate)}
                  </div>
                  <span className="text-[10px] text-slate-400">per 8-hour shift</span>
                </td>
              ))}
            </tr>

            {/* Hourly Rate */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10">
                Hourly Rate
              </td>
              {items.map((item) => (
                <td key={item.id} className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                  {formatPrice(item.hourly_rate)} / hr
                </td>
              ))}
            </tr>

            {/* Horsepower / Engine */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10">
                Engine Power
              </td>
              {items.map((item) => (
                <td key={item.id} className="p-4">
                  {item.hp ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                      <Gauge className="w-3.5 h-3.5 text-[#16a34a]" />
                      {formatNumber(item.hp)} HP
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
              ))}
            </tr>

            {/* Fuel Type */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10">
                Fuel Type
              </td>
              {items.map((item) => (
                <td key={item.id} className="p-4">
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Fuel className="w-3.5 h-3.5 text-slate-400" />
                    {item.fuel_type || "Diesel"}
                  </span>
                </td>
              ))}
            </tr>

            {/* Driver / Operator */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10">
                Operator / Driver
              </td>
              {items.map((item) => (
                <td key={item.id} className="p-4">
                  {item.with_driver ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Included
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400">
                      <XCircle className="w-3.5 h-3.5" />
                      Self-drive / Farmer arranged
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Owner & Trust */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10">
                Owner & Rating
              </td>
              {items.map((item) => (
                <td key={item.id} className="p-4">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    {item.owner_name}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.average_rating.toFixed(1)}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({item.total_reviews} reviews)
                    </span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Action Row */}
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              <td className="p-4 font-bold text-slate-900 dark:text-white sticky left-0 bg-slate-50 dark:bg-slate-800/90 z-10">
                Action
              </td>
              {items.map((item) => (
                <td key={item.id} className="p-4">
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedForBooking(item)}
                      className="w-full text-xs font-bold text-white bg-[#14532d] hover:bg-[#16a34a] py-2 px-3 rounded-xl shadow-xs transition-colors"
                    >
                      Book Now
                    </button>
                    <Link
                      href={`/equipment/${item.id}`}
                      className="w-full text-center text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      Full Details
                    </Link>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Booking Modal */}
      {selectedForBooking && (
        <BookingModal
          equipment={selectedForBooking}
          isOpen={true}
          onClose={() => setSelectedForBooking(null)}
          onSuccess={() => setSelectedForBooking(null)}
        />
      )}
    </main>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading...</div>}>
      <CompareContent />
    </Suspense>
  );
}
