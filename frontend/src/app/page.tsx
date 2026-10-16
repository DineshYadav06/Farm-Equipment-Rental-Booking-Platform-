"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { EQUIPMENT_TAXONOMY, EquipmentCategoryTaxonomy } from "@/content/equipment-taxonomy";
import { CategoryCard } from "@/components/equipment/CategoryCard";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { BookingModal } from "@/components/booking/BookingModal";
import { EquipmentDetailsModal } from "@/components/booking/EquipmentDetailsModal";
import { SourceNote } from "@/components/ui/SourceNote";
import { AppImage } from "@/components/ui/AppImage";
import { fetchEquipmentList } from "@/services/api";
import { Equipment } from "@/types";
import { MandiWidget } from "@/components/mandi/MandiWidget";
import { CompareBar } from "@/components/equipment/CompareBar";

function getRegionImageId(location: string, locale: string): string {
  const locLower = (location || "").toLowerCase();
  if (locLower.includes("punjab") || locale === "pa") return "region-punjab-wheat";
  if (locLower.includes("maharashtra") || locale === "mr") return "region-maharashtra-sugarcane";
  if (locLower.includes("tamil") || locale === "ta") return "region-tamilnadu-paddy";
  if (locLower.includes("assam") || locale === "as") return "region-assam-tea";
  if (locLower.includes("uttar pradesh") || locLower.includes("up")) return "region-up";
  if (locLower.includes("gujarat") || locale === "gu") return "region-gujarat";
  if (locLower.includes("bengal") || locale === "bn") return "region-westbengal";
  if (locLower.includes("karnataka") || locale === "kn") return "region-karnataka";
  if (locLower.includes("kerala") || locale === "ml") return "region-kerala";
  if (locLower.includes("odisha") || locale === "or") return "region-odisha";
  if (locLower.includes("telangana") || locale === "te") return "region-telangana";
  return "region-punjab-wheat";
}
import {
  Search,
  MapPin,
  Calendar,
  Mic,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Volume2,
  UserCheck,
  Award,
  Sparkles,
  PhoneCall,
  ChevronRight,
  Layers,
  HelpCircle,
  AlertCircle
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const {
    t,
    locale,
    localeMeta,
    formatNumber,
    formatPrice,
    speak,
    simpleMode
  } = useTranslation();

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("Ludhiana, Punjab");
  const [dateQuery, setDateQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isListening, setIsListening] = useState(false);

  // Equipment List State
  const [equipmentItems, setEquipmentItems] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals State
  const [selectedBookingEq, setSelectedBookingEq] = useState<Equipment | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDetailsEq, setSelectedDetailsEq] = useState<Equipment | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchEquipmentList("all", "")
      .then((data) => {
        if (mounted) {
          setEquipmentItems(data.slice(0, 6)); // Top 6 for featured
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  // Web Speech API Voice Search handler
  const handleVoiceSearch = () => {
    if (typeof window === "undefined") return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const windowObj = window as any;
    const SpeechRecognition = windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser. Please type your query.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = localeMeta.speechLang || "hi-IN";
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setSearchQuery(transcript);
          router.push(`/equipment?q=${encodeURIComponent(transcript)}`);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/equipment?q=${encodeURIComponent(searchQuery)}&city=${encodeURIComponent(locationQuery)}${
        dateQuery ? `&date=${encodeURIComponent(dateQuery)}` : ""
      }`
    );
  };

  return (
    <div className="flex-col flex flex-1">
      {/* 1. HERO SECTION: TWO-COLUMN OFF-WHITE #fafaf5 */}
      <section className="bg-[#fafaf5] border-b border-[#e5e5df] pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-6 lg:px-8 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Navy Headline + Clean Search Bar + Popular Chips */}
          <div className="lg:col-span-7 space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e3a5f] tracking-tight leading-[1.15]">
              {t("home", "hero.title")}
            </h1>

            <p className="text-sm sm:text-base text-[#44403c] font-normal leading-relaxed max-w-xl">
              {t("home", "hero.subtitle")}
            </p>

            {/* Integrated Search Bar with Volume Button */}
            <div className="flex items-center gap-2 pt-1">
              <form
                onSubmit={handleSearchSubmit}
                className="flex-1 bg-white p-2 rounded-2xl sm:rounded-3xl shadow-sm border border-[#e5e5df] flex flex-col md:flex-row items-center gap-2"
              >
                {/* Equipment Type Input with Voice Mic */}
                <div className="flex-1 flex items-center gap-2 px-3 py-1.5 w-full border-b md:border-b-0 md:border-e border-[#e5e5df]">
                  <Search className="w-4 h-4 text-[#14532d] shrink-0" aria-hidden="true" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("home", "search.categoryPlaceholder")}
                    className="w-full text-xs sm:text-sm font-medium focus:outline-hidden placeholder:text-[#a8a29e] text-[#1e3a5f]"
                  />
                  <button
                    type="button"
                    onClick={handleVoiceSearch}
                    className={`p-1.5 rounded-full transition-colors ${
                      isListening
                        ? "bg-red-600 text-white animate-pulse"
                        : "text-[#78716c] hover:text-[#14532d] hover:bg-[#f3f4f0]"
                    }`}
                    title={t("common", "actions.voiceSearch")}
                    aria-label="Voice Search"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>

                {/* Location Input */}
                <div className="flex-1 flex items-center gap-2 px-3 py-1.5 w-full border-b md:border-b-0 md:border-e border-[#e5e5df]">
                  <MapPin className="w-4 h-4 text-[#d97706] shrink-0" aria-hidden="true" />
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder={t("home", "search.locationPlaceholder")}
                    className="w-full text-xs sm:text-sm font-medium focus:outline-hidden placeholder:text-[#a8a29e] text-[#1e3a5f]"
                  />
                </div>

                {/* Date Input */}
                <div className="flex items-center gap-2 px-3 py-1.5 w-full md:w-auto border-b md:border-b-0 border-[#e5e5df]">
                  <Calendar className="w-4 h-4 text-[#78716c] shrink-0" aria-hidden="true" />
                  <input
                    type="date"
                    value={dateQuery}
                    onChange={(e) => setDateQuery(e.target.value)}
                    className="text-xs font-medium focus:outline-hidden text-[#1e3a5f] bg-transparent"
                  />
                </div>

                {/* Green Find Equipment Submit Button */}
                <button
                  type="submit"
                  className="w-full md:w-auto px-5 py-2.5 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-xs transition-colors shrink-0 flex items-center justify-center gap-2"
                >
                  <span>{t("home", "search.button")}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </form>

              {/* Read Aloud Single Volume Button beside search bar */}
              <button
                type="button"
                onClick={() =>
                  speak(`${t("home", "hero.title")}. ${t("home", "hero.subtitle")}`)
                }
                className="hidden sm:flex p-3 rounded-2xl bg-white border border-[#e5e5df] text-[#1e3a5f] hover:bg-[#f3f4f0] hover:text-[#14532d] transition-colors shrink-0"
                title={t("common", "actions.listen")}
                aria-label={t("common", "actions.listen")}
              >
                <Volume2 className="w-4 h-4 text-[#14532d]" aria-hidden="true" />
              </button>
            </div>

            {/* Popular Category Chips in Neutral Style */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#78716c]">
              <span className="font-semibold text-[#1e3a5f]">Popular:</span>
              {["Tractor", "Harvester", "Rotavator", "Seed Drill"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => router.push(`/equipment?category=${encodeURIComponent(cat)}`)}
                  className="px-3 py-1 rounded-full bg-[#f3f4f0] hover:bg-[#e5e5df] border border-[#e5e5df] text-[#1e3a5f] font-medium transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Documentary-Style Photo via AppImage */}
          <div className="lg:col-span-5">
            <AppImage
              imageId="hero-field-tractor"
              priority
              className="w-full shadow-md rounded-3xl overflow-hidden"
              imgClassName="rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* 2. LIVE TRANSPARENT PLATFORM STATS STRIP (PART 9 COMPLIANT) */}
      <section className="bg-white border-b border-slate-200 py-6 px-4 select-none">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1: Districts */}
            <div className="p-4 rounded-2xl bg-[#fafaf5] border border-slate-200 text-center flex flex-col justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#14532d]">
                  {formatNumber(24)}
                </div>
                <div className="text-xs font-bold text-slate-700 mt-0.5">
                  {t("home", "stats.districts")}
                </div>
              </div>
              <SourceNote registryId="stat-registered-districts" compact={true} />
            </div>

            {/* Stat 2: Verified Machines */}
            <div className="p-4 rounded-2xl bg-[#fafaf5] border border-slate-200 text-center flex flex-col justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#14532d]">
                  {formatNumber(120)}
                </div>
                <div className="text-xs font-bold text-slate-700 mt-0.5">
                  {t("home", "stats.verifiedMachines")}
                </div>
              </div>
              <SourceNote registryId="stat-verified-machines" compact={true} />
            </div>

            {/* Stat 3: Rental Hours */}
            <div className="p-4 rounded-2xl bg-[#fafaf5] border border-slate-200 text-center flex flex-col justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#14532d]">
                  {formatNumber(1450)}+
                </div>
                <div className="text-xs font-bold text-slate-700 mt-0.5">
                  {t("home", "stats.hours")}
                </div>
              </div>
              <SourceNote registryId="stat-completed-hours" compact={true} />
            </div>

            {/* Stat 4: Average Savings */}
            <div className="p-4 rounded-2xl bg-[#fafaf5] border border-slate-200 text-center flex flex-col justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#d97706]">
                  22% – 35%
                </div>
                <div className="text-xs font-bold text-slate-700 mt-0.5">
                  {t("home", "stats.savings")}
                </div>
              </div>
              <SourceNote registryId="stat-average-savings" compact={true} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. 14 AGRICULTURAL CATEGORIES GRID */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full select-none">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
              {t("home", "categories.sectionTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t("home", "categories.sectionSubtitle")}
            </p>
          </div>
          <Link
            href="/equipment"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14532d] hover:underline shrink-0"
          >
            <span>{locale === "hi" ? "सभी श्रेणियां देखें" : "View All Categories"}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {EQUIPMENT_TAXONOMY.slice(0, 10).map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={selectedCategory === cat.slug}
              onSelect={(item) => router.push(`/equipment?category=${encodeURIComponent(item.name)}`)}
            />
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="bg-white border-y border-slate-200 py-12 px-4 sm:px-6 lg:px-8 select-none">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
              {t("home", "howItWorks.sectionTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t("home", "howItWorks.sectionSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#fafaf5] border-2 border-slate-200 text-left relative flex flex-col justify-between">
              <div>
                <AppImage
                  imageId="how-step-1"
                  className="w-full mb-4 rounded-xl overflow-hidden shadow-2xs"
                  showCredit={false}
                />
                <span className="w-9 h-9 rounded-xl bg-[#14532d] text-white font-black text-sm flex items-center justify-center mb-3">
                  1
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {t("home", "howItWorks.step1Title")}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t("home", "howItWorks.step1Desc")}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#fafaf5] border-2 border-slate-200 text-left relative flex flex-col justify-between">
              <div>
                <AppImage
                  imageId="how-step-2"
                  className="w-full mb-4 rounded-xl overflow-hidden shadow-2xs"
                  showCredit={false}
                />
                <span className="w-9 h-9 rounded-xl bg-[#14532d] text-white font-black text-sm flex items-center justify-center mb-3">
                  2
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {t("home", "howItWorks.step2Title")}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t("home", "howItWorks.step2Desc")}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#fafaf5] border-2 border-slate-200 text-left relative flex flex-col justify-between">
              <div>
                <AppImage
                  imageId="how-step-3"
                  className="w-full mb-4 rounded-xl overflow-hidden shadow-2xs"
                  showCredit={false}
                />
                <span className="w-9 h-9 rounded-xl bg-[#14532d] text-white font-black text-sm flex items-center justify-center mb-3">
                  3
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {t("home", "howItWorks.step3Title")}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t("home", "howItWorks.step3Desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REGION-FEATURED EQUIPMENT LISTINGS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full select-none">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
              {locale === "hi" ? "सत्यापित उपलब्ध मशीनें" : "Verified Available Machinery"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {locale === "hi"
                ? `${locationQuery} के पास उपलब्ध कृषि मशीनरी।`
                : `Real-time available equipment near ${locationQuery}.`}
            </p>
          </div>
          <Link
            href="/equipment"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#14532d] hover:bg-[#16a34a] shadow-xs transition-colors shrink-0"
          >
            <span>{locale === "hi" ? "सभी 300+ मशीनें देखें" : "Explore All 300+ Listings"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Regional Agricultural Focus Banner */}
        <div className="mb-6 p-4 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-5">
          <div className="w-full sm:w-56 shrink-0">
            <AppImage
              imageId={getRegionImageId(locationQuery, locale)}
              className="w-full rounded-2xl overflow-hidden"
              imgClassName="rounded-2xl"
              showCredit={true}
            />
          </div>
          <div className="flex-1 text-xs text-slate-600">
            <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] uppercase tracking-wider mb-1">
              {locale === "hi" ? "सक्रिय कृषि क्षेत्र" : "Active Agronomic Zone"}
            </span>
            <h3 className="font-bold text-slate-900 text-sm">
              {locale === "hi"
                ? `${locationQuery} हेतु क्षेत्रीय मशीनरी वितरण`
                : `Regional Machinery Deployment for ${locationQuery}`}
            </h3>
            <p className="mt-1 leading-relaxed">
              {locale === "hi"
                ? "इस कृषि ज़िले में मौसमी जुताई और कटाई की आवश्यकताओं के अनुसार सत्यापित उपकरण।"
                : "Prioritized implements matched to seasonal soil tillage and harvesting timelines in this agrarian district."}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipmentItems.map((eq) => (
              <EquipmentCard
                key={eq.id}
                equipment={eq}
                onBookNow={(item) => {
                  setSelectedBookingEq(item);
                  setBookingOpen(true);
                }}
                onViewDetails={(item) => {
                  setSelectedDetailsEq(item);
                  setDetailsOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* 5.5 LIVE APMC MANDI RATES & FARMER TOOLS (A7) */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full select-none">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1">
            <MandiWidget compact={true} />
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Planning & Budgeting
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  Machinery Rental Cost Estimator
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Calculate estimated machine rental expenditure for your farm size and duration in hourly or daily rates.
                </p>
              </div>
              <Link
                href="/tools/cost-estimator"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14532d] dark:text-emerald-400 hover:underline pt-2"
              >
                <span>Calculate Rental Cost</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Agronomic Calendar
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  Kharif, Rabi & Zaid Cropping Guide
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Recommended tractor and harvester operations mapped to seasonal stages from ICAR cropping calendars.
                </p>
              </div>
              <Link
                href="/season-guide"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14532d] dark:text-emerald-400 hover:underline pt-2"
              >
                <span>Explore Seasonal Calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OWNER CALL TO ACTION BANNER */}
      <section className="bg-[#14532d] text-white py-12 px-4 sm:px-6 lg:px-8 my-6 select-none">
        <div className="max-w-5xl mx-auto bg-[#1e3a5f] p-8 sm:p-10 rounded-3xl border-2 border-amber-400 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left flex-1">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
              {t("home", "ownerCta.badge")}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {t("home", "ownerCta.title")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              {t("home", "ownerCta.subtitle")}
            </p>
          </div>

          <div className="w-full md:w-56 shrink-0">
            <AppImage
              imageId="owner-cta"
              className="w-full rounded-2xl overflow-hidden shadow-md"
              imgClassName="rounded-2xl"
              showCredit={false}
            />
          </div>

          <Link
            href="/list-your-equipment"
            className="shrink-0 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-900 font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-transform hover:scale-105"
          >
            {t("home", "ownerCta.button")}
          </Link>
        </div>
      </section>

      {/* Floating Compare Bar (A1) */}
      <CompareBar />

      {/* Booking and Details Modals */}
      <BookingModal
        equipment={selectedBookingEq}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      <EquipmentDetailsModal
        equipment={selectedDetailsEq}
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onBookNow={(item) => {
          setSelectedBookingEq(item);
          setBookingOpen(true);
        }}
      />
    </div>
  );
}
