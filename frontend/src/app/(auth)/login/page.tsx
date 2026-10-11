"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { Logo } from "@/components/ui/Logo";
import { ShieldCheck, Phone, Lock, ArrowRight, CheckCircle2, KeyRound } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { t, locale, localeMeta } = useTranslation();

  const [role, setRole] = useState<"farmer" | "owner">("farmer");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login redirect based on role
    if (role === "owner") {
      router.push("/owner/dashboard");
    } else {
      router.push("/farmer/dashboard");
    }
  };

  return (
    <main className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <Logo variant="horizontal" size="lg" tagline={localeMeta.tagline} />
        </Link>
        <h1 className="mt-6 text-2xl font-black text-slate-900 tracking-tight">
          Sign In to Your Account (खाते में प्रवेश करें)
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Access verified farm equipment bookings, fleet dispatch, and escrow earnings
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-slate-200 sm:px-10">
          {/* Farmer vs Owner Role Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 border border-slate-200">
            <button
              type="button"
              onClick={() => setRole("farmer")}
              className={`w-1/2 py-2.5 text-xs font-bold rounded-xl transition-all ${
                role === "farmer"
                  ? "bg-[#14532d] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              किसान (Farmer)
            </button>
            <button
              type="button"
              onClick={() => setRole("owner")}
              className={`w-1/2 py-2.5 text-xs font-bold rounded-xl transition-all ${
                role === "owner"
                  ? "bg-[#14532d] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              उपकरण मालिक (Owner)
            </button>
          </div>

          {!otpSent ? (
            /* Phase 1: Enter Phone Number */
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (मोबाइल नंबर)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-xs font-bold text-slate-500">+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="98765 43210"
                    className="w-full pl-12 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#16a34a] focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-colors mt-2"
              >
                <span>Send OTP (ओटीपी भेजें)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Phase 2: Enter OTP */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium">
                OTP sent to +91 {phoneNumber}. (Demo: enter any 6 digits).
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Enter 6-Digit OTP (ओटीपी दर्ज करें)
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="123456"
                  className="w-full px-3 py-2.5 text-center tracking-widest text-base font-black border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#16a34a] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-colors mt-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify & Login (सत्यापित करें)</span>
              </button>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-center text-[11px] text-[#14532d] font-bold hover:underline"
              >
                Change Phone Number
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-[#14532d] hover:underline">
              Register now (पंजीकरण करें)
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
