"use client";

import React, { use, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { Logo } from "@/components/ui/Logo";
import { SourceNote } from "@/components/ui/SourceNote";
import {
  Printer,
  CheckCircle2,
  ArrowLeft,
  Calendar,
  Clock,
  ShieldCheck,
  Building2,
  Download
} from "lucide-react";

function BookingReceiptContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();

  const eqTitle = searchParams.get("eqTitle") || "50 HP Utility Tractor with Cage Wheels";
  const cat = searchParams.get("cat") || "Tractor";
  const total = parseInt(searchParams.get("total") || "15700", 10);
  const days = parseInt(searchParams.get("days") || "2", 10);
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
  const withDriver = searchParams.get("driver") === "true";

  const { t, formatPrice, formatDate, formatNumber, locale, localeMeta } = useTranslation();

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full select-none flex-1">
      {/* Action Buttons (Hidden when printing) */}
      <div className="flex items-center justify-between gap-3 mb-6 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14532d] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print Official Receipt (रसीद प्रिंट करें)</span>
        </button>
      </div>

      {/* Printable Receipt Paper Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-300 shadow-xl print:border-none print:shadow-none print:p-0 space-y-6 text-xs text-slate-800">
        {/* Receipt Header with One-Color Print Logo */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b-2 border-slate-900 pb-5">
          <div className="space-y-1">
            <Logo variant="print" size="lg" />
            <p className="text-[11px] text-slate-600 mt-1 max-w-sm">
              National Agricultural Equipment Rental & Custom Hiring Service
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <div className="text-sm font-black text-slate-900 uppercase tracking-wider">
              BOOKING RECEIPT & ESCROW VOUCHER
            </div>
            <div className="text-xs font-mono font-bold text-[#14532d]">
              ID: {id}
            </div>
            <div className="text-[11px] text-slate-500">
              Date: {formatDate(new Date(), true)}
            </div>
          </div>
        </div>

        {/* Confirmation Status Badge */}
        <div className="bg-emerald-50 border border-emerald-300 p-3.5 rounded-xl flex items-center gap-3 text-emerald-950 font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <div>
            <span className="font-black block text-xs">
              Booking Confirmed & Escrow Deposited
            </span>
            Funds are securely held in escrow until satisfactory farm job completion.
          </div>
        </div>

        {/* Machine Details (Both English & Local Script as per Part 4.8) */}
        <div className="border border-slate-200 rounded-2xl p-4 bg-[#fafaf5] space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Rented Equipment Details (उपकरण विवरण)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-slate-500 block text-[11px]">Machine Name (English):</span>
              <strong className="text-sm text-slate-900 font-bold block">{eqTitle}</strong>
              <span className="text-xs text-[#14532d] font-bold mt-1 block">
                Category: {cat}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">
                Machine Name ({localeMeta.nativeName}):
              </span>
              <strong className="text-sm text-slate-900 font-bold block">
                {eqTitle}
              </strong>
              <span className="text-xs text-slate-700 font-medium mt-1 block">
                Operator: {withDriver ? "Driver Included (चालक सहित)" : "Self Operation"}
              </span>
            </div>
          </div>
        </div>

        {/* Schedule & Operational Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-slate-200 py-4">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Start Date</span>
            <strong className="text-slate-800">{formatDate(date)}</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Duration</span>
            <strong className="text-slate-800">{formatNumber(days)} Days</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Escrow Status</span>
            <strong className="text-[#14532d]">Protected (Active)</strong>
          </div>
        </div>

        {/* Financial Billing Breakdown */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Payment Summary (भुगतान सारांश)
          </span>
          <table className="w-full text-left border-collapse border border-slate-200 text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="p-2.5 font-bold text-slate-700">Description</th>
                <th className="p-2.5 text-right font-bold text-slate-700">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-2.5 text-slate-700">Base Equipment Rental ({days} Days)</td>
                <td className="p-2.5 text-right font-medium">{formatPrice(total - (withDriver ? 800 : 0) - 350 - 300)}</td>
              </tr>
              {withDriver && (
                <tr className="border-b border-slate-100">
                  <td className="p-2.5 text-slate-700">Certified Operator Charge</td>
                  <td className="p-2.5 text-right font-medium">{formatPrice(800)}</td>
                </tr>
              )}
              <tr className="border-b border-slate-100">
                <td className="p-2.5 text-slate-700">Field Transport & Coordination</td>
                <td className="p-2.5 text-right font-medium">{formatPrice(350)}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2.5 text-slate-700">Escrow Handling & Insurance Fee (2%)</td>
                <td className="p-2.5 text-right font-medium">{formatPrice(300)}</td>
              </tr>
              <tr className="bg-slate-50 font-black text-sm">
                <td className="p-2.5 text-[#14532d]">Total Amount Paid:</td>
                <td className="p-2.5 text-right text-[#14532d]">{formatPrice(total)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Statutory Notice on Receipt */}
        <div className="pt-4 border-t border-slate-300 text-[10px] text-slate-500 space-y-1">
          <p className="font-bold text-slate-700">
            {t("common", "footer.statutoryDisclaimer")}
          </p>
          <p>
            For assistance or dispute resolution, contact Kisan Helpline 1800-180-1551 or email support@farmrenthub.in.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading receipt...</div>}>
      <BookingReceiptContent params={params} />
    </Suspense>
  );
}
