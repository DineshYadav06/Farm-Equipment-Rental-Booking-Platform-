"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { SourceNote } from "@/components/ui/SourceNote";
import {
  ShieldAlert,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building2,
  Sparkles
} from "lucide-react";

export default function SchemesAndSubsidiesPage() {
  const { t, locale } = useTranslation();

  const schemesList = [
    {
      id: "scheme-smam-chc",
      title: "Sub-Mission on Agricultural Mechanization (SMAM)",
      titleHi: "कृषि यंत्रीकरण पर उप-मिशन (एसएमएएम)",
      description:
        "Financial assistance of 40% to 50% for farmers, FPOs, and rural entrepreneurs to set up Custom Hiring Centres (CHCs) and procurement of modern farm machinery.",
      eligibility: "Individual farmers, cooperative societies, registered FPOs, rural youth.",
      officialUrl: "https://farmech.dac.gov.in",
      stateScope: "All India (Nationwide)"
    },
    {
      id: "scheme-crm-stubble",
      title: "Crop Residue Management (CRM) Scheme",
      titleHi: "फसल अवशेष प्रबंधन योजना (सीआरएम)",
      description:
        "Up to 50% subsidy to individual farmers and 80% to farmer groups for purchasing Happy Seeders, Super Seeders, Straw Balers, and Mulchers to eliminate stubble burning.",
      eligibility: "Farmers in Punjab, Haryana, Uttar Pradesh, and NCR.",
      officialUrl: "https://agricoop.nic.in",
      stateScope: "Punjab, Haryana, UP, Rajasthan"
    },
    {
      id: "scheme-solar-kusum",
      title: "PM-KUSUM Component-B (Solar Agri Pumps)",
      titleHi: "पीएम-कुसुम योजना (सौर कृषि पंप)",
      description:
        "Subsidies up to 60% (30% Central + 30% State) for installing standalone solar agriculture pumps to replace diesel engines.",
      eligibility: "Farmers with cultivable land seeking off-grid irrigation.",
      officialUrl: "https://pmkusum.mnre.gov.in",
      stateScope: "All India"
    }
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1 space-y-6">
      {/* Title */}
      <div>
        <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
          {t("common", "nav.schemes")} (सरकारी कृषि योजनाएं व सब्सिडी)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Government subsidies and assistance for Custom Hiring Centres, tractors, and stubble management machinery.
        </p>
      </div>

      {/* Mandatory Statutory Notice Banner */}
      <div className="bg-[#fef3c7] dark:bg-[#3a2c0a] border-2 border-amber-400 p-4 sm:p-5 rounded-2xl flex items-start gap-3 text-xs text-[#78350f] dark:text-[#fbbf24]">
        <ShieldAlert className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-black uppercase tracking-wide block">
            {locale === "hi" ? "महत्वपूर्ण सूचना:" : "Important Guidance:"}
          </strong>
          <p className="leading-relaxed">
            FarmRentHub is a private information & rental marketplace and does not distribute government funds.
            Subsidy percentages, eligibility criteria, and targets differ by state and category. Always verify and apply on the official government portals listed below.
          </p>
        </div>
      </div>

      {/* Schemes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {schemesList.map((scheme) => (
          <div
            key={scheme.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 text-xs"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#14532d] bg-[#dcfce7] px-2.5 py-0.5 rounded border border-[#16a34a]/30">
                {scheme.stateScope}
              </span>

              <h3 className="font-bold text-base text-slate-900 leading-snug">
                {scheme.title}
              </h3>
              <p className="text-[11px] font-semibold text-[#14532d]">
                {scheme.titleHi}
              </p>

              <p className="text-slate-600 leading-relaxed">
                {scheme.description}
              </p>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <strong className="text-slate-800">Eligibility:</strong> {scheme.eligibility}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <SourceNote registryId={scheme.id} />

              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
