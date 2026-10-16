"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { savedEquipmentService } from "@/services/saved";
import { Equipment } from "@/types";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { BookingModal } from "@/components/booking/BookingModal";
import { EquipmentDetailsModal } from "@/components/booking/EquipmentDetailsModal";
import { CompareBar } from "@/components/equipment/CompareBar";
import { Heart, ArrowLeft, ArrowRight } from "lucide-react";

export default function SavedEquipmentPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  const [bookingEquipment, setBookingEquipment] = useState<Equipment | null>(null);
  const [detailsEquipment, setDetailsEquipment] = useState<Equipment | null>(null);

  const loadSaved = async () => {
    try {
      const data = await savedEquipmentService.getSavedEquipment();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSaved();

    const handleSavedChanged = () => {
      loadSaved();
    };

    window.addEventListener("farmrenthub_saved_changed", handleSavedChanged);
    return () => {
      window.removeEventListener("farmrenthub_saved_changed", handleSavedChanged);
    };
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
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
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
            <span>Saved Equipment</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Machines you have bookmarked for quick hiring. Stored locally on this device.
          </p>
        </div>

        <Link
          href="/equipment"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14532d] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 px-4 py-2.5 rounded-xl border border-[#16a34a]/30 transition-colors"
        >
          <span>Browse More</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500 text-sm">
          Loading saved machines...
        </div>
      ) : items.length === 0 ? (
        <div className="max-w-md mx-auto py-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-500 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            No saved equipment yet
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Tap the heart icon on any equipment card or machine page to bookmark it here for later.
          </p>
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#14532d] hover:bg-[#16a34a] px-5 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <span>Explore Equipment Catalog</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((eq) => (
            <EquipmentCard
              key={eq.id}
              equipment={eq}
              onBookNow={(item) => setBookingEquipment(item)}
              onViewDetails={(item) => setDetailsEquipment(item)}
            />
          ))}
        </div>
      )}

      {/* Floating compare bar */}
      <CompareBar />

      {/* Modals */}
      {bookingEquipment && (
        <BookingModal
          equipment={bookingEquipment}
          isOpen={true}
          onClose={() => setBookingEquipment(null)}
          onSuccess={() => setBookingEquipment(null)}
        />
      )}

      {detailsEquipment && (
        <EquipmentDetailsModal
          equipment={detailsEquipment}
          isOpen={true}
          onClose={() => setDetailsEquipment(null)}
          onBookNow={(item) => {
            setDetailsEquipment(null);
            setBookingEquipment(item);
          }}
        />
      )}
    </main>
  );
}
