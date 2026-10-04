"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { BookingModal } from "@/components/booking/BookingModal";
import { EquipmentDetailsModal } from "@/components/booking/EquipmentDetailsModal";
import { MOCK_EQUIPMENT } from "@/constants/data";
import { Equipment } from "@/types";

export default function EquipmentListPage() {
  const [selectedEqForBooking, setSelectedEqForBooking] = useState<Equipment | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [detailsEq, setDetailsEq] = useState<Equipment | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

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

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
          Agricultural Equipment Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          Explore all verified tractors, harvesters, rotavators, and implements available for rent.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EQUIPMENT.map((eq) => (
            <EquipmentCard
              key={eq.id}
              equipment={eq}
              onBookNow={(item) => {
                setSelectedEqForBooking(item);
                setBookingOpen(true);
              }}
              onViewDetails={(item) => {
                setDetailsEq(item);
                setDetailsOpen(true);
              }}
            />
          ))}
        </div>
      </main>

      <Footer />

      <BookingModal
        equipment={selectedEqForBooking}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      <EquipmentDetailsModal
        equipment={detailsEq}
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onBookNow={(item) => {
          setSelectedEqForBooking(item);
          setBookingOpen(true);
        }}
      />
    </div>
  );
}
