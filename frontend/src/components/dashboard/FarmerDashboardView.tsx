"use client";

import React, { useState } from "react";
import { Equipment, Booking } from "@/types";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  Bell,
  Search,
  ChevronRight,
  ShieldCheck,
  Download,
  AlertTriangle
} from "lucide-react";

interface FarmerDashboardViewProps {
  nearbyEquipment: Equipment[];
  onBookNow: (equipment: Equipment) => void;
  selectedCity: string;
  lang?: "en" | "hi";
}

export const FarmerDashboardView: React.FC<FarmerDashboardViewProps> = ({
  nearbyEquipment,
  onBookNow,
  selectedCity,
  lang = "en"
}) => {
  const isHi = lang === "hi";

  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "payments">("overview");

  // Mock Active Farmer Bookings
  const activeBookings = [
    {
      id: "FRH-883921",
      equipmentTitle: "Mahindra 575 DI Sarpanch 47 HP Tractor",
      ownerName: "Gurpreet Singh Gill",
      ownerPhone: "+91 98765 43210",
      startDate: "Tomorrow, Oct 06 • 8:00 AM",
      duration: "2 Days (Field Ploughing)",
      status: "Confirmed & Dispatched",
      totalPaid: 6499,
      depositStatus: "₹2,500 Held in Escrow"
    }
  ];

  const recentPayments = [
    {
      id: "PAY-90412",
      bookingId: "FRH-883921",
      date: "04 Oct 2026",
      amount: "₹6,499",
      method: "UPI (Google Pay)",
      status: "Successful"
    },
    {
      id: "PAY-87210",
      bookingId: "FRH-712093",
      date: "28 Sep 2026",
      amount: "₹2,299",
      method: "Kisan Credit Card",
      status: "Completed (Deposit Refunded)"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome & KPI Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-900/60 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 mb-2">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>{selectedCity} • GPS Active</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isHi ? "नमस्ते, राजेश कुमार शर्मा जी" : "Namaste, Rajesh Kumar Ji"}
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
              {isHi
                ? "रबी सीजन 2026 के लिए आपके खेत के पास 84 आधुनिक मशीनें काम के लिए तैयार हैं।"
                : "Rabi Season 2026: 84 verified agricultural machines ready for deployment near your fields."}
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/15 text-center min-w-[100px]">
              <div className="text-[10px] text-emerald-200 uppercase font-semibold">Active Booking</div>
              <div className="text-xl font-extrabold text-white mt-0.5">1 Machine</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/15 text-center min-w-[100px]">
              <div className="text-[10px] text-emerald-200 uppercase font-semibold">Saved in Costs</div>
              <div className="text-xl font-extrabold text-amber-300 mt-0.5">₹14,500</div>
            </div>
          </div>
        </div>

        {/* Dashboard Nav Tabs */}
        <div className="flex gap-2 mt-6 border-t border-emerald-600/60 pt-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "overview" ? "bg-white text-emerald-900 shadow-xs" : "text-emerald-100 hover:bg-white/10"
            }`}
          >
            Overview & Live Bookings
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "bookings" ? "bg-white text-emerald-900 shadow-xs" : "text-emerald-100 hover:bg-white/10"
            }`}
          >
            Booking History (3)
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "payments" ? "bg-white text-emerald-900 shadow-xs" : "text-emerald-100 hover:bg-white/10"
            }`}
          >
            Escrow & Receipts
          </button>
        </div>
      </div>

      {/* Active Booking Banner */}
      {activeBookings.length > 0 && (
        <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                {isHi ? "सक्रिय बुकिंग व आगमन ट्रैकर" : "Active Booking & Deployment Tracker"}
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              #FRH-883921
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Machine Scheduled</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">Mahindra 575 DI (47 HP)</div>
              <div className="text-slate-500 mt-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tomorrow 8:00 AM • 2 Days</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Assigned Operator & Owner</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">Gurpreet Singh Gill</div>
              <div className="text-slate-500 mt-1 flex items-center gap-1">
                <span>Phone: +91 98765 43210</span>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-emerald-700 font-bold uppercase">Payment & Protection</div>
                <div className="font-extrabold text-emerald-900 text-base mt-0.5">₹6,499 Paid</div>
                <div className="text-[10px] text-slate-600 mt-0.5">₹2,500 Security Deposit Protected</div>
              </div>
              <button
                onClick={() => alert("Connecting to Owner Call...")}
                className="mt-2 w-full text-center py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold"
              >
                Call Driver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Payments Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <h3 className="font-extrabold text-slate-900 text-base mb-3">
          {isHi ? "हाल के भुगतान एवं रसीदें" : "Recent Payments & Invoices"}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                <th className="py-2.5 px-3">Invoice ID</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Method</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 font-mono font-bold text-slate-800">{p.id}</td>
                  <td className="py-3 px-3 text-slate-600">{p.date}</td>
                  <td className="py-3 px-3 font-extrabold text-emerald-800">{p.amount}</td>
                  <td className="py-3 px-3 text-slate-600">{p.method}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => alert(`Downloading tax invoice for ${p.id}`)}
                      className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-700 font-bold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
