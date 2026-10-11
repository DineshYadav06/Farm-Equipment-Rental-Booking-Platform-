"use client";

import React, { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const { t, locale } = useTranslation();
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is FarmRentHub a government initiative like eNAM or PM-KISAN?",
      qHi: "क्या FarmRentHub कोई सरकारी योजना है?",
      a: "No. FarmRentHub is an independent, private digital marketplace. We are not affiliated with the government. We assist farmers in finding nearby farm equipment from verified private owners and Custom Hiring Centres (CHCs)."
    },
    {
      q: "How does the Escrow payment system protect my money?",
      qHi: "एस्क्रो भुगतान प्रणाली से मेरा पैसा कैसे सुरक्षित रहता है?",
      a: "When you book equipment, your advance payment is deposited into a secured escrow account. The owner receives the money only AFTER the machine arrives on your farm and the work is completed satisfactorily."
    },
    {
      q: "What if the tractor breaks down in the middle of field work?",
      qHi: "यदि काम के बीच में ट्रैक्टर खराब हो जाए तो क्या होगा?",
      a: "In the rare event of mechanical failure, the owner must either provide a replacement unit or calculate charges strictly for the hours completed. The balance of your escrow advance is promptly refunded."
    },
    {
      q: "Can I book equipment with or without an operator?",
      qHi: "क्या मैं चालक सहित या बिना चालक मशीन बुक कर सकता हूँ?",
      a: "Yes. Every listing specifies whether an experienced operator is provided or if self-operation is permitted."
    },
    {
      q: "How do I claim government subsidies for agricultural machinery?",
      qHi: "कृषि यंत्रों पर सरकारी सब्सिडी कैसे प्राप्त करें?",
      a: "Government subsidies under schemes like SMAM and CRM must be applied for on state and central government portals (e.g. farmech.dac.gov.in). FarmRentHub provides informational links but does not directly process subsidy applications."
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.qHi.includes(search) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1 space-y-6 text-xs text-slate-700">
      <div>
        <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
          Frequently Asked Questions (अक्सर पूछे जाने वाले प्रश्न)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Quick answers to common questions about rentals, escrow security, and machine dispatch.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search FAQs by question or keyword..."
          className="w-full px-4 py-3 pl-11 bg-white border border-slate-300 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-[#16a34a] focus:outline-hidden"
        />
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4.5 text-left flex items-center justify-between gap-3 font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
              >
                <div>
                  <span>{faq.q}</span>
                  <span className="block text-xs font-semibold text-[#14532d] mt-0.5">
                    {faq.qHi}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="p-4.5 pt-0 text-slate-600 leading-relaxed text-xs border-t border-slate-100 bg-[#fafaf5]">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
