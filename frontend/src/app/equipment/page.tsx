"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { EQUIPMENT_TAXONOMY } from "@/content/equipment-taxonomy";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { BookingModal } from "@/components/booking/BookingModal";
import { EquipmentDetailsModal } from "@/components/booking/EquipmentDetailsModal";
import { fetchEquipmentList } from "@/services/api";
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
  Sparkles
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

  // Client-side filtering and sorting
  const filteredItems = useMemo(() => {
    let items = [...equipmentList];

    if (maxPrice < 15000) {
      items = items.filter((e) => e.daily_rate <= maxPrice);
    }
    if (withDriverOnly) {
      items = items.filter((e) => e.with_driver);
    }
    if (availableOnly) {
      items = items.filter((e) => e.is_available);
    }

    if (sortBy === "price_asc") {
      items.sort((a, b) => a.daily_rate - b.daily_rate);
    } else if (sortBy === "price_desc") {
      items.sort((a, b) => b.daily_rate - a.daily_rate);
    } else if (sortBy === "rating") {
      items.sort((a, b) => b.average_rating - a.average_rating);
    } else if (sortBy === "distance") {
      items.sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0));
    }

    return items;
  }, [equipmentList, maxPrice, withDriverOnly, availableOnly, sortBy]);

  const resetFilters = () => {
    setCategoryFilter("all");
    setSearchQuery("");
    setMaxPrice(15000);
    setWithDriverOnly(false);
    setAvailableOnly(false);
    setSortBy("distance");
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
      {/* Top Page Header */}
      <div className="mb-6">
        <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
          {t("common", "nav.equipment")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Explore all verified tractors, harvesters, rotavators, and implements available across India.
        </p>
      </div>

      {/* Main Layout: Sidebar Filters + Catalog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <aside className="lg:col-span-1 space-y-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#14532d]" />
              <span>Filters (फ़िल्टर)</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] font-semibold text-amber-700 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t("common", "actions.reset")}</span>
            </button>
          </div>

          {/* Search Box in Sidebar */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Search by Keyword or Local Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tractor, ਟਰੈਕਟਰ, রोटावेटर..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#16a34a]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </div>
          </div>

          {/* Category Dropdown/Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Equipment Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#16a34a] bg-white font-medium"
            >
              <option value="all">All Categories (सभी श्रेणियां)</option>
              {EQUIPMENT_TAXONOMY.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.names[locale] || cat.name} ({cat.name})
                </option>
              ))}
            </select>
          </div>

          {/* Max Price Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-700">Max Daily Rate:</span>
              <span className="text-[#14532d]">{formatPrice(maxPrice)}/day</span>
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

          {/* Toggles */}
          <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
              <input
                type="checkbox"
                checked={withDriverOnly}
                onChange={(e) => setWithDriverOnly(e.target.checked)}
                className="rounded text-[#14532d] focus:ring-[#16a34a] w-4 h-4"
              />
              <span>{t("common", "badges.withDriver")}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="rounded text-[#14532d] focus:ring-[#16a34a] w-4 h-4"
              />
              <span>Available for Immediate Booking</span>
            </label>
          </div>
        </aside>

        {/* Results Area */}
        <section className="lg:col-span-3 space-y-4">
          {/* Controls Bar */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="font-bold text-slate-700">
              Showing <span className="text-[#14532d]">{formatNumber(filteredItems.length)}</span> machines available
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium focus:outline-hidden"
              >
                <option value="distance">Nearest First (दूरी के अनुसार)</option>
                <option value="price_asc">Price: Low to High (कम से ज्यादा)</option>
                <option value="price_desc">Price: High to Low (ज्यादा से कम)</option>
                <option value="rating">Highest Rated (रेटिंग)</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-slate-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <div className="w-56 max-w-full mx-auto mb-2">
                <AppImage
                  imageId="illustration-empty-search"
                  className="w-full"
                  showCredit={false}
                />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                No equipment matched your filters
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try widening your price range, searching in neighboring districts, or clearing category filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-[#14532d] text-white rounded-xl text-xs font-bold hover:bg-[#16a34a] transition-colors cursor-pointer"
              >
                {t("common", "actions.reset")}
              </button>
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
