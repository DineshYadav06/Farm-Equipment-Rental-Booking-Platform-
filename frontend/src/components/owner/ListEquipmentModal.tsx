"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, Upload, AlertCircle } from "lucide-react";
import { EquipmentCategory } from "@/types";

interface ListEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEquipmentAdded?: (newEq: any) => void;
  lang?: "en" | "hi";
}

export const ListEquipmentModal: React.FC<ListEquipmentModalProps> = ({
  isOpen,
  onClose,
  onEquipmentAdded,
  lang = "en"
}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<EquipmentCategory>("Tractor");
  const [brand, setBrand] = useState("Mahindra");
  const [model, setModel] = useState("");
  const [dailyRate, setDailyRate] = useState<number>(3000);
  const [hourlyRate, setHourlyRate] = useState<number>(450);
  const [city, setCity] = useState("Ludhiana");
  const [withDriver, setWithDriver] = useState(true);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const isHi = lang === "hi";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMachine = {
      id: `eq_user_${Date.now()}`,
      owner_id: "usr_owner_01",
      owner_name: "Gurpreet Singh Gill",
      owner_phone: "+91 98765 43210",
      title: title || `${brand} ${category}`,
      category,
      brand,
      model: model || "Standard",
      year: 2023,
      hp: category === "Tractor" ? 50 : undefined,
      fuel_type: "Diesel",
      description: description || "Maintained in excellent condition, ready for immediate field dispatch.",
      images: [
        "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1c?auto=format&fit=crop&w=800&q=80"
      ],
      hourly_rate: hourlyRate,
      daily_rate: dailyRate,
      security_deposit: 2000,
      with_driver: withDriver,
      city,
      state: "Punjab",
      pincode: "141001",
      latitude: 30.901,
      longitude: 75.8573,
      is_available: true,
      condition: "Excellent",
      average_rating: 5.0,
      total_reviews: 0,
      total_bookings: 0,
      distance_km: 1.5
    };

    if (onEquipmentAdded) onEquipmentAdded(newMachine);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-800 text-white">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
              {isHi ? "मालिक पोर्टल" : "Equipment Owner Onboarding"}
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              {isHi ? "अपनी कृषि मशीन लिस्ट करें" : "List Your Farming Equipment"}
            </h3>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-700/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-extrabold text-slate-900">
              {isHi ? "मशीन सफलतापूर्वक लिस्ट हो गई!" : "Machine Listed Successfully!"}
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              {isHi
                ? "आपकी मशीन अब नजदीकी किसानों को लाइव दिखाई दे रही है। नया बुकिंग अनुरोध आने पर आपको एसएमएस व ऐप सूचना मिलेगी।"
                : "Your equipment is now live and discoverable by farmers within a 50 km radius. You will receive SMS alerts for new rental requests."}
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              {isHi ? "डैशबोर्ड देखें" : "View Live in Marketplace"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isHi ? "मशीन का शीर्षक / नाम" : "Equipment Title"}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Swaraj 855 FE 52 HP Tractor"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHi ? "श्रेणी" : "Category"}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as EquipmentCategory)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                >
                  <option value="Tractor">Tractor</option>
                  <option value="Harvester">Harvester</option>
                  <option value="Rotavator">Rotavator</option>
                  <option value="Seed Drill">Seed Drill</option>
                  <option value="Sprayer">Sprayer</option>
                  <option value="Irrigation Equipment">Irrigation Equipment</option>
                  <option value="Thresher">Thresher</option>
                  <option value="Cultivator">Cultivator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHi ? "ब्रांड / कंपनी" : "Brand"}
                </label>
                <input
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Mahindra, John Deere, Shaktiman"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHi ? "दैनिक किराया दर (₹/दिन)" : "Daily Rate (₹/day)"}
                </label>
                <input
                  type="number"
                  required
                  min={100}
                  value={dailyRate}
                  onChange={(e) => setDailyRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHi ? "प्रति घंटा दर (₹/घंटा)" : "Hourly Rate (₹/hr)"}
                </label>
                <input
                  type="number"
                  required
                  min={50}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHi ? "तहसील / शहर" : "City / Block"}
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHi ? "चालक / ऑपरेटर" : "Operator Option"}
                </label>
                <select
                  value={withDriver ? "yes" : "no"}
                  onChange={(e) => setWithDriver(e.target.value === "yes")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                >
                  <option value="yes">With Experienced Driver</option>
                  <option value="no">Self-Drive Machine Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isHi ? "संक्षिप्त विवरण" : "Short Description"}
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mention implements included, condition, or special terms..."
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                {isHi
                  ? "सभी लिस्टिंग पर सुरक्षा बीमा एवं एस्क्रो भुगतान सुरक्षा लागू होती है।"
                  : "All listed machines are covered under FarmRentHub Transit & Escrow Protection."}
              </span>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all"
              >
                {isHi ? "मशीन लिस्ट करें" : "Publish Machinery"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
