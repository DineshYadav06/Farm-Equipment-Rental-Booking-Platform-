"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { MoreMenu } from "./MoreMenu";

export const MainNav: React.FC = () => {
  const { t, locale } = useTranslation();
  const pathname = usePathname() || "/";

  const navItems = [
    { href: "/", label: t("common", "nav.home") },
    { href: "/equipment", label: t("common", "nav.equipment") },
    { href: "/map", label: t("common", "nav.map") },
    { href: "/schemes-and-subsidies", label: t("common", "nav.schemes") },
    { href: "/how-it-works", label: t("common", "nav.howItWorks") }
  ];

  const checkIsActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === `/${locale}`;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Main Navigation"
      className="hidden lg:flex items-center gap-0.5 xl:gap-1 whitespace-nowrap flex-nowrap shrink-0"
    >
      {navItems.map((item) => {
        const isActive = checkIsActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`relative px-3 py-1.5 rounded-full text-xs xl:text-[13px] font-semibold transition-all whitespace-nowrap ${
              isActive
                ? "text-emerald-900 font-bold bg-emerald-100/70 shadow-2xs"
                : "text-slate-700 hover:text-emerald-800 hover:bg-slate-100/80"
            }`}
          >
            <span>{item.label}</span>
            {isActive && (
              <span
                className="absolute -bottom-1 start-3 end-3 h-[2px] bg-emerald-700 rounded-full"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}

      {/* 6. More Dropdown */}
      <MoreMenu />
    </nav>
  );
};
