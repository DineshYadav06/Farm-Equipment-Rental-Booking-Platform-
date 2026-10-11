"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { Dropdown } from "./Dropdown";
import { NotificationBell } from "./NotificationBell";
import {
  User,
  PlusCircle,
  CalendarCheck,
  LayoutDashboard,
  Settings,
  Globe,
  LogOut,
  ChevronDown
} from "lucide-react";

export const UserMenu: React.FC = () => {
  const { user, setUser, t, setIsLanguageModalOpen } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // If LOGGED OUT:
  if (!user) {
    return (
      <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
        <Link
          href="/list-your-equipment"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50/90 border border-emerald-600/30 hover:bg-emerald-100 hover:border-emerald-600/50 shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 transition-all shrink-0"
        >
          <PlusCircle className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
          <span>{t("common", "nav.listEquipment")}</span>
        </Link>

        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 transition-all shrink-0"
        >
          <User className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t("common", "nav.login")}</span>
        </Link>
      </div>
    );
  }

  // If LOGGED IN:
  const isOwner = user.role === "owner";
  const dashboardHref = isOwner ? "/owner/dashboard" : "/farmer/dashboard";
  const dashboardLabel = isOwner
    ? t("common", "nav.ownerDashboard")
    : t("common", "nav.farmerDashboard");

  return (
    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 whitespace-nowrap">
      {/* Owners also see List Equipment button */}
      {isOwner && (
        <Link
          href="/list-your-equipment"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-600/30 hover:bg-emerald-100 transition-colors shrink-0"
        >
          <PlusCircle className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
          <span>{t("common", "nav.listEquipment")}</span>
        </Link>
      )}

      {/* My Bookings link (icon + text) */}
      <Link
        href="/booking"
        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-emerald-800 transition-colors shrink-0"
      >
        <CalendarCheck className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
        <span>{t("common", "nav.myBookings")}</span>
      </Link>

      {/* Notification Bell */}
      <NotificationBell />

      {/* Profile Avatar Dropdown */}
      <Dropdown
        isOpen={isDropdownOpen}
        onOpenChange={setIsDropdownOpen}
        align="end"
        className="w-56 py-1.5"
        trigger={(open, toggle, ref) => (
          <button
            ref={ref}
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-haspopup="menu"
            aria-label={`${t("common", "nav.profile")}: ${user.name}`}
            className="inline-flex items-center gap-1.5 p-1 rounded-full border border-[#e5e5df] hover:border-[#14532d] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#14532d] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#14532d] text-white flex items-center justify-center font-bold text-xs uppercase">
              {user.name.slice(0, 1)}
            </div>
            <ChevronDown
              className={`w-3 h-3 text-[#78716c] transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        )}
      >
        <div role="none" className="space-y-1">
          <div className="px-3 py-2 border-b border-[#e5e5df]">
            <p className="font-bold text-xs text-[#1e3a5f] truncate">{user.name}</p>
            <p className="text-[10px] text-[#78716c] capitalize">
              {user.role === "owner" ? "Equipment Owner" : "Farmer"}
            </p>
          </div>

          {/* Dashboard */}
          <Link
            href={dashboardHref}
            role="menuitem"
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#1e3a5f] hover:bg-[#f3f4f0] transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-[#14532d]" aria-hidden="true" />
            <span>{dashboardLabel}</span>
          </Link>

          {/* Settings */}
          <Link
            href="/settings"
            role="menuitem"
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#1e3a5f] hover:bg-[#f3f4f0] transition-colors"
          >
            <Settings className="w-4 h-4 text-[#1e3a5f]" aria-hidden="true" />
            <span>{t("common", "nav.settings")}</span>
          </Link>

          {/* Language Choice Modal Trigger */}
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setIsDropdownOpen(false);
              setIsLanguageModalOpen(true);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#1e3a5f] hover:bg-[#f3f4f0] transition-colors text-start"
          >
            <Globe className="w-4 h-4 text-[#1e3a5f]" aria-hidden="true" />
            <span>{t("common", "utility.language")}</span>
          </button>

          {/* Logout */}
          <div className="pt-1 border-t border-[#e5e5df]">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setUser(null);
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-700 hover:bg-red-50 transition-colors text-start"
            >
              <LogOut className="w-4 h-4 text-red-600" aria-hidden="true" />
              <span>{t("common", "nav.logout")}</span>
            </button>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};
