"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useTranslation, LocationState } from "@/i18n/context";
import {
  findNearestLocation,
  saveStoredLocation,
  clearStoredLocation
} from "@/services/location";
import { MapPin, Search, Navigation, X, Check, Trash2 } from "lucide-react";

export const INDIAN_STATES_DISTRICTS: Record<string, string[]> = {
  Punjab: [
    "Ludhiana",
    "Patiala",
    "Amritsar",
    "Jalandhar",
    "Bathinda",
    "Sangrur",
    "Ferozepur",
    "Hoshiarpur",
    "Gurdaspur",
    "Moga"
  ],
  Haryana: [
    "Karnal",
    "Ambala",
    "Hisar",
    "Kurukshetra",
    "Rohtak",
    "Panipat",
    "Sonipat",
    "Sirsa",
    "Fatehabad",
    "Yamunanagar"
  ],
  "Uttar Pradesh": [
    "Meerut",
    "Muzaffarnagar",
    "Varanasi",
    "Aligarh",
    "Mathura",
    "Agra",
    "Bareilly",
    "Gorakhpur",
    "Lucknow",
    "Kanpur"
  ],
  Maharashtra: [
    "Nashik",
    "Kolhapur",
    "Pune",
    "Aurangabad",
    "Nagpur",
    "Solapur",
    "Ahmednagar",
    "Satara",
    "Sangli",
    "Amravati"
  ],
  Gujarat: [
    "Rajkot",
    "Surat",
    "Ahmedabad",
    "Vadodara",
    "Bhavnagar",
    "Junagadh",
    "Mehsana",
    "Anand",
    "Amreli",
    "Kheda"
  ],
  Rajasthan: [
    "Jaipur",
    "Kota",
    "Ganganagar",
    "Hanumangarh",
    "Jodhpur",
    "Udaipur",
    "Alwar",
    "Bharatpur",
    "Bikaner",
    "Sikar"
  ],
  "Madhya Pradesh": [
    "Indore",
    "Bhopal",
    "Ujjain",
    "Jabalpur",
    "Gwalior",
    "Hoshangabad",
    "Sehore",
    "Dewas",
    "Vidisha",
    "Khargone"
  ],
  Bihar: [
    "Patna",
    "Gaya",
    "Muzaffarpur",
    "Bhagalpur",
    "Purnia",
    "Samastipur",
    "Darbhanga",
    "Rohtas",
    "Begusarai",
    "Nalanda"
  ],
  "West Bengal": [
    "Burdwan",
    "Hooghly",
    "Nadia",
    "Murshidabad",
    "Midnapore",
    "Birbhum",
    "Malda",
    "North 24 Parganas"
  ],
  "Tamil Nadu": [
    "Thanjavur",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Erode",
    "Tirunelveli",
    "Dindigul"
  ],
  Karnataka: [
    "Belagavi",
    "Mysuru",
    "Mandya",
    "Dharwad",
    "Shimoga",
    "Tumakuru",
    "Hassan",
    "Davangere"
  ],
  "Andhra Pradesh": [
    "Guntur",
    "Krishna",
    "East Godavari",
    "West Godavari",
    "Kurnool",
    "Anantapur",
    "Chittoor"
  ],
  Telangana: [
    "Warangal",
    "Karimnagar",
    "Nizamabad",
    "Khammam",
    "Nalgonda",
    "Mahabubnagar",
    "Rangareddy"
  ],
  Kerala: [
    "Palakkad",
    "Thrissur",
    "Alappuzha",
    "Kottayam",
    "Kozhikode",
    "Wayanad",
    "Ernakulam"
  ],
  Odisha: [
    "Cuttack",
    "Bargarh",
    "Sambalpur",
    "Ganjam",
    "Balasore",
    "Bhadrak",
    "Puri"
  ],
  Assam: [
    "Kamrup",
    "Nagaon",
    "Sonitpur",
    "Dibrugarh",
    "Cachar",
    "Barpeta",
    "Jorhat"
  ]
};

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  isOpen,
  onClose
}) => {
  const { t, selectedLocation, setSelectedLocation } = useTranslation();

  const [activeState, setActiveState] = useState<string>(
    selectedLocation?.state || "Punjab"
  );
  const [stateSearch, setStateSearch] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");
  const [geoStatus, setGeoStatus] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setActiveState(selectedLocation?.state || "Punjab");
      setStateSearch("");
      setDistrictSearch("");
      setGeoStatus(null);
    }
  }

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const allStates = useMemo(() => Object.keys(INDIAN_STATES_DISTRICTS), []);

  const filteredStates = useMemo(() => {
    if (!stateSearch.trim()) return allStates;
    return allStates.filter((s) =>
      s.toLowerCase().includes(stateSearch.toLowerCase())
    );
  }, [allStates, stateSearch]);

  const availableDistricts = useMemo(() => {
    return INDIAN_STATES_DISTRICTS[activeState] || [];
  }, [activeState]);

  const filteredDistricts = useMemo(() => {
    if (!districtSearch.trim()) return availableDistricts;
    return availableDistricts.filter((d) =>
      d.toLowerCase().includes(districtSearch.toLowerCase())
    );
  }, [availableDistricts, districtSearch]);

  // Handle GPS Auto-Detection with offline centroids reverse geocoding
  const handleUseGps = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoStatus(t("common", "location.detectFailed") || "Geolocation unsupported");
      return;
    }

    setGeoStatus(t("common", "location.detecting") || "Locating...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const result = findNearestLocation(latitude, longitude);

        if (!result) {
          setGeoStatus(
            t("common", "location.outOfIndia") ||
              "Location outside India. Please select manually."
          );
          return;
        }

        const stored = {
          stateCode: result.stateCode,
          state: result.state,
          districtCode: result.districtCode,
          district: result.district,
          blockCode: result.blockCode,
          block: result.block,
          lat2: result.lat2,
          lng2: result.lng2
        };

        saveStoredLocation(stored);
        setSelectedLocation(stored);
        setGeoStatus(t("common", "location.locationDetected") || "Location found!");
        setTimeout(() => {
          onClose();
        }, 600);
      },
      () => {
        setGeoStatus(t("common", "location.detectFailed") || "Permission denied or unavailable");
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  const handleSelectDistrict = (district: string) => {
    const loc: LocationState = {
      state: activeState,
      district
    };
    setSelectedLocation(loc);
    onClose();
  };

  const handleForget = () => {
    clearStoredLocation();
    setSelectedLocation({
      state: "Punjab",
      district: "Ludhiana"
    });
    setGeoStatus(t("common", "location.forgotten") || "Location cleared.");
    setTimeout(() => {
      onClose();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 select-none backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
    >
      <div
        ref={modalRef}
        className="w-full max-w-xl bg-white dark:bg-[#1a211b] rounded-3xl shadow-2xl border border-slate-200 dark:border-[#2e382f] overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150 text-slate-800 dark:text-slate-200"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#151b16]">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <h2 id="location-modal-title" className="font-bold text-base text-slate-900 dark:text-slate-100">
              {t("common", "location.selectLocation") || "Choose Location"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("common", "utility.close") || "Close"}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Auto-Detect Button */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a211b]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUseGps}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60 font-bold text-xs transition-colors"
            >
              <Navigation className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
              <span>{t("common", "location.useGps") || "Use My Current Location"}</span>
            </button>

            <button
              type="button"
              onClick={handleForget}
              title={t("common", "location.forget") || "Forget my location"}
              className="px-3 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-500 hover:text-red-600 dark:hover:text-red-400 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t("common", "location.forget") || "Forget"}</span>
            </button>
          </div>

          {geoStatus && (
            <p className="mt-2 text-center text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {geoStatus}
            </p>
          )}
        </div>

        {/* Two-column layout: States on Left, Districts on Right */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 min-h-0 bg-white dark:bg-[#1a211b]">
          {/* Column 1: States */}
          <div className="flex flex-col h-full overflow-hidden bg-slate-50/50 dark:bg-[#141c16]/50">
            <div className="p-3 border-b border-slate-200 dark:border-slate-800">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  placeholder={t("common", "location.searchState") || "Search State..."}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredStates.map((state) => {
                const isSelected = activeState === state;
                return (
                  <button
                    key={state}
                    type="button"
                    onClick={() => setActiveState(state)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-emerald-700 text-white shadow-xs"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{state}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Districts in Selected State */}
          <div className="flex flex-col h-full overflow-hidden">
            <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a211b]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={districtSearch}
                  onChange={(e) => setDistrictSearch(e.target.value)}
                  placeholder={`${t("common", "location.searchDistrict") || "Search District in"} ${activeState}...`}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredDistricts.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  {t("common", "location.noDistricts") || "No districts found."}
                </div>
              ) : (
                filteredDistricts.map((district) => {
                  const isCurrent =
                    selectedLocation?.state === activeState &&
                    selectedLocation?.district === district;
                  return (
                    <button
                      key={district}
                      type="button"
                      onClick={() => handleSelectDistrict(district)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                        isCurrent
                          ? "bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span>{district}</span>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
