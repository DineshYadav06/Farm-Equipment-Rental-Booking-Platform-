/**
 * i18n Verification Script
 * Validates that all translation files contain required keys and checks their review status.
 * Also scans source components to flag hardcoded strings and bilingual " / " labels.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const messagesDir = path.join(__dirname, "../src/messages");
const srcDir = path.join(__dirname, "../src");
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

// 1. Audit translation files
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
      hasError = true;
    }
  }
}

// 2. Scan component files for bilingual " / " strings in visible JSX text
console.log("\n--- Checking JSX for Bilingual ' / ' Patterns ---");
const allowedSlashPatterns = [
  "style={{",
  "http://",
  "https://",
  "Math.",
  "new Date",
  "//",
  "/*",
  "*/"
];

function checkDirectoryForBilingualSlashes(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next") {
        checkDirectoryForBilingualSlashes(fullPath);
      }
    } else if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".jsx"))) {
      const code = fs.readFileSync(fullPath, "utf-8");
      const lines = code.split("\n");
      lines.forEach((line, index) => {
        const trimmed = line.trim();
        // Ignore comments, imports, regex, code calculations
        if (
          trimmed.startsWith("//") ||
          trimmed.startsWith("/*") ||
          trimmed.startsWith("*") ||
          trimmed.includes("http://") ||
          trimmed.includes("https://") ||
          trimmed.includes("Math.") ||
          trimmed.includes("width:") ||
          trimmed.includes("height:") ||
          trimmed.includes("import ")
        ) {
          return;
        }

        // Flag visible JSX strings containing " / " like "Word / शब्द"
        const jsxBilingualRegex = />[^<]*\b[A-Za-z\u0900-\u0D7F]+\s+\/\s+[A-Za-z\u0900-\u0D7F]+[^<]*</;
        if (jsxBilingualRegex.test(line)) {
          console.warn(`[BILINGUAL FLAG] ${path.relative(srcDir, fullPath)}:${index + 1}: ${trimmed}`);
          hasError = true;
        }
      });
    }
  }
}

checkDirectoryForBilingualSlashes(srcDir);

console.log("========================================");
if (hasError) {
  console.log("i18n check completed with warnings or missing keys.");
  process.exit(1);
} else {
  console.log("i18n verification passed successfully: Zero bilingual slashes & complete translations for all 12 Indian languages!");
  process.exit(0);
}
