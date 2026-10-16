"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { useScrollState } from "./useScrollState";
import { TopBar } from "./TopBar";
import { MainNav } from "./MainNav";
import { Ticker } from "./Ticker";
import { LocationChip } from "./LocationChip";
import { WeatherChip } from "@/components/weather/WeatherChip";
import { LocationPicker } from "./LocationPicker";
import { LocationPromptModal } from "./LocationPromptModal";
import { UserMenu } from "./UserMenu";
import { SearchCompact } from "./SearchCompact";
import { MobileDrawer } from "./MobileDrawer";
import { BottomNav } from "./BottomNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
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
  const [locationPickerOpen, setLocationPickerOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-[#1a211b] select-none transition-colors duration-150">
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
            LAYER 2: MAIN HEADER (sticky, 1px bottom border)
           ====================================================== */}
        <div
          className={`bg-white/95 dark:bg-[#1a211b]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-[#2e382f] transition-all duration-200 ${
            isScrolled ? "h-14 shadow-xs" : "h-[72px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          }`}
        >
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4">
            {/* Desktop Left: Logo */}
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
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {/* Compact Search on Scroll */}
              {showCompactSearch && <SearchCompact />}

              {/* In compact scroll state, show small Location & Weather controls */}
              {isScrolled && (
                <>
                  <LocationChip onOpenPicker={() => setLocationPickerOpen(true)} />
                  <WeatherChip onOpenLocationPicker={() => setLocationPickerOpen(true)} />
                </>
              )}

              {/* User Menu / Auth Buttons */}
              <UserMenu />
            </div>

            {/* ======================================================
                MOBILE HEADER ROW (< 1024px, 56px height)
                Hamburger | Logo | Language | Bell / Login
               ====================================================== */}
            <div className="flex lg:hidden items-center justify-between w-full h-full">
              {/* 1. Hamburger Button (min 48px touch target) */}
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                aria-label={t("common", "utility.openMenu") || "Open menu"}
                className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* 2. Mobile Logo */}
              <Link
                href="/"
                className="focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-lg"
                aria-label="FarmRentHub Home"
              >
                <Logo variant="horizontal" size="sm" />
              </Link>

              {/* 3. Mobile Right: Language Button + Bell / Login */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Language Button */}
                <button
                  type="button"
                  onClick={() => setIsLanguageModalOpen(true)}
                  aria-label={t("common", "utility.language") || "Language"}
                  className="min-h-[48px] min-w-[48px] px-2 flex items-center justify-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700"
                >
                  <Globe className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                  <span className="uppercase text-[11px] font-black">{locale}</span>
                </button>

                {/* Bell (Logged In) OR Login (Logged Out) */}
                {user ? (
                  <button
                    type="button"
                    onClick={() => setIsNotificationDrawerOpen(true)}
                    aria-label={t("common", "nav.notifications") || "Notifications"}
                    className="relative min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700"
                  >
                    <Bell className="w-5 h-5 text-slate-700 dark:text-slate-200" aria-hidden="true" />
                    {unreadCount > 0 && (
                      <span className="absolute top-2.5 end-2.5 flex h-3.5 min-w-[14px] px-0.5 items-center justify-center rounded-full bg-amber-600 text-[9px] font-bold text-white ring-1 ring-white">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                ) : (
                  <Link
                    href="/login"
                    aria-label={t("common", "nav.login") || "Login"}
                    className="min-h-[48px] px-3 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700"
                  >
                    <User className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">{t("common", "nav.login") || "Login"}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================
            MOBILE LOCATION + WEATHER ROW (< 1024px)
            Single line, truncates place name with ellipsis, never wraps
           ====================================================== */}
        <div className="flex lg:hidden items-center justify-between px-3 sm:px-4 py-1.5 bg-slate-50/95 dark:bg-[#151b16] border-b border-slate-200/80 dark:border-[#2e382f] text-xs">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <LocationChip
              onOpenPicker={() => setLocationPickerOpen(true)}
              className="flex-1 max-w-[190px] sm:max-w-[240px]"
            />
            <WeatherChip onOpenLocationPicker={() => setLocationPickerOpen(true)} variant="mobile" />
          </div>
          <ThemeToggle variant="icon" className="min-h-[36px] min-w-[36px] ml-2" />
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

      {/* Location Picker Modal */}
      <LocationPicker
        isOpen={locationPickerOpen}
        onClose={() => setLocationPickerOpen(false)}
      />

      {/* First-visit friendly Location Permission Prompt */}
      <LocationPromptModal
        onOpenManualPicker={() => setLocationPickerOpen(true)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        notifications={notifications}
      />
    </>
  );
};
