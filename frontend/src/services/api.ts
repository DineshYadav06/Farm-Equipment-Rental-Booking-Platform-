import { Equipment, Booking, Review, Recommendation } from "@/types";
import { MOCK_EQUIPMENT, MOCK_REVIEWS, MOCK_RECOMMENDATIONS } from "@/constants/data";
import { matchCategoryByQuery } from "@/content/equipment-taxonomy";
import sampleListings from "@/content/sample-listings.json";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// Combine mock equipment with 300 regional sample listings
const ALL_LOCAL_EQUIPMENT: Equipment[] = [
  ...((sampleListings as unknown as Equipment[]) || []),
  ...MOCK_EQUIPMENT
];

export async function fetchEquipmentList(category?: string, query?: string): Promise<Equipment[]> {
  try {
    const url = new URL(`${API_BASE}/equipment`);
    if (category && category !== "all") url.searchParams.append("category", category);
    if (query) url.searchParams.append("q", query);

    const res = await fetch(url.toString(), { cache: "no-store", signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Graceful fallback to mock data
  }

  let items = [...ALL_LOCAL_EQUIPMENT];

  // Resolve category by taxonomy and synonyms if query or category provided
  const matchedTaxonomy = query ? matchCategoryByQuery(query) : null;

  if (category && category.toLowerCase() !== "all") {
    items = items.filter((e) => e.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    const q = query.toLowerCase();
    items = items.filter((e) => {
      // Direct text match
      const directMatch =
        e.title.toLowerCase().includes(q) ||
        e.brand.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        (e.state && e.state.toLowerCase().includes(q));

      // Multilingual synonym match
      const synonymMatch =
        matchedTaxonomy &&
        e.category.toLowerCase().includes(matchedTaxonomy.name.toLowerCase());

      return directMatch || synonymMatch;
    });
  }

  return items;
}

export async function fetchNearbyEquipment(lat: number, lon: number, radiusKm: number = 50): Promise<Equipment[]> {
  try {
    const url = new URL(`${API_BASE}/equipment/nearby`);
    url.searchParams.append("lat", lat.toString());
    url.searchParams.append("lon", lon.toString());
    url.searchParams.append("radius_km", radiusKm.toString());

    const res = await fetch(url.toString(), { cache: "no-store", signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback
  }
  return ALL_LOCAL_EQUIPMENT.filter((e) => (e.distance_km || 0) <= radiusKm);
}

export async function fetchEquipmentById(id: string): Promise<Equipment | null> {
  try {
    const res = await fetch(`${API_BASE}/equipment/${id}`, { cache: "no-store", signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback
  }
  return ALL_LOCAL_EQUIPMENT.find((e) => e.id === id) || null;
}

export async function fetchRecommendations(): Promise<Recommendation[]> {
  try {
    const res = await fetch(`${API_BASE}/recommendations`, { cache: "no-store", signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback
  }
  return MOCK_RECOMMENDATIONS;
}

export async function fetchReviews(equipmentId?: string): Promise<Review[]> {
  try {
    const url = new URL(`${API_BASE}/reviews`);
    if (equipmentId) url.searchParams.append("equipment_id", equipmentId);
    const res = await fetch(url.toString(), { cache: "no-store", signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback
  }
  return MOCK_REVIEWS;
}
