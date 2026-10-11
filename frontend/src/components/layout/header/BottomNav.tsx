"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { Home, Search, CalendarCheck, User } from "lucide-react";

export const BottomNav: React.FC = () => {
  const { t, locale, user } = useTranslation();
  const pathname = usePathname() || "/";

  const isHome = pathname === "/" || pathname === `/${locale}`;
  const isSearch = pathname.startsWith("/equipment");
  const isBookings = pathname.startsWith("/booking");
  const isProfile =
    pathname.startsWith("/settings") ||
    pathname.startsWith("/farmer/dashboard") ||
    pathname.startsWith("/owner/dashboard") ||
    pathname.startsWith("/login");

  const bookingsHref = user ? "/booking" : "/login?redirect=/booking";
  const profileHref = user
    ? user.role === "owner"
      ? "/owner/dashboard"
      : "/farmer/dashboard"
    : "/login";

  const items = [
    {
      href: "/",
      label: t("common", "nav.home"),
      icon: <Home className="w-5 h-5" aria-hidden="true" />,
      active: isHome
    },
    {
      href: "/equipment",
      label: t("common", "actions.search"),
      icon: <Search className="w-5 h-5" aria-hidden="true" />,
      active: isSearch
    },
    {
      href: bookingsHref,
      label: t("common", "nav.bookings"),
      icon: <CalendarCheck className="w-5 h-5" aria-hidden="true" />,
      active: isBookings
    },
    {
      href: profileHref,
      label: t("common", "nav.profile"),
      icon: <User className="w-5 h-5" aria-hidden="true" />,
      active: isProfile
    }
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#e5e5df] shadow-lg select-none pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-4 h-14">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={`flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 transition-colors ${
              item.active
                ? "text-[#14532d] font-bold"
                : "text-[#78716c] hover:text-[#1e3a5f]"
            }`}
          >
            <div className={item.active ? "text-[#14532d]" : "text-[#78716c]"}>
              {item.icon}
            </div>
            <span className="text-[10px] leading-none font-semibold truncate max-w-[70px]">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
