"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { useScrollState } from "./useScrollState";
import { TopBar } from "./TopBar";
import { MainNav } from "./MainNav";
import { Ticker } from "./Ticker";
import { LocationChip } from "./LocationChip";
import { UserMenu } from "./UserMenu";
import { SearchCompact } from "./SearchCompact";
import { MobileDrawer } from "./MobileDrawer";
import { BottomNav } from "./BottomNav";
import { Logo } from "@/components/ui/Logo";
import { NotificationDrawer } from "@/components/ui/NotificationDrawer";
import { Menu, Globe, Bell, User } from "lucide-react";

export const Header: React.FC = () => {
  const {
    t,
    locale,
    setIsLanguageModalOpen,
    user,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    notifications
  } = useTranslation();

  const { isScrolled, showCompactSearch, prefersReducedMotion } = useScrollState();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white select-none">
        {/* ======================================================
            LAYER 1: TOP BAR (collapses on scroll > 80px, hidden < 1024px)
           ====================================================== */}
        <div
          className={`hidden lg:block overflow-hidden transition-all duration-200 ${
            isScrolled ? "max-h-0 opacity-0" : "max-h-14 opacity-100"
          }`}
        >
          <TopBar />
        </div>

        {/* ======================================================
            LAYER 2: MAIN HEADER (sticky, white, 1px bottom border)
           ====================================================== */}
        <div
          className={`bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 ${
            isScrolled ? "h-14 shadow-xs" : "h-[72px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          }`}
        >
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4">
            {/* Desktop Left: Logo (Links to Home, NO tagline) */}
            <div className="hidden lg:flex items-center shrink-0">
              <Link
                href="/"
                className="focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-xl transition-transform hover:scale-[1.01]"
                aria-label="FarmRentHub Home"
              >
                <Logo
                  variant="horizontal"
                  size={isScrolled ? "sm" : "md"}
                />
              </Link>
            </div>

            {/* Desktop Center: Main Single-Line Nav */}
            <div className="hidden lg:flex items-center justify-center min-w-0">
              <MainNav />
            </div>

            {/* Desktop Right Side Actions */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              {/* Compact Search on Scroll */}
              {showCompactSearch && <SearchCompact />}

              {/* Location Chip */}
              <LocationChip />

              {/* User Menu / Auth Buttons */}
              <UserMenu />
            </div>

            {/* ======================================================
                MOBILE HEADER ROW (< 1024px, 56px height)
                Hamburger | Logo | Large Language Button | Bell or Login
               ====================================================== */}
            <div className="flex lg:hidden items-center justify-between w-full h-full">
              {/* 1. Hamburger Button (min 48px touch target) */}
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                aria-label={t("common", "utility.openMenu")}
                className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl text-[#1e3a5f] hover:bg-[#f3f4f0] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#14532d]"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* 2. Mobile Logo */}
              <Link
                href="/"
                className="focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#14532d] rounded-lg"
                aria-label="FarmRentHub Home"
              >
                <Logo variant="horizontal" size="sm" />
              </Link>

              {/* 3. Mobile Right: Large Language Button + Bell / Login */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Large Language Button (min 48px touch target) */}
                <button
                  type="button"
                  onClick={() => setIsLanguageModalOpen(true)}
                  aria-label={t("common", "utility.language")}
                  className="min-h-[48px] min-w-[48px] px-2 flex items-center justify-center gap-1 rounded-xl bg-[#f3f4f0] hover:bg-[#e5e5df] text-[#1e3a5f] border border-[#e5e5df] font-bold text-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#14532d]"
                >
                  <Globe className="w-4 h-4 text-[#14532d]" aria-hidden="true" />
                  <span className="uppercase text-[11px] font-black">{locale}</span>
                </button>

                {/* Bell (Logged In) OR Login (Logged Out) */}
                {user ? (
                  <button
                    type="button"
                    onClick={() => setIsNotificationDrawerOpen(true)}
                    aria-label={t("common", "nav.notifications")}
                    className="relative min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl text-[#1e3a5f] hover:bg-[#f3f4f0] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#14532d]"
                  >
                    <Bell className="w-5 h-5 text-[#1e3a5f]" aria-hidden="true" />
                    {unreadCount > 0 && (
                      <span className="absolute top-2.5 end-2.5 flex h-3.5 min-w-[14px] px-0.5 items-center justify-center rounded-full bg-[#d97706] text-[9px] font-bold text-white ring-1 ring-white">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                ) : (
                  <Link
                    href="/login"
                    aria-label={t("common", "nav.login")}
                    className="min-h-[48px] px-3.5 flex items-center justify-center gap-1.5 rounded-xl bg-[#14532d] hover:bg-[#16a34a] text-white font-bold text-xs shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#14532d]"
                  >
                    <User className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">{t("common", "nav.login")}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================
            LAYER 3: TICKER (collapses on scroll > 80px)
           ====================================================== */}
        <div
          className={`overflow-hidden transition-all duration-200 ${
            isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <Ticker prefersReducedMotion={prefersReducedMotion} />
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Existing Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        notifications={notifications}
      />
    </>
  );
};
