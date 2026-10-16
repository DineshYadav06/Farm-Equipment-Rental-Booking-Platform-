import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { TranslationProvider } from "@/i18n/context";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { Header } from "@/components/layout/header/Header";
import { GovFooter } from "@/components/layout/GovFooter";
import { LanguageModal } from "@/components/layout/LanguageModal";

export const metadata: Metadata = {
  title: "FarmRentHub | National Farm Equipment Rental Platform",
  description:
    "Affordable tractor, harvester, rotavator, and agricultural machinery rental platform across India. Rent directly from verified owners with transparent rates.",
  keywords: [
    "Farm equipment rental",
    "Tractor rent",
    "Combine harvester rental",
    "Custom hiring centre",
    "Rotavator rental"
  ],
  authors: [{ name: "FarmRentHub Platform" }]
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("farmrenthub_theme")?.value || "system";
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value || "hi";

  const initialThemeAttr = themeCookie === "dark" ? "dark" : "light";

  return (
    <html lang={localeCookie} dir="ltr" data-theme={initialThemeAttr} className="h-full">
      <head>
        {/* Anti-flash inline script for client-side System and LocalStorage theme detection */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var cookie = document.cookie.match(/(^| )farmrenthub_theme=([^;]+)/);
                  var theme = cookie ? cookie[2] : (localStorage.getItem('farmrenthub_theme') || 'system');
                  var resolved = theme;
                  if (theme === 'system') {
                    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', resolved);
                  if (resolved === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-[var(--bg-color)] text-[var(--text)]">
        <ThemeProvider>
          <TranslationProvider initialLocale={localeCookie as any}>
            <Header />
            <div id="main-content" className="flex-1 flex flex-col">
              {children}
            </div>
            <GovFooter />
            <LanguageModal />
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
