"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { AppImage } from "@/components/ui/AppImage";
import {
  Search,
  Lock,
  Tractor,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  ArrowRight
} from "lucide-react";

export default function HowItWorksPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"farmer" | "owner">("farmer");

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1 space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
          {t("common", "nav.howItWorks")} (यह कैसे काम करता है?)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Learn how FarmRentHub safeguards every agricultural rental with transparent pricing and 100% escrow protection.
        </p>

        {/* Farmer / Owner Tab Selector */}
        <div className="inline-flex bg-slate-100 p-1 rounded-2xl mt-5 border border-slate-200">
          <button
            onClick={() => setActiveTab("farmer")}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "farmer"
                ? "bg-[#14532d] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            For Farmers (किसानों के लिए)
          </button>
          <button
            onClick={() => setActiveTab("owner")}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "owner"
                ? "bg-[#14532d] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            For Equipment Owners (उपकरण मालिकों के लिए)
          </button>
        </div>
      </div>

      {/* Farmer Steps */}
      {activeTab === "farmer" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <AppImage
                  imageId="how-step-1"
                  className="w-full mb-3 rounded-2xl overflow-hidden shadow-2xs"
                  showCredit={false}
                />
                <span className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#14532d] font-black text-sm flex items-center justify-center mb-3">
                  1
                </span>
                <h3 className="font-bold text-base text-slate-900">Search & Verify</h3>
                <p className="text-slate-600 leading-relaxed">
                  Filter nearby tractors, harvesters, or rotavators by distance, rates, and verified owner credentials.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <AppImage
                  imageId="how-step-2"
                  className="w-full mb-3 rounded-2xl overflow-hidden shadow-2xs"
                  showCredit={false}
                />
                <span className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center mb-3">
                  2
                </span>
                <h3 className="font-bold text-base text-slate-900">Secure Escrow Booking</h3>
                <p className="text-slate-600 leading-relaxed">
                  Pay your rental advance into an escrow protected account. The owner cannot claim the money until the job is done.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <AppImage
                  imageId="how-step-3"
                  className="w-full mb-3 rounded-2xl overflow-hidden shadow-2xs"
                  showCredit={false}
                />
                <span className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 font-black text-sm flex items-center justify-center mb-3">
                  3
                </span>
                <h3 className="font-bold text-base text-slate-900">Field Execution & Release</h3>
                <p className="text-slate-600 leading-relaxed">
                  Work is performed on your land. Once you inspect and approve the job, escrow funds are released to the owner.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Owner Steps */}
      {activeTab === "owner" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <span className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#14532d] font-black text-sm flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-base text-slate-900">List Machine & RC</h3>
              <p className="text-slate-600 leading-relaxed">
                Upload your tractor RC or equipment invoice. Set your hourly or daily rental rate and driver availability.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <span className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-base text-slate-900">Receive Advance Bookings</h3>
              <p className="text-slate-600 leading-relaxed">
                Accept or reject requests from nearby farmers. We guarantee the farmer has deposited 100% advance funds in escrow.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <span className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 font-black text-sm flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-base text-slate-900">Direct Bank Payout</h3>
              <p className="text-slate-600 leading-relaxed">
                Complete the job and receive instant bank deposits. Zero haggling and guaranteed timely payment.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Escrow Mechanism Explainer Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#fafaf5] border-2 border-slate-300 space-y-3 text-xs">
        <div className="flex items-center gap-2 text-[#14532d] font-black text-sm">
          <ShieldCheck className="w-5 h-5 text-[#16a34a]" />
          <span>How Escrow Protects Both Farmers & Equipment Owners</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Traditional farm equipment rental suffers from cancelled promises, broken machines, or unpaid dues.
          With FarmRentHub Escrow:
        </p>
        <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
          <li><strong>For the Farmer:</strong> Your advance is 100% safe. If the owner doesn&apos;t show up or the machine breaks down, you receive a full refund.</li>
          <li><strong>For the Owner:</strong> You never have to worry about chasing farmers for payments. The funds are verified and locked before your tractor leaves the shed.</li>
        </ul>
      </div>
    </main>
  );
}
