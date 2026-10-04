"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OwnerDashboardView } from "@/components/dashboard/OwnerDashboardView";
import { ListEquipmentModal } from "@/components/owner/ListEquipmentModal";

export default function OwnerDashboardPage() {
  const [listModalOpen, setListModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar
        currentLang="en"
        onToggleLang={() => {}}
        activeRole="owner"
        onToggleRole={() => {}}
        selectedCity="Ludhiana, Punjab"
        onSelectCity={() => {}}
        onOpenNotifications={() => {}}
        onOpenListEquipment={() => setListModalOpen(true)}
        onScrollToSection={() => {}}
      />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <OwnerDashboardView
          onOpenListEquipment={() => setListModalOpen(true)}
        />
      </main>
      <Footer />

      <ListEquipmentModal
        isOpen={listModalOpen}
        onClose={() => setListModalOpen(false)}
      />
    </div>
  );
}
