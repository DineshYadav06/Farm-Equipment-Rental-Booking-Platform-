import { NextRequest, NextResponse } from "next/server";
import { getWeatherProvider, CurrentWeather } from "@/services/weather";
import { isWithinIndia } from "@/services/location";

// Simple in-memory cache for 30 minutes
interface CacheEntry {
  data: CurrentWeather;
  cachedAt: number;
}
const weatherCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

// In-memory rate limiting: max 60 requests per minute per IP
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_WINDOW = 60 * 1000;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const latStr = searchParams.get("lat");
  const lngStr = searchParams.get("lng");

  if (!latStr || !lngStr) {
    return NextResponse.json(
      { error: "Missing latitude or longitude parameters" },
      { status: 400 }
    );
  }

  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);

  if (isNaN(lat) || isNaN(lng) || !isWithinIndia(lat, lng)) {
    return NextResponse.json(
      { error: "Coordinates are invalid or outside India" },
      { status: 400 }
    );
  }

  // Rate Limiting
  const ip = request.headers.get("x-forwarded-for") || "client_ip";
  const now = Date.now();
  const clientLimit = rateLimits.get(ip);

  if (!clientLimit || now > clientLimit.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
  } else {
    if (clientLimit.count >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: "Too many weather requests. Please wait." },
        { status: 429 }
      );
    }
    clientLimit.count += 1;
  }

  // Round coordinates for cache key and privacy
  const lat2 = Math.round(lat * 100) / 100;
  const lng2 = Math.round(lng * 100) / 100;
  const cacheKey = `${lat2.toFixed(2)}_${lng2.toFixed(2)}`;

  const cached = weatherCache.get(cacheKey);
  if (cached && now - cached.cachedAt < CACHE_TTL_MS) {
    return NextResponse.json(cached.data, {
      headers: { "X-Cache": "HIT" }
    });
  }

  try {
    const provider = getWeatherProvider();
    const weatherData = await provider.getWeather(lat2, lng2);

    weatherCache.set(cacheKey, {
      data: weatherData,
      cachedAt: now
    });

    return NextResponse.json(weatherData, {
      headers: { "X-Cache": "MISS" }
    });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "Weather fetch failed";
    console.warn(`Weather service notice: ${errMsg}`);
    return NextResponse.json(
      { error: "Weather is not available right now" },
      { status: 503 }
    );
  }
}
