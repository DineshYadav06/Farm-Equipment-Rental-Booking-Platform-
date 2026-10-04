"use client";

import React, { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import {
  MapPin,
  Globe,
  Bell,
  User,
  Menu,
  X,
  PhoneCall,
  PlusCircle,
  CheckCircle2,
  ShieldCheck,
  ChevronDown
} from "lucide-react";

interface NavbarProps {
  currentLang: "en" | "hi";
  onToggleLang: () => void;
  activeRole: "farmer" | "owner";
  onToggleRole: (role: "farmer" | "owner") => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onOpenNotifications: () => void;
  onOpenListEquipment: () => void;
  onScrollToSection: (sectionId: string) => void;
  unreadCount?: number;
}

const CITIES = ["Ludhiana, Punjab", "Karnal, Haryana", "Meerut, UP", "Nashik, MH", "Patiala, Punjab"];

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onToggleLang,
  activeRole,
  onToggleRole,
  selectedCity,
  onSelectCity,
  onOpenNotifications,
  onOpenListEquipment,
  onScrollToSection,
  unreadCount = 2
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const t = {
    findEquipment: currentLang === "hi" ? "उपकरण खोजें" : "Find Equipment",
    howItWorks: currentLang === "hi" ? "यह कैसे काम करता है" : "How It Works",
    categories: currentLang === "hi" ? "श्रेणियां" : "Categories",
    map: currentLang === "hi" ? "मानचित्र खोज" : "Map Search",
    reviews: currentLang === "hi" ? "समीक्षाएं" : "Reviews",
    listEquipment: currentLang === "hi" ? "+ मशीन लिस्ट करें" : "+ List Equipment",
    farmerView: currentLang === "hi" ? "किसान दृश्य" : "Farmer View",
    ownerView: currentLang === "hi" ? "मालिक दृश्य" : "Owner View",
    helpline: currentLang === "hi" ? "किसान हेल्पलाइन: 1800-327-6482" : "Kisan Helpline: 1800-327-6482",
    verified: currentLang === "hi" ? "100% सत्यापित" : "100% Verified"
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner for Trust and Kisan Helpline */}
      <div className="bg-emerald-800 text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {currentLang === "hi"
                ? "कृषि उपकरण किराया एवं बुकिंग मंच • 12,000+ सत्यापित किसान जुड़े हैं"
                : "India's Trusted Farm Equipment Rental Platform • 12,000+ Verified Farmers Connected"}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-200 ml-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              {t.verified}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:18003276482"
              className="flex items-center gap-1.5 hover:text-emerald-200 transition-colors text-amber-200 font-semibold"
            >
              <PhoneCall className="w-3 h-3" />
              <span>{t.helpline}</span>
            </a>
            <div className="h-3 w-px bg-emerald-700 hidden sm:block" />
            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 bg-emerald-900/60 hover:bg-emerald-700 px-2 py-0.5 rounded text-[11px] font-semibold text-emerald-100 transition-colors"
            >
              <Globe className="w-3 h-3 text-amber-300" />
              <span>{currentLang === "en" ? "हिंदी में देखें" : "English"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => onScrollToSection("hero")}
          className="text-left focus:outline-hidden"
        >
          <Logo showTagline={true} size="md" />
        </button>

        {/* Location Dropdown */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 px-3 py-2 rounded-full border border-slate-200 transition-all"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>{selectedCity}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {cityDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-50">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 py-1">
                Select Your Cluster
              </div>
              {CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    onSelectCity(city);
                    setCityDropdownOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between font-medium transition-colors ${
                    selectedCity === city
                      ? "bg-emerald-50 text-emerald-800 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{city}</span>
                  {selectedCity === city && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => onScrollToSection("equipment-section")}
            className="px-3 py-2 text-xs lg:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-lg transition-colors"
          >
            {t.findEquipment}
          </button>
          <button
            onClick={() => onScrollToSection("categories-section")}
            className="px-3 py-2 text-xs lg:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-lg transition-colors"
          >
            {t.categories}
          </button>
          <button
            onClick={() => onScrollToSection("map-section")}
            className="px-3 py-2 text-xs lg:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-lg transition-colors"
          >
            {t.map}
          </button>
          <button
            onClick={() => onScrollToSection("how-it-works")}
            className="px-3 py-2 text-xs lg:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-lg transition-colors"
          >
            {t.howItWorks}
          </button>
          <button
            onClick={() => onScrollToSection("reviews-section")}
            className="px-3 py-2 text-xs lg:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-lg transition-colors"
          >
            {t.reviews}
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Role Mode Switcher Pill */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => onToggleRole("farmer")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                activeRole === "farmer"
                  ? "bg-white text-emerald-800 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.farmerView}
            </button>
            <button
              onClick={() => onToggleRole("owner")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                activeRole === "owner"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.ownerView}
            </button>
          </div>

          {/* List Equipment CTA */}
          <button
            onClick={onOpenListEquipment}
            className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2.2 rounded-lg shadow-xs hover:shadow-md transition-all active:scale-98"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{t.listEquipment}</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300">
              RK
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500">View Mode:</span>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg">
              <button
                onClick={() => onToggleRole("farmer")}
                className={`px-3 py-1 text-xs font-bold rounded-md ${
                  activeRole === "farmer" ? "bg-white text-emerald-800 shadow-xs" : "text-slate-600"
                }`}
              >
                {t.farmerView}
              </button>
              <button
                onClick={() => onToggleRole("owner")}
                className={`px-3 py-1 text-xs font-bold rounded-md ${
                  activeRole === "owner" ? "bg-emerald-700 text-white shadow-xs" : "text-slate-600"
                }`}
              >
                {t.ownerView}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                onScrollToSection("equipment-section");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              {t.findEquipment}
            </button>
            <button
              onClick={() => {
                onScrollToSection("categories-section");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              {t.categories}
            </button>
            <button
              onClick={() => {
                onScrollToSection("map-section");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              {t.map}
            </button>
            <button
              onClick={() => {
                onScrollToSection("how-it-works");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              {t.howItWorks}
            </button>
            <button
              onClick={() => {
                onScrollToSection("reviews-section");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              {t.reviews}
            </button>
          </div>

          <button
            onClick={() => {
              onOpenListEquipment();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white font-bold text-sm py-2.5 rounded-lg shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.listEquipment}</span>
          </button>
        </div>
      )}
    </header>
  );
};
