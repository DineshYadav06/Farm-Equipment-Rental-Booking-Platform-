"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { useTheme } from "@/components/theme/ThemeContext";
import { SITE_CONFIG } from "@/content/site-config";
import { LOCALES_LIST } from "@/i18n/config";
import { LocationChip } from "./LocationChip";
import { Logo } from "@/components/ui/Logo";
import { ThemeMode } from "@/constants/tokens";
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
  Check,
  Sun,
  Moon,
  Laptop
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
    setSimpleMode
  } = useTranslation();

  const { theme, setTheme } = useTheme();
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
    { href: "/", label: t("common", "nav.home") || "Home", icon: <Home className="w-4 h-4" /> },
    { href: "/equipment", label: t("common", "nav.equipment") || "Equipment", icon: <Layers className="w-4 h-4" /> },
    { href: "/map", label: t("common", "nav.map") || "Map", icon: <MapPin className="w-4 h-4" /> },
    { href: "/schemes-and-subsidies", label: t("common", "nav.schemes") || "Schemes", icon: <FileText className="w-4 h-4" /> },
    { href: "/how-it-works", label: t("common", "nav.howItWorks") || "How It Works", icon: <HelpCircle className="w-4 h-4" /> },
    { href: "/about", label: t("common", "nav.about") || "About", icon: <Info className="w-4 h-4" /> },
    { href: "/contact", label: t("common", "nav.contact") || "Contact", icon: <Phone className="w-4 h-4" /> },
    { href: "/faq", label: t("common", "nav.faq") || "FAQ", icon: <HelpCircle className="w-4 h-4" /> },
    { href: "/settings", label: t("common", "nav.settings") || "Settings", icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 select-none flex"
      role="dialog"
      aria-modal="true"
      aria-label={t("common", "utility.navigationDrawer") || "Navigation Drawer"}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-xs sm:max-w-sm bg-white dark:bg-[#1a211b] text-slate-800 dark:text-slate-200 h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-start duration-200"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#151b16]">
          <Link href="/" onClick={onClose} className="focus:outline-hidden">
            <Logo variant="horizontal" size="sm" />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t("common", "utility.close") || "Close"}
            className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Location Chip */}
          <div>
            <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              {t("common", "location.selectLocation") || "Location"}
            </span>
            <LocationChip variant="mobile" />
          </div>

          {/* List Equipment Primary Action */}
          <Link
            href="/list-your-equipment"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-bold text-xs hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors min-h-[48px]"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t("common", "nav.listEquipment") || "List Equipment"}</span>
          </Link>

          {/* Nav Links */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-1">
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
                      ? "bg-slate-100 dark:bg-slate-800 text-emerald-800 dark:text-emerald-400 font-bold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <span className={active ? "text-emerald-700 dark:text-emerald-400" : "text-slate-400"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Theme Selection Toggle */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              {t("common", "theme.title") || "Theme Mode"}
            </span>
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {(["light", "dark", "system"] as ThemeMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setTheme(mode)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold min-h-[44px] inline-flex items-center justify-center gap-1 transition-colors ${
                    theme === mode
                      ? "bg-white dark:bg-[#14532d] text-emerald-800 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700"
                  }`}
                >
                  {mode === "light" && <Sun className="w-3.5 h-3.5 text-amber-600" />}
                  {mode === "dark" && <Moon className="w-3.5 h-3.5 text-amber-400" />}
                  {mode === "system" && <Laptop className="w-3.5 h-3.5 text-slate-400" />}
                  <span className="capitalize">{t("common", `theme.${mode}`) || mode}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Kisan Helpline */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
            <a
              href={SITE_CONFIG.helplineTel}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-[#151b16] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[48px]"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span className="text-xs font-bold">{t("common", "utility.kisanHelpline") || "Helpline"}</span>
              </div>
              <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                {SITE_CONFIG.helplineNumber}
              </span>
            </a>
          </div>

          {/* Accessibility Controls */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Accessibility className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>{t("common", "utility.accessibilityMenu") || "Accessibility"}</span>
            </div>

            {/* Font size */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setTextSize("sm")}
                className={`flex-1 py-2 rounded-lg text-xs font-bold min-h-[44px] ${
                  textSize === "sm" ? "bg-white dark:bg-[#14532d] text-emerald-800 dark:text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                }`}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setTextSize("md")}
                className={`flex-1 py-2 rounded-lg text-xs font-bold min-h-[44px] ${
                  textSize === "md" ? "bg-white dark:bg-[#14532d] text-emerald-800 dark:text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setTextSize("lg")}
                className={`flex-1 py-2 rounded-lg text-xs font-bold min-h-[44px] ${
                  textSize === "lg" ? "bg-white dark:bg-[#14532d] text-emerald-800 dark:text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
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
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                }`}
              >
                {t("common", "utility.highContrast") || "High Contrast"}
              </button>
              <button
                type="button"
                onClick={() => setSimpleMode(!simpleMode)}
                className={`py-2 px-3 rounded-xl text-xs font-bold min-h-[44px] border ${
                  simpleMode
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                }`}
              >
                {t("common", "utility.simpleMode") || "Simple Mode"}
              </button>
            </div>
          </div>

          {/* Language Selection List */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Globe className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>{t("common", "utility.language") || "Language"}</span>
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
                        ? "bg-emerald-700 text-white font-bold"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
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
