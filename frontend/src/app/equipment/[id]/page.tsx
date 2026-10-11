"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { fetchEquipmentById, fetchReviews } from "@/services/api";
import { translateText } from "@/services/translate";
import { BookingModal } from "@/components/booking/BookingModal";
import { SourceNote } from "@/components/ui/SourceNote";
import { Equipment, Review } from "@/types";
import {
  Star,
  MapPin,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  UserCheck,
  Languages,
  Fuel,
  Gauge,
  Phone,
  AlertCircle
} from "lucide-react";

export default function EquipmentDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { t, formatPrice, formatNumber, formatDate, locale } = useTranslation();

  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Booking Modal
  const [bookingOpen, setBookingOpen] = useState(false);

  // Translated reviews map: reviewId -> translatedText
  const [translatedReviews, setTranslatedReviews] = useState<Record<string, string>>({});
  const [translatingId, setTranslatingId] = useState<string | null>(null);

  // Price calculator states
  const [calcHours, setCalcHours] = useState(8);
  const [calcWithDriver, setCalcWithDriver] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchEquipmentById(id), fetchReviews(id)]).then(([eq, revs]) => {
      if (mounted) {
        setEquipment(eq);
        setReviews(revs);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleTranslateReview = async (review: Review) => {
    setTranslatingId(review.id);
    try {
      const res = await translateText({
        text: review.comment,
        sourceLang: "en",
        targetLang: locale
      });
      setTranslatedReviews((prev) => ({
        ...prev,
        [review.id]: res.translatedText
      }));
    } finally {
      setTranslatingId(null);
    }
  };

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-12 text-center text-xs text-slate-500">
        Loading equipment details...
      </main>
    );
  }

  if (!equipment) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-12 text-center space-y-3">
        <h2 className="text-xl font-bold text-slate-800">Equipment not found</h2>
        <Link href="/equipment" className="text-xs text-[#14532d] underline font-bold">
          Return to Equipment Catalog
        </Link>
      </main>
    );
  }

  const calculatedTotal =
    calcHours * equipment.hourly_rate + (calcWithDriver && !equipment.with_driver ? 500 : 0);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full select-none flex-1">
      {/* Back to Catalog Breadcrumb */}
      <Link
        href="/equipment"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14532d] hover:underline mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Equipment Catalog</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Gallery, Specs, Description, Reviews (Col 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Title & Rating Header */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#14532d] bg-[#dcfce7] px-2.5 py-0.5 rounded-md border border-[#16a34a]/30">
                {equipment.category}
              </span>

              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>{equipment.average_rating.toFixed(1)}</span>
                <span className="text-[11px] font-normal text-slate-500">
                  ({formatNumber(equipment.total_reviews)} reviews)
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {equipment.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{equipment.city}, {equipment.state}</span>
              {equipment.distance_km && (
                <span className="text-slate-400">
                  • {formatNumber(equipment.distance_km)} km away
                </span>
              )}
            </div>

            {/* Main Image Gallery */}
            <div className="h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
              <img
                src={equipment.images[0] || "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1c?auto=format&fit=crop&w=600&q=80"}
                alt={equipment.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <SourceNote registryId="price-tractor-50hp-sample" compact={true} />
              </div>
            </div>

            {/* Official Technical Specifications Table */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                Technical Specifications (तकनीकी विवरण)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-[#fafaf5] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Manufacturing Year</span>
                  <div className="font-bold text-slate-800 text-sm mt-0.5">{equipment.year}</div>
                </div>
                <div className="p-3 bg-[#fafaf5] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Rated Power</span>
                  <div className="font-bold text-slate-800 text-sm mt-0.5">{equipment.hp ? `${formatNumber(equipment.hp)} HP` : "Standard"}</div>
                </div>
                <div className="p-3 bg-[#fafaf5] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Fuel Type</span>
                  <div className="font-bold text-slate-800 text-sm mt-0.5">{equipment.fuel_type}</div>
                </div>
                <div className="p-3 bg-[#fafaf5] rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Field Inspection</span>
                  <div className="font-bold text-[#14532d] text-sm mt-0.5">{equipment.condition}</div>
                </div>
              </div>
            </div>

            {/* Machine Description */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                Description & Implement Features
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-[#fafaf5] p-4 rounded-xl border border-slate-200">
                {equipment.description}
              </p>
            </div>
          </div>

          {/* Farmer Reviews Section with Machine Translation */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Farmer Reviews & Testimonials ({formatNumber(reviews.length)})
              </h3>
              <div className="text-[11px] text-slate-500 font-medium">
                Verified booking completion required for reviews
              </div>
            </div>

            {reviews.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No reviews yet for this equipment.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl bg-[#fafaf5] border border-slate-200 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#14532d] text-white flex items-center justify-center font-bold text-xs">
                          {rev.farmer_name[0]}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{rev.farmer_name}</span>
                          <span className="text-[10px] text-slate-400">{formatDate(rev.created_at)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>

                    {/* Review text (Original or Translated) */}
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {translatedReviews[rev.id] || rev.comment}
                    </p>

                    {/* Translate action button */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 text-[10px]">
                      <button
                        onClick={() => handleTranslateReview(rev)}
                        disabled={translatingId === rev.id}
                        className="inline-flex items-center gap-1 text-[#14532d] hover:underline font-bold"
                      >
                        <Languages className="w-3.5 h-3.5" />
                        <span>
                          {translatingId === rev.id
                            ? "Translating..."
                            : translatedReviews[rev.id]
                            ? "Translated (अनुवादित)"
                            : `Translate to ${locale.toUpperCase()}`}
                        </span>
                      </button>
                      <span className="text-slate-400">Original language: English</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Price Calculator, Booking Action & Owner Card (Col 1) */}
        <div className="space-y-6">
          {/* Price Estimator & Instant Booking Card */}
          <div className="bg-white rounded-3xl p-6 border-2 border-[#16a34a] shadow-lg space-y-5 sticky top-24">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Daily Rental Fee</span>
                <div className="text-2xl font-black text-[#14532d]">
                  {formatPrice(equipment.daily_rate)}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Hourly Rate</span>
                <div className="text-sm font-bold text-slate-700">
                  {formatPrice(equipment.hourly_rate)}/hr
                </div>
              </div>
            </div>

            {/* Quick Estimator */}
            <div className="space-y-3 bg-[#fafaf5] p-3.5 rounded-2xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-800 block text-xs">
                Estimated Price Calculator (अनुमानित लागत)
              </span>

              <div>
                <div className="flex items-center justify-between font-medium text-slate-600 mb-1">
                  <span>Operating Hours:</span>
                  <span className="font-bold text-slate-900">{calcHours} hours</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="24"
                  step="1"
                  value={calcHours}
                  onChange={(e) => setCalcHours(parseInt(e.target.value, 10))}
                  className="w-full accent-[#14532d]"
                />
              </div>

              <div className="flex items-center justify-between font-bold pt-2 border-t border-slate-200">
                <span className="text-slate-700">Estimated Total:</span>
                <span className="text-lg font-black text-[#14532d]">{formatPrice(calculatedTotal)}</span>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={() => setBookingOpen(true)}
              className="w-full py-3.5 bg-[#14532d] hover:bg-[#16a34a] text-white font-black text-sm rounded-2xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Book Machine Now (किराए पर लें)</span>
            </button>

            {/* Trust Points */}
            <div className="space-y-2 text-[11px] text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#16a34a] shrink-0" />
                <span>100% Escrow Protection - Funds held securely</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                <span>Physical RC & chassis verified before dispatch</span>
              </div>
            </div>
          </div>

          {/* Verified Owner Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block">
              Equipment Owner Profile
            </span>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-[#14532d] flex items-center justify-center font-black text-base">
                {equipment.owner_name[0]}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{equipment.owner_name}</h4>
                <span className="text-[#16a34a] font-semibold text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Aadhaar & RC Verified Owner</span>
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 text-slate-500">
              Contact: <strong className="text-slate-800">{equipment.owner_phone}</strong> (Available after booking confirmation)
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        equipment={equipment}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </main>
  );
}
