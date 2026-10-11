"use client";

import React from "react";
import { useTranslation } from "@/i18n/context";
import { GrievanceOfficer } from "@/components/legal/GrievanceOfficer";
import { SITE_CONFIG } from "@/content/site-config";
import { Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1 space-y-6 text-xs text-slate-700">
      <div>
        <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
          Contact & District Helpdesk (संपर्क व सहायता केंद्र)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Our bilingual farm support team is available 24x7 to help with equipment dispatch and booking inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Support Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b pb-2">
            Farmer Toll-Free Helpline
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Toll-Free Number</span>
                <a href={SITE_CONFIG.helplineTel} className="text-base font-black text-[#14532d] hover:underline">
                  {SITE_CONFIG.helplineNumber}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Support Desk</span>
                <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="font-bold text-slate-800 hover:underline">
                  {SITE_CONFIG.supportEmail}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Operating Hours</span>
                <span className="font-semibold text-slate-800">
                  24 Hours / 7 Days (Kharif, Rabi & Zaid Crop Seasons)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grievance Redressal Officer Card */}
        <GrievanceOfficer />
      </div>
    </main>
  );
}
