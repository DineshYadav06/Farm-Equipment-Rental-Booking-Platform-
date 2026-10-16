"use client";

import React from "react";
import { useTranslation } from "@/i18n/context";
import { GrievanceOfficer } from "@/components/legal/GrievanceOfficer";
import { ShieldAlert } from "lucide-react";

export default function TermsPage() {
  const { t, locale } = useTranslation();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1 space-y-6 text-xs text-slate-700">
      <div>
        <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-black text-[var(--heading)] tracking-tight">
          {locale === "hi" ? "सेवा की शर्तें" : "Terms & Conditions of Service"}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
          Effective Date: October 2026 • Governing peer-to-peer agricultural machinery bookings
        </p>
      </div>

      {/* Legal Convenience Disclaimer Banner */}
      <div className="bg-[#fef3c7] dark:bg-[#3a2c0a] border-2 border-amber-400 p-4 rounded-2xl flex items-start gap-3 text-xs text-[#78350f] dark:text-[#fbbf24]">
        <ShieldAlert className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold uppercase block">
            {locale === "hi" ? "कानूनी सूचना:" : "Legal Notice:"}
          </strong>
          <p className="leading-relaxed">
            Legal text presented in regional Indian languages is provided strictly for convenience of comprehension.
            The legally binding master agreement is governed under the laws of the Republic of India.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 leading-relaxed">
        <h2 className="text-base font-bold text-slate-900">1. Nature of Platform</h2>
        <p>
          FarmRentHub acts solely as an intermediary online marketplace facilitating agreements between equipment owners and agricultural hirers. FarmRentHub does not own the tractors or harvesters listed, except where explicitly noted.
        </p>

        <h2 className="text-base font-bold text-slate-900 pt-2">2. Escrow Payment Conditions</h2>
        <p>
          All advance payments are held in an escrow trustee account. Funds are released to the owner within 24 hours of successful field work completion.
        </p>

        <h2 className="text-base font-bold text-slate-900 pt-2">3. Machine Safety & Fueling</h2>
        <p>
          Unless otherwise stated in the booking contract, diesel fuel consumption is paid by the hiring farmer based on actual operating hours, or bundled into the agreed rate.
        </p>

        <h2 className="text-base font-bold text-slate-900 pt-2">4. Non-Government Status</h2>
        <p>
          {t("common", "footer.statutoryDisclaimer")}
        </p>
      </div>

      {/* Statutory Grievance Redressal Block */}
      <GrievanceOfficer />
    </main>
  );
}
