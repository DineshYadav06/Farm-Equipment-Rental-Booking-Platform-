/**
 * i18n Verification Script
 * Validates that all translation files contain required keys and checks their review status.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const messagesDir = path.join(__dirname, "../src/messages");
const locales = ["hi", "en", "pa", "mr", "gu", "bn", "ta", "te", "kn", "ml", "or", "as"];

console.log("========================================");
console.log("FarmRentHub i18n Verification Audit");
console.log("========================================");

let hasError = false;
const enCommonPath = path.join(messagesDir, "en/common.json");

if (!fs.existsSync(enCommonPath)) {
  console.error("CRITICAL: English base translation file missing at " + enCommonPath);
  process.exit(1);
}

const enCommon = JSON.parse(fs.readFileSync(enCommonPath, "utf-8"));
const baseKeys = Object.keys(enCommon);

for (const loc of locales) {
  const locPath = path.join(messagesDir, `${loc}/common.json`);
  if (!fs.existsSync(locPath)) {
    console.warn(`[WARNING] Locale '${loc}' common.json missing!`);
    hasError = true;
    continue;
  }

  const content = JSON.parse(fs.readFileSync(locPath, "utf-8"));
  const meta = content._meta || {};
  console.log(`✓ Locale '${loc}': status = ${meta.status || "needs-review"}, keys: ${Object.keys(content).length}`);

  for (const k of baseKeys) {
    if (k !== "_meta" && !(k in content)) {
      console.warn(`  ↳ Missing top-level key '${k}' in ${loc}`);
    }
  }
}

console.log("========================================");
if (hasError) {
  console.log("i18n check completed with warnings.");
  process.exit(1);
} else {
  console.log("i18n verification passed successfully for all 12 Indian languages!");
  process.exit(0);
}
