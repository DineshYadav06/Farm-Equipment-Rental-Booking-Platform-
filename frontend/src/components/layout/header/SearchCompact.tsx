"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { Search, Mic, X } from "lucide-react";

export const SearchCompact: React.FC = () => {
  const { t, localeMeta } = useTranslation();
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

  // Outside click to collapse
  useEffect(() => {
    if (!isExpanded) return;

    const handleOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/equipment?q=${encodeURIComponent(query.trim())}`);
      setIsExpanded(false);
    }
  };

  const handleVoiceSearch = () => {
    if (typeof window === "undefined") return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const windowObj = window as any;
    const SpeechRecognition =
      windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(t("common", "search.voiceError"));
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = localeMeta?.speechLang || "hi-IN";
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setQuery(transcript);
          router.push(`/equipment?q=${encodeURIComponent(transcript)}`);
          setIsExpanded(false);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <div ref={containerRef} className="relative flex items-center">
      {!isExpanded ? (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          aria-label={t("common", "search.openSearch")}
          className="p-2 rounded-xl text-[#1e3a5f] hover:bg-[#f3f4f0] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#14532d] transition-colors"
        >
          <Search className="w-5 h-5 text-[#1e3a5f]" aria-hidden="true" />
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-1.5 bg-white border border-[#e5e5df] rounded-2xl px-2.5 py-1 shadow-md animate-in fade-in zoom-in-95 duration-150"
        >
          <Search className="w-4 h-4 text-[#14532d] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("common", "search.searchPlaceholder")}
            className="w-44 sm:w-60 text-xs font-medium text-[#1e3a5f] focus:outline-hidden"
          />

          {/* Voice Mic */}
          <button
            type="button"
            onClick={handleVoiceSearch}
            aria-label={t("common", "actions.voiceSearch")}
            className={`p-1 rounded-full transition-colors ${
              isListening
                ? "bg-red-600 text-white animate-pulse"
                : "text-[#78716c] hover:text-[#14532d] hover:bg-[#f3f4f0]"
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            aria-label={t("common", "search.closeSearch")}
            className="p-1 rounded-full text-[#78716c] hover:text-[#1e3a5f] hover:bg-[#f3f4f0]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );
};
