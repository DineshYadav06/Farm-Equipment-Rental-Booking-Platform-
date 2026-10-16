/**
 * FarmRentHub - Mandi Price Provider Interface
 * Integrates with official Agmarknet / data.gov.in API via a Next.js route handler.
 */

export interface MandiPriceItem {
  commodity: string;
  market: string;
  district: string;
  state: string;
  modalPrice: number; // in ₹ per quintal
  minPrice: number;
  maxPrice: number;
  arrivalDate: string; // YYYY-MM-DD
}

export interface MandiResponse {
  sourceName: string;
  sourceUrl: string;
  fetchedAt: string;
  isOfficialApi: boolean;
  records: MandiPriceItem[];
}

export async function fetchMandiPrices(state?: string, district?: string): Promise<MandiResponse> {
  const url = new URL("/api/mandi", typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
  if (state) url.searchParams.set("state", state);
  if (district) url.searchParams.set("district", district);

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch mandi prices: ${res.status}`);
  }

  return await res.json();
}
