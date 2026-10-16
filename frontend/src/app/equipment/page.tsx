"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { EQUIPMENT_TAXONOMY } from "@/content/equipment-taxonomy";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { CompareBar } from "@/components/equipment/CompareBar";
import { BookingModal } from "@/components/booking/BookingModal";
import { EquipmentDetailsModal } from "@/components/booking/EquipmentDetailsModal";
import { fetchEquipmentList } from "@/services/api";
import { searchAlertsService } from "@/services/alerts";
import { Equipment } from "@/types";
import { AppImage } from "@/components/ui/AppImage";
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  CheckCircle2,
  RotateCcw,
  LayoutGrid,
  List,
  Sparkles,
  Bell
} from "lucide-react";

function EquipmentCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("q") || "";

  const { t, formatNumber, formatPrice, locale } = useTranslation();

  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [withDriverOnly, setWithDriverOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"price_asc" | "price_desc" | "rating" | "distance">("distance");

  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  // Search alert creation state
  const [alertSaved, setAlertSaved] = useState(false);
  const [isSavingAlert, setIsSavingAlert] = useState(false);

  // Modals
  const [selectedEqForBooking, setSelectedEqForBooking] = useState<Equipment | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [detailsEq, setDetailsEq] = useState<Equipment | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchEquipmentList(categoryFilter, searchQuery)
      .then((data) => {
        if (mounted) {
          setEquipmentList(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [categoryFilter, searchQuery]);

  // Client-side filtering & sorting
  const filteredItems = useMemo(() => {
    return equipmentList
      .filter((eq) => {
        if (availableOnly && !eq.is_available) return false;
        if (withDriverOnly && !eq.with_driver) return false;
        if (eq.daily_rate > maxPrice) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.daily_rate - b.daily_rate;
        if (sortBy === "price_desc") return b.daily_rate - a.daily_rate;
        if (sortBy === "rating") return b.average_rating - a.average_rating;
        if (sortBy === "distance") return (a.distance_km || 0) - (b.distance_km || 0);
        return 0;
      });
  }, [equipmentList, availableOnly, withDriverOnly, maxPrice, sortBy]);

  const resetFilters = () => {
    setCategoryFilter("all");
    setSearchQuery("");
    setMaxPrice(15000);
    setWithDriverOnly(false);
    setAvailableOnly(false);
    setSortBy("distance");
  };

  const handleCreateSearchAlert = async () => {
    setIsSavingAlert(true);
    try {
      await searchAlertsService.createAlert(
        searchQuery || "All Equipment",
        categoryFilter !== "all" ? categoryFilter : undefined
      );
      setAlertSaved(true);
    } finally {
      setIsSavingAlert(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
      {/* Top Page Header */}
      <div className="mb-6">
        <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] dark:text-white tracking-tight">
          {t("common", "nav.equipment")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Explore all verified tractors, harvesters, rotavators, and implements available across India.
        </p>
      </div>

      {/* Main Layout: Sidebar Filters + Catalog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <aside className="lg:col-span-1 space-y-6 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#14532d] dark:text-emerald-400" />
              <span>Filters</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t("common", "actions.reset")}</span>
            </button>
          </div>

          {/* Search Box in Sidebar */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Search by Keyword or Local Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tractor, harvester, rotavator..."
                className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#16a34a] bg-transparent text-slate-900 dark:text-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </div>
          </div>

          {/* Category Dropdown/Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Equipment Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#16a34a] bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
            >
              <option value="all">All Categories</option>
              {EQUIPMENT_TAXONOMY.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.names[locale] || cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Max Price Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-700 dark:text-slate-300">Max Daily Rate:</span>
              <span className="text-[#14532d] dark:text-emerald-400">{formatPrice(maxPrice)}/day</span>
            </div>
            <input
              type="range"
              min="1000"
              max="25000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
              className="w-full accent-[#14532d]"
            />
          </div>

          {/* Checkboxes: Driver & Availability */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={withDriverOnly}
                onChange={(e) => setWithDriverOnly(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#14532d] focus:ring-[#16a34a]"
              />
              <span>{t("common", "badges.withDriver")}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#14532d] focus:ring-[#16a34a]"
              />
              <span>Available Machines Only</span>
            </label>
          </div>
        </aside>

        {/* Main Content Area: Sort Toolbar & Results Grid */}
        <section className="lg:col-span-3 space-y-6">
          {/* Top Sort Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Showing{" "}
              <span className="text-[#14532d] dark:text-emerald-400 font-extrabold">
                {formatNumber(filteredItems.length)}
              </span>{" "}
              verified machines
            </div>

            <div className="flex items-center gap-2 ms-auto">
              <label htmlFor="sort-by-select" className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Sort by:
              </label>
              <select
                id="sort-by-select"
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold focus:outline-hidden"
              >
                <option value="distance">Nearest to Farm (Distance)</option>
                <option value="rating">Highest Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Grid of Equipment Cards */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-56 max-w-full mx-auto mb-2">
                <AppImage
                  imageId="illustration-empty-search"
                  className="w-full"
                  showCredit={false}
                />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                No equipment matched your filters
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Try widening your price range, searching in neighboring districts, or clearing category filters.
              </p>

              {/* Saved Search Alert (A10) */}
              <div className="pt-2">
                {alertSaved ? (
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold border border-emerald-300 dark:border-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                    <span>Search alert saved! You will be notified when matching machines are listed.</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleCreateSearchAlert}
                    disabled={isSavingAlert}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 hover:bg-amber-100 rounded-xl text-xs font-bold border border-amber-300 dark:border-amber-800 transition-colors"
                  >
                    <Bell className="w-4 h-4 text-amber-600" />
                    <span>{isSavingAlert ? "Saving alert..." : "Notify me when available (Save Alert)"}</span>
                  </button>
                )}
              </div>

              <div>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-[#14532d] text-white rounded-xl text-xs font-bold hover:bg-[#16a34a] transition-colors cursor-pointer"
                >
                  {t("common", "actions.reset")}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((eq) => (
                <EquipmentCard
                  key={eq.id}
                  equipment={eq}
                  onBookNow={(item) => {
                    setSelectedEqForBooking(item);
                    setBookingOpen(true);
                  }}
                  onViewDetails={(item) => {
                    setDetailsEq(item);
                    setDetailsOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Floating Compare Bar */}
      <CompareBar />

      {/* Booking and Details Modals */}
      <BookingModal
        equipment={selectedEqForBooking}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      <EquipmentDetailsModal
        equipment={detailsEq}
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onBookNow={(item) => {
          setSelectedEqForBooking(item);
          setBookingOpen(true);
        }}
      />
    </main>
  );
}

export default function EquipmentListPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading catalog...</div>}>
      <EquipmentCatalogContent />
    </Suspense>
  );
}
