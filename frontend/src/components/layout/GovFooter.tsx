"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { Logo } from "@/components/ui/Logo";
import { SITE_CONFIG } from "@/content/site-config";
import {
  ShieldAlert,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Lock,
  FileCheck,
  Scale
} from "lucide-react";

export const GovFooter: React.FC = () => {
  const { t, locale, localeMeta } = useTranslation();

  const officialLinks = [
    { label: "Sub-Mission on Agricultural Mechanization (SMAM)", url: "https://farmech.dac.gov.in" },
    { label: "e-NAM (National Agriculture Market)", url: "https://enam.gov.in" },
    { label: "Agmarknet (Mandi Prices)", url: "https://agmarknet.gov.in" },
    { label: "PM-KISAN Samman Nidhi", url: "https://pmkisan.gov.in" },
    { label: "ICAR - Central Institute of Agricultural Engineering", url: "https://ciae.icar.gov.in" },
    { label: "Ministry of Agriculture & Farmers Welfare", url: "https://agricoop.nic.in" }
  ];

  return (
    <footer className="bg-[#14532d] text-white pt-12 pb-24 sm:pb-12 border-t-4 border-[#d97706] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Disclaimer Banner (Mandatory Statutory Notice) */}
        <div className="bg-[#1e3a5f] border-2 border-amber-400/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-black text-amber-300 uppercase tracking-wide block mb-0.5">
                {t("common", "footer.statutoryNotice") || (locale === "hi" ? "वैधानिक सूचना:" : "Statutory Notice:")}
              </span>
              <p className="text-slate-100 font-medium leading-relaxed">
                {t("common", "footer.statutoryDisclaimer")}
              </p>
            </div>
          </div>
          <Link
            href="/about"
            className="shrink-0 inline-flex items-center gap-1 text-amber-300 font-bold hover:underline"
          >
            <span>Learn More</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          {/* Col 1: Platform Brand & Mission */}
          <div className="space-y-4">
            <Logo
              variant="horizontal"
              size="md"
              tagline={localeMeta.tagline}
              textColor="text-white"
            />
            <p className="text-emerald-100/90 leading-relaxed">
              {t("common", "footer.aboutPlatform")}
            </p>
            <div className="flex items-center gap-2 text-emerald-200">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>256-Bit Escrow Secured Booking</span>
            </div>
          </div>

          {/* Col 2: Useful Platform Links */}
          <div>
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider mb-3">
              {t("common", "footer.quickLinks")}
            </h3>
            <ul className="space-y-2 font-medium text-emerald-100/90">
              <li>
                <Link href="/equipment" className="hover:text-amber-300 transition-colors">
                  {t("common", "nav.equipment")}
                </Link>
              </li>
              <li>
                <Link href="/schemes-and-subsidies" className="hover:text-amber-300 transition-colors">
                  {t("common", "nav.schemes")}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-amber-300 transition-colors">
                  {t("common", "nav.howItWorks")}
                </Link>
              </li>
              <li>
                <Link href="/list-your-equipment" className="hover:text-amber-300 transition-colors">
                  {t("common", "nav.listEquipment")}
                </Link>
              </li>
              <li>
                <Link href="/tools/cost-estimator" className="hover:text-amber-300 transition-colors">
                  Cost Estimator
                </Link>
              </li>
              <li>
                <Link href="/tools/land-converter" className="hover:text-amber-300 transition-colors">
                  Land Unit Converter
                </Link>
              </li>
              <li>
                <Link href="/season-guide" className="hover:text-amber-300 transition-colors">
                  Cropping Season Guide
                </Link>
              </li>
              <li>
                <Link href="/mandi" className="hover:text-amber-300 transition-colors">
                  Daily Mandi Prices
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  Contact & District Helpdesk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Agriculture Portals */}
          <div>
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider mb-3">
              {t("common", "footer.officialPortals")}
            </h3>
            <ul className="space-y-2 text-emerald-100/90 font-medium">
              {officialLinks.map((portal) => (
                <li key={portal.url}>
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-300 flex items-center gap-1 transition-colors"
                  >
                    <span className="truncate">{portal.label}</span>
                    <ExternalLink className="w-3 h-3 text-amber-400 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Grievance Redressal & Helpdesk */}
          <div className="bg-[#1e3a5f]/80 p-4 rounded-2xl border border-emerald-600/40 space-y-2.5">
            <h3 className="text-sm font-black text-amber-400 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>{t("common", "footer.grievanceTitle")}</span>
            </h3>
            <p className="text-slate-200">
              <span className="font-bold text-white block">
                {SITE_CONFIG.grievanceOfficer}
              </span>
              Digital Personal Data Protection (DPDP) Act Compliance Desk
            </p>
            <div className="text-[11px] space-y-1 text-slate-300">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-amber-400 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="hover:underline">
                  {SITE_CONFIG.supportEmail}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-amber-400 shrink-0" />
                <a href={`tel:${SITE_CONFIG.supportPhone}`} className="hover:underline">
                  {SITE_CONFIG.supportPhone}
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span>Response turnaround: {SITE_CONFIG.grievanceResponseTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Legal Links & Copyright */}
        <div className="pt-8 border-t border-emerald-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-emerald-200">
          <p>
            © {new Date().getFullYear()} FarmRentHub. {t("common", "footer.allRightsReserved")}
          </p>
          <div className="flex flex-wrap items-center gap-4 font-semibold text-emerald-100">
            <Link href="/terms" className="hover:text-amber-300 hover:underline">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-amber-300 hover:underline">
              Privacy Policy (DPDP)
            </Link>
            <span>•</span>
            <Link href="/refund-policy" className="hover:text-amber-300 hover:underline">
              Escrow & Refund Rules
            </Link>
            <span>•</span>
            <Link href="/dev/translations" className="text-amber-300 hover:underline">
              i18n Review Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
