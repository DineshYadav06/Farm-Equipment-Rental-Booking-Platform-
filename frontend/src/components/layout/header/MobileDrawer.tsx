"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { SITE_CONFIG } from "@/content/site-config";
import { LOCALES_LIST, LocaleCode } from "@/i18n/config";
import { LocationChip } from "./LocationChip";
import { Logo } from "@/components/ui/Logo";
import {
  X,
  Home,
  Layers,
  MapPin,
  FileText,
  HelpCircle,
  PlusCircle,
  Phone,
  Settings,
  Info,
  Globe,
  Accessibility,
  Eye,
  Check
} from "lucide-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const {
    t,
    locale,
    setLocale,
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    simpleMode,
    setSimpleMode,
    useNativeDigits,
    setUseNativeDigits
  } = useTranslation();

  const pathname = usePathname() || "/";
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on ESC and focus trap
  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Simple focus trap
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navLinks = [
    { href: "/", label: t("common", "nav.home"), icon: <Home className="w-4 h-4" /> },
    { href: "/equipment", label: t("common", "nav.equipment"), icon: <Layers className="w-4 h-4" /> },
    { href: "/map", label: t("common", "nav.map"), icon: <MapPin className="w-4 h-4" /> },
    { href: "/schemes-and-subsidies", label: t("common", "nav.schemes"), icon: <FileText className="w-4 h-4" /> },
    { href: "/how-it-works", label: t("common", "nav.howItWorks"), icon: <HelpCircle className="w-4 h-4" /> },
    { href: "/about", label: t("common", "nav.about"), icon: <Info className="w-4 h-4" /> },
    { href: "/contact", label: t("common", "nav.contact"), icon: <Phone className="w-4 h-4" /> },
    { href: "/faq", label: t("common", "nav.faq"), icon: <HelpCircle className="w-4 h-4" /> },
    { href: "/settings", label: t("common", "nav.settings"), icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 select-none flex"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Drawer"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-start duration-200"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e5df] bg-[#fafaf5]">
          <Link href="/" onClick={onClose} className="focus:outline-hidden">
            <Logo variant="horizontal" size="sm" />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t("common", "utility.closeMenu")}
            className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl text-[#78716c] hover:text-[#1e3a5f] hover:bg-black/5"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Location Chip */}
          <div>
            <span className="block text-[11px] font-semibold text-[#78716c] mb-1.5">
              {t("common", "location.selectLocation")}
            </span>
            <LocationChip variant="mobile" />
          </div>

          {/* List Equipment Primary Action */}
          <Link
            href="/list-your-equipment"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-[#dcfce7] text-[#14532d] border border-[#14532d]/30 font-bold text-xs hover:bg-[#bbf7d0] transition-colors min-h-[48px]"
          >
            <PlusCircle className="w-4 h-4 text-[#16a34a]" />
            <span>{t("common", "nav.listEquipment")}</span>
          </Link>

          {/* Nav Links */}
          <div className="border-t border-[#e5e5df] pt-3 space-y-1">
            {navLinks.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/" || pathname === `/${locale}`
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold min-h-[48px] transition-colors ${
                    active
                      ? "bg-[#f3f4f0] text-[#14532d] font-bold"
                      : "text-[#1e3a5f] hover:bg-[#fafaf5]"
                  }`}
                >
                  <span className={active ? "text-[#14532d]" : "text-[#78716c]"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Kisan Helpline */}
          <div className="border-t border-[#e5e5df] pt-3">
            <a
              href={SITE_CONFIG.helplineTel}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#f3f4f0] text-[#1e3a5f] hover:bg-[#e5e5df] transition-colors min-h-[48px]"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#14532d]" />
                <span className="text-xs font-bold">{t("common", "utility.kisanHelpline")}</span>
              </div>
              <span className="text-xs font-extrabold text-[#14532d]">
                {SITE_CONFIG.helplineNumber}
              </span>
            </a>
          </div>

          {/* Accessibility Controls */}
          <div className="border-t border-[#e5e5df] pt-3 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1e3a5f]">
              <Accessibility className="w-4 h-4 text-[#14532d]" />
              <span>{t("common", "utility.accessibilityMenu")}</span>
            </div>

            {/* Font size */}
            <div className="flex items-center gap-2 bg-[#f3f4f0] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setTextSize("sm")}
                className={`flex-1 py-2 rounded-lg text-xs font-bold min-h-[44px] ${
                  textSize === "sm" ? "bg-white text-[#14532d] shadow-xs" : "text-[#1e3a5f]"
                }`}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setTextSize("md")}
                className={`flex-1 py-2 rounded-lg text-xs font-bold min-h-[44px] ${
                  textSize === "md" ? "bg-white text-[#14532d] shadow-xs" : "text-[#1e3a5f]"
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setTextSize("lg")}
                className={`flex-1 py-2 rounded-lg text-xs font-bold min-h-[44px] ${
                  textSize === "lg" ? "bg-white text-[#14532d] shadow-xs" : "text-[#1e3a5f]"
                }`}
              >
                A+
              </button>
            </div>

            {/* Contrast and Simple Mode */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setHighContrast(!highContrast)}
                className={`py-2 px-3 rounded-xl text-xs font-bold min-h-[44px] border ${
                  highContrast
                    ? "bg-[#14532d] text-white border-[#14532d]"
                    : "bg-[#f3f4f0] text-[#1e3a5f] border-[#e5e5df]"
                }`}
              >
                {t("common", "utility.highContrast")}
              </button>
              <button
                type="button"
                onClick={() => setSimpleMode(!simpleMode)}
                className={`py-2 px-3 rounded-xl text-xs font-bold min-h-[44px] border ${
                  simpleMode
                    ? "bg-[#14532d] text-white border-[#14532d]"
                    : "bg-[#f3f4f0] text-[#1e3a5f] border-[#e5e5df]"
                }`}
              >
                {t("common", "utility.simpleMode")}
              </button>
            </div>
          </div>

          {/* Language Selection List */}
          <div className="border-t border-[#e5e5df] pt-3 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1e3a5f]">
              <Globe className="w-4 h-4 text-[#14532d]" />
              <span>{t("common", "utility.language")}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {LOCALES_LIST.map((lang) => {
                const isSelected = lang.code === locale;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLocale(lang.code)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium min-h-[48px] text-start transition-colors ${
                      isSelected
                        ? "bg-[#14532d] text-white font-bold"
                        : "bg-[#f3f4f0] text-[#1e3a5f] hover:bg-[#e5e5df]"
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
