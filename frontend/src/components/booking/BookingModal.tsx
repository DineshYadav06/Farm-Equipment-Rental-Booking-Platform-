"use client";

import React, { useState } from "react";
import { Equipment } from "@/types";
import {
  X,
  Calendar,
  Clock,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowRight,
  Download,
  Share2
} from "lucide-react";

interface BookingModalProps {
  equipment: Equipment | null;
  isOpen: boolean;
  onClose: () => void;
  lang?: "en" | "hi";
}

export const BookingModal: React.FC<BookingModalProps> = ({
  equipment,
  isOpen,
  onClose,
  lang = "en"
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [rentalType, setRentalType] = useState<"daily" | "hourly">("daily");
  const [durationDays, setDurationDays] = useState<number>(2);
  const [durationHours, setDurationHours] = useState<number>(8);
  const [startDate, setStartDate] = useState<string>("2026-10-06");
  const [deliveryType, setDeliveryType] = useState<"owner_delivery" | "self_pickup">("owner_delivery");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("Field #14, Village Samrala, Ludhiana");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | "cod">("upi");
  const [bookingId, setBookingId] = useState<string>("");

  if (!isOpen || !equipment) return null;

  const isHi = lang === "hi";

  // Calculations
  const rate = rentalType === "daily" ? equipment.daily_rate : equipment.hourly_rate;
  const duration = rentalType === "daily" ? durationDays : durationHours;
  const rentalAmount = rate * duration;
  const platformFee = 99;
  const securityDeposit = equipment.security_deposit || 2000;
  const totalAmount = rentalAmount + platformFee + securityDeposit;

  const handleNextStep = () => {
    if (step === 3) {
      // Simulate booking creation
      const generatedId = `FRH-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingId(generatedId);
      setStep(4);
    } else {
      setStep((prev) => (prev + 1) as any);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-800 text-white">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
              {isHi ? "बुकिंग प्रवाह" : "Direct Farm Booking Flow"}
            </span>
            <h3 className="text-lg font-extrabold text-white leading-tight">
              {step === 4
                ? isHi ? "बुकिंग पुष्टित!" : "Booking Confirmed!"
                : isHi ? "उपकरण किराए पर लें" : "Rent Farm Equipment"}
            </h3>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-700/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 4 && (
          <div className="px-6 pt-4 pb-2 bg-slate-50 border-b border-slate-200/80">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5">
              <span className={step >= 1 ? "text-emerald-800 font-extrabold" : ""}>
                1. {isHi ? "अवधि" : "Duration"}
              </span>
              <span className={step >= 2 ? "text-emerald-800 font-extrabold" : ""}>
                2. {isHi ? "स्थान" : "Delivery"}
              </span>
              <span className={step >= 3 ? "text-emerald-800 font-extrabold" : ""}>
                3. {isHi ? "भुगतान" : "Payment"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Equipment Summary Banner */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <img
              src={equipment.images[0]}
              alt={equipment.title}
              className="w-16 h-16 rounded-xl object-cover border border-emerald-300 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                {equipment.category} • {equipment.brand}
              </div>
              <h4 className="font-bold text-slate-900 text-sm truncate">
                {equipment.title}
              </h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                <span>{equipment.city}, {equipment.state}</span>
                <span>•</span>
                <span className="font-bold text-emerald-800">
                  ₹{rate}/{rentalType === "daily" ? (isHi ? "दिन" : "day") : (isHi ? "घंटा" : "hr")}
                </span>
              </div>
            </div>
          </div>

          {/* STEP 1: Rental Type & Dates */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isHi ? "किराया प्रकार चुनें" : "Select Rental Duration Type"}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRentalType("daily")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      rentalType === "daily"
                        ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        {isHi ? "दैनिक (प्रति दिन)" : "Full Day Rental"}
                      </span>
                      <Calendar className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="text-sm font-extrabold text-emerald-800 mt-1">
                      ₹{equipment.daily_rate}
                      <span className="text-[10px] font-medium text-slate-500">/day</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {isHi ? "बड़े खेतों हेतु सर्वश्रेष्ठ" : "Best for 2+ acres field work"}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRentalType("hourly")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      rentalType === "hourly"
                        ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        {isHi ? "प्रति घंटा" : "Hourly Rental"}
                      </span>
                      <Clock className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="text-sm font-extrabold text-emerald-800 mt-1">
                      ₹{equipment.hourly_rate}
                      <span className="text-[10px] font-medium text-slate-500">/hr</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {isHi ? "कम समय के कार्य हेतु" : "Best for quick task or puddling"}
                    </div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHi ? "कार्य शुरू होने की तारीख" : "Work Start Date"}
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {rentalType === "daily"
                      ? isHi ? "दिनों की संख्या" : "Number of Days"
                      : isHi ? "घंटों की संख्या" : "Number of Hours"}
                  </label>
                  {rentalType === "daily" ? (
                    <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setDurationDays(Math.max(1, durationDays - 1))}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 font-bold text-xs"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={durationDays}
                        onChange={(e) => setDurationDays(Number(e.target.value) || 1)}
                        className="w-full text-center text-xs font-bold py-2 focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setDurationDays(durationDays + 1)}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setDurationHours(Math.max(2, durationHours - 1))}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 font-bold text-xs"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="2"
                        max="24"
                        value={durationHours}
                        onChange={(e) => setDurationHours(Number(e.target.value) || 2)}
                        className="w-full text-center text-xs font-bold py-2 focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setDurationHours(durationHours + 1)}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Live Availability Notice */}
              <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {isHi
                    ? `मशीन ${startDate} पर उपलब्ध है। चालक और डीज़ल मार्गदर्शन शामिल है।`
                    : `Machine is 100% available for ${startDate}. Driver included.`}
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: Delivery & Farm Location */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isHi ? "मशीन प्राप्ति विकल्प" : "Equipment Delivery Method"}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType("owner_delivery")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryType === "owner_delivery"
                        ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        {isHi ? "खेत पर डिलीवरी" : "Owner Delivery"}
                      </span>
                      <Truck className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {isHi ? "मालिक मशीन आपके खेत तक लाएगा" : "Delivered to your field gate"}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType("self_pickup")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryType === "self_pickup"
                        ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        {isHi ? "स्वयं पिकअप" : "Self Pickup"}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {isHi ? "मालिक के बाड़े से स्वयं ले जाएं" : "Collect from owner garage"}
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHi ? "खेत / डिलीवरी का पता" : "Farm / Delivery Field Address"}
                </label>
                <textarea
                  rows={2}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. Near Tube-well #4, Samrala Road, Ludhiana"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              {/* Owner Contact Card */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase">
                  {isHi ? "मशीन मालिक संपर्क" : "Equipment Owner Contact"}
                </div>
                <div className="font-bold text-slate-800">{equipment.owner_name}</div>
                <div className="text-slate-600">{equipment.owner_phone} • {equipment.city}</div>
              </div>
            </div>
          )}

          {/* STEP 3: Transparent Pricing & Online Payment */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                <div className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-1.5 flex items-center justify-between">
                  <span>{isHi ? "पारदर्शी शुल्क विवरण" : "Transparent Price Summary"}</span>
                  <span className="text-emerald-700 text-[11px]">100% Escrow Protected</span>
                </div>

                <div className="flex justify-between text-xs text-slate-600">
                  <span>
                    {isHi ? "किराया शुल्क" : "Base Rental"} (
                    {rentalType === "daily" ? `${durationDays} days` : `${durationHours} hrs`} × ₹{rate})
                  </span>
                  <span className="font-semibold text-slate-900">₹{rentalAmount.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between text-xs text-slate-600">
                  <span>{isHi ? "प्लेटफॉर्म और बीमा शुल्क" : "Platform & Transit Protection"}</span>
                  <span className="font-semibold text-slate-900">₹{platformFee}</span>
                </div>

                <div className="flex justify-between text-xs text-slate-600">
                  <span>
                    {isHi ? "वापसी योग्य सुरक्षा जमा" : "Refundable Security Deposit"}
                  </span>
                  <span className="font-semibold text-amber-700">₹{securityDeposit.toLocaleString("en-IN")}</span>
                </div>

                <div className="border-t border-slate-200 pt-2 flex justify-between items-baseline">
                  <span className="text-xs font-extrabold text-slate-900">
                    {isHi ? "कुल देय राशि" : "Total Amount Payable"}
                  </span>
                  <span className="text-lg font-extrabold text-emerald-800">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="text-[10px] text-slate-500 italic">
                  * {isHi
                    ? "सुरक्षा जमा राशि मशीन काम पूरा होने के 2 घंटे के भीतर आपके खाते में लौटा दी जाती है।"
                    : "Security deposit is refunded immediately upon safe return of the equipment."}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isHi ? "भुगतान विकल्प चुनें" : "Select Payment Method"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                      paymentMethod === "upi"
                        ? "border-emerald-600 bg-emerald-50/70 text-emerald-800 ring-2 ring-emerald-600/20"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    UPI / Google Pay / PhonePe
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                      paymentMethod === "card"
                        ? "border-emerald-600 bg-emerald-50/70 text-emerald-800 ring-2 ring-emerald-600/20"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Debit / Kisan Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                      paymentMethod === "netbanking"
                        ? "border-emerald-600 bg-emerald-50/70 text-emerald-800 ring-2 ring-emerald-600/20"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Net Banking (All Indian Banks)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                      paymentMethod === "cod"
                        ? "border-emerald-600 bg-emerald-50/70 text-emerald-800 ring-2 ring-emerald-600/20"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Pay on Arrival at Field
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Booking Confirmation & Digital Receipt */}
          {step === 4 && (
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-extrabold text-slate-900">
                  {isHi ? "आपकी बुकिंग सफलतापूर्वक दर्ज हो गई!" : "Your Farm Equipment is Booked!"}
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  {isHi
                    ? "बुकिंग विवरण और ड्राइवर का नंबर आपके व्हाट्सएप और मोबाइल पर भेज दिया गया है।"
                    : "Booking details, live tracker, and owner contact have been sent to your phone via SMS & WhatsApp."}
                </p>
              </div>

              {/* Receipt Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Booking ID:</span>
                  <span className="font-extrabold text-emerald-800 font-mono text-sm">{bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Machine:</span>
                  <span className="font-bold text-slate-800">{equipment.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Owner:</span>
                  <span className="font-semibold text-slate-800">{equipment.owner_name} ({equipment.owner_phone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled Date:</span>
                  <span className="font-semibold text-slate-800">{startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Paid (Escrow):</span>
                  <span className="font-extrabold text-emerald-800">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => alert(`Receipt for ${bookingId} downloaded!`)}
                  className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 transition-colors"
                >
                  <Download className="w-4 h-4 text-emerald-700" />
                  <span>{isHi ? "रसीद डाउनलोड करें" : "Download Slip"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  {isHi ? "संपन्न" : "Back to Home"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 4 && (
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as any)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl transition-colors"
              >
                {isHi ? "← पीछे" : "← Back"}
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNextStep}
              className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-98"
            >
              <span>
                {step === 3
                  ? isHi ? "भुगतान करें और बुक करें" : `Pay ₹${totalAmount.toLocaleString("en-IN")} & Confirm`
                  : isHi ? "आगे बढ़ें →" : "Proceed →"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
