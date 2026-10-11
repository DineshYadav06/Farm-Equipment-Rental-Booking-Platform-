import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const isProd = process.argv.includes("--prod") || process.env.NODE_ENV === "production";

console.log("=================================================");
console.log("FarmRentHub Images Compliance & Verification Checker");
console.log(`Environment: ${isProd ? "PRODUCTION (STRICT)" : "DEVELOPMENT (WARNINGS ONLY)"}`);
console.log("=================================================");

const errors = [];
const warnings = [];

// 1. Load and parse src/content/images-registry.ts
const registryPath = path.join(rootDir, "src", "content", "images-registry.ts");
if (!fs.existsSync(registryPath)) {
  console.error("FATAL: images-registry.ts missing!");
  process.exit(1);
}

const registryContent = fs.readFileSync(registryPath, "utf-8");

// Extract object entries from IMAGES_REGISTRY
function extractRegistryEntries(code) {
  const entries = {};
  const startIdx = code.indexOf("export const IMAGES_REGISTRY");
  if (startIdx === -1) return entries;

  const braceIdx = code.indexOf("{", startIdx);
  const closingIdx = code.lastIndexOf("};");
  const rawBody = code.substring(braceIdx + 1, closingIdx);

  // Match each entry block: "id-key": { ... }
  const regex = /"([^"]+)":\s*\{([\s\S]*?)\n\s*\}(?:,|$)/g;
  let match;
  while ((match = regex.exec(rawBody)) !== null) {
    const key = match[1];
    const block = match[2];

    const getField = (f) => {
      const m = new RegExp(`${f}:\\s*"([^"]*)"`).exec(block);
      return m ? m[1] : undefined;
    };
    const getNumField = (f) => {
      const m = new RegExp(`${f}:\\s*(\\d+)`).exec(block);
      return m ? parseInt(m[1], 10) : undefined;
    };
    const getBoolField = (f) => {
      const m = new RegExp(`${f}:\\s*(true|false)`).exec(block);
      return m ? m[1] === "true" : false;
    };

    entries[key] = {
      id: getField("id") || key,
      path: getField("path"),
      altKey: getField("altKey"),
      width: getNumField("width"),
      height: getNumField("height"),
      aspect: getField("aspect"),
      slot: getField("slot"),
      license: getField("license"),
      creditName: getField("creditName"),
      creditUrl: getField("creditUrl"),
      sourceUrl: getField("sourceUrl"),
      permissionNote: getField("permissionNote"),
      isSample: getBoolField("isSample"),
      verifiedBy: getField("verifiedBy"),
      addedOn: getField("addedOn")
    };
  }

  return entries;
}

const registry = extractRegistryEntries(registryContent);
const registeredKeys = Object.keys(registry);
console.log(`Loaded ${registeredKeys.length} images from images-registry.ts`);

// 2. Load all 12 locale images.json files
const LOCALES = ["en", "hi", "pa", "mr", "ta", "te", "bn", "gu", "kn", "ml", "or", "as"];
const localeDicts = {};

for (const loc of LOCALES) {
  const locPath = path.join(rootDir, "src", "messages", loc, "images.json");
  if (!fs.existsSync(locPath)) {
    errors.push(`Locale images file missing: src/messages/${loc}/images.json`);
    continue;
  }
  try {
    localeDicts[loc] = JSON.parse(fs.readFileSync(locPath, "utf-8"));
  } catch (err) {
    errors.push(`JSON parse error in src/messages/${loc}/images.json: ${err.message}`);
  }
}

// 3. Scan codebase for rendered AppImage usages
function scanAppImageUsages(dir) {
  const usages = [];
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const f of files) {
    const fullPath = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name !== "node_modules" && f.name !== ".next") {
        usages.push(...scanAppImageUsages(fullPath));
      }
    } else if (f.name.endsWith(".tsx") || f.name.endsWith(".ts")) {
      const content = fs.readFileSync(fullPath, "utf-8");
      // Find imageId="..." or imageId={`...`}
      const regex = /imageId=(?:\{["']([^"']+)["']\}|["']([^"']+)["'])/g;
      let m;
      while ((m = regex.exec(content)) !== null) {
        const id = m[1] || m[2];
        usages.push({ id, file: path.relative(rootDir, fullPath) });
      }
    }
  }
  return usages;
}

const renderedUsages = scanAppImageUsages(path.join(rootDir, "src"));
console.log(`Scanned ${renderedUsages.length} <AppImage /> instances in components.`);

// Check: every rendered image must exist in registry
for (const usage of renderedUsages) {
  if (!registry[usage.id]) {
    errors.push(`Rendered image '${usage.id}' in ${usage.file} is missing from images-registry.ts`);
  }
}

// 4. Validate Registry Rules
const allowedLicenses = ["own", "CC0", "CC-BY", "CC-BY-SA", "Pexels", "Unsplash", "permission"];

for (const [key, item] of Object.entries(registry)) {
  // License validation
  if (!item.license) {
    errors.push(`Image '${key}' has no license specified.`);
  } else {
    if (!allowedLicenses.includes(item.license)) {
      errors.push(`Image '${key}' has unknown license '${item.license}'.`);
    }
    if (item.license.includes("NC")) {
      errors.push(`Image '${key}' has non-commercial license '${item.license}', which is strictly forbidden.`);
    }
    if (item.license === "CC-BY" || item.license === "CC-BY-SA") {
      if (!item.creditName || !item.sourceUrl) {
        errors.push(`Image '${key}' (${item.license}) requires creditName and sourceUrl.`);
      }
    }
  }

  // Person photo permission note validation
  if (item.slot === "about" || item.slot === "owner") {
    if (!item.permissionNote || item.permissionNote.trim().length === 0) {
      errors.push(`Identifiable photo '${key}' in slot '${item.slot}' requires permissionNote.`);
    }
  }

  // Alt text translation validation across all 12 languages
  if (item.altKey) {
    for (const loc of LOCALES) {
      if (localeDicts[loc] && !localeDicts[loc][item.altKey]) {
        errors.push(`Image '${key}' missing alt text key '${item.altKey}' in locale '${loc}'`);
      }
    }
  } else {
    errors.push(`Image '${key}' has no altKey specified.`);
  }

  // File on disk checks
  if (item.path) {
    const diskPath = path.join(rootDir, "public", item.path.replace(/^\//, ""));
    if (!fs.existsSync(diskPath)) {
      errors.push(`Image file does not exist on disk: ${item.path}`);
    } else {
      const ext = path.extname(diskPath).toLowerCase();
      if (![".webp", ".avif", ".svg"].includes(ext)) {
        errors.push(`Image file '${item.path}' must be .webp, .avif, or .svg (got ${ext})`);
      }
      const stat = fs.statSync(diskPath);
      const sizeKb = Math.round(stat.size / 1024);
      if (stat.size > 300 * 1024) {
        errors.push(`Image file '${item.path}' exceeds 300 KB limit (${sizeKb} KB)`);
      }
    }
  }
}

// 5. Output Summary
console.log("\n-------------------------------------------------");
console.log(`Results: ${errors.length} error(s), ${warnings.length} warning(s).`);

if (warnings.length > 0) {
  console.log("\nWARNINGS:");
  warnings.forEach((w) => console.log(`  - [WARN] ${w}`));
}

if (errors.length > 0) {
  console.log("\nERRORS:");
  errors.forEach((e) => console.log(`  - [FAIL] ${e}`));

  if (isProd) {
    console.error("\nFATAL: Strict images:check failed in production mode.");
    process.exit(1);
  } else {
    console.log("\nDevelopment mode notice: Run with --prod to enforce build failure.");
    process.exit(0);
  }
}

console.log("\nALL IMAGE CHECKS PASSED SUCCESSFULLY!");
process.exit(0);
