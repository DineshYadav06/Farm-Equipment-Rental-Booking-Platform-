import { LocaleCode, SUPPORTED_LOCALES } from "./config";

/**
 * Format numbers using Indian digit grouping (e.g. 1,25,000)
 * Optionally converts digits to native Indic script.
 */
export function formatIndianNumber(
  val: number | string,
  locale: LocaleCode = "hi",
  useNativeDigits: boolean = false
): string {
  const num = typeof val === "string" ? parseFloat(val) : val;
  if (isNaN(num)) return String(val);

  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2
  }).format(num);

  if (!useNativeDigits) return formatted;

  const digitMap = SUPPORTED_LOCALES[locale]?.digitMap;
  if (!digitMap) return formatted;

  return formatted.replace(/[0-9]/g, (digit) => digitMap[parseInt(digit, 10)] || digit);
}

/**
 * Format Currency in Indian Rupees (₹)
 * Example: ₹1,200/hr, ₹1,25,000
 */
export function formatCurrency(
  val: number,
  locale: LocaleCode = "hi",
  useNativeDigits: boolean = false,
  unitSuffix?: string
): string {
  const formattedNum = formatIndianNumber(val, locale, useNativeDigits);
  const base = `₹${formattedNum}`;
  return unitSuffix ? `${base}/${unitSuffix}` : base;
}

/**
 * Format date in localized Indian format
 */
export function formatLocalizedDate(
  dateInput: string | Date,
  locale: LocaleCode = "hi",
  includeTime: boolean = false
): string {
  try {
    const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return String(dateInput);

    const bcp47 = SUPPORTED_LOCALES[locale]?.speechLang || "hi-IN";
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
      ...(includeTime ? { hour: "numeric", minute: "numeric", hour12: true } : {})
    };

    return new Intl.DateTimeFormat(bcp47, options).format(d);
  } catch {
    return String(dateInput);
  }
}

/**
 * Land unit conversions standard for Indian agriculture
 * Base reference: 1 Acre = 43,560 sq ft
 */
export interface LandUnit {
  key: string;
  sqFt: number;
  regions: string[];
}

export const LAND_UNITS: Record<string, LandUnit> = {
  acre: { key: "acre", sqFt: 43560, regions: ["All India"] },
  hectare: { key: "hectare", sqFt: 107639, regions: ["Official / Revenue"] },
  bigha_up: { key: "bigha_up", sqFt: 27000, regions: ["UP", "Bihar", "Rajasthan"] },
  bigha_bengal: { key: "bigha_bengal", sqFt: 14400, regions: ["West Bengal", "Assam"] },
  kanal: { key: "kanal", sqFt: 5445, regions: ["Punjab", "Haryana"] },
  guntha: { key: "guntha", sqFt: 1089, regions: ["Maharashtra", "Karnataka", "Gujarat"] },
  cent: { key: "cent", sqFt: 435.6, regions: ["Tamil Nadu", "Kerala"] },
  katha: { key: "katha", sqFt: 1361, regions: ["Bihar", "West Bengal", "Assam"] }
};

export function convertLandArea(
  value: number,
  fromUnit: string,
  toUnit: string = "acre"
): number {
  const from = LAND_UNITS[fromUnit] || LAND_UNITS.acre;
  const to = LAND_UNITS[toUnit] || LAND_UNITS.acre;
  const inSqFt = value * from.sqFt;
  return parseFloat((inSqFt / to.sqFt).toFixed(3));
}
