"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { Dropdown } from "./Dropdown";
import {
  ChevronDown,
  Info,
  Phone,
  HelpCircle,
  Settings,
  PlusCircle,
  Heart,
  Scale,
  Calculator,
  ArrowRightLeft,
  Calendar,
  TrendingUp,
  Wrench
} from "lucide-react";

export const MoreMenu: React.FC<{
  includeListEquipment?: boolean;
}> = ({ includeListEquipment = false }) => {
  const { t } = useTranslation();
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);

  const toolItems = [
    {
      href: "/saved",
      label: "Saved Machines",
      icon: <Heart className="w-4 h-4 text-rose-500" aria-hidden="true" />
    },
    {
      href: "/equipment/compare",
      label: "Compare Machines",
      icon: <Scale className="w-4 h-4 text-[#16a34a]" aria-hidden="true" />
    },
    {
      href: "/tools/cost-estimator",
      label: "Cost Estimator",
      icon: <Calculator className="w-4 h-4 text-[#16a34a]" aria-hidden="true" />
    },
    {
      href: "/tools/land-converter",
      label: "Land Unit Converter",
      icon: <ArrowRightLeft className="w-4 h-4 text-[#16a34a]" aria-hidden="true" />
    },
    {
      href: "/season-guide",
      label: "Season Guide",
      icon: <Calendar className="w-4 h-4 text-[#16a34a]" aria-hidden="true" />
    },
    {
      href: "/mandi",
      label: "Daily Mandi Rates",
      icon: <TrendingUp className="w-4 h-4 text-amber-600" aria-hidden="true" />
    }
  ];

  const moreItems = [
    {
      href: "/about",
      label: t("common", "nav.about"),
      icon: <Info className="w-4 h-4 text-[#1e3a5f] dark:text-slate-300" aria-hidden="true" />
    },
    {
      href: "/contact",
      label: t("common", "nav.contact"),
      icon: <Phone className="w-4 h-4 text-[#1e3a5f] dark:text-slate-300" aria-hidden="true" />
    },
    {
      href: "/faq",
      label: t("common", "nav.faq"),
      icon: <HelpCircle className="w-4 h-4 text-[#1e3a5f] dark:text-slate-300" aria-hidden="true" />
    },
    {
      href: "/settings",
      label: t("common", "nav.settings"),
      icon: <Settings className="w-4 h-4 text-[#1e3a5f] dark:text-slate-300" aria-hidden="true" />
    }
  ];

  const isAnyToolActive = toolItems.some((item) => pathname.startsWith(item.href));
  const isAnyMoreActive = isAnyToolActive || moreItems.some((item) => pathname.startsWith(item.href));

  return (
    <Dropdown
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      align="end"
      className="w-56 py-1.5"
      trigger={(open, toggle, ref) => (
        <button
          ref={ref}
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={t("common", "nav.more")}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs xl:text-[13px] font-semibold transition-all whitespace-nowrap ${
            isAnyMoreActive
              ? "text-emerald-900 font-bold bg-emerald-100/70 shadow-2xs"
              : "text-slate-700 hover:text-emerald-800 hover:bg-slate-100/80"
          }`}
        >
          <span>{t("common", "nav.more")}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#78716c] transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      )}
    >
      <div role="none" className="space-y-0.5">
        <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Farmer Tools
        </div>

        {toolItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              aria-current={active ? "page" : undefined}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                active
                  ? "bg-[#f3f4f0] dark:bg-slate-800 text-[#14532d] dark:text-emerald-400 font-bold"
                  : "text-slate-800 dark:text-slate-200 hover:bg-[#fafaf5] dark:hover:bg-slate-800"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Platform
          </div>

          {moreItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                aria-current={active ? "page" : undefined}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  active
                    ? "bg-[#f3f4f0] dark:bg-slate-800 text-[#14532d] dark:text-emerald-400 font-bold"
                    : "text-slate-800 dark:text-slate-200 hover:bg-[#fafaf5] dark:hover:bg-slate-800"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {includeListEquipment && (
          <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/list-your-equipment"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#14532d] dark:text-emerald-400 hover:bg-[#dcfce7] dark:hover:bg-emerald-950/60"
            >
              <PlusCircle className="w-4 h-4 text-[#16a34a]" aria-hidden="true" />
              <span>{t("common", "nav.listEquipment")}</span>
            </Link>
          </div>
        )}
      </div>
    </Dropdown>
  );
};
