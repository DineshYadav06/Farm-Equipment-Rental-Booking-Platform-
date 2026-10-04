import React from "react";
import { Logo } from "@/components/ui/Logo";
import {
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  HeartHandshake,
  CheckCircle2
} from "lucide-react";

interface FooterProps {
  lang?: "en" | "hi";
  onScrollToSection?: (sectionId: string) => void;
  onOpenListEquipment?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang = "en",
  onScrollToSection,
  onOpenListEquipment
}) => {
  const isHi = lang === "hi";

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 3 Trust Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800/80">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">
                {isHi ? "100% सत्यापित उपकरण व मालिक" : "100% Verified Fleet & Owners"}
              </h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isHi
                  ? "हर ट्रैक्टर और हार्वेस्टर की आरसी, बीमा और कार्य क्षमता का निरीक्षण किया जाता है।"
                  : "All machinery documents, RC, and mechanical health are checked before listing."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center shrink-0 border border-amber-800/40">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">
                {isHi ? "सुरक्षित एस्क्रो भुगतान" : "Escrow Payment Guarantee"}
              </h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isHi
                  ? "मशीन द्वारा खेत का काम संतोषजनक पूरा होने तक आपका पैसा सुरक्षित एस्क्रो में रहता है।"
                  : "Rental payment is released to equipment owner only after work is satisfactorily completed."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800/40">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">
                {isHi ? "24x7 किसान हेल्पलाइन" : "24x7 Kisan Support Desk"}
              </h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isHi
                  ? "टोल-फ्री नंबर 1800-327-6482 पर सीधे अपनी क्षेत्रीय भाषा में कृषि विशेषज्ञों से बात करें।"
                  : "Toll-free 1800-327-6482 helpline dedicated to farm machinery assistance in regional tongues."}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12">
          {/* Col 1: Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="bg-white/95 p-2 rounded-2xl inline-block">
              <Logo showTagline={false} size="md" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {isHi
                ? "फार्मरेंटहब (FarmRentHub) भारत का अग्रणी कृषि उपकरण साझाकरण मंच है, जो किसानों को किफायती दरों पर आधुनिक कृषि मशीनरी उपलब्ध कराता है।"
                : "FarmRentHub connects farmers with agricultural equipment owners to discover, compare, and rent modern machinery at transparent hourly and daily rates."}
            </p>
            <div className="text-xs text-slate-500 font-medium">
              Head Office: Agritech Innovation Park, Sector 62, Punjab & Haryana Hub
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h6 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              {isHi ? "नेविगेशन" : "Navigation"}
            </h6>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onScrollToSection && onScrollToSection("hero")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection && onScrollToSection("equipment-section")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Find Equipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection && onScrollToSection("categories-section")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection && onScrollToSection("how-it-works")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenListEquipment}
                  className="hover:text-emerald-400 transition-colors text-amber-300 font-bold"
                >
                  + List Equipment
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Machinery */}
          <div className="space-y-3">
            <h6 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              {isHi ? "प्रमुख उपकरण" : "Equipment"}
            </h6>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Tractors (30HP–75HP)</li>
              <li>Combine Harvesters</li>
              <li>Rotavators & Tillers</li>
              <li>Happy Seeders & Drills</li>
              <li>Boom Sprayers</li>
              <li>Diesel Irrigation Pumps</li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="space-y-3">
            <h6 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              {isHi ? "नीति व सुरक्षा" : "Legal & Safety"}
            </h6>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-emerald-400 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-emerald-400 cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-emerald-400 cursor-pointer">Rental & Transit Policy</li>
              <li className="hover:text-emerald-400 cursor-pointer">Escrow & Refund Rules</li>
              <li className="hover:text-emerald-400 cursor-pointer">Owner Compensation Plan</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} FarmRentHub. All rights reserved. “Rent the Right Equipment. Grow with Ease.”
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
            <span>Made with pride for Indian Farmers & Agriculture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
