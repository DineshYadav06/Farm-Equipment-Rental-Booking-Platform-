"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryCard } from "@/components/equipment/CategoryCard";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { BookingModal } from "@/components/booking/BookingModal";
import { EquipmentDetailsModal } from "@/components/booking/EquipmentDetailsModal";
import { MapDiscovery } from "@/components/map/MapDiscovery";
import { ListEquipmentModal } from "@/components/owner/ListEquipmentModal";
import { FarmerDashboardView } from "@/components/dashboard/FarmerDashboardView";
import { OwnerDashboardView } from "@/components/dashboard/OwnerDashboardView";
import { NotificationDrawer } from "@/components/ui/NotificationDrawer";
import {
  CATEGORIES,
  MOCK_EQUIPMENT,
  MOCK_REVIEWS,
  MOCK_RECOMMENDATIONS,
  MOCK_NOTIFICATIONS,
  HOW_IT_WORKS_STEPS
} from "@/constants/data";
import { Equipment } from "@/types";
import {
  Search,
  MapPin,
  Calendar,
  SlidersHorizontal,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  PhoneCall,
  UserCheck,
  Users,
  Tractor,
  Layers,
  ChevronRight,
  Zap,
  Tag
} from "lucide-react";

export default function Home() {
  // App Global State
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [activeRole, setActiveRole] = useState<"farmer" | "owner">("farmer");
  const [selectedCity, setSelectedCity] = useState<string>("Ludhiana, Punjab");
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(MOCK_EQUIPMENT);

  // Search & Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(15000);
  const [selectedRadius, setSelectedRadius] = useState<number>(50);
  const [selectedMinRating, setSelectedMinRating] = useState<number>(0);
  const [availabilityOnly, setAvailabilityOnly] = useState<boolean>(false);

  // Recommendation Crop Selector
  const [selectedCrop, setSelectedCrop] = useState<string>("Wheat");

  // Modals & Drawers
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedEquipmentForBooking, setSelectedEquipmentForBooking] = useState<Equipment | null>(null);

  const [detailsModalOpen, setDetailsModalOpen] = useState<boolean>(false);
  const [selectedEquipmentForDetails, setSelectedEquipmentForDetails] = useState<Equipment | null>(null);

  const [listEquipmentModalOpen, setListEquipmentModalOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  // Owner Calculator State
  const [calcMachineType, setCalcMachineType] = useState<string>("Tractor");
  const [calcDaysPerMonth, setCalcDaysPerMonth] = useState<number>(18);

  const isHi = lang === "hi";

  // Filtered Equipment in Marketplace
  const filteredEquipment = useMemo(() => {
    return equipmentList.filter((item) => {
      const matchCategory =
        selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = item.daily_rate <= maxPriceFilter;
      const matchDistance = (item.distance_km || 0) <= selectedRadius;
      const matchRating = item.average_rating >= selectedMinRating;
      const matchAvail = !availabilityOnly || item.is_available;

      return matchCategory && matchQuery && matchPrice && matchDistance && matchRating && matchAvail;
    });
  }, [equipmentList, selectedCategory, searchQuery, maxPriceFilter, selectedRadius, selectedMinRating, availabilityOnly]);

  const handleBookNow = (eq: Equipment) => {
    setSelectedEquipmentForBooking(eq);
    setBookingModalOpen(true);
  };

  const handleViewDetails = (eq: Equipment) => {
    setSelectedEquipmentForDetails(eq);
    setDetailsModalOpen(true);
  };

  const handleNewEquipmentAdded = (newEq: Equipment) => {
    setEquipmentList((prev) => [newEq, ...prev]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Owner earnings estimate
  const estimatedEarnings = useMemo(() => {
    const dailyMap: Record<string, number> = {
      Tractor: 3200,
      Harvester: 14000,
      Rotavator: 2200,
      "Seed Drill": 2800,
      Sprayer: 2100
    };
    const rate = dailyMap[calcMachineType] || 2500;
    return rate * calcDaysPerMonth;
  }, [calcMachineType, calcDaysPerMonth]);

  return (
    <div className="min-h-screen bg-slate-50/70 font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* ── 1. GLOBAL NAVBAR ── */}
      <Navbar
        currentLang={lang}
        onToggleLang={() => setLang(lang === "en" ? "hi" : "en")}
        activeRole={activeRole}
        onToggleRole={setActiveRole}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenListEquipment={() => setListEquipmentModalOpen(true)}
        onScrollToSection={scrollToSection}
        unreadCount={2}
      />

      {/* Role View Conditional Rendering: If Owner View is selected, show Owner Dashboard */}
      {activeRole === "owner" ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <OwnerDashboardView
            onOpenListEquipment={() => setListEquipmentModalOpen(true)}
            lang={lang}
          />
        </main>
      ) : (
        <main>
          {/* ── 2. HERO SECTION ── */}
          <section
            id="hero"
            className="relative bg-gradient-to-b from-white via-emerald-50/30 to-slate-50 pt-8 sm:pt-14 pb-14 sm:pb-20 border-b border-slate-200/80 overflow-hidden"
          >
            {/* Subtle background field contours */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="field-glow" cx="50%" cy="30%" r="50%">
                    <stop offset="0%" stopColor="#dcfce7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#field-glow)" />
              </svg>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Headlines & Value Prop */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  {/* Trust Pill */}
                  <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-300/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-900 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span>
                      {isHi
                        ? "सत्यापित कृषि उपकरण साझाकरण मंच"
                        : "Verified Agricultural Equipment Rental Network"}
                    </span>
                  </div>

                  {/* Main Headline */}
                  <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                    {isHi ? (
                      <>
                        सही कृषि उपकरण किराए पर लें।{" "}
                        <span className="text-emerald-700 underline decoration-amber-400 decoration-wavy decoration-3">
                          आसानी से उपज बढ़ाएं।
                        </span>
                      </>
                    ) : (
                      <>
                        Rent the Right Farm Equipment.{" "}
                        <span className="text-emerald-700">Grow with Ease.</span>
                      </>
                    )}
                  </h1>

                  {/* Subheadline */}
                  <p className="text-sm sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    {isHi
                      ? "अपने आसपास की विश्वसनीय कृषि मशीनें खोजें, लाइव उपलब्धता जांचें, दरों की तुलना करें और सत्यापित मालिकों से आसानी से बुक करें।"
                      : "Find reliable agricultural machines near you, check availability, compare prices and book equipment from verified owners."}
                  </p>

                  {/* Primary & Secondary CTAs */}
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                    <button
                      onClick={() => scrollToSection("equipment-section")}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-98"
                    >
                      <span>{isHi ? "उपकरण खोजें" : "Find Equipment"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setListEquipmentModalOpen(true)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl border-2 border-slate-200 hover:border-emerald-600 transition-all active:scale-98"
                    >
                      <Tractor className="w-4 h-4 text-emerald-700" />
                      <span>{isHi ? "अपनी मशीन लिस्ट करें" : "List Your Equipment"}</span>
                    </button>
                  </div>

                  {/* Metrics Badge Row */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0">
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900">12,500+</div>
                      <div className="text-[11px] font-medium text-slate-500">
                        {isHi ? "सक्रिय किसान" : "Farmers Connected"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-700">4,800+</div>
                      <div className="text-[11px] font-medium text-slate-500">
                        {isHi ? "सत्यापित मशीनें" : "Verified Machines"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-amber-600">4.9 / 5</div>
                      <div className="text-[11px] font-medium text-slate-500">
                        {isHi ? "संतुष्टि रेटिंग" : "Farmer Trust Score"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Hero Visual Graphic */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                    <img
                      src="https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1c?auto=format&fit=crop&w=1000&q=85"
                      alt="Modern tractor working on green agricultural farm field"
                      className="w-full h-84 sm:h-100 object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Floating GPS Location Pin Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg border border-slate-200">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                      <div className="text-left">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          Active Cluster
                        </div>
                        <div className="text-xs font-extrabold text-slate-900">
                          {selectedCity}
                        </div>
                      </div>
                    </div>

                    {/* Floating Rental Cue Badge Bottom */}
                    <div className="absolute bottom-4 left-4 right-4 bg-emerald-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-700/50 text-white flex items-center justify-between gap-3 shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight">
                            Mahindra 575 DI (47 HP)
                          </div>
                          <div className="text-[11px] text-emerald-200">
                            Available 2.8 km away • ₹3,200/day
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleBookNow(MOCK_EQUIPMENT[0])}
                        className="bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs px-3 py-1.5 rounded-xl shrink-0 transition-colors"
                      >
                        {isHi ? "बुक करें" : "Book"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Comprehensive Interactive Search Bar ── */}
              <div className="mt-10 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {/* Category Field */}
                  <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-0.5">
                      {isHi ? "उपकरण श्रेणी" : "Equipment Type"}
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-hidden cursor-pointer"
                    >
                      <option value="All">All Categories (सभी श्रेणियां)</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name} ({cat.count} available)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location Field */}
                  <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-1">
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-0.5">
                        {isHi ? "खेत / गांव का स्थान" : "Your Farm Area"}
                      </label>
                      <input
                        type="text"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        placeholder="Village / Tehsil"
                        className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-hidden"
                      />
                    </div>
                    <button
                      onClick={() => alert(`GPS Location auto-detected: ${selectedCity}`)}
                      title="Use My GPS Location"
                      className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl transition-colors shrink-0"
                    >
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Search Keyword */}
                  <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-0.5">
                      {isHi ? "खोजें (ब्रांड / मॉडल)" : "Machine / Brand / Model"}
                    </label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. John Deere, Rotavator, 50 HP"
                      className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-hidden"
                    />
                  </div>

                  {/* Search Action CTA */}
                  <div className="flex items-center">
                    <button
                      onClick={() => scrollToSection("equipment-section")}
                      className="w-full h-full min-h-[46px] flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-xs hover:shadow transition-all"
                    >
                      <Search className="w-4 h-4" />
                      <span>{isHi ? "उपलब्ध मशीनें खोजें" : "Search Machines"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 3. EQUIPMENT CATEGORIES ── */}
          <section id="categories-section" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {isHi ? "कृषि मशीन श्रेणियां" : "Equipment Categories"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                  {isHi ? "खेती के हर काम के लिए सही मशीन" : "Machinery for Every Farm Operation"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                  {isHi
                    ? "जुताई, बुवाई, खरपतवार नियंत्रण, सिंचाई से लेकर कटाई और थ्रेशिंग तक आधुनिक मशीनों का विशाल संग्रह।"
                    : "From primary tillage and sowing to emergency irrigation, spraying and grain harvesting."}
                </p>
              </div>

              {selectedCategory !== "All" && (
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 self-start md:self-auto"
                >
                  {isHi ? "सभी श्रेणियां दिखाएं (Reset)" : "Show All Categories"}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {CATEGORIES.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  id={cat.id}
                  name={cat.name}
                  nameHi={cat.nameHi}
                  description={cat.description}
                  descriptionHi={cat.descriptionHi}
                  count={cat.count}
                  image={cat.image}
                  badge={cat.badge}
                  isSelected={selectedCategory.toLowerCase() === cat.id.toLowerCase()}
                  onSelect={(id) => {
                    setSelectedCategory(id);
                    scrollToSection("equipment-section");
                  }}
                  lang={lang}
                />
              ))}
            </div>
          </section>

          {/* ── 4. HOW IT WORKS ── */}
          <section id="how-it-works" className="py-14 sm:py-20 bg-white border-y border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {isHi ? "सरल 4-चरण प्रक्रिया" : "How It Works"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                  {isHi ? "किराए पर लेना बिल्कुल आसान है" : "Rent Farm Equipment in 4 Simple Steps"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {isHi
                    ? "कोई बिचौलिया नहीं, सीधे सत्यापित मशीन मालिक से बुकिंग और पारदर्शी एस्क्रो सुरक्षा।"
                    : "Zero middlemen. Connect directly with verified equipment owners with escrow protection."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {HOW_IT_WORKS_STEPS.map((step, idx) => (
                  <div
                    key={step.step}
                    className="relative flex flex-col p-6 rounded-3xl bg-slate-50/70 border border-slate-200/90 hover:border-emerald-300 transition-all hover:shadow-sm"
                  >
                    <div className="text-3xl font-black text-emerald-800/20 font-mono mb-2">
                      {step.step}
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base mb-2">
                      {isHi ? step.titleHi : step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isHi ? step.descHi : step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 5. FARMER FEATURES HIGHLIGHT ── */}
          <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {isHi ? "किसान-हितैषी सुविधाएं" : "Built Exclusively for Indian Farmers"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                {isHi ? "आधुनिक तकनीक, स्थानीय विश्वास" : "Smart Technology with Rural Trust"}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { title: "GPS Discovery", desc: "Locate machines within 5 km to 50 km radius" },
                { title: "Availability Calendar", desc: "Live slot verification for sowing and harvest" },
                { title: "Hourly & Daily Rental", desc: "Flexible billing to match exact field hours" },
                { title: "Transparent Pricing", desc: "Zero hidden charges, compare rates upfront" },
                { title: "Verified Machine Owners", desc: "RC, KYC, and machinery physical audit" },
                { title: "Real Farmer Reviews", desc: "Read performance feedback from peer farmers" },
                { title: "Secure Escrow Payment", desc: "Money held safely until work is completed" },
                { title: "SMS & WhatsApp Alerts", desc: "Operator arrival reminders on your phone" }
              ].map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs mb-2.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{feat.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 6. NEARBY EQUIPMENT MARKETPLACE ── */}
          <section id="equipment-section" className="py-14 sm:py-20 bg-slate-100/60 border-y border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Marketplace Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-600 animate-ping" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                      {isHi ? "उपकरण आपके निकट" : "Equipment Near You"}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                    {isHi ? `${selectedCity} में उपलब्ध कृषि मशीनें` : `Machinery Available Near ${selectedCity}`}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {filteredEquipment.length} {isHi ? "मशीनें किराए के लिए तैयार हैं" : "machines ready for immediate booking"}
                  </p>
                </div>

                {/* Quick Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                  {["All", "Tractor", "Harvester", "Rotavator", "Seed Drill", "Sprayer"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        selectedCategory.toLowerCase() === cat.toLowerCase()
                          ? "bg-emerald-800 text-white shadow-xs"
                          : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filters Bar: Distance, Price, Availability */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-8 flex flex-wrap items-center justify-between gap-4 text-xs">
                {/* Distance Slider */}
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-700">{isHi ? "दूरी दायरा:" : "Max Distance:"}</span>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={selectedRadius}
                    onChange={(e) => setSelectedRadius(Number(e.target.value))}
                    className="w-28 accent-emerald-600 cursor-pointer"
                  />
                  <span className="font-extrabold text-emerald-800">{selectedRadius} km</span>
                </div>

                {/* Max Price Slider */}
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-700">{isHi ? "अधिकतम दर:" : "Max Daily Rate:"}</span>
                  <input
                    type="range"
                    min="1500"
                    max="15000"
                    step="500"
                    value={maxPriceFilter}
                    onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                    className="w-28 accent-emerald-600 cursor-pointer"
                  />
                  <span className="font-extrabold text-emerald-800">₹{maxPriceFilter.toLocaleString("en-IN")}</span>
                </div>

                {/* Availability Toggle */}
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={availabilityOnly}
                    onChange={(e) => setAvailabilityOnly(e.target.checked)}
                    className="rounded accent-emerald-600 w-4 h-4 cursor-pointer"
                  />
                  <span>{isHi ? "केवल तत्काल उपलब्ध" : "Available Now Only"}</span>
                </label>
              </div>

              {/* Machinery Grid */}
              {filteredEquipment.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEquipment.map((eq) => (
                    <EquipmentCard
                      key={eq.id}
                      equipment={eq}
                      onBookNow={handleBookNow}
                      onViewDetails={handleViewDetails}
                      lang={lang}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
                  <Tractor className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-800 text-base">
                    {isHi ? "कोई मशीन नहीं मिली" : "No Machinery Matches Filters"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Try expanding your search radius or selecting &quot;All Categories&quot;.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedRadius(50);
                      setMaxPriceFilter(15000);
                      setSearchQuery("");
                    }}
                    className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ── 7. AI RECOMMENDATIONS SECTION ── */}
          <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
              <div className="max-w-3xl mb-8">
                <div className="inline-flex items-center gap-1.5 bg-emerald-700/80 text-emerald-200 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-emerald-500/40">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Smart Agri-Match Engine</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {isHi ? "आपके खेत के लिए अनुशंसित उपकरण" : "Equipment Recommended for Your Farm"}
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100 mt-2 leading-relaxed">
                  FarmRentHub recommends equipment based on your location, crop, season, previous bookings, availability, distance, price and owner ratings.
                </p>

                {/* Crop Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2 mt-5">
                  <span className="text-xs font-bold text-emerald-200 mr-1">Select Crop:</span>
                  {["Wheat", "Paddy", "Sugarcane", "Mustard", "Cotton"].map((crop) => (
                    <button
                      key={crop}
                      onClick={() => setSelectedCrop(crop)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        selectedCrop === crop
                          ? "bg-amber-400 text-amber-950 shadow-xs"
                          : "bg-emerald-950/60 text-emerald-100 hover:bg-emerald-700"
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Recommendation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {MOCK_RECOMMENDATIONS.map((rec) => (
                  <div
                    key={rec.equipment_id}
                    className="bg-white rounded-2xl p-4 text-slate-800 flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <div className="relative h-36 rounded-xl overflow-hidden mb-3">
                        <img
                          src={rec.image_url}
                          alt={rec.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-emerald-700 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                          {rec.match_score}% Match
                        </div>
                      </div>

                      <div className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">
                        {rec.category} • For {rec.best_for_crop}
                      </div>

                      <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">
                        {rec.title}
                      </h4>

                      <p className="text-[11px] text-slate-600 mt-2 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                        {rec.recommended_reason}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-base font-extrabold text-emerald-800">
                          ₹{rec.daily_rate}
                          <span className="text-xs text-slate-500 font-normal">/day</span>
                        </div>
                        <div className="text-[10px] text-slate-400">{rec.distance_km} km away</div>
                      </div>

                      <button
                        onClick={() => {
                          const target = equipmentList.find((e) => e.id === rec.equipment_id);
                          if (target) handleBookNow(target);
                        }}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-colors"
                      >
                        Book Machine
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 8. INTERACTIVE GPS MAP DISCOVERY ── */}
          <section id="map-section" className="py-14 sm:py-20 bg-white border-y border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {isHi ? "मानचित्र पर खोजें" : "Live Map Discovery"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                  {isHi ? "नक्शे पर देखें नजदीकी मशीनें और दूरी" : "Interactive Equipment Radar & GPS Pinning"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {isHi
                    ? "अपने खेत के आसपास पिन किए गए ट्रैक्टर, हार्वेस्टर और रोटावेटर को सीधे नक्शे पर चुनें।"
                    : "Tap any machine pin on the cluster radar to inspect owner ratings, rates, and dispatch status."}
                </p>
              </div>

              <MapDiscovery
                equipmentList={equipmentList}
                selectedCity={selectedCity}
                onBookNow={handleBookNow}
                lang={lang}
              />
            </div>
          </section>

          {/* ── 9. OWNER SECTION & EARNINGS ESTIMATOR ── */}
          <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
                    {isHi ? "कृषि मशीन मालिकों के लिए" : "For Equipment Owners"}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                    {isHi ? "कृषि उपकरण हैं? कमाई शुरू करें।" : "Have Farming Equipment? Earn from It."}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                    {isHi
                      ? "फार्मरेंटहब पर अपने कृषि उपकरण लिस्ट करें और नजदीकी किसानों से जुड़ें। जब आपकी मशीनें खाली हों, तब उन्हें किराए पर देकर अतिरिक्त आय अर्जित करें।"
                      : "List your agricultural equipment on FarmRentHub and connect with nearby farmers. Turn idle tractor and harvester hours into guaranteed monthly earnings."}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    {[
                      "Add Equipment with Photos",
                      "Set Your Own Hourly & Daily Price",
                      "Manage Availability on Calendar",
                      "Accept/Decline Booking Requests",
                      "Automatic Escrow Payouts to Bank",
                      "Transit Damage Insurance"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setListEquipmentModalOpen(true)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm px-7 py-3.5 rounded-2xl shadow-lg transition-all"
                    >
                      {isHi ? "अपनी मशीन लिस्ट करें" : "List Your Equipment"}
                    </button>
                  </div>
                </div>

                {/* Right: Interactive Earnings Calculator */}
                <div className="lg:col-span-5 bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700 space-y-4">
                  <h3 className="font-extrabold text-white text-base border-b border-slate-700 pb-2">
                    {isHi ? "मासिक कमाई कैलकुलेटर" : "Monthly Earnings Estimator"}
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Select Machinery Type:</label>
                    <select
                      value={calcMachineType}
                      onChange={(e) => setCalcMachineType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-hidden"
                    >
                      <option value="Tractor">Tractor (45-55 HP)</option>
                      <option value="Harvester">Combine Harvester</option>
                      <option value="Rotavator">Rotavator (7-8 Ft)</option>
                      <option value="Seed Drill">Happy Seeder / Drill</option>
                      <option value="Sprayer">Boom Sprayer (600L)</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                      <span>Rented Days per Month:</span>
                      <span className="text-emerald-400">{calcDaysPerMonth} days</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="28"
                      value={calcDaysPerMonth}
                      onChange={(e) => setCalcDaysPerMonth(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-800/40 text-center">
                    <div className="text-[10px] text-emerald-300 uppercase font-bold tracking-wider">
                      Estimated Monthly Rental Income
                    </div>
                    <div className="text-3xl font-black text-amber-300 mt-1">
                      ₹{estimatedEarnings.toLocaleString("en-IN")}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Directly deposited to your bank account via Escrow
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 10. TRUST & VERIFICATION SECTION ── */}
          <section className="py-14 sm:py-20 bg-white border-y border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {isHi ? "सुरक्षा व सत्यापन" : "Trust & Transparency"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                  {isHi ? "सत्यापित किसान और उपकरण मालिक" : "Verified Farmers & Equipment Owners"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  User verification helps create a safer, trusted agricultural rental marketplace where both farmers and owners work with complete peace of mind.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base">Aadhaar & KYC Verified</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Identity authentication ensures all renting farmers and equipment providers are authentic local community members.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base">Machinery RC & Fitness Check</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every listed tractor and combine harvester undergoes serial number and mechanical condition verification before booking.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base">Escrow Guarantee</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Rental funds and refundable security deposits remain safely in escrow until the field task is inspected and certified complete.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── 11. RATINGS & REVIEWS SECTION ── */}
          <section id="reviews-section" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {isHi ? "किसानों की राय" : "Farmer Testimonials"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                  {isHi ? "सच्चे अनुभव, प्रमाणित बुकिंग" : "Real Experiences from Verified Bookings"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Over 12,000 farmers rely on FarmRentHub each sowing and harvesting cycle.
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800 bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-2xs">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>4.9 Overall Community Rating (1,400+ Reviews)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-900 font-extrabold flex items-center justify-center text-xs">
                        {rev.farmer_name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">{rev.farmer_name}</h4>
                        <div className="text-[11px] text-slate-500">{rev.farmer_location}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &quot;{rev.comment}&quot;
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Booking
                    </span>
                    <span>{rev.created_at}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 12. ABOUT SECTION ── */}
          <section className="py-14 sm:py-20 bg-emerald-900 text-white border-y border-emerald-950">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-700/50">
                {isHi ? "हमारा मिशन" : "Our Mission"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Making Farm Equipment Accessible
              </h2>
              <p className="text-xs sm:text-base text-emerald-100 leading-relaxed max-w-2xl mx-auto">
                FarmRentHub helps farmers access the right agricultural machinery when they need it, while helping equipment owners earn from their machines. By democratizing modern mechanized tools, we reduce capital overheads for smallholder cultivators and accelerate farm productivity across India.
              </p>
            </div>
          </section>
        </main>
      )}

      {/* ── 13. GLOBAL FOOTER ── */}
      <Footer
        lang={lang}
        onScrollToSection={scrollToSection}
        onOpenListEquipment={() => setListEquipmentModalOpen(true)}
      />

      {/* ── 14. INTERACTIVE MODALS & DRAWERS ── */}
      <BookingModal
        equipment={selectedEquipmentForBooking}
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        lang={lang}
      />

      <EquipmentDetailsModal
        equipment={selectedEquipmentForDetails}
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        onBookNow={handleBookNow}
        lang={lang}
      />

      <ListEquipmentModal
        isOpen={listEquipmentModalOpen}
        onClose={() => setListEquipmentModalOpen(false)}
        onEquipmentAdded={handleNewEquipmentAdded}
        lang={lang}
      />

      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={MOCK_NOTIFICATIONS}
        lang={lang}
      />
    </div>
  );
}
