"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { compareService } from "@/services/compare";
import { fetchEquipmentById } from "@/services/api";
import { Equipment } from "@/types";
import { useTranslation } from "@/i18n/context";
import { Scale, X, ArrowRight } from "lucide-react";

export const CompareBar: React.FC = () => {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [items, setItems] = useState<Equipment[]>([]);
  const { t } = useTranslation();

  const loadItems = async () => {
    const ids = compareService.getCompareIds();
    setCompareIds(ids);

    if (ids.length === 0) {
      setItems([]);
      return;
    }

    const fetched: Equipment[] = [];
    for (const id of ids) {
      const eq = await fetchEquipmentById(id);
      if (eq) fetched.push(eq);
    }
    setItems(fetched);
  };

  useEffect(() => {
    loadItems();

    const handleCompareChange = () => {
      loadItems();
    };

    window.addEventListener("farmrenthub_compare_changed", handleCompareChange);
    return () => {
      window.removeEventListener("farmrenthub_compare_changed", handleCompareChange);
    };
  }, []);

  if (compareIds.length === 0) return null;

  const compareUrl = `/equipment/compare?ids=${compareIds.join(",")}`;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#14532d] dark:text-emerald-400 shrink-0">
          <Scale className="w-5 h-5" />
        </div>

        <div className="min-w-0">
          <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>Compare Machines</span>
            <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded-full">
              {compareIds.length}/3
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1 overflow-x-auto py-0.5 max-w-xs sm:max-w-md">
            {items.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md truncate max-w-[120px]"
              >
                <span className="truncate">{item.title}</span>
                <button
                  type="button"
                  onClick={() => compareService.removeCompare(item.id)}
                  aria-label="Remove from compare"
                  className="hover:text-rose-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => compareService.clearCompare()}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 px-2.5 py-2 rounded-xl transition-colors"
        >
          Clear
        </button>

        <Link
          href={compareUrl}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#14532d] hover:bg-[#16a34a] px-3.5 py-2 rounded-xl shadow-xs transition-colors"
        >
          <span>Compare ({compareIds.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
