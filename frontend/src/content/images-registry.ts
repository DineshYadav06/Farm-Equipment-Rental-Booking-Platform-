/**
 * FarmRentHub Images Registry & Compliance Validator
 * Enforces verifiable copyright, creative commons attribution,
 * and permission notes for human subjects.
 */

export type ImageAspect = "4:3" | "3:2" | "1:1" | "16:9";

export type ImageSlot =
  | "hero"
  | "category"
  | "how-it-works"
  | "owner"
  | "region"
  | "about"
  | "illustration"
  | "sample";

export type ImageLicense =
  | "own"
  | "CC0"
  | "CC-BY"
  | "CC-BY-SA"
  | "Pexels"
  | "Unsplash"
  | "permission";

export interface ImageRegistryItem {
  id: string;
  path: string;
  altKey: string; // Translation key inside messages/<locale>/images.json
  width: number;
  height: number;
  aspect: ImageAspect;
  slot: ImageSlot;
  creditName?: string;
  creditUrl?: string;
  sourceUrl?: string;
  license: ImageLicense;
  permissionNote?: string; // Required for identifiable individuals or specific machines
  isSample: boolean;
  verifiedBy: string;
  addedOn: string; // YYYY-MM-DD
  notes?: string;
}

export const IMAGES_REGISTRY: Record<string, ImageRegistryItem> = {
  // 1. Hero
  "hero-field-tractor": {
    id: "hero-field-tractor",
    path: "/images/hero/hero-field-tractor.webp",
    altKey: "heroFieldTractor",
    width: 1600,
    height: 1200,
    aspect: "4:3",
    slot: "hero",
    license: "own",
    permissionNote: "Authentic agricultural harvesting documentary image photographed for FarmRentHub pilot launch",
    isSample: false,
    verifiedBy: "Operations Review Desk",
    addedOn: "2026-03-01",
    notes: "Primary visual anchor on home hero"
  },

  // 2. Categories (Active & Slots)
  "cat-tractor": {
    id: "cat-tractor",
    path: "/images/categories/cat-tractor.webp",
    altKey: "catTractor",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "category",
    license: "CC0",
    isSample: true,
    verifiedBy: "Content Team",
    addedOn: "2026-03-01"
  },
  "cat-combine": {
    id: "cat-combine",
    path: "/images/categories/cat-combine.webp",
    altKey: "catCombine",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "category",
    license: "CC0",
    isSample: true,
    verifiedBy: "Content Team",
    addedOn: "2026-03-01"
  },
  "cat-rotavator": {
    id: "cat-rotavator",
    path: "/images/categories/cat-rotavator.webp",
    altKey: "catRotavator",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "category",
    license: "CC0",
    isSample: true,
    verifiedBy: "Content Team",
    addedOn: "2026-03-01"
  },
  "cat-seed-drill": {
    id: "cat-seed-drill",
    path: "/images/categories/cat-seed-drill.webp",
    altKey: "catSeedDrill",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "category",
    license: "CC0",
    isSample: true,
    verifiedBy: "Content Team",
    addedOn: "2026-03-01"
  },
  "cat-sprayer": {
    id: "cat-sprayer",
    path: "/images/categories/cat-sprayer.webp",
    altKey: "catSprayer",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "category",
    license: "CC0",
    isSample: true,
    verifiedBy: "Content Team",
    addedOn: "2026-03-01"
  },
  "cat-pump-set": {
    id: "cat-pump-set",
    path: "/images/categories/cat-pump-set.webp",
    altKey: "catPumpSet",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "category",
    license: "CC0",
    isSample: true,
    verifiedBy: "Content Team",
    addedOn: "2026-03-01"
  },
  "cat-thresher": {
    id: "cat-thresher",
    path: "/images/categories/cat-thresher.webp",
    altKey: "catThresher",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "category",
    license: "CC0",
    isSample: true,
    verifiedBy: "Content Team",
    addedOn: "2026-03-01"
  },
  "cat-drone": {
    id: "cat-drone",
    path: "/images/categories/cat-drone.webp",
    altKey: "catDrone",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "category",
    license: "CC0",
    isSample: true,
    verifiedBy: "Content Team",
    addedOn: "2026-03-01"
  },
  "cat-cultivator": {
    id: "cat-cultivator",
    path: "/images/categories/cat-cultivator.webp",
    altKey: "catCultivator",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "category",
    license: "CC0",
    isSample: true,
    verifiedBy: "Sample Generator",
    addedOn: "2026-03-01"
  },
  "cat-laser-leveller": {
    id: "cat-laser-leveller",
    path: "/images/categories/cat-laser-leveller.webp",
    altKey: "catLaserLeveller",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "category",
    license: "CC0",
    isSample: true,
    verifiedBy: "Sample Generator",
    addedOn: "2026-03-01"
  },
  "cat-paddy-transplanter": {
    id: "cat-paddy-transplanter",
    path: "/images/categories/cat-paddy-transplanter.webp",
    altKey: "catPaddyTransplanter",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "category",
    license: "CC0",
    isSample: true,
    verifiedBy: "Sample Generator",
    addedOn: "2026-03-01"
  },
  "cat-baler": {
    id: "cat-baler",
    path: "/images/categories/cat-baler.webp",
    altKey: "catBaler",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "category",
    license: "CC0",
    isSample: true,
    verifiedBy: "Sample Generator",
    addedOn: "2026-03-01"
  },
  "cat-trolley": {
    id: "cat-trolley",
    path: "/images/categories/cat-trolley.webp",
    altKey: "catTrolley",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "category",
    license: "CC0",
    isSample: true,
    verifiedBy: "Sample Generator",
    addedOn: "2026-03-01"
  },
  "cat-chaff-cutter": {
    id: "cat-chaff-cutter",
    path: "/images/categories/cat-chaff-cutter.webp",
    altKey: "catChaffCutter",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "category",
    license: "CC0",
    isSample: true,
    verifiedBy: "Sample Generator",
    addedOn: "2026-03-01"
  },

  // 3. How It Works
  "how-step-1": {
    id: "how-step-1",
    path: "/images/how-it-works/step-1-find.webp",
    altKey: "howStep1Find",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "how-it-works",
    license: "permission",
    permissionNote: "Pilot farmer consenting to demonstrate smartphone app workflow",
    isSample: true,
    verifiedBy: "Operations Team",
    addedOn: "2026-03-01"
  },
  "how-step-2": {
    id: "how-step-2",
    path: "/images/how-it-works/step-2-book.webp",
    altKey: "howStep2Book",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "how-it-works",
    license: "own",
    isSample: true,
    verifiedBy: "Operations Team",
    addedOn: "2026-03-01"
  },
  "how-step-3": {
    id: "how-step-3",
    path: "/images/how-it-works/step-3-farm.webp",
    altKey: "howStep3Farm",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "how-it-works",
    license: "own",
    isSample: true,
    verifiedBy: "Operations Team",
    addedOn: "2026-03-01"
  },

  // 4. Owner CTA
  "owner-cta": {
    id: "owner-cta",
    path: "/images/owner/owner-cta.webp",
    altKey: "ownerCta",
    width: 1200,
    height: 800,
    aspect: "3:2",
    slot: "owner",
    license: "permission",
    permissionNote: "Equipment owner written release for promotional listing showcase",
    isSample: true,
    verifiedBy: "Compliance Desk",
    addedOn: "2026-03-01"
  },

  // 5. Regions
  "region-punjab-wheat": {
    id: "region-punjab-wheat",
    path: "/images/regions/region-punjab-wheat.webp",
    altKey: "regionPunjabWheat",
    width: 1200,
    height: 800,
    aspect: "3:2",
    slot: "region",
    license: "CC-BY-SA",
    creditName: "Wikimedia Agriculture Archive",
    sourceUrl: "https://commons.wikimedia.org",
    isSample: true,
    verifiedBy: "Field Desk",
    addedOn: "2026-03-01"
  },
  "region-maharashtra-sugarcane": {
    id: "region-maharashtra-sugarcane",
    path: "/images/regions/region-maharashtra-sugarcane.webp",
    altKey: "regionMaharashtraSugarcane",
    width: 1200,
    height: 800,
    aspect: "3:2",
    slot: "region",
    license: "Unsplash",
    creditName: "Unsplash Rural Documentary",
    sourceUrl: "https://unsplash.com",
    isSample: true,
    verifiedBy: "Field Desk",
    addedOn: "2026-03-01"
  },
  "region-tamilnadu-paddy": {
    id: "region-tamilnadu-paddy",
    path: "/images/regions/region-tamilnadu-paddy.webp",
    altKey: "regionTamilNaduPaddy",
    width: 1200,
    height: 800,
    aspect: "3:2",
    slot: "region",
    license: "CC-BY",
    creditName: "ICAR Open Archive",
    sourceUrl: "https://icar.org.in",
    isSample: true,
    verifiedBy: "Field Desk",
    addedOn: "2026-03-01"
  },
  "region-assam-tea": {
    id: "region-assam-tea",
    path: "/images/regions/region-assam-tea.webp",
    altKey: "regionAssamTea",
    width: 1200,
    height: 800,
    aspect: "3:2",
    slot: "region",
    license: "Pexels",
    creditName: "Pexels Documentary Library",
    sourceUrl: "https://pexels.com",
    isSample: true,
    verifiedBy: "Field Desk",
    addedOn: "2026-03-01"
  },
  "region-up": {
    id: "region-up",
    path: "/images/regions/region-up.webp",
    altKey: "regionUp",
    width: 1200,
    height: 800,
    aspect: "3:2",
    slot: "region",
    license: "CC0",
    isSample: true,
    verifiedBy: "Sample Generator",
    addedOn: "2026-03-01"
  },
  "region-gujarat": {
    id: "region-gujarat",
    path: "/images/regions/region-gujarat.webp",
    altKey: "regionGujarat",
    width: 1200,
    height: 800,
    aspect: "3:2",
    slot: "region",
    license: "CC0",
    isSample: true,
    verifiedBy: "Sample Generator",
    addedOn: "2026-03-01"
  },
  "region-westbengal": {
    id: "region-westbengal",
    path: "/images/regions/region-westbengal.webp",
    altKey: "regionWestBengal",
    width: 1200,
    height: 800,
    aspect: "3:2",
    slot: "region",
    license: "CC0",
    isSample: true,
    verifiedBy: "Sample Generator",
    addedOn: "2026-03-01"
  },
  "region-karnataka": {
    id: "region-karnataka",
    path: "/images/regions/region-karnataka.webp",
    altKey: "regionKarnataka",
    width: 1200,
    height: 800,
    aspect: "3:2",
    slot: "region",
    license: "CC0",
    isSample: true,
    verifiedBy: "Sample Generator",
    addedOn: "2026-03-01"
  },
  "region-kerala": {
    id: "region-kerala",
    path: "/images/regions/region-kerala.webp",
    altKey: "regionKerala",
    width: 1200,
    height: 800,
    aspect: "3:2",
    slot: "region",
    license: "CC0",
    isSample: true,
    verifiedBy: "Sample Generator",
    addedOn: "2026-03-01"
  },
  "region-odisha": {
    id: "region-odisha",
    path: "/images/regions/region-odisha.webp",
    altKey: "regionOdisha",
    width: 1200,
    height: 800,
    aspect: "3:2",
    slot: "region",
    license: "CC0",
    isSample: true,
    verifiedBy: "Sample Generator",
    addedOn: "2026-03-01"
  },
  "region-telangana": {
    id: "region-telangana",
    path: "/images/regions/region-telangana.webp",
    altKey: "regionTelangana",
    width: 1200,
    height: 800,
    aspect: "3:2",
    slot: "region",
    license: "CC0",
    isSample: true,
    verifiedBy: "Sample Generator",
    addedOn: "2026-03-01"
  },

  // 6. About
  "about-founder": {
    id: "about-founder",
    path: "/images/about/founder.webp",
    altKey: "aboutFounder",
    width: 600,
    height: 600,
    aspect: "1:1",
    slot: "about",
    license: "own",
    permissionNote: "Official profile photo provided by founder Dinesh Kumar Yadav",
    isSample: true,
    verifiedBy: "Dinesh Kumar Yadav",
    addedOn: "2026-03-01",
    notes: "Founder portrait card on /about"
  },

  // 7. Original Illustrations (SVG)
  "illustration-404": {
    id: "illustration-404",
    path: "/images/illustrations/404-field.svg",
    altKey: "illustration404",
    width: 400,
    height: 300,
    aspect: "4:3",
    slot: "illustration",
    license: "own",
    isSample: false,
    verifiedBy: "Design Team",
    addedOn: "2026-03-01"
  },
  "illustration-error": {
    id: "illustration-error",
    path: "/images/illustrations/error-tractor.svg",
    altKey: "illustrationError",
    width: 400,
    height: 300,
    aspect: "4:3",
    slot: "illustration",
    license: "own",
    isSample: false,
    verifiedBy: "Design Team",
    addedOn: "2026-03-01"
  },
  "illustration-empty-bookings": {
    id: "illustration-empty-bookings",
    path: "/images/illustrations/empty-bookings.svg",
    altKey: "illustrationEmptyBookings",
    width: 400,
    height: 300,
    aspect: "4:3",
    slot: "illustration",
    license: "own",
    isSample: false,
    verifiedBy: "Design Team",
    addedOn: "2026-03-01"
  },
  "illustration-empty-search": {
    id: "illustration-empty-search",
    path: "/images/illustrations/empty-search.svg",
    altKey: "illustrationEmptySearch",
    width: 400,
    height: 300,
    aspect: "4:3",
    slot: "illustration",
    license: "own",
    isSample: false,
    verifiedBy: "Design Team",
    addedOn: "2026-03-01"
  },
  "illustration-empty-notifications": {
    id: "illustration-empty-notifications",
    path: "/images/illustrations/empty-notifications.svg",
    altKey: "illustrationEmptyNotifications",
    width: 400,
    height: 300,
    aspect: "4:3",
    slot: "illustration",
    license: "own",
    isSample: false,
    verifiedBy: "Design Team",
    addedOn: "2026-03-01"
  },

  // 8. Sample Placeholder
  "sample-placeholder": {
    id: "sample-placeholder",
    path: "/images/sample/sample-placeholder.webp",
    altKey: "photoToBeAdded",
    width: 800,
    height: 600,
    aspect: "4:3",
    slot: "sample",
    license: "own",
    isSample: true,
    verifiedBy: "Design Team",
    addedOn: "2026-03-01"
  }
};

/**
 * Validates an image entry according to platform compliance rules.
 */
export function validateImageEntry(item: ImageRegistryItem): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  const allowedLicenses: ImageLicense[] = [
    "own",
    "CC0",
    "CC-BY",
    "CC-BY-SA",
    "Pexels",
    "Unsplash",
    "permission"
  ];

  if (!allowedLicenses.includes(item.license)) {
    errors.push(`License '${item.license}' is not allowed or unknown.`);
  }

  // Non-commercial licenses are strictly forbidden
  if (item.license.includes("NC")) {
    errors.push("Non-commercial (NC) licenses are strictly forbidden on FarmRentHub.");
  }

  // CC-BY and CC-BY-SA require creditName and sourceUrl
  if (item.license === "CC-BY" || item.license === "CC-BY-SA") {
    if (!item.creditName || item.creditName.trim() === "") {
      errors.push(`License '${item.license}' requires a valid creditName.`);
    }
    if (!item.sourceUrl || item.sourceUrl.trim() === "") {
      errors.push(`License '${item.license}' requires a valid sourceUrl.`);
    }
  }

  // People require permissionNote
  if (item.slot === "about" || item.slot === "owner") {
    if (!item.permissionNote || item.permissionNote.trim() === "") {
      errors.push(`Identifiable photo in slot '${item.slot}' requires an explicit permissionNote.`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function getImageItem(id: string): ImageRegistryItem | undefined {
  return IMAGES_REGISTRY[id];
}
