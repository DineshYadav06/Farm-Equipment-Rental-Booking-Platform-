"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FarmerDashboardView } from "@/components/dashboard/FarmerDashboardView";
import { MOCK_EQUIPMENT } from "@/constants/data";

export default function FarmerDashboardPage() {
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
        <FarmerDashboardView
          nearbyEquipment={MOCK_EQUIPMENT}
          onBookNow={() => {}}
          selectedCity="Ludhiana, Punjab"
        />
      </main>
      <Footer />
    </div>
  );
}
