"use client";

import React from "react";
import { Booking } from "@/types";
import { useTranslation } from "@/i18n/context";
import {
  CheckCircle2,
  Clock,
  Truck,
  Wrench,
  ShieldCheck,
  CreditCard,
  AlertCircle,
  Calendar
} from "lucide-react";

interface BookingTrackerProps {
  booking: Booking;
}

interface StepInfo {
  key: string;
  label: string;
  desc: string;
  nextStep: string;
}

const STEPS: StepInfo[] = [
  {
    key: "requested",
    label: "Requested",
    desc: "Booking request submitted to owner",
    nextStep: "Owner will review your acreage and confirm availability within 2 hours."
  },
  {
    key: "confirmed",
    label: "Confirmed",
    desc: "Confirmed & Escrow Secured",
    nextStep: "Your advance is safely secured in escrow. The owner is servicing the machine for delivery."
  },
  {
    key: "dispatched",
    label: "Dispatched",
    desc: "Machine en route to farm",
    nextStep: "Driver has departed. Please ensure clear road access and gate clearance."
  },
  {
    key: "in_progress",
    label: "In Progress",
    desc: "Field operations underway",
    nextStep: "Work is active. Keep an eye on fuel consumption and meter hours."
  },
  {
    key: "completed",
    label: "Completed",
    desc: "Work finished & verified",
    nextStep: "Inspect your field and verify total operating hours on the digital completion slip."
  },
  {
    key: "settled",
    label: "Settled",
    desc: "Escrow payment finalized",
    nextStep: "Rental concluded. Escrow disbursed to equipment owner. Don't forget to rate your experience!"
  }
];

export const BookingTracker: React.FC<BookingTrackerProps> = ({ booking }) => {
  const { formatDate } = useTranslation();

  // Map backend booking status to tracker index
  const getActiveIndex = (status: string): number => {
    switch (status.toLowerCase()) {
      case "pending":
      case "requested":
        return 0;
      case "confirmed":
      case "accepted":
        return 1;
      case "dispatched":
      case "in_transit":
        return 2;
      case "in_progress":
      case "active":
        return 3;
      case "completed":
        return 4;
      case "settled":
      case "paid":
        return 5;
      case "cancelled":
      case "rejected":
        return -1;
      default:
        return 1;
    }
  };

  const activeIndex = getActiveIndex(booking.status);
  const currentStep = activeIndex >= 0 ? STEPS[activeIndex] : null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Booking #{booking.id.slice(0, 8)}
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
            Live Booking Progress & Lifecycle
          </h3>
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14532d] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-[#16a34a]/30">
          <Clock className="w-3.5 h-3.5" />
          <span className="capitalize">{booking.status}</span>
        </div>
      </div>

      {/* Progress Steps Bar */}
      <div className="relative">
        <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0" />
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 relative z-10">
          {STEPS.map((step, idx) => {
            const isCompleted = activeIndex > idx;
            const isCurrent = activeIndex === idx;

            return (
              <div key={step.key} className="flex flex-col items-center text-center space-y-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors shadow-xs ${
                    isCompleted
                      ? "bg-[#14532d] text-white"
                      : isCurrent
                      ? "bg-[#16a34a] text-white ring-4 ring-emerald-100 dark:ring-emerald-950"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {step.label}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                  {step.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* What Happens Next Guidance Box */}
      {currentStep && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
            <span>Next Step: What happens now?</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {currentStep.nextStep}
          </p>
        </div>
      )}

      {/* Rental Dates Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>
            Scheduled Dates: {formatDate(booking.start_date)} to {formatDate(booking.end_date)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5 text-slate-400" />
          <span>Escrow Status: Protected by FarmRentHub Escrow</span>
        </div>
      </div>
    </div>
  );
};
