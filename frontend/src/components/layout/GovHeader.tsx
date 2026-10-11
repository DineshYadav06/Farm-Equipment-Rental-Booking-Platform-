"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { Logo } from "@/components/ui/Logo";
import {
  Search,
  MapPin,
  Calendar,
  FileText,
  User,
  PlusCircle,
  Menu,
  X,
  Globe,
  Home,
  BookmarkCheck,
  Building2
} from "lucide-react";

export const GovHeader: React.FC = () => {
  const { t, locale, localeMeta, setIsLanguageModalOpen } = useTranslation();
  const pathname = usePathname() || "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("common", "nav.home") },
    { href: "/equipment", label: t("common", "nav.equipment") },
    { href: "/map", label: t("common", "nav.map") },
    { href: "/schemes-and-subsidies", label: t("common", "nav.schemes") },
    { href: "/how-it-works", label: t("common", "nav.howItWorks") }
  ];

  const isActive = (href: string) => {
    if (href === "/" && (pathname === "/" || pathname === `/${locale}`)) return true;
    return pathname.includes(href) && href !== "/";
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#e2e8f0] shadow-xs select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo Left */}
            <Link href="/" className="inline-flex items-center focus:outline-hidden">
              <Logo
                variant="horizontal"
                size="md"
                tagline={localeMeta.tagline}
              />
            </Link>

            {/* Navigation Center (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 font-semibold text-sm text-[#1c1917]" aria-label="Main Navigation">
              {navLinks.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3.5 py-2 rounded-xl transition-all relative ${
                      active
                        ? "text-[#14532d] font-bold bg-[#dcfce7]/60"
                        : "text-[#44403c] hover:text-[#14532d] hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#d97706] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions Right (Desktop) */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/list-your-equipment"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#14532d] bg-[#dcfce7] border border-[#16a34a]/30 hover:bg-[#bbf7d0] transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-[#16a34a]" />
                <span>{t("common", "nav.listEquipment")}</span>
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#14532d] hover:bg-[#16a34a] shadow-xs transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t("common", "nav.login")}</span>
              </Link>
            </div>

            {/* Mobile Menu & Language Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsLanguageModalOpen(true)}
                className="p-2 rounded-xl bg-slate-100 text-[#14532d] hover:bg-slate-200"
                aria-label="Change Language"
              >
                <Globe className="w-5 h-5" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-hidden"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/list-your-equipment"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t("common", "nav.listEquipment")}</span>
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs"
              >
                <User className="w-4 h-4" />
                <span>{t("common", "nav.login")} / {t("common", "nav.register")}</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky Bottom Navigation Bar (Home, Search, Bookings, Profile) */}
      <nav aria-label="Mobile Navigation" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg px-2 py-1.5 flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-bold ${
            pathname === "/" ? "text-[#14532d]" : "text-slate-500"
          }`}
        >
          <Home className="w-5 h-5" />
          <span>{t("common", "nav.home")}</span>
        </Link>
        <Link
          href="/equipment"
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-bold ${
            pathname.includes("/equipment") ? "text-[#14532d]" : "text-slate-500"
          }`}
        >
          <Search className="w-5 h-5" />
          <span>{t("common", "actions.search")}</span>
        </Link>
        <Link
          href="/farmer/dashboard"
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-bold ${
            pathname.includes("/dashboard") ? "text-[#14532d]" : "text-slate-500"
          }`}
        >
          <BookmarkCheck className="w-5 h-5" />
          <span>{t("common", "nav.farmerDashboard")}</span>
        </Link>
        <button
          onClick={() => setIsLanguageModalOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-bold text-amber-700"
          aria-label="Language selector modal"
        >
          <Globe className="w-5 h-5" />
          <span>{localeMeta.nativeName}</span>
        </button>
      </nav>
    </>
  );
};
