/**
 * Content Integrity & Registry Verification Script
 * Validates that all active registry entries are verified or labeled as sample,
 * and ensures personal email/phone placeholders fail production builds.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registryPath = path.join(__dirname, "../src/content/registry.ts");
const siteConfigPath = path.join(__dirname, "../src/content/site-config.ts");

console.log("========================================");
console.log("FarmRentHub Content Registry & Policy Audit");
console.log("========================================");

if (!fs.existsSync(registryPath)) {
  console.error("CRITICAL: Content registry not found at " + registryPath);
  process.exit(1);
}

const fileText = fs.readFileSync(registryPath, "utf-8");

// Extract the CONTENT_REGISTRY object block
const registryBlock = fileText.split("export const CONTENT_REGISTRY")[1]?.split("export function getRegistryItem")[0] || "";

// Check if any registry item in the dictionary has status "needs-verification"
const needsVerificationMatches = registryBlock.match(/status:\s*"needs-verification"/g);

if (needsVerificationMatches && needsVerificationMatches.length > 0) {
  console.error(`[AUDIT FAILED]: Found ${needsVerificationMatches.length} items with status 'needs-verification' in CONTENT_REGISTRY!`);
  console.error("All claims must either be verified against official sources or explicitly marked as 'sample'.");
  process.exit(1);
}

const verifiedCount = (registryBlock.match(/status:\s*"verified"/g) || []).length;
const sampleCount = (registryBlock.match(/status:\s*"sample"/g) || []).length;

console.log(`✓ Active Verified Items: ${verifiedCount}`);
console.log(`✓ Explicit Sample Items: ${sampleCount}`);
console.log("✓ Zero unverified claims in public registry.");

// Production validation for personal support contacts in site-config.ts
if (fs.existsSync(siteConfigPath)) {
  const siteConfigText = fs.readFileSync(siteConfigPath, "utf-8");
  const isProd = process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production" || process.argv.includes("--prod");

  const hasPersonalEmail = siteConfigText.includes("dineshkumaryadav12651@outlook.com");
  const hasPersonalPhone = siteConfigText.includes("+919555240369");

  if (isProd && (hasPersonalEmail || hasPersonalPhone)) {
    console.error("\n[AUDIT FAILED]: Production build rejected!");
    console.error("site-config.ts still contains personal contact details (supportEmail / supportPhone).");
    console.error("Must be replaced with official business email and helpline before deploying to production.");
    process.exit(1);
  } else if (hasPersonalEmail || hasPersonalPhone) {
    console.log("ℹ Note (Development): Temporary personal contact values present in site-config.ts.");
    console.log("  (Will fail automatically in production builds until official credentials are set).");
  } else {
    console.log("✓ Official business contacts verified in site-config.ts.");
  }
}

console.log("========================================");
console.log("Content audit passed successfully!");
process.exit(0);
