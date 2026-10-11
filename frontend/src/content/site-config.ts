/**
 * FarmRentHub Site Configuration
 * Central source of truth for site-wide settings, contact details,
 * legal representative disclosures, and feature flags.
 */

export const SITE_CONFIG = {
  // Official Kisan Call Centre Toll-Free Helpline
  helplineNumber: "1800-180-1551",
  helplineTel: "tel:18001801551",

  // Layer 3 Agricultural Ticker Feature Flag
  showTicker: true,

  // Default Geographic Focus
  defaultState: "Punjab",
  defaultDistrict: "Ludhiana",

  // Founder & Ownership Details
  ownerName: "Dinesh Kumar Yadav",
  ownerRole: "Founder and Full-Stack Developer",
  operatorLine: "Platform operated by Dinesh Kumar Yadav",

  // Grievance Redressal Officer (DPDP Act & E-Commerce Rules)
  grievanceOfficer: "Dinesh Kumar Yadav",
  grievanceResponseTime: "48 hours",

  // Contact Information (Temporary personal values to be replaced before launch)
  supportEmail: "dineshkumaryadav12651@outlook.com", // TODO: replace with business email before launch
  supportPhone: "+919555240369",                     // TODO: replace with business number before launch

  // Social & Developer Profiles
  linkedinUrl: "https://www.linkedin.com/in/dineshkumaryadav",
  githubUrl: "https://github.com/dineshkumaryadav",

  // Feature Flags
  showBuiltBy: false, // Default false until formal written permission is obtained

  // Brand Info
  brandName: "FarmRentHub",
  taglineDefault: "Rent the Right Equipment. Grow with Ease."
} as const;
