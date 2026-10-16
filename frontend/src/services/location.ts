/**
 * Offline Reverse Geocoding & Location Privacy Utilities
 * Converts coordinates to nearest State/District/Block using local centroids.json.
 * No external API key, no third-party network requests.
 * Always rounds coordinates to 2 decimals (~1 km) before storage or usage.
 */

import centroidsData from "@/content/geo/centroids.json";

export interface GeoLocationResult {
  stateCode: string;
  state: string;
  districtCode: string;
  district: string;
  blockCode?: string;
  block?: string;
  lat2: number;
  lng2: number;
  distanceKm: number;
}

export interface StoredLocation {
  stateCode: string;
  state: string;
  districtCode: string;
  district: string;
  blockCode?: string;
  block?: string;
  lat2: number;
  lng2: number;
}

export const STORAGE_KEY_LOCATION = "farmrenthub_location";
export const STORAGE_KEY_LOCATION_DISMISSED = "farmrenthub_location_prompt_dismissed";
export const COOKIE_KEY_LOCATION = "farmrenthub_location";

/**
 * Great-circle distance between two points in km (Haversine formula).
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Checks if coordinates fall within the general geographic boundaries of India.
 */
export function isWithinIndia(lat: number, lng: number): boolean {
  return lat >= 6.0 && lat <= 38.0 && lng >= 68.0 && lng <= 98.0;
}

/**
 * Finds the nearest Indian State/District/Block from local centroids.
 */
export function findNearestLocation(rawLat: number, rawLng: number): GeoLocationResult | null {
  if (!isWithinIndia(rawLat, rawLng)) {
    return null;
  }

  // Round coordinates to 2 decimal places (~1 km precision privacy guard)
  const lat2 = Math.round(rawLat * 100) / 100;
  const lng2 = Math.round(rawLng * 100) / 100;

  let bestMatch: (typeof centroidsData)[0] | null = null;
  let minDistance = Infinity;

  for (const item of centroidsData) {
    const dist = calculateHaversineDistance(lat2, lng2, item.lat, item.lng);
    if (dist < minDistance) {
      minDistance = dist;
      bestMatch = item;
    }
  }

  if (!bestMatch) return null;

  return {
    stateCode: bestMatch.stateCode,
    state: bestMatch.state,
    districtCode: bestMatch.districtCode,
    district: bestMatch.district,
    blockCode: bestMatch.blockCode,
    block: bestMatch.block,
    lat2,
    lng2,
    distanceKm: minDistance
  };
}

/**
 * Saves rounded location to LocalStorage and Cookie.
 */
export function saveStoredLocation(loc: StoredLocation): void {
  try {
    const payload = JSON.stringify(loc);
    localStorage.setItem(STORAGE_KEY_LOCATION, payload);
    document.cookie = `${COOKIE_KEY_LOCATION}=${encodeURIComponent(
      payload
    )}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    // Storage unavailable
  }
}

/**
 * Clears location from storage (Privacy - "Forget my location").
 */
export function clearStoredLocation(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_LOCATION);
    document.cookie = `${COOKIE_KEY_LOCATION}=; path=/; max-age=0; SameSite=Lax`;
  } catch {
    // Storage unavailable
  }
}

/**
 * Retrieves location from LocalStorage.
 */
export function getStoredLocation(): StoredLocation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOCATION);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Storage error
  }
  return null;
}
