import type { Metadata } from "next";
import "./globals.css";
import { TranslationProvider } from "@/i18n/context";
import { Header } from "@/components/layout/header/Header";
import { GovFooter } from "@/components/layout/GovFooter";
import { LanguageModal } from "@/components/layout/LanguageModal";

export const metadata: Metadata = {
  title: "FarmRentHub | राष्ट्रीय कृषि उपकरण किराया मंच | Farm Equipment Rental",
  description:
    "Affordable tractor, harvester, rotavator, and agricultural machinery rental platform across India. Rent directly from verified owners with secure escrow payments.",
  keywords: [
    "Farm equipment rental",
    "Tractor rent",
    "Combine harvester rental",
    "Custom hiring centre",
    "Rotavator rental",
    "कृषि उपकरण किराया",
    "ट्रैक्टर किराया"
  ],
  authors: [{ name: "FarmRentHub Platform" }]
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" dir="ltr" className="h-full">
      <body className="min-h-full flex flex-col bg-[#fafaf5] text-[#1c1917] antialiased">
        <TranslationProvider>
          <Header />
          <div id="main-content" className="flex-1 flex flex-col">
            {children}
          </div>
          <GovFooter />
          <LanguageModal />
        </TranslationProvider>
      </body>
    </html>
  );
}
