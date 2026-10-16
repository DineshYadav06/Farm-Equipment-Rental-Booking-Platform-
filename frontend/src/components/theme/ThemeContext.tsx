"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ThemeMode } from "@/constants/tokens";

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const COOKIE_NAME = "farmrenthub_theme";
const STORAGE_KEY = "farmrenthub_theme";

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // Sync theme to DOM
  const applyTheme = (resolved: "light" | "dark") => {
    setResolvedTheme(resolved);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", resolved);
      if (resolved === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  // Initialize on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    let savedTheme: ThemeMode = "system";
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode;
      if (stored === "light" || stored === "dark" || stored === "system") {
        savedTheme = stored;
      } else {
        // Check cookie
        const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
        if (match && (match[2] === "light" || match[2] === "dark" || match[2] === "system")) {
          savedTheme = match[2] as ThemeMode;
        }
      }
    } catch {
      // Storage unavailable
    }

    setThemeState(savedTheme);
    const resolved = savedTheme === "system" ? getSystemTheme() : savedTheme;
    applyTheme(resolved);

    // Watch for system preference changes live
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e: MediaQueryListEvent) => {
      setThemeState((current) => {
        if (current === "system") {
          applyTheme(e.matches ? "dark" : "light");
        }
        return current;
      });
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    const resolved = mode === "system" ? getSystemTheme() : mode;
    applyTheme(resolved);

    try {
      localStorage.setItem(STORAGE_KEY, mode);
      document.cookie = `${COOKIE_NAME}=${mode}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Storage unavailable
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
};
