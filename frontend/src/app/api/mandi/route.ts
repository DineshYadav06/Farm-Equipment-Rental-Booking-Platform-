import { NextRequest, NextResponse } from "next/server";
import { MandiPriceItem, MandiResponse } from "@/services/mandi";

// In-memory cache with 1 hour TTL (3600 seconds)
interface CacheEntry {
  timestamp: number;
  data: MandiResponse;
}

let cachedMandiData: CacheEntry | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000;

export async function GET(request: NextRequest) {
  const now = Date.now();
  const apiKey = process.env.MANDI_API_KEY;

  if (cachedMandiData && now - cachedMandiData.timestamp < CACHE_TTL_MS) {
    return NextResponse.json(cachedMandiData.data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800" }
    });
  }

  // If MANDI_API_KEY is configured, call official data.gov.in / Agmarknet API
  if (apiKey) {
    try {
      const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&limit=10`;
      const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        const json = await res.json();
        const records: MandiPriceItem[] = (json.records || []).map((r: any) => ({
          commodity: r.commodity || "Wheat",
          market: r.market || "Local Mandi",
          district: r.district || "District APMC",
          state: r.state || "Punjab",
          modalPrice: Number(r.modal_price) || 2275,
          minPrice: Number(r.min_price) || 2200,
          maxPrice: Number(r.max_price) || 2350,
          arrivalDate: r.arrival_date || new Date().toISOString().split("T")[0]
        }));

        const responseData: MandiResponse = {
          sourceName: "Agmarknet (Ministry of Agriculture & Farmers Welfare)",
          sourceUrl: "https://agmarknet.gov.in",
          fetchedAt: new Date().toISOString(),
          isOfficialApi: true,
          records
        };

        cachedMandiData = { timestamp: now, data: responseData };
        return NextResponse.json(responseData);
      }
    } catch {
      // API call failed, proceed to fallback link representation
    }
  }

  // If API key is absent or request failed, provide official portal link metadata with empty records
  const fallbackResponse: MandiResponse = {
    sourceName: "Agmarknet (Directorate of Marketing & Inspection)",
    sourceUrl: "https://agmarknet.gov.in",
    fetchedAt: new Date().toISOString(),
    isOfficialApi: false,
    records: []
  };

  return NextResponse.json(fallbackResponse);
}
