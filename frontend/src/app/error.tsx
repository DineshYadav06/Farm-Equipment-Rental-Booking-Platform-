"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("FarmRentHub client error:", error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-72 max-w-full mb-4">
        <AppImage
          imageId="illustration-error"
          className="w-full"
          showCredit={false}
        />
      </div>

      <div className="inline-block h-1 w-12 bg-red-600 mb-3 rounded-full" />
      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
        कुछ गड़बड़ हुई / An Error Occurred
      </h1>
      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
        Our farm telecommunications server encountered a momentary obstacle. Please retry or return to the main dashboard.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again (पुनः प्रयास करें)</span>
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 flex items-center gap-2 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Go to Home</span>
        </Link>
      </div>
    </main>
  );
}
