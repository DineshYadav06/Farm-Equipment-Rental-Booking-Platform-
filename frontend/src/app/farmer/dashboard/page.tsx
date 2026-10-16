"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { AppImage } from "@/components/ui/AppImage";
import { BookingTracker } from "@/components/booking/BookingTracker";
import { Booking } from "@/types";
import {
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  AlertCircle,
  Truck,
  ArrowRight,
  Printer
} from "lucide-react";

export default function FarmerDashboardPage() {
  const { t, formatPrice, formatDate, formatNumber } = useTranslation();

  const [activeBookings] = useState([
    {
      id: "FRH-882194",
      equipment: "50 HP Utility Tractor with Cage Wheels",
      equipmentId: "eq_1",
      category: "Tractor",
      owner: "Gurmeet Singh Gill",
      ownerPhone: "90000 00012",
      startDate: "2026-10-12",
      durationDays: 2,
      totalAmount: 1570000,
      status: "confirmed",
      escrowStatus: "Held in Escrow"
    },
    {
      id: "FRH-319042",
      equipment: "Multi-Crop Combine Harvester",
      equipmentId: "eq_2",
      category: "Harvester",
      owner: "Balwinder Dhillon",
      ownerPhone: "90000 00045",
      startDate: "2026-10-20",
      durationDays: 1,
      totalAmount: 1850000,
      status: "pending",
      escrowStatus: "Awaiting Confirmation"
    }
  ]);

  // Active booking mapped to Booking interface for BookingTracker
  const currentTrackedBooking: Booking = {
    id: activeBookings[0].id,
    equipment_id: activeBookings[0].equipmentId,
    equipment_title: activeBookings[0].equipment,
    equipment_category: activeBookings[0].category,
    farmer_id: "user_farmer_1",
    farmer_name: "Farmer",
    farmer_phone: "+91 98765 43210",
    owner_id: "user_owner_1",
    owner_name: activeBookings[0].owner,
    owner_phone: activeBookings[0].ownerPhone,
    rental_type: "daily",
    start_date: activeBookings[0].startDate,
    end_date: "2026-10-14",
    status: "confirmed",
    delivery_type: "owner_delivery",
    delivery_address: "Samrala, Ludhiana",
    payment_status: "paid",
    total_amount: activeBookings[0].totalAmount,
    platform_fee: 9900,
    security_deposit: 200000,
    created_at: "2026-10-10T10:00:00Z"
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1 space-y-6">
      {/* Title */}
      <div>
        <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] dark:text-white tracking-tight">
          {t("common", "nav.farmerDashboard")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Track active field rentals, operator dispatches, and download verified digital receipts.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Active Rentals</span>
          <div className="text-2xl font-black text-[#14532d] dark:text-emerald-400 mt-1">
            {formatNumber(activeBookings.length > 0 ? 1 : 0)}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Field work scheduled</span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Funds in Escrow</span>
          <div className="text-2xl font-black text-[#d97706] mt-1">{formatPrice(1570000)}</div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Safe in platform escrow</span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Completed Jobs</span>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1">{formatNumber(4)}</div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Across past seasons</span>
        </div>
      </div>

      {/* Live Booking Tracker Component (A9) */}
      <BookingTracker booking={currentTrackedBooking} />

      {/* Bookings Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          Rental Bookings & Telemetry
        </h2>

        {activeBookings.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-56 max-w-full mx-auto">
              <AppImage
                imageId="illustration-empty-bookings"
                className="w-full"
                showCredit={false}
              />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">No bookings scheduled</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Book equipment from the catalog to start tracking rentals here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-3 px-2">Booking ID</th>
                  <th className="py-3 px-2">Equipment</th>
                  <th className="py-3 px-2">Owner Contact</th>
                  <th className="py-3 px-2">Work Date</th>
                  <th className="py-3 px-2">Escrow Status</th>
                  <th className="py-3 px-2">Amount</th>
                  <th className="py-3 px-2 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                {activeBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-2 font-mono font-bold text-[#14532d] dark:text-emerald-400">{b.id}</td>
                    <td className="py-3.5 px-2">
                      <strong className="text-slate-900 dark:text-white block">{b.equipment}</strong>
                      <span className="text-[10px] text-slate-400">{b.category}</span>
                    </td>
                    <td className="py-3.5 px-2">
                      <span>{b.owner}</span>
                      <span className="block text-[10px] text-slate-400">+91 {b.ownerPhone}</span>
                    </td>
                    <td className="py-3.5 px-2">{formatDate(b.startDate)}</td>
                    <td className="py-3.5 px-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 font-bold text-[10px] border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{b.escrowStatus}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-2 font-bold text-slate-900 dark:text-white">{formatPrice(b.totalAmount)}</td>
                    <td className="py-3.5 px-2 text-right">
                      <Link
                        href={`/booking/receipt/${b.id}?eqTitle=${encodeURIComponent(b.equipment)}&cat=${encodeURIComponent(b.category)}&total=${b.totalAmount}&days=${b.durationDays}&date=${b.startDate}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#14532d] hover:text-white text-slate-700 dark:text-slate-300 font-bold text-[11px] transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Receipt</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
