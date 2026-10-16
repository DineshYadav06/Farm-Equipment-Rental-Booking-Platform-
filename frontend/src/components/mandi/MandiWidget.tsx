"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchMandiPrices, MandiPriceItem, MandiResponse } from "@/services/mandi";
import { useTranslation } from "@/i18n/context";
import { SourceNote } from "@/components/ui/SourceNote";
import { TrendingUp, RefreshCw, ExternalLink, ArrowRight, MapPin, Store } from "lucide-react";

interface MandiWidgetProps {
  compact?: boolean;
}

export const MandiWidget: React.FC<MandiWidgetProps> = ({ compact = false }) => {
  const { formatNumber, formatPrice } = useTranslation();
  const [data, setData] = useState<MandiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchMandiPrices();
      setData(res);
    } catch (err: any) {
      setError(err?.message || "Failed to load mandi prices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrices();
  }, []);

  const records = data?.records || [];
  const filteredRecords = searchTerm
    ? records.filter(
        (r) =>
          r.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.state.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : records;

  const displayList = compact ? filteredRecords.slice(0, 4) : filteredRecords;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Daily Mandi Rates (APMC)
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Wholesale modal prices per quintal
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={loadPrices}
          disabled={loading}
          aria-label="Refresh mandi rates"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Filter if not compact */}
      {!compact && (
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search commodity (e.g. Wheat, Mustard, Paddy)..."
            className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#16a34a]"
          />
        </div>
      )}

      {/* Content */}
      {loading && records.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-400">
          Loading live APMC prices...
        </div>
      ) : error && records.length === 0 ? (
        <div className="py-4 text-center text-xs text-rose-500">
          Unable to fetch prices. Check connection.
        </div>
      ) : displayList.length === 0 ? (
        <div className="py-6 text-center text-xs text-slate-400">
          No matching mandi rates found.
        </div>
      ) : (
        <div className="space-y-2">
          {displayList.map((item, idx) => (
            <div
              key={`${item.commodity}-${item.market}-${idx}`}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                    {item.commodity}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate">
                    • {item.market}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{item.district}, {item.state}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs font-black text-[#14532d] dark:text-emerald-400">
                  ₹{item.modalPrice.toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] text-slate-400">
                  / quintal
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Bar: Source Note and Link */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-[11px]">
        <a
          href="https://agmarknet.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-[#16a34a] font-medium"
        >
          <span>Agmarknet Portal</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        {compact && (
          <Link
            href="/mandi"
            className="inline-flex items-center gap-1 font-bold text-[#14532d] dark:text-emerald-400 hover:underline"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
};
