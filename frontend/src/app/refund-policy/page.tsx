"use client";

import React from "react";
import { useTranslation } from "@/i18n/context";
import { GrievanceOfficer } from "@/components/legal/GrievanceOfficer";

export default function RefundPolicyPage() {
  const { t } = useTranslation();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1 space-y-6 text-xs text-slate-700">
      <div>
        <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
          Cancellation & Refund Rules (रद्दीकरण व धनवापसी नीति)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Fair and transparent escrow refund schedule for adverse weather, breakdowns, or schedule adjustments.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-slate-900 border-b pb-2">
          Escrow Refund Schedule Table
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                <th className="p-3">Cancellation Timing</th>
                <th className="p-3">Farmer Refund %</th>
                <th className="p-3">Owner Compensation</th>
                <th className="p-3">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-medium">&gt; 24 hours prior to scheduled date</td>
                <td className="p-3 font-bold text-[#14532d]">100% Full Refund</td>
                <td className="p-3">Nil</td>
                <td className="p-3 text-slate-500">Zero cancellation penalty</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Within 12-24 hours of start</td>
                <td className="p-3 font-bold text-amber-700">90% Refund</td>
                <td className="p-3">10% convenience fee</td>
                <td className="p-3 text-slate-500">Covers dispatch planning</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Machinery mechanical breakdown on field</td>
                <td className="p-3 font-bold text-[#14532d]">100% of remaining hours</td>
                <td className="p-3">Paid only for actual hours worked</td>
                <td className="p-3 text-slate-500">Verified by platform hour-meter</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Unseasonal Heavy Rain / IMD Advisory</td>
                <td className="p-3 font-bold text-[#14532d]">100% Free Rescheduling / Refund</td>
                <td className="p-3">Nil</td>
                <td className="p-3 text-slate-500">Protected under weather force majeure</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Escrow Redressal Block */}
      <GrievanceOfficer />
    </main>
  );
}
