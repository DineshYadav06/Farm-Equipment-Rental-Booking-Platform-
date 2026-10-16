/**
 * FarmRentHub - Agricultural Land Measurement Units & Regional Conversion Factors
 * Strictly grounded in official state revenue department records.
 * Factors convert 1 unit into Square Metres (sq m).
 */

export interface LandUnitRegistryEntry {
  unitKey: string;
  name: string;
  nameI18n: Record<string, string>;
  stateCode?: string;
  stateName?: string;
  toSqMeters: number; // 1 unit in sq metres
  sourceName: string;
  sourceUrl?: string;
  asOfDate: string;
  status: "verified" | "needs-verification";
}

export const STANDARD_LAND_UNITS: LandUnitRegistryEntry[] = [
  {
    unitKey: "sq_metre",
    name: "Square Metre",
    nameI18n: {
      hi: "वर्ग मीटर",
      pa: "ਵਰਗ ਮੀਟਰ",
      mr: "चौरस मीटर",
      ta: "சதுர மீட்டர்"
    },
    toSqMeters: 1,
    sourceName: "Bureau of Indian Standards (IS 14700 / SI Metric)",
    sourceUrl: "https://bis.gov.in",
    asOfDate: "2026-01-01",
    status: "verified"
  },
  {
    unitKey: "hectare",
    name: "Hectare",
    nameI18n: {
      hi: "हेक्टेयर",
      pa: "ਹੈਕਟੇਅਰ",
      mr: "हेक्टर",
      ta: "ஹெக்டேர்"
    },
    toSqMeters: 10000,
    sourceName: "Ministry of Agriculture & Farmers Welfare (Official Agricultural Statistics)",
    sourceUrl: "https://agricoop.nic.in",
    asOfDate: "2026-01-01",
    status: "verified"
  },
  {
    unitKey: "acre",
    name: "Acre",
    nameI18n: {
      hi: "एकड़",
      pa: "ਏਕੜ",
      mr: "एकर",
      ta: "ஏக்கர்"
    },
    toSqMeters: 4046.8564,
    sourceName: "National Land Records Modernization Programme (NLRMP)",
    sourceUrl: "https://dolr.gov.in",
    asOfDate: "2026-01-01",
    status: "verified"
  }
];

export const REGIONAL_LAND_UNITS: LandUnitRegistryEntry[] = [
  // Punjab / Haryana
  {
    unitKey: "kanal",
    name: "Kanal",
    nameI18n: { hi: "कनाल", pa: "ਕਨਾਲ" },
    stateCode: "PB",
    stateName: "Punjab",
    toSqMeters: 505.857,
    sourceName: "Punjab Department of Revenue & Rehabilitation (PLRA Standard: 8 Kanals = 1 Acre)",
    sourceUrl: "https://plrs.org.in",
    asOfDate: "2026-01-01",
    status: "verified"
  },
  {
    unitKey: "bigha_pb",
    name: "Bigha (Punjab/Haryana)",
    nameI18n: { hi: "बीघा (पंजाब)", pa: "ਬੀਘਾ" },
    stateCode: "PB",
    stateName: "Punjab",
    toSqMeters: 1011.71,
    sourceName: "Punjab Land Revenue Record Manual",
    sourceUrl: "https://punjabrevenue.nic.in",
    asOfDate: "2026-01-01",
    status: "verified"
  },
  // Maharashtra / Gujarat
  {
    unitKey: "guntha",
    name: "Guntha",
    nameI18n: { hi: "गुंठा", mr: "गुंठा", gu: "ગુંઠા" },
    stateCode: "MH",
    stateName: "Maharashtra",
    toSqMeters: 101.1714,
    sourceName: "Maharashtra Land Revenue Code, 1966 (Section 2: 40 Gunthas = 1 Acre)",
    sourceUrl: "https://mahabhumi.gov.in",
    asOfDate: "2026-01-01",
    status: "verified"
  },
  // Tamil Nadu / Kerala / Andhra Pradesh
  {
    unitKey: "cent",
    name: "Cent",
    nameI18n: { hi: "सेंट", ta: "சென்ட்", te: "సెంట్", ml: "സെന്റ്" },
    stateCode: "TN",
    stateName: "Tamil Nadu",
    toSqMeters: 40.4686,
    sourceName: "Tamil Nadu Survey and Land Records Manual (100 Cents = 1 Acre)",
    sourceUrl: "https://tnreginet.gov.in",
    asOfDate: "2026-01-01",
    status: "verified"
  },
  // Uttar Pradesh (Needs-verification regional variations)
  {
    unitKey: "bigha_up",
    name: "Bigha (Uttar Pradesh)",
    nameI18n: { hi: "बीघा (उत्तर प्रदेश)" },
    stateCode: "UP",
    stateName: "Uttar Pradesh",
    toSqMeters: 2529.28,
    sourceName: "UP Board of Revenue (Standard Pucca Bigha estimation)",
    sourceUrl: "https://bor.up.nic.in",
    asOfDate: "2026-01-01",
    status: "needs-verification"
  },
  // Bihar / West Bengal (Needs-verification regional variations)
  {
    unitKey: "katha",
    name: "Katha",
    nameI18n: { hi: "कट्ठा", bn: "কাঠা" },
    stateCode: "WB",
    stateName: "West Bengal",
    toSqMeters: 66.89,
    sourceName: "Banglarbhumi Land Records Directorate (20 Katha = 1 Bigha benchmark)",
    sourceUrl: "https://banglarbhumi.gov.in",
    asOfDate: "2026-01-01",
    status: "needs-verification"
  }
];

export const ALL_LAND_UNITS = [...STANDARD_LAND_UNITS, ...REGIONAL_LAND_UNITS];

export function convertLandArea(
  value: number,
  fromUnitKey: string,
  toUnitKey: string
): { converted: number; fromEntry?: LandUnitRegistryEntry; toEntry?: LandUnitRegistryEntry } {
  const from = ALL_LAND_UNITS.find((u) => u.unitKey === fromUnitKey);
  const to = ALL_LAND_UNITS.find((u) => u.unitKey === toUnitKey);

  if (!from || !to || value <= 0) {
    return { converted: 0, fromEntry: from, toEntry: to };
  }

  // Convert to square metres first, then to target unit
  const inSqMetres = value * from.toSqMeters;
  const result = inSqMetres / to.toSqMeters;

  return {
    converted: parseFloat(result.toFixed(4)),
    fromEntry: from,
    toEntry: to
  };
}
