"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { Dropdown } from "./Dropdown";
import { ChevronDown, Info, Phone, HelpCircle, Settings, PlusCircle } from "lucide-react";

export const MoreMenu: React.FC<{
  includeListEquipment?: boolean;
}> = ({ includeListEquipment = false }) => {
  const { t } = useTranslation();
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);

  const moreItems = [
    {
      href: "/about",
      label: t("common", "nav.about"),
      icon: <Info className="w-4 h-4 text-[#1e3a5f]" aria-hidden="true" />
    },
    {
      href: "/contact",
      label: t("common", "nav.contact"),
      icon: <Phone className="w-4 h-4 text-[#1e3a5f]" aria-hidden="true" />
    },
    {
      href: "/faq",
      label: t("common", "nav.faq"),
      icon: <HelpCircle className="w-4 h-4 text-[#1e3a5f]" aria-hidden="true" />
    },
    {
      href: "/settings",
      label: t("common", "nav.settings"),
      icon: <Settings className="w-4 h-4 text-[#1e3a5f]" aria-hidden="true" />
    }
  ];

  const isAnyMoreActive = moreItems.some((item) => pathname.startsWith(item.href));

  return (
    <Dropdown
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      align="end"
      className="w-48 py-1.5"
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
        {moreItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              aria-current={active ? "page" : undefined}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                active
                  ? "bg-[#f3f4f0] text-[#14532d] font-bold"
                  : "text-[#1e3a5f] hover:bg-[#fafaf5]"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}

        {includeListEquipment && (
          <div className="pt-1 mt-1 border-t border-[#e5e5df]">
            <Link
              href="/list-your-equipment"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#14532d] hover:bg-[#dcfce7]"
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
