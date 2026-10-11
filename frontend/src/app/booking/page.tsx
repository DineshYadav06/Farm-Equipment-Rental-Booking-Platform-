"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { fetchEquipmentById, fetchEquipmentList } from "@/services/api";
import { SourceNote } from "@/components/ui/SourceNote";
import { Equipment } from "@/types";
import {
  CheckCircle2,
  Calendar,
  Clock,
  UserCheck,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Printer,
  Sparkles
} from "lucide-react";

function BookingStepperContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eqId = searchParams.get("equipmentId") || "eq_tractor_01";

  const { t, formatPrice, formatNumber, formatDate, locale } = useTranslation();

  const [step, setStep] = useState(1);
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [durationDays, setDurationDays] = useState(2);
  const [withDriver, setWithDriver] = useState(true);
  const [deliveryType, setDeliveryType] = useState<"self_pickup" | "owner_delivery">("owner_delivery");
  const [deliveryAddress, setDeliveryAddress] = useState("Village Kalsian, Tehsil Jagraon, Ludhiana");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "kcc" | "netbanking">("upi");

  useEffect(() => {
    let mounted = true;
    fetchEquipmentById(eqId).then((data) => {
      if (mounted) {
        if (data) setEquipment(data);
        else {
          fetchEquipmentList().then((list) => {
            if (mounted && list[0]) setEquipment(list[0]);
            setLoading(false);
          });
        }
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [eqId]);

  if (loading || !equipment) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16 text-center text-xs text-slate-500">
        Loading booking details...
      </main>
    );
  }

  // Financial Calculations
  const baseRent = equipment.daily_rate * durationDays;
  const operatorFee = withDriver ? 400 * durationDays : 0;
  const deliveryFee = deliveryType === "owner_delivery" ? 350 : 0;
  const platformFee = Math.round(baseRent * 0.02); // 2% escrow handling fee
  const securityDeposit = equipment.security_deposit || 2000;
  const totalAmount = baseRent + operatorFee + deliveryFee + platformFee;

  const handleCompleteBooking = () => {
    const bookingId = `FRH-${Math.floor(100000 + Math.random() * 900000)}`;
    router.push(
      `/booking/receipt/${bookingId}?eqTitle=${encodeURIComponent(equipment.title)}&cat=${encodeURIComponent(equipment.category)}&total=${totalAmount}&days=${durationDays}&date=${startDate}&driver=${withDriver}`
    );
  };

  const stepsList = [
    "1. Equipment",
    "2. Schedule",
    "3. Driver & Dispatch",
    "4. Price Breakdown",
    "5. Escrow Payment"
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1">
      {/* Top Page Header */}
      <div className="mb-6 text-center">
        <div className="inline-block h-1 w-12 bg-[#d97706] mb-2 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a5f] tracking-tight">
          5-Step Agricultural Rental Booking (कृषि उपकरण बुकिंग)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Government-grade escrow booking with transparent fees and physical RC verification.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          {stepsList.map((label, idx) => (
            <span
              key={idx}
              className={`hidden sm:inline ${
                step === idx + 1 ? "text-[#14532d] font-black" : step > idx + 1 ? "text-emerald-600" : ""
              }`}
            >
              {label}
            </span>
          ))}
          <span className="sm:hidden text-[#14532d]">
            Step {step} of 5: {stepsList[step - 1]}
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#14532d] h-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Panels */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* STEP 1: Equipment Confirmation */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-2">
              Step 1: Confirm Selected Equipment (मशीन का चयन)
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-[#fafaf5] border border-slate-200">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                <img
                  src={equipment.images[0]}
                  alt={equipment.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#14532d] bg-[#dcfce7] px-2 py-0.5 rounded">
                  {equipment.category}
                </span>
                <h3 className="font-bold text-base text-slate-900">{equipment.title}</h3>
                <p className="text-xs text-slate-500">
                  Owner: {equipment.owner_name} • Location: {equipment.city}, {equipment.state}
                </p>
                <div className="text-xs font-bold text-[#14532d]">
                  Daily Base Rate: {formatPrice(equipment.daily_rate)}/day
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <span>Continue to Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Schedule & Duration */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-2">
              Step 2: Date & Rental Duration (कार्य की तिथि व अवधि)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Start Date of Field Work
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-[#16a34a]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Duration (Days): <span className="text-[#14532d]">{durationDays} Days</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={durationDays}
                  onChange={(e) => setDurationDays(parseInt(e.target.value, 10))}
                  className="w-full accent-[#14532d] mt-2"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <span>Continue to Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Driver & Delivery */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-2">
              Step 3: Operator & Field Delivery (चालक व ढुलाई विकल्प)
            </h2>

            {/* Operator Checkbox */}
            <div className="p-4 rounded-2xl bg-[#fafaf5] border border-slate-200 text-xs">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={withDriver}
                  onChange={(e) => setWithDriver(e.target.checked)}
                  className="w-5 h-5 text-[#14532d] rounded"
                />
                <div>
                  <span className="font-bold text-slate-900 block">
                    Certified Machine Operator Required (+₹400/day)
                  </span>
                  <span className="text-slate-500">
                    Experienced driver handles fueling, calibration, and optimal field operation.
                  </span>
                </div>
              </label>
            </div>

            {/* Delivery Radio Options */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-700 block">Delivery Method:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between ${
                    deliveryType === "owner_delivery"
                      ? "border-[#16a34a] bg-[#dcfce7]/40 ring-1 ring-[#16a34a]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryType === "owner_delivery"}
                      onChange={() => setDeliveryType("owner_delivery")}
                      className="text-[#14532d]"
                    />
                    <span className="font-bold text-slate-900">Owner Delivery to Farm (+₹350)</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-2">
                    Delivered directly to your field coordinate.
                  </span>
                </label>

                <label
                  className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between ${
                    deliveryType === "self_pickup"
                      ? "border-[#16a34a] bg-[#dcfce7]/40 ring-1 ring-[#16a34a]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryType === "self_pickup"}
                      onChange={() => setDeliveryType("self_pickup")}
                      className="text-[#14532d]"
                    />
                    <span className="font-bold text-slate-900">Self Pickup from Yard (₹0)</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-2">
                    Pickup equipment from owner&apos;s yard in {equipment.city}.
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <span>View Price Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Transparent Price Breakdown */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-2">
              Step 4: Transparent Price Breakdown (पारदर्शी मूल्य विवरण)
            </h2>

            <div className="p-5 rounded-2xl bg-[#fafaf5] border border-slate-200 space-y-2.5 text-xs">
              <div className="flex justify-between py-1">
                <span className="text-slate-600">
                  Base Rental ({durationDays} days @ {formatPrice(equipment.daily_rate)}/day):
                </span>
                <span className="font-bold text-slate-900">{formatPrice(baseRent)}</span>
              </div>

              {withDriver && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">Certified Operator Fee ({durationDays} days):</span>
                  <span className="font-bold text-slate-900">{formatPrice(operatorFee)}</span>
                </div>
              )}

              {deliveryFee > 0 && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">Field Transport & Delivery:</span>
                  <span className="font-bold text-slate-900">{formatPrice(deliveryFee)}</span>
                </div>
              )}

              <div className="flex justify-between py-1">
                <span className="text-slate-600">Escrow Trust & Insurance (2%):</span>
                <span className="font-bold text-slate-900">{formatPrice(platformFee)}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-[#14532d]">
                <span>Total Payable Advance (Held in Escrow):</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>

              <div className="text-[11px] text-slate-500 pt-1">
                Refundable Security Deposit: {formatPrice(securityDeposit)} (Inspected and settled upon return).
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(5)}
                className="px-6 py-2.5 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <span>Proceed to Escrow Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Payment & Escrow Confirmation */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-2">
              Step 5: Escrow Payment & Final Confirmation (सुरक्षित भुगतान)
            </h2>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#14532d] shrink-0 mt-0.5" />
              <div className="text-emerald-900">
                <span className="font-black block">100% Escrow Protection Active</span>
                Your money is kept securely in our trust account and is only released to the owner after work is completed satisfactorily on your farm.
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-700 block">Select Payment Channel:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-3 rounded-2xl border text-center font-bold transition-all ${
                    paymentMethod === "upi"
                      ? "border-[#14532d] bg-[#dcfce7] text-[#14532d]"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  UPI (GPay / PhonePe / BHIM)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("kcc")}
                  className={`p-3 rounded-2xl border text-center font-bold transition-all ${
                    paymentMethod === "kcc"
                      ? "border-[#14532d] bg-[#dcfce7] text-[#14532d]"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  Kisan Credit Card (KCC)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`p-3 rounded-2xl border text-center font-bold transition-all ${
                    paymentMethod === "netbanking"
                      ? "border-[#14532d] bg-[#dcfce7] text-[#14532d]"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  Net Banking / Debit Card
                </button>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={() => setStep(4)}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleCompleteBooking}
                className="px-7 py-3 bg-[#14532d] hover:bg-[#16a34a] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Confirm & Pay {formatPrice(totalAmount)}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading booking stepper...</div>}>
      <BookingStepperContent />
    </Suspense>
  );
}
