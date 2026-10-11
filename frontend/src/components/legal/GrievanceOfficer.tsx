"use client";

import React from "react";
import { SITE_CONFIG } from "@/content/site-config";
import { useTranslation } from "@/i18n/context";
import { Scale, Mail, Phone, Clock, ShieldCheck } from "lucide-react";

export const GrievanceOfficer: React.FC<{
  className?: string;
  variant?: "card" | "embedded";
}> = ({ className = "", variant = "card" }) => {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="grievance-heading"
      className={`rounded-3xl border border-[#e5e5df] p-6 sm:p-7 select-none ${
        variant === "card"
          ? "bg-[#1e3a5f] text-white shadow-xs"
          : "bg-white text-[#1e3a5f]"
      } ${className}`}
    >
      <div className="flex items-center gap-2 border-b pb-3 mb-4 border-white/20">
        <Scale className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
        <div>
          <h2
            id="grievance-heading"
            className="text-sm sm:text-base font-bold tracking-tight text-amber-400"
          >
            {t("common", "footer.grievanceTitle")}
          </h2>
          <span className="text-[11px] text-slate-300 block">
            Digital Personal Data Protection (DPDP) Act & Consumer Protection Compliance Desk
          </span>
        </div>
      </div>

      <div className="space-y-3 text-xs leading-relaxed">
        <div className="space-y-0.5">
          <span className="font-extrabold text-sm sm:text-base text-white block">
            {SITE_CONFIG.grievanceOfficer}
          </span>
          <span className="text-amber-200 font-medium text-xs block">
            {SITE_CONFIG.ownerRole}
          </span>
          <span className="text-slate-300 text-[11px] block">
            {SITE_CONFIG.operatorLine}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-[11px]">
          {/* Email */}
          <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl">
            <Mail className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <span className="text-slate-300 text-[10px] block font-semibold">Email Redressal:</span>
              <a
                href={`mailto:${SITE_CONFIG.supportEmail}`}
                className="font-bold text-white hover:underline truncate block"
              >
                {SITE_CONFIG.supportEmail}
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl">
            <Phone className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <span className="text-slate-300 text-[10px] block font-semibold">Grievance Line:</span>
              <a
                href={`tel:${SITE_CONFIG.supportPhone}`}
                className="font-bold text-white hover:underline truncate block"
              >
                {SITE_CONFIG.supportPhone}
              </a>
            </div>
          </div>
        </div>

        {/* Turnaround Time */}
        <div className="flex items-center gap-2 pt-2 text-slate-300 border-t border-white/10">
          <Clock className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
          <span>
            Formal acknowledgment and grievance turnaround within{" "}
            <strong className="text-white">{SITE_CONFIG.grievanceResponseTime}</strong>.
          </span>
        </div>
      </div>
    </section>
  );
};
