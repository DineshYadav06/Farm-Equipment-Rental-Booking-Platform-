"use client";

import React, { useState } from "react";
import { Equipment } from "@/types";
import {
  TrendingUp,
  PlusCircle,
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  Star,
  ShieldCheck,
  Power,
  Edit,
  DollarSign
} from "lucide-react";

interface OwnerDashboardViewProps {
  onOpenListEquipment: () => void;
  lang?: "en" | "hi";
}

export const OwnerDashboardView: React.FC<OwnerDashboardViewProps> = ({
  onOpenListEquipment,
  lang = "en"
}) => {
  const isHi = lang === "hi";

  const [equipmentList, setEquipmentList] = useState([
    {
      id: "eq_01",
      title: "Mahindra 575 DI Sarpanch (47 HP)",
      category: "Tractor",
      dailyRate: 3200,
      hourlyRate: 450,
      isAvailable: true,
      totalBookings: 64,
      rating: 4.9
    },
    {
      id: "eq_02",
      title: "Preet 987 Combine Harvester Deluxe",
      category: "Harvester",
      dailyRate: 14000,
      hourlyRate: 1800,
      isAvailable: true,
      totalBookings: 41,
      rating: 4.85
    }
  ]);

  const [pendingRequests, setPendingRequests] = useState([
    {
      id: "REQ-4019",
      farmerName: "Harpreet Singh Dhillon",
      phone: "+91 94172 38491",
      location: "Village Raikot, Ludhiana",
      equipmentTitle: "Mahindra 575 DI Sarpanch",
      requestedDates: "Oct 08 - Oct 10 (3 Days)",
      totalAmount: 9600,
      type: "Plow & Harrowing"
    }
  ]);

  const toggleAvailability = (id: string) => {
    setEquipmentList((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isAvailable: !e.isAvailable } : e))
    );
  };

  const handleAcceptRequest = (reqId: string) => {
    alert(`Booking Request ${reqId} Accepted! Farmer will be notified via SMS.`);
    setPendingRequests((prev) => prev.filter((r) => r.id !== reqId));
  };

  const handleDeclineRequest = (reqId: string) => {
    alert(`Booking Request ${reqId} Declined.`);
    setPendingRequests((prev) => prev.filter((r) => r.id !== reqId));
  };

  return (
    <div className="space-y-6">
      {/* Top Owner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Equipment Owner Partner
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isHi ? "मालिक प्रबंधन कंसोल" : "Gurpreet Singh Gill's Fleet Dashboard"}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              {isHi
                ? "अपनी कृषि मशीनों की उपलब्धता, बुकिंग अनुरोध और मासिक कमाई का प्रबंधन करें।"
                : "Manage equipment availability, dispatch tractor operators, and track monthly rental earnings."}
            </p>
          </div>

          <button
            onClick={onOpenListEquipment}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg hover:shadow-emerald-600/30 transition-all self-start md:self-center"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isHi ? "+ नई मशीन जोड़ें" : "+ List New Machine"}</span>
          </button>
        </div>

        {/* 4 Core KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-[10px] text-slate-300 uppercase font-semibold">Total Fleet</div>
            <div className="text-2xl font-extrabold text-white mt-1">2 Machines</div>
            <div className="text-[10px] text-emerald-300 mt-0.5">100% RC Verified</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-[10px] text-slate-300 uppercase font-semibold">October Earnings</div>
            <div className="text-2xl font-extrabold text-amber-300 mt-1">₹54,200</div>
            <div className="text-[10px] text-slate-300 mt-0.5">+18% vs last month</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-[10px] text-slate-300 uppercase font-semibold">Pending Requests</div>
            <div className="text-2xl font-extrabold text-white mt-1">{pendingRequests.length}</div>
            <div className="text-[10px] text-amber-300 mt-0.5">Requires Action</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-[10px] text-slate-300 uppercase font-semibold">Average Rating</div>
            <div className="text-2xl font-extrabold text-white mt-1 flex items-center gap-1">
              <span>4.9</span>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-[10px] text-slate-300 mt-0.5">38 Verified Reviews</div>
          </div>
        </div>
      </div>

      {/* Pending Booking Requests Section */}
      {pendingRequests.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span>{isHi ? "नए बुकिंग अनुरोध (स्वीकृति लंबित)" : "Incoming Booking Requests"}</span>
            </h3>
            <span className="text-xs font-bold text-amber-800 bg-amber-200/60 px-2.5 py-0.5 rounded-full">
              Action Required
            </span>
          </div>

          <div className="space-y-3">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{req.farmerName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({req.id})</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {req.location} • {req.phone}
                  </div>
                  <div className="text-xs font-semibold text-emerald-800 mt-1">
                    {req.equipmentTitle} • {req.requestedDates}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right sm:pr-2">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Earnings</div>
                    <div className="text-base font-extrabold text-emerald-800">₹{req.totalAmount}</div>
                  </div>

                  <button
                    onClick={() => handleAcceptRequest(req.id)}
                    className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accept</span>
                  </button>

                  <button
                    onClick={() => handleDeclineRequest(req.id)}
                    className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Machinery Fleet Availability Toggle Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-slate-900 text-base">
            {isHi ? "आपकी मशीनें और उपलब्धता नियंत्रण" : "Your Equipment Fleet & Live Availability"}
          </h3>
          <button
            onClick={onOpenListEquipment}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            + Add Another Machine
          </button>
        </div>

        <div className="space-y-3">
          {equipmentList.map((eq) => (
            <div
              key={eq.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-sm">{eq.title}</span>
                  <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    {eq.category}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                  <span>₹{eq.dailyRate}/day</span>
                  <span>•</span>
                  <span>₹{eq.hourlyRate}/hr</span>
                  <span>•</span>
                  <span>{eq.totalBookings} Completed Bookings</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Live Availability Toggle Switch */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">
                    {eq.isAvailable ? "Open for Rental" : "Paused / In Service"}
                  </span>
                  <button
                    onClick={() => toggleAvailability(eq.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      eq.isAvailable ? "bg-emerald-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        eq.isAvailable ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
