"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { useTranslation } from "@/i18n/context";
import { Sun, Moon, Laptop, ChevronDown } from "lucide-react";
import { ThemeMode } from "@/constants/tokens";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "dropdown" | "compact";
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  variant = "compact"
}) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const currentIcon = () => {
    if (theme === "system") {
      return <Laptop className="w-3.5 h-3.5" aria-hidden="true" />;
    }
    if (resolvedTheme === "dark") {
      return <Moon className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />;
    }
    return <Sun className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />;
  };

  const getLabel = (mode: ThemeMode) => {
    if (mode === "light") return t("common", "theme.light") || "Light";
    if (mode === "dark") return t("common", "theme.dark") || "Dark";
    return t("common", "theme.system") || "System";
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={cycleTheme}
        aria-label={`${t("common", "theme.toggle") || "Switch theme"}: ${getLabel(theme)}`}
        className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 ${className}`}
      >
        {currentIcon()}
      </button>
    );
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`${t("common", "theme.toggle") || "Theme"}: ${getLabel(theme)}`}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700"
      >
        {currentIcon()}
        <span className="capitalize hidden sm:inline">{getLabel(theme)}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label={t("common", "theme.choose") || "Choose theme"}
          className="absolute right-0 mt-1 w-32 rounded-xl bg-white dark:bg-[#1a211b] border border-slate-200 dark:border-[#2e382f] shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100"
        >
          {(["light", "dark", "system"] as ThemeMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              role="menuitem"
              onClick={() => {
                setTheme(mode);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors ${
                theme === mode
                  ? "bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-800 dark:text-emerald-400"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {mode === "light" && <Sun className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />}
              {mode === "dark" && <Moon className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />}
              {mode === "system" && <Laptop className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />}
              <span>{getLabel(mode)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
