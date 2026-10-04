"use client";

import React from "react";
import { UserNotification } from "@/types";
import { X, CheckCircle2, Clock, Bell, AlertCircle, ArrowRight } from "lucide-react";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: UserNotification[];
  lang?: "en" | "hi";
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  lang = "en"
}) => {
  if (!isOpen) return null;

  const isHi = lang === "hi";

  const getIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case "payment":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case "reminder":
        return <Clock className="w-4 h-4 text-amber-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-700" />
            <h3 className="font-extrabold text-slate-900 text-sm">
              {isHi ? "सूचना केंद्र" : "Notifications Center"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-2xl border text-xs transition-colors ${
                !n.read
                  ? "bg-emerald-50/50 border-emerald-200"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 shrink-0">{getIcon(n.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{n.title}</span>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors"
          >
            {isHi ? "बंद करें" : "Mark All as Read & Close"}
          </button>
        </div>
      </div>
    </div>
  );
};
