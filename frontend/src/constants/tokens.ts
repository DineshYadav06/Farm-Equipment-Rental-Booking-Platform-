/**
 * FarmRentHub Color & Design Tokens
 * Conforms to WCAG AA Contrast Ratios in Light and Dark modes.
 * Solid colors only - No gradients, no emojis.
 */

export const THEME_TOKENS = {
  light: {
    bg: "#fafaf5",
    bgWheat: "#f6f1e3",
    bgLeaf: "#eef6ee",
    surface: "#ffffff",
    topbar: "#f3f4f0",
    border: "#e5e5df",
    text: "#1c1917",
    muted: "#57534e",
    headingNavy: "#1e3a5f",
    linkGreen: "#15803d", // #15803d for accessible text & button bg with white text
    deepGreen: "#14532d",
    amberText: "#b45309",
    amberFill: "#d97706",
    amberSoft: "#fef3c7",
    error: "#b91c1c"
  },
  dark: {
    bg: "#101512",
    bgWheat: "#171d17",
    bgLeaf: "#141c16",
    surface: "#1a211b",
    topbar: "#151b16",
    border: "#2e382f",
    text: "#ecefe8",
    muted: "#a8b0a4",
    heading: "#c7d7ee",
    primaryButtonBg: "#22c55e",
    primaryButtonText: "#052e16",
    links: "#4ade80",
    footerOwnerBand: "#0b2e1a",
    amber: "#fbbf24",
    amberSoft: "#3a2c0a",
    error: "#f87171"
  }
} as const;

export type ThemeMode = "light" | "dark" | "system";
