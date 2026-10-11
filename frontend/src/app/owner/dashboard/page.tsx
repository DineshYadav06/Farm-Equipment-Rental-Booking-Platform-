"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { EQUIPMENT_TAXONOMY } from "@/content/equipment-taxonomy";
import {
  Tractor,
  TrendingUp,
  CheckCircle2,
  XCircle,
  PlusCircle,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Calendar,
  AlertCircle
} from "lucide-react";

export default function OwnerDashboardPage() {
  const { t, formatPrice, formatNumber, formatDate, locale } = useTranslation();

  const [fleet, setFleet] = useState([
    {
      id: "eq_01",
      title: "50 HP Utility Tractor with Trolley",
      localName: "50 एचपी ट्रैक्टर ट्रॉली",
      category: "Tractor",
      rateDay: 7500,
      isAvailable: true,
      totalBookings: 24,
      totalEarnings: 180000
    },
    {
      id: "eq_02",
      title: "8-Feet High Speed Rotavator",
      localName: "8 फीट रोटावेटर",
      category: "Land Preparation",
      rateDay: 5000,
      isAvailable: false,
      totalBookings: 18,
      totalEarnings: 90000
    }
  ]);

  const [pendingRequests, setPendingRequests] = useState([
    {
      id: "REQ-9921",
      farmerName: "Harpreet Singh",
      farmerPhone: "+91 98765 11223",
      village: "Khanna, Ludhiana",
      machine: "50 HP Utility Tractor with Trolley",
      dates: "2026-10-14 to 2026-10-15 (2 Days)",
      amount: 15700
    }
  ]);

  const toggleAvailability = (id: string) => {
    setFleet((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const handleApprove = (reqId: string) => {
    setPendingRequests((prev) => prev.filter((r) => r.id !== reqId));
    alert(`Booking ${reqId} approved! Farmer notified via SMS.`);
  };

  const handleReject = (reqId: string) => {
    setPendingRequests((prev) => prev.filter((r) => r.id !== reqId));
    alert(`Booking ${reqId} rejected. Escrow refunded to farmer.`);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1 space-y-8">
      {/* Title & Add Equipment Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
          <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
            {t("common", "nav.ownerDashboard")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage your machinery fleet, approve incoming farmer requests, and track direct bank payouts.
          </p>
        </div>

        <Link
          href="/list-your-equipment"
          className="px-4 py-2.5 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Machine (नया उपकरण जोड़ें)</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Earnings</span>
          <div className="text-2xl font-black text-[#14532d] mt-1">{formatPrice(270000)}</div>
          <span className="text-xs text-slate-500 font-medium">Transferred directly to bank</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Active Fleet Machines</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{formatNumber(fleet.length)}</div>
          <span className="text-xs text-slate-500 font-medium">1 available, 1 on field</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Upcoming Field Work</span>
          <div className="text-2xl font-black text-[#d97706] mt-1">{formatNumber(pendingRequests.length)}</div>
          <span className="text-xs text-slate-500 font-medium">Awaiting your approval</span>
        </div>
      </div>

      {/* Incoming Booking Requests (Approve / Reject) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <span>Incoming Booking Requests (बुकिंग अनुमोदन)</span>
          {pendingRequests.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
              {pendingRequests.length} New
            </span>
          )}
        </h2>

        {pendingRequests.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No pending rental requests at this moment.</p>
        ) : (
          <div className="space-y-3">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-[#fafaf5] border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-sm font-bold">{req.farmerName}</strong>
                    <span className="text-slate-400">({req.village})</span>
                  </div>
                  <div className="text-slate-600">
                    Machine: <span className="font-semibold text-slate-800">{req.machine}</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Schedule: {req.dates} • Phone: {req.farmerPhone}
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Payout Value</span>
                    <strong className="text-base font-black text-[#14532d]">{formatPrice(req.amount)}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReject(req.id)}
                      className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl flex items-center gap-1 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="px-4 py-2 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold rounded-xl flex items-center gap-1 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve (स्वीकारें)</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fleet Management Table (With Local Script Names) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          My Registered Fleet (मेरे पंजीकृत कृषि यंत्र)
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-2">Equipment Title</th>
                <th className="py-3 px-2">Local Name (स्थानीय नाम)</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2">Daily Rate</th>
                <th className="py-3 px-2">Total Jobs</th>
                <th className="py-3 px-2 text-right">Availability Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {fleet.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-2 font-bold text-slate-900">{item.title}</td>
                  <td className="py-3.5 px-2 text-[#14532d] font-semibold">{item.localName}</td>
                  <td className="py-3.5 px-2">{item.category}</td>
                  <td className="py-3.5 px-2 font-bold">{formatPrice(item.rateDay)}/day</td>
                  <td className="py-3.5 px-2">{formatNumber(item.totalBookings)} rentals</td>
                  <td className="py-3.5 px-2 text-right">
                    <button
                      onClick={() => toggleAvailability(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[11px] transition-colors ${
                        item.isAvailable
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      <span>{item.isAvailable ? "Available (उपलब्ध)" : "Busy (व्यस्त)"}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
