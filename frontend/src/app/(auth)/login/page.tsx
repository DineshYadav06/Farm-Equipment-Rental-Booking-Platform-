"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ShieldCheck, Phone, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"farmer" | "owner">("farmer");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Logged in as ${role}: ${phoneOrEmail}`);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <Logo showTagline={true} size="lg" />
        </Link>
        <h2 className="mt-6 text-2xl font-black text-slate-900 tracking-tight">
          Sign In to Your Account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Access nearby farm equipment bookings, earnings, and fleet dispatch
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

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder="+91 98765 43210 or email"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <a href="#" className="text-[11px] font-bold text-emerald-700 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-colors mt-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-emerald-700 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
