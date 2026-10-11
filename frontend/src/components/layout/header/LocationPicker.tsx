"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useTranslation, LocationState } from "@/i18n/context";
import { MapPin, Search, Navigation, X, Check } from "lucide-react";

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

  // Handle GPS Auto-Detection (Permission-based)
  const handleUseGps = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoStatus(t("common", "location.detectFailed"));
      return;
    }

    setGeoStatus(t("common", "location.detecting"));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // In a real deployment this calls a reverse geocoding API or offline coordinate map
        // For demonstration we detect nearest hub or confirm the state/district
        let matchedState = "Punjab";
        let matchedDistrict = "Ludhiana";

        if (latitude > 28 && latitude < 31 && longitude > 74 && longitude < 77) {
          matchedState = "Punjab";
          matchedDistrict = "Ludhiana";
        } else if (latitude >= 18 && latitude <= 21) {
          matchedState = "Maharashtra";
          matchedDistrict = "Nashik";
        } else if (latitude >= 10 && latitude <= 14) {
          matchedState = "Tamil Nadu";
          matchedDistrict = "Thanjavur";
        }

        setSelectedLocation({
          state: matchedState,
          district: matchedDistrict
        });
        setGeoStatus(t("common", "location.locationDetected"));
        setTimeout(() => {
          onClose();
        }, 600);
      },
      () => {
        setGeoStatus(t("common", "location.detectFailed"));
      },
      { timeout: 8000 }
    );
  };

  const handleSelectDistrict = (district: string) => {
    setSelectedLocation({
      state: activeState,
      district
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/40 flex items-center justify-center p-4 select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
    >
      <div
        ref={modalRef}
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#e5e5df] overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#e5e5df] flex items-center justify-between bg-[#fafaf5]">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#14532d]" aria-hidden="true" />
            <h2 id="location-modal-title" className="font-bold text-base text-[#1e3a5f]">
              {t("common", "location.selectLocation")}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("common", "utility.closeMenu")}
            className="p-1 rounded-full text-[#78716c] hover:text-[#1e3a5f] hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Auto-Detect Button */}
        <div className="p-4 border-b border-[#e5e5df] bg-white">
          <button
            type="button"
            onClick={handleUseGps}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-[#f3f4f0] text-[#14532d] hover:bg-[#e5e5df] border border-[#14532d]/20 font-bold text-xs transition-colors"
          >
            <Navigation className="w-4 h-4 text-[#14532d]" aria-hidden="true" />
            <span>{t("common", "location.useGps")}</span>
          </button>
          {geoStatus && (
            <p className="mt-2 text-center text-xs font-semibold text-[#14532d]">
              {geoStatus}
            </p>
          )}
        </div>

        {/* Two Column Selector: State (Left) | District (Right) */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#e5e5df] bg-white">
          {/* State List Column */}
          <div className="flex flex-col h-72 sm:h-80 overflow-hidden">
            <div className="p-2 border-b border-[#e5e5df] bg-[#fafaf5]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#78716c] absolute start-2.5 top-2.5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  placeholder={t("common", "location.searchState")}
                  className="w-full ps-8 pe-2 py-1.5 text-xs bg-white rounded-lg border border-[#e5e5df] focus:outline-hidden focus:ring-1 focus:ring-[#14532d]"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredStates.map((st) => {
                const isCurrent = activeState === st;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setActiveState(st)}
                    className={`w-full text-start px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                      isCurrent
                        ? "bg-[#14532d] text-white font-bold"
                        : "text-[#1e3a5f] hover:bg-[#f3f4f0]"
                    }`}
                  >
                    <span>{st}</span>
                    {isCurrent && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* District List Column */}
          <div className="flex flex-col h-72 sm:h-80 overflow-hidden bg-white">
            <div className="p-2 border-b border-[#e5e5df] bg-[#fafaf5]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#78716c] absolute start-2.5 top-2.5" />
                <input
                  type="text"
                  value={districtSearch}
                  onChange={(e) => setDistrictSearch(e.target.value)}
                  placeholder={t("common", "location.searchDistrict")}
                  className="w-full ps-8 pe-2 py-1.5 text-xs bg-white rounded-lg border border-[#e5e5df] focus:outline-hidden focus:ring-1 focus:ring-[#14532d]"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredDistricts.map((dist) => {
                const isSelected =
                  selectedLocation?.state === activeState &&
                  selectedLocation?.district === dist;
                return (
                  <button
                    key={dist}
                    type="button"
                    onClick={() => handleSelectDistrict(dist)}
                    className={`w-full text-start px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                      isSelected
                        ? "bg-[#dcfce7] text-[#14532d] font-bold"
                        : "text-[#1e3a5f] hover:bg-[#fafaf5]"
                    }`}
                  >
                    <span>{dist}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#14532d]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
