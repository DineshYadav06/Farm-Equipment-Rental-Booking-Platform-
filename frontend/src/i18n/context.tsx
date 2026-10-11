"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LocaleCode, DEFAULT_LOCALE, SUPPORTED_LOCALES, LocaleMeta } from "./config";
import { formatCurrency, formatIndianNumber, formatLocalizedDate } from "./formatters";
import { UserNotification } from "@/types";
import { MOCK_NOTIFICATIONS } from "@/constants/data";
import { SITE_CONFIG } from "@/content/site-config";

// Common bundled dictionaries
import hiCommon from "@/messages/hi/common.json";
import enCommon from "@/messages/en/common.json";
import paCommon from "@/messages/pa/common.json";
import mrCommon from "@/messages/mr/common.json";
import taCommon from "@/messages/ta/common.json";
import teCommon from "@/messages/te/common.json";
import bnCommon from "@/messages/bn/common.json";
import guCommon from "@/messages/gu/common.json";
import knCommon from "@/messages/kn/common.json";
import mlCommon from "@/messages/ml/common.json";
import orCommon from "@/messages/or/common.json";
import asCommon from "@/messages/as/common.json";

import hiHome from "@/messages/hi/home.json";
import enHome from "@/messages/en/home.json";

import hiImages from "@/messages/hi/images.json";
import enImages from "@/messages/en/images.json";
import paImages from "@/messages/pa/images.json";
import mrImages from "@/messages/mr/images.json";
import taImages from "@/messages/ta/images.json";
import teImages from "@/messages/te/images.json";
import bnImages from "@/messages/bn/images.json";
import guImages from "@/messages/gu/images.json";
import knImages from "@/messages/kn/images.json";
import mlImages from "@/messages/ml/images.json";
import orImages from "@/messages/or/images.json";
import asImages from "@/messages/as/images.json";

export interface UserSession {
  name: string;
  role: "farmer" | "owner";
  phone: string;
}

export interface LocationState {
  state: string;
  district: string;
}

interface TranslationContextType {
  locale: LocaleCode;
  localeMeta: LocaleMeta;
  setLocale: (l: LocaleCode) => void;
  t: (namespace: string, path: string, params?: Record<string, string | number>) => string;
  formatPrice: (amount: number, unit?: string) => string;
  formatNumber: (val: number | string) => string;
  formatDate: (val: string | Date, includeTime?: boolean) => string;
  useNativeDigits: boolean;
  setUseNativeDigits: (val: boolean) => void;
  textSize: "sm" | "md" | "lg";
  setTextSize: (s: "sm" | "md" | "lg") => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  simpleMode: boolean;
  setSimpleMode: (v: boolean) => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  // Location
  selectedLocation: LocationState;
  setSelectedLocation: (loc: LocationState) => void;
  // Auth & Session
  user: UserSession | null;
  setUser: (u: UserSession | null) => void;
  // Notifications
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (v: boolean) => void;
  notifications: UserNotification[];
  // Screen Reader Live Announcements
  ariaAnnouncement: string;
}

const COMMON_MESSAGES: Record<LocaleCode, Record<string, unknown>> = {
  hi: hiCommon,
  en: enCommon,
  pa: paCommon,
  mr: mrCommon,
  ta: taCommon,
  te: teCommon,
  bn: bnCommon,
  gu: guCommon,
  kn: knCommon,
  ml: mlCommon,
  or: orCommon,
  as: asCommon
};

const HOME_MESSAGES: Record<string, Record<string, unknown>> = {
  hi: hiHome,
  en: enHome
};

const IMAGES_MESSAGES: Record<LocaleCode, Record<string, unknown>> = {
  hi: hiImages,
  en: enImages,
  pa: paImages,
  mr: mrImages,
  ta: taImages,
  te: teImages,
  bn: bnImages,
  gu: guImages,
  kn: knImages,
  ml: mlImages,
  or: orImages,
  as: asImages
};

const TranslationContext = createContext<TranslationContextType | null>(null);

export const TranslationProvider: React.FC<{
  initialLocale?: LocaleCode;
  children: ReactNode;
}> = ({ initialLocale = DEFAULT_LOCALE, children }) => {
  const [locale, setLocaleState] = useState<LocaleCode>(initialLocale);
  const [useNativeDigits, setUseNativeDigits] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<"sm" | "md" | "lg">("md");
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [simpleMode, setSimpleMode] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);
  const [ariaAnnouncement, setAriaAnnouncement] = useState<string>("");

  // Location State
  const [selectedLocation, setSelectedLocationState] = useState<LocationState>({
    state: SITE_CONFIG.defaultState,
    district: SITE_CONFIG.defaultDistrict
  });

  // Auth / Session State (defaults to guest, can be toggled)
  const [user, setUser] = useState<UserSession | null>(null);

  // Notification Drawer State
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState<boolean>(false);
  const [notifications] = useState<UserNotification[]>(MOCK_NOTIFICATIONS || []);

  // Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = setTimeout(() => {
      try {
        const savedLocale = localStorage.getItem("farmrenthub_locale") as LocaleCode;
        if (savedLocale && SUPPORTED_LOCALES[savedLocale]) {
          setLocaleState(savedLocale);
        } else {
          const browserLang = navigator.language?.split("-")[0]?.toLowerCase();
          if (browserLang && SUPPORTED_LOCALES[browserLang as LocaleCode]) {
            setLocaleState(browserLang as LocaleCode);
          }
        }

        const savedDigits = localStorage.getItem("farmrenthub_native_digits");
        if (savedDigits === "true") setUseNativeDigits(true);

        const savedContrast = localStorage.getItem("farmrenthub_contrast");
        if (savedContrast === "high") {
          setHighContrast(true);
          document.documentElement.classList.add("high-contrast");
        }

        const savedSimple = localStorage.getItem("farmrenthub_simple");
        if (savedSimple === "true") setSimpleMode(true);

        const savedLoc = localStorage.getItem("farmrenthub_location");
        if (savedLoc) {
          try {
            const parsed = JSON.parse(savedLoc);
            if (parsed.state && parsed.district) setSelectedLocationState(parsed);
          } catch {
            // ignore
          }
        }
      } catch {
        // Storage unavailable
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Sync HTML lang, dir, root font size
  useEffect(() => {
    if (typeof document === "undefined") return;

    const meta = SUPPORTED_LOCALES[locale] || SUPPORTED_LOCALES.hi;
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;

    const fontSizes = { sm: "14px", md: "16px", lg: "18px" };
    document.documentElement.style.fontSize = fontSizes[textSize];

    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [locale, textSize, highContrast]);

  const setLocale = (newLocale: LocaleCode) => {
    setLocaleState(newLocale);
    const targetMeta = SUPPORTED_LOCALES[newLocale];
    const announcement = `Language changed to ${targetMeta?.name || newLocale}`;
    setAriaAnnouncement(announcement);

    try {
      localStorage.setItem("farmrenthub_locale", newLocale);
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore
    }
  };

  const setSelectedLocation = (loc: LocationState) => {
    setSelectedLocationState(loc);
    try {
      localStorage.setItem("farmrenthub_location", JSON.stringify(loc));
    } catch {
      // Ignore
    }
  };

  const getNestedValue = (obj: unknown, path: string): string | undefined => {
    if (!obj || typeof obj !== "object") return undefined;
    const parts = path.split(".");
    let curr: unknown = obj;
    for (const part of parts) {
      if (curr && typeof curr === "object" && part in curr) {
        curr = (curr as Record<string, unknown>)[part];
      } else {
        return undefined;
      }
    }
    return typeof curr === "string" ? curr : undefined;
  };

  const t = (namespace: string, path: string, params?: Record<string, string | number>): string => {
    let rawText: string | undefined;

    if (namespace === "home") {
      rawText =
        getNestedValue(HOME_MESSAGES[locale], path) ||
        getNestedValue(HOME_MESSAGES.hi, path) ||
        getNestedValue(HOME_MESSAGES.en, path);
    } else if (namespace === "images") {
      rawText =
        getNestedValue(IMAGES_MESSAGES[locale], path) ||
        getNestedValue(IMAGES_MESSAGES.hi, path) ||
        getNestedValue(IMAGES_MESSAGES.en, path);
    } else {
      rawText =
        getNestedValue(COMMON_MESSAGES[locale], path) ||
        getNestedValue(COMMON_MESSAGES.hi, path) ||
        getNestedValue(COMMON_MESSAGES.en, path);
    }

    if (!rawText) {
      rawText = path.split(".").pop() || path;
    }

    if (params) {
      for (const [key, val] of Object.entries(params)) {
        rawText = rawText.replace(new RegExp(`\\{${key}\\}`, "g"), String(val));
      }
    }

    return rawText;
  };

  const formatPrice = (amount: number, unit?: string) => {
    const unitText = unit ? t("common", `units.${unit}`, undefined) : undefined;
    return formatCurrency(amount, locale, useNativeDigits, unitText);
  };

  const formatNum = (val: number | string) => {
    return formatIndianNumber(val, locale, useNativeDigits);
  };

  const formatDate = (val: string | Date, includeTime: boolean = false) => {
    return formatLocalizedDate(val, locale, includeTime);
  };

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = SUPPORTED_LOCALES[locale]?.speechLang || "hi-IN";
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <TranslationContext.Provider
      value={{
        locale,
        localeMeta: SUPPORTED_LOCALES[locale] || SUPPORTED_LOCALES.hi,
        setLocale,
        t,
        formatPrice,
        formatNumber: formatNum,
        formatDate,
        useNativeDigits,
        setUseNativeDigits,
        textSize,
        setTextSize,
        highContrast,
        setHighContrast,
        simpleMode,
        setSimpleMode,
        speak,
        stopSpeaking,
        isSpeaking,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        selectedLocation,
        setSelectedLocation,
        user,
        setUser,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        notifications,
        ariaAnnouncement
      }}
    >
      {/* Hidden aria-live region for screen readers */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {ariaAnnouncement}
      </div>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
