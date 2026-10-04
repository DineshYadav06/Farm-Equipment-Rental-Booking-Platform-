"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const [role, setRole] = useState<"farmer" | "owner">("farmer");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Ludhiana");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Account created for ${name} as ${role}!`);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <Logo showTagline={true} size="lg" />
        </Link>
        <h2 className="mt-6 text-2xl font-black text-slate-900 tracking-tight">
          Join FarmRentHub Network
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Connect with 12,000+ verified farmers and machinery providers
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-slate-200 sm:px-10">
          {/* Role Selector Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 border border-slate-200">
            <button
              type="button"
              onClick={() => setRole("farmer")}
              className={`w-1/2 py-2 text-xs font-bold rounded-xl transition-all ${
                role === "farmer"
                  ? "bg-white text-emerald-800 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              I am a Farmer
            </button>
            <button
              type="button"
              onClick={() => setRole("owner")}
              className={`w-1/2 py-2 text-xs font-bold rounded-xl transition-all ${
                role === "owner"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              I am an Equipment Owner
            </button>
          </div>

          <form className="space-y-3.5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar Patel"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number (for SMS & OTP)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Village / District / Tehsil
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Ludhiana, Punjab"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-2 pt-1 text-slate-500 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>We never share your farm data or mobile with third parties.</span>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-colors mt-2"
            >
              <span>Register Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-emerald-700 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
