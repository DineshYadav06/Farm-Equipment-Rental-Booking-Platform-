/**
 * FarmRentHub Design Tokens
 * Conforms to Government Portal Design System (Solid Colors, High Trust, 8px grid)
 */

export const colors = {
  // Brand & Agriculture Palette
  deepGreen: "#14532d",      // Header, official banners, primary emphasis (Forest / Evergreen)
  primaryGreen: "#16a34a",   // Primary actions, badges, active states
  lightGreen: "#dcfce7",     // Soft green tint for cards and chips
  accentAmber: "#d97706",    // Wheat gold, underlines, alerts, urgent notices
  amberLight: "#fef3c7",     // Warm amber background highlight
  navy: "#1e3a5f",           // Official authority headings, portal titles
  navyLight: "#e0f2fe",      // Soft sky blue for official data tables
  
  // Neutral & Paper Palette (Off-white, high readability)
  offWhite: "#fafaf5",       // Natural organic paper background
  surfaceWhite: "#ffffff",   // Clean card & modal background
  surfaceMuted: "#f5f5ed",   // Secondary panel background
  borderDefault: "#e2e8f0",  // 1px subtle card border
  borderMedium: "#cbd5e1",   // Table borders & active inputs
  
  // High Contrast Text
  textPrimary: "#1c1917",    // Deep stone dark - 99% contrast against offWhite
  textSecondary: "#44403c",  // Stone 700 - accessible secondary text
  textMuted: "#78716c",      // Stone 500 - captions and timestamps
  
  // National Motif Accent
  tricolor: {
    saffron: "#ff9933",
    white: "#ffffff",
    green: "#138808"
  },

  // Trust & Status
  success: "#15803d",
  warning: "#b45309",
  error: "#b91c1c",
  sampleBadge: "#c2410c"     // Warm rust badge for sample data
} as const;

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px"
} as const;

export const typography = {
  fontSans: "var(--font-noto-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSerif: "var(--font-roboto-slab), Merriweather, Georgia, serif",
  baseLineHeightIndic: 1.7,
  baseLineHeightLatin: 1.5
} as const;
