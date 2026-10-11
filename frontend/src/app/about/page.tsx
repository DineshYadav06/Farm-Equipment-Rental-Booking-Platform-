"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { SITE_CONFIG } from "@/content/site-config";
import { AppImage } from "@/components/ui/AppImage";
import { ShieldAlert, ExternalLink, Code2 } from "lucide-react";

// Lucide-spec stroke-based icons for developer profiles
const LinkedInIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1 space-y-6 text-xs text-slate-700">
      <div>
        <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
          About FarmRentHub (मंच के बारे में)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Bridging the farm mechanization gap for smallholder Indian farmers through transparent peer-to-peer hiring.
        </p>
      </div>

      {/* Statutory Private Platform Disclaimer Banner */}
      <div className="bg-[#fef3c7] border-2 border-amber-400 p-4 rounded-2xl flex items-start gap-3 text-xs text-[#78350f]">
        <ShieldAlert className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold uppercase block">Statutory Non-Government Disclosure:</strong>
          <p>{t("common", "footer.statutoryDisclaimer")}</p>
        </div>
      </div>

      {/* Mission & Principles */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 leading-relaxed">
        <h2 className="text-base font-bold text-slate-900">Our Mission</h2>
        <p>
          Over 86% of Indian farmers are small and marginal landholders who cannot afford the high capital cost of buying tractors, combine harvesters, or laser land levellers. At the same time, existing machinery owners operate their tractors for less than 350 hours per year, leading to severe under-utilization.
        </p>
        <p>
          FarmRentHub connects farmers needing machinery with idle equipment owners and Custom Hiring Centres (CHCs) within a 50 km radius. We eliminate unverified middlemen and ensure transparent pricing backed by an escrow trust mechanism.
        </p>

        <h3 className="text-sm font-bold text-slate-900 pt-2">Key Principles:</h3>
        <ul className="space-y-1.5 list-disc list-inside">
          <li><strong>Zero Government Impersonation:</strong> We are a private entity operating under Indian digital commerce regulations.</li>
          <li><strong>Multilingual Accessibility:</strong> Native script interfaces for 12 Indian languages to ensure zero language barrier for farmers.</li>
          <li><strong>Traceable Factual Data:</strong> Every benchmark rate or policy reference cited on this portal is traceable to verified official records.</li>
        </ul>
      </div>

      {/* Founder Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">Founder & Engineering Leadership</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Architectural leadership and technology stewardship
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-28 sm:w-36 shrink-0">
            <AppImage
              imageId="about-founder"
              className="w-full"
              imgClassName="rounded-[8px]"
              showCredit={false}
            />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              {/* Founder Name stays in Latin script in all 12 languages */}
              <h3 className="text-lg font-bold text-[#1e3a5f] tracking-tight">
                {SITE_CONFIG.ownerName}
              </h3>
              <p className="text-xs font-semibold text-[#14532d]">
                {t("common", "about.founderTitle") || SITE_CONFIG.ownerRole}
              </p>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {t("common", "about.founderBio")}
            </p>

            {/* Social / Developer Links */}
            <div className="flex items-center gap-3 pt-1">
              {SITE_CONFIG.linkedinUrl && (
                <a
                  href={SITE_CONFIG.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#0077b5] transition-colors font-medium text-xs cursor-pointer"
                  aria-label="Dinesh Kumar Yadav LinkedIn Profile"
                >
                  <LinkedInIcon className="w-4 h-4 text-[#0077b5]" />
                  <span>LinkedIn</span>
                </a>
              )}
              {SITE_CONFIG.githubUrl && (
                <a
                  href={SITE_CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-black transition-colors font-medium text-xs cursor-pointer"
                  aria-label="Dinesh Kumar Yadav GitHub Profile"
                >
                  <GitHubIcon className="w-4 h-4 text-slate-800" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Built By Section - Strictly Conditional on Feature Flag SHOW_BUILT_BY */}
      {SITE_CONFIG.showBuiltBy && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Code2 className="w-5 h-5 text-[#14532d]" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {t("common", "about.builtByTitle") || "Other Projects"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t("common", "about.builtBySubtitle") || "Select web engineering projects developed by the founder"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2">
              <h3 className="font-bold text-slate-900 text-xs">MCAET College Website</h3>
              <p className="text-[11px] text-slate-600">
                Official institutional web portal and academic information platform.
              </p>
              <a
                href="https://mcaet.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#14532d] hover:underline pt-1"
              >
                <span>Visit Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2">
              <h3 className="font-bold text-slate-900 text-xs">MCAET Online Examination Portal</h3>
              <p className="text-[11px] text-slate-600">
                Secure web portal for academic assessment management and student evaluations.
              </p>
              <a
                href="https://exam.mcaet.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#14532d] hover:underline pt-1"
              >
                <span>Visit Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
