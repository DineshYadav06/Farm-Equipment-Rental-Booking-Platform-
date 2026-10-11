import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const imagesDir = path.join(rootDir, "public", "images");

// Ensure all required folders exist
const dirs = [
  "hero",
  "categories",
  "how-it-works",
  "owner",
  "regions",
  "about",
  "illustrations",
  "sample",
  "incoming"
];

for (const dir of dirs) {
  const fullPath = path.join(imagesDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: public/images/${dir}`);
  }
}

// 1. Create the 5 flat SVGs (under 8KB each, flat colors, no text, no faces)
// Palette: #14532d, #16a34a, #d97706, #1e3a5f, #fafaf5

const svg404 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" fill="none" role="img" aria-hidden="true">
  <!-- Sky / Background -->
  <rect width="400" height="300" rx="16" fill="#fafaf5"/>
  <!-- Field hills -->
  <path d="M0 210 Q 100 175 220 205 T 400 190 L 400 300 L 0 300 Z" fill="#16a34a" opacity="0.85"/>
  <path d="M0 240 Q 140 210 260 235 T 400 220 L 400 300 L 0 300 Z" fill="#14532d"/>
  <!-- Furrow lines -->
  <path d="M40 260 Q 180 250 360 265" stroke="#fafaf5" stroke-width="2" stroke-dasharray="6 6" opacity="0.4"/>
  <path d="M20 280 Q 200 270 380 285" stroke="#fafaf5" stroke-width="2" stroke-dasharray="8 6" opacity="0.4"/>
  
  <!-- Field Signpost (Lost / End of road) -->
  <rect x="90" y="120" width="10" height="120" rx="2" fill="#d97706"/>
  <polygon points="50,130 140,130 160,150 140,170 50,170" fill="#1e3a5f"/>
  <circle cx="75" cy="150" r="6" fill="#fafaf5"/>
  <rect x="95" y="147" width="40" height="6" rx="3" fill="#fafaf5"/>
  
  <!-- Tractor Silhouette stuck at trail edge -->
  <g transform="translate(210, 150)">
    <!-- Rear Big Wheel -->
    <circle cx="45" cy="65" r="30" fill="#1e3a5f"/>
    <circle cx="45" cy="65" r="18" fill="#d97706"/>
    <circle cx="45" cy="65" r="7" fill="#fafaf5"/>
    <!-- Front Small Wheel -->
    <circle cx="125" cy="73" r="18" fill="#1e3a5f"/>
    <circle cx="125" cy="73" r="9" fill="#d97706"/>
    <circle cx="125" cy="73" r="4" fill="#fafaf5"/>
    <!-- Body -->
    <path d="M35 55 L35 25 L75 25 L85 45 L135 48 L140 70 L95 70 L90 55 Z" fill="#14532d"/>
    <!-- Cabin Roof -->
    <path d="M20 25 L80 25 L80 18 L20 18 Z" fill="#16a34a"/>
    <rect x="25" y="25" width="4" height="30" fill="#1e3a5f"/>
    <!-- Exhaust pipe -->
    <rect x="110" y="28" width="5" height="20" fill="#1e3a5f"/>
    <path d="M110 28 Q 115 18 122 20" stroke="#1e3a5f" stroke-width="3" fill="none"/>
  </g>
</svg>`;

const svgError = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" fill="none" role="img" aria-hidden="true">
  <!-- Sky / Background -->
  <rect width="400" height="300" rx="16" fill="#fafaf5"/>
  <!-- Field ground -->
  <path d="M0 230 Q 200 200 400 230 L 400 300 L 0 300 Z" fill="#14532d"/>
  
  <!-- Tractor in repair / maintenance -->
  <g transform="translate(110, 105)">
    <!-- Rear Big Wheel -->
    <circle cx="50" cy="85" r="34" fill="#1e3a5f"/>
    <circle cx="50" cy="85" r="20" fill="#d97706"/>
    <circle cx="50" cy="85" r="8" fill="#fafaf5"/>
    <!-- Front Wheel -->
    <circle cx="140" cy="94" r="22" fill="#1e3a5f"/>
    <circle cx="140" cy="94" r="12" fill="#d97706"/>
    <circle cx="140" cy="94" r="5" fill="#fafaf5"/>
    <!-- Body -->
    <path d="M40 75 L40 40 L85 40 L95 60 L150 64 L155 90 L110 90 L105 75 Z" fill="#14532d"/>
    <!-- Engine Bonnet Hood open / highlighted -->
    <path d="M92 58 L152 40 L154 50 L95 62 Z" fill="#16a34a"/>
    <!-- Exhaust -->
    <rect x="120" y="38" width="6" height="25" fill="#1e3a5f"/>
  </g>
  
  <!-- Large Diagonal Service Wrench -->
  <g transform="translate(230, 70) rotate(28)">
    <rect x="0" y="18" width="80" height="14" rx="4" fill="#d97706"/>
    <!-- Wrench head 1 -->
    <path d="M 0 10 A 15 15 0 0 0 0 40 L 15 32 L 15 18 Z" fill="#d97706"/>
    <!-- Wrench head 2 -->
    <path d="M 80 10 A 15 15 0 0 1 80 40 L 65 32 L 65 18 Z" fill="#d97706"/>
    <circle cx="40" cy="25" r="4" fill="#fafaf5"/>
  </g>
</svg>`;

const svgEmptyBookings = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" fill="none" role="img" aria-hidden="true">
  <rect width="400" height="300" rx="16" fill="#fafaf5"/>
  
  <!-- Calendar Base -->
  <g transform="translate(125, 45)">
    <!-- Drop Shadow / Back plate -->
    <rect x="4" y="6" width="150" height="160" rx="14" fill="#1e3a5f" opacity="0.15"/>
    <!-- Calendar Card -->
    <rect x="0" y="0" width="150" height="160" rx="14" fill="#ffffff" stroke="#1e3a5f" stroke-width="3"/>
    <!-- Calendar Header -->
    <path d="M0 14 C0 6 6 0 14 0 L136 0 C144 0 150 6 150 14 L150 42 L0 42 Z" fill="#14532d"/>
    <!-- Calendar Rings -->
    <rect x="30" y="-8" width="10" height="16" rx="4" fill="#d97706"/>
    <rect x="110" y="-8" width="10" height="16" rx="4" fill="#d97706"/>
    
    <!-- Wheat Ear Motif inside calendar date area -->
    <g transform="translate(75, 105)">
      <!-- Stem -->
      <path d="M0 35 L0 -25" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
      <!-- Wheat Grains / Kernels -->
      <ellipse cx="-10" cy="-16" rx="8" ry="4" transform="rotate(-30 -10 -16)" fill="#d97706"/>
      <ellipse cx="10" cy="-16" rx="8" ry="4" transform="rotate(30 10 -16)" fill="#d97706"/>
      <ellipse cx="-10" cy="-3" rx="8" ry="4" transform="rotate(-30 -10 -3)" fill="#16a34a"/>
      <ellipse cx="10" cy="-3" rx="8" ry="4" transform="rotate(30 10 -3)" fill="#16a34a"/>
      <ellipse cx="-10" cy="10" rx="8" ry="4" transform="rotate(-30 -10 10)" fill="#14532d"/>
      <ellipse cx="10" cy="10" rx="8" ry="4" transform="rotate(30 10 10)" fill="#14532d"/>
      <ellipse cx="0" cy="-26" rx="6" ry="3" transform="rotate(-90 0 -26)" fill="#d97706"/>
    </g>
  </g>
  
  <!-- Ground Baseline -->
  <path d="M80 240 Q 200 230 320 240" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>
  <circle cx="200" cy="255" r="4" fill="#d97706"/>
</svg>`;

const svgEmptySearch = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" fill="none" role="img" aria-hidden="true">
  <rect width="400" height="300" rx="16" fill="#fafaf5"/>
  
  <!-- Field Landscape with furrows -->
  <path d="M30 220 C 120 200, 280 200, 370 220 L 370 270 L 30 270 Z" fill="#14532d" opacity="0.9"/>
  <path d="M50 235 C 140 225, 260 225, 350 235" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>
  <path d="M70 250 C 150 242, 250 242, 330 250" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
  
  <!-- Sprouting seed in field center -->
  <g transform="translate(190, 160)">
    <path d="M10 35 Q 10 15 10 5" stroke="#14532d" stroke-width="3" stroke-linecap="round"/>
    <path d="M10 12 C 0 5, -8 18, 10 24" fill="#16a34a"/>
    <path d="M10 7 C 20 0, 28 13, 10 19" fill="#16a34a"/>
  </g>

  <!-- Large Magnifier Scanning the Field -->
  <g transform="translate(140, 60)">
    <!-- Handle -->
    <rect x="95" y="100" width="16" height="65" rx="8" transform="rotate(-45 95 100)" fill="#1e3a5f"/>
    <!-- Glass Rim -->
    <circle cx="65" cy="65" r="55" stroke="#1e3a5f" stroke-width="9" fill="none"/>
    <!-- Lens reflection -->
    <path d="M 35 45 A 40 40 0 0 1 85 25" stroke="#d97706" stroke-width="4" stroke-linecap="round" fill="none"/>
  </g>
</svg>`;

const svgEmptyNotifications = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" fill="none" role="img" aria-hidden="true">
  <rect width="400" height="300" rx="16" fill="#fafaf5"/>
  
  <!-- Peaceful Farm Bell -->
  <g transform="translate(145, 55)">
    <!-- Bell Top loop -->
    <circle cx="55" cy="25" r="14" stroke="#d97706" stroke-width="4" fill="none"/>
    <!-- Bell Body -->
    <path d="M 32 45 C 32 30, 78 30, 78 45 C 78 75, 105 100, 105 115 L 5 115 C 5 100, 32 75, 32 45 Z" fill="#1e3a5f"/>
    <!-- Bell Rim -->
    <rect x="0" y="115" width="110" height="12" rx="6" fill="#14532d"/>
    <!-- Clapper -->
    <circle cx="55" cy="132" r="9" fill="#d97706"/>
    
    <!-- Sprout emerging upward from bell top -->
    <g transform="translate(45, -10)">
      <path d="M10 20 Q 10 5 10 -5" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>
      <path d="M10 5 C 0 -2, -6 10, 10 15" fill="#16a34a"/>
      <path d="M10 0 C 20 -7, 26 5, 10 10" fill="#14532d"/>
    </g>
  </g>
  
  <!-- Soft ground wave -->
  <path d="M110 235 Q 200 220 290 235" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>
</svg>`;

const illustrations = [
  { file: "404-field.svg", content: svg404 },
  { file: "error-tractor.svg", content: svgError },
  { file: "empty-bookings.svg", content: svgEmptyBookings },
  { file: "empty-search.svg", content: svgEmptySearch },
  { file: "empty-notifications.svg", content: svgEmptyNotifications }
];

for (const { file, content } of illustrations) {
  const filePath = path.join(imagesDir, "illustrations", file);
  fs.writeFileSync(filePath, content.trim(), "utf-8");
  const size = fs.statSync(filePath).size;
  console.log(`Wrote illustration: ${file} (${size} bytes, <8KB)`);
}

// 2. Convert public/images/hero_tractor.jpg to public/images/hero/hero-field-tractor.webp (1600x1200)
const srcHero = path.join(imagesDir, "hero_tractor.jpg");
const dstHero = path.join(imagesDir, "hero", "hero-field-tractor.webp");

if (fs.existsSync(srcHero)) {
  await sharp(srcHero)
    .resize(1600, 1200, { fit: "cover", position: "center" })
    .webp({ quality: 80, effort: 6 })
    .toFile(dstHero);
  const heroStat = fs.statSync(dstHero);
  console.log(`Generated hero-field-tractor.webp (${heroStat.size} bytes)`);
}

// 3. Helper to generate clean neutral placeholder WebP
// flat #e8e8e0 background with a subtle centered graphic emblem, under 20KB
async function generatePlaceholderWebp(filePath, width, height, label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="#e8e8e0"/>
    <g transform="translate(${width / 2}, ${height / 2})">
      <!-- Subtle agricultural emblem -->
      <circle cx="0" cy="0" r="${Math.min(width, height) * 0.18}" fill="#dcdcd2"/>
      <path d="M -30 25 L 30 25 L 35 15 L 20 5 L -20 5 L -35 15 Z" fill="#14532d" opacity="0.35"/>
      <circle cx="-18" cy="25" r="14" fill="#1e3a5f" opacity="0.4"/>
      <circle cx="18" cy="27" r="9" fill="#1e3a5f" opacity="0.4"/>
      <path d="M 0 -15 Q 15 -35 30 -30 Q 15 -15 0 -15" fill="#16a34a" opacity="0.4"/>
      <path d="M 0 -15 Q -15 -35 -30 -30 Q -15 -15 0 -15" fill="#d97706" opacity="0.4"/>
    </g>
  </svg>`;

  await sharp(Buffer.from(svg))
    .webp({ quality: 75 })
    .toFile(filePath);
  const stat = fs.statSync(filePath);
  console.log(`Generated WebP placeholder: ${path.relative(rootDir, filePath)} (${stat.size} bytes)`);
}

// List of all placeholder files to create:
const placeholderFiles = [
  // Sample placeholder
  { dir: "sample", file: "sample-placeholder.webp", w: 800, h: 600, label: "Sample" },

  // Categories (14 categories, 800x600)
  { dir: "categories", file: "cat-tractor.webp", w: 800, h: 600, label: "Tractor" },
  { dir: "categories", file: "cat-combine.webp", w: 800, h: 600, label: "Combine Harvester" },
  { dir: "categories", file: "cat-rotavator.webp", w: 800, h: 600, label: "Rotavator" },
  { dir: "categories", file: "cat-seed-drill.webp", w: 800, h: 600, label: "Seed Drill" },
  { dir: "categories", file: "cat-sprayer.webp", w: 800, h: 600, label: "Sprayer" },
  { dir: "categories", file: "cat-pump-set.webp", w: 800, h: 600, label: "Pump Set" },
  { dir: "categories", file: "cat-thresher.webp", w: 800, h: 600, label: "Thresher" },
  { dir: "categories", file: "cat-drone.webp", w: 800, h: 600, label: "Drone" },
  { dir: "categories", file: "cat-cultivator.webp", w: 800, h: 600, label: "Cultivator" },
  { dir: "categories", file: "cat-laser-leveller.webp", w: 800, h: 600, label: "Laser Leveller" },
  { dir: "categories", file: "cat-paddy-transplanter.webp", w: 800, h: 600, label: "Paddy Transplanter" },
  { dir: "categories", file: "cat-baler.webp", w: 800, h: 600, label: "Baler" },
  { dir: "categories", file: "cat-trolley.webp", w: 800, h: 600, label: "Trolley" },
  { dir: "categories", file: "cat-chaff-cutter.webp", w: 800, h: 600, label: "Chaff Cutter" },

  // How it works (800x600)
  { dir: "how-it-works", file: "step-1-find.webp", w: 800, h: 600, label: "Step 1 Find" },
  { dir: "how-it-works", file: "step-2-book.webp", w: 800, h: 600, label: "Step 2 Book" },
  { dir: "how-it-works", file: "step-3-farm.webp", w: 800, h: 600, label: "Step 3 Farm" },

  // Owner CTA (1200x800)
  { dir: "owner", file: "owner-cta.webp", w: 1200, h: 800, label: "Owner CTA" },

  // Regions (1200x800, 11 regions)
  { dir: "regions", file: "region-punjab-wheat.webp", w: 1200, h: 800, label: "Punjab Wheat" },
  { dir: "regions", file: "region-maharashtra-sugarcane.webp", w: 1200, h: 800, label: "Maharashtra Sugarcane" },
  { dir: "regions", file: "region-tamilnadu-paddy.webp", w: 1200, h: 800, label: "Tamil Nadu Paddy" },
  { dir: "regions", file: "region-assam-tea.webp", w: 1200, h: 800, label: "Assam Tea" },
  { dir: "regions", file: "region-up.webp", w: 1200, h: 800, label: "Uttar Pradesh" },
  { dir: "regions", file: "region-gujarat.webp", w: 1200, h: 800, label: "Gujarat" },
  { dir: "regions", file: "region-westbengal.webp", w: 1200, h: 800, label: "West Bengal" },
  { dir: "regions", file: "region-karnataka.webp", w: 1200, h: 800, label: "Karnataka" },
  { dir: "regions", file: "region-kerala.webp", w: 1200, h: 800, label: "Kerala" },
  { dir: "regions", file: "region-odisha.webp", w: 1200, h: 800, label: "Odisha" },
  { dir: "regions", file: "region-telangana.webp", w: 1200, h: 800, label: "Telangana" },

  // About Founder (600x600)
  { dir: "about", file: "founder.webp", w: 600, h: 600, label: "Founder" }
];

for (const p of placeholderFiles) {
  const pPath = path.join(imagesDir, p.dir, p.file);
  await generatePlaceholderWebp(pPath, p.w, p.h, p.label);
}

console.log("All image placeholders and illustrations successfully built!");
