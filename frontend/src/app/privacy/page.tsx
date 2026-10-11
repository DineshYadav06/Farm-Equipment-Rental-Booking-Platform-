"use client";

import React from "react";
import { useTranslation } from "@/i18n/context";
import { GrievanceOfficer } from "@/components/legal/GrievanceOfficer";

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1 space-y-6 text-xs text-slate-700">
      <div>
        <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
          Privacy Policy & DPDP Notice (गोपनीयता नीति)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Compliant with the Digital Personal Data Protection (DPDP) Act, 2023 of India
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 leading-relaxed">
        <h2 className="text-base font-bold text-slate-900">1. Data Collected & Purpose</h2>
        <p>
          We collect your name, phone number, village/district location, and equipment registration numbers solely for the purpose of verifying machinery ownership and coordinating field dispatches.
        </p>

        <h2 className="text-base font-bold text-slate-900 pt-2">2. Farmer Consent & Storage</h2>
        <p>
          Your data is never sold or shared with third-party advertisers. Location telemetry is strictly used to match you with equipment within your agricultural cluster.
        </p>

        <h2 className="text-base font-bold text-slate-900 pt-2">3. Data Principal Rights</h2>
        <p>
          Under the DPDP Act 2023, you retain full rights to access, correct, and request erasure of your registration profile at any time through our designated Grievance Officer.
        </p>
      </div>

      {/* DPDP Compliance Grievance Officer Block */}
      <GrievanceOfficer />
    </main>
  );
}
