"use client";

import React from "react";
import { useTranslation } from "@/i18n/context";
import { Bell } from "lucide-react";

export const NotificationBell: React.FC = () => {
  const { notifications, setIsNotificationDrawerOpen, t } = useTranslation();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <button
      type="button"
      onClick={() => setIsNotificationDrawerOpen(true)}
      aria-label={`${t("common", "nav.notifications")}${
        unreadCount > 0 ? ` (${unreadCount} unread)` : ""
      }`}
      className="relative p-2 rounded-xl text-[#1e3a5f] hover:bg-[#f3f4f0] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#14532d] transition-colors"
    >
      <Bell className="w-5 h-5 text-[#1e3a5f]" aria-hidden="true" />
      {unreadCount > 0 && (
        <span
          className="absolute top-1.5 end-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#d97706] text-[10px] font-black text-white ring-2 ring-white"
          aria-hidden="true"
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
};
