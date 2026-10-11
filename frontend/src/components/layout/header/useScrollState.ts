"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

export interface ScrollState {
  isScrolled: boolean;
  showCompactSearch: boolean;
  prefersReducedMotion: boolean;
}

function subscribeMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener?.("change", callback);
  return () => query.removeEventListener?.("change", callback);
}

function getMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getMotionServerSnapshot() {
  return false;
}

/**
 * useScrollState Hook
 * - On scroll down > 80px: isScrolled becomes true (collapsing Layer 1 and Layer 3).
 * - Scrolling up slightly does NOT restore layers; they return only when scrolled back to the top (< 10px).
 * - Shows compact search icon only when sticky, and suppresses it on the Home hero section.
 */
export function useScrollState(): ScrollState {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    getMotionServerSnapshot
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY || document.documentElement.scrollTop || 0;
          setScrollY(currentY);

          setIsScrolled((prev) => {
            if (currentY > 80) {
              return true;
            } else if (currentY < 10) {
              return false;
            }
            return prev;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // On Home page, the big hero search is visible until scrolled past ~350px.
  // On other pages (catalog, map, etc.), compact search is available immediately once scrolled > 80px.
  const isHomePage = pathname === "/" || pathname === "/hi" || pathname === "/en";
  const showCompactSearch = isScrolled && (!isHomePage || scrollY > 380);

  return {
    isScrolled,
    showCompactSearch,
    prefersReducedMotion
  };
}
