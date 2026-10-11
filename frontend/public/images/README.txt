================================================================================
FarmRentHub - Agricultural Photography & Image Guidelines
================================================================================

All photography on FarmRentHub represents authentic Indian agriculture, real machinery,
and verified Creative Commons, royalty-free, or platform-owned rights.

1. DIRECTORY SPECIFICATIONS & REQUIRED SLOTS
--------------------------------------------------------------------------------
Format: WebP (Quality ~75, max file size 300 KB). Strip all EXIF GPS data prior to publishing.

[Hero]
- /public/images/hero/hero-field-tractor.webp
  Size: 1600x1200 | Aspect: 4:3 | Max: 300 KB
  Shot: Real Indian tractor operating in a wheat field under warm morning golden hour light.

[Categories (14 Categories)] - 800x600 each (4:3 aspect ratio, max 300 KB)
- /public/images/categories/cat-tractor.webp           : Multi-purpose utility tractor in Indian rural landscape
- /public/images/categories/cat-combine.webp           : Multi-crop combine harvester working in ripe wheat or paddy
- /public/images/categories/cat-rotavator.webp         : Tractor rotavator breaking clods and preparing fine soil seedbed
- /public/images/categories/cat-seed-drill.webp        : Zero-till seed-cum-fertilizer drill sowing rows
- /public/images/categories/cat-sprayer.webp           : Boom sprayer or tractor-mounted tractor sprayer in green field
- /public/images/categories/cat-pump-set.webp          : Mobile diesel/electric irrigation pump set by field canal
- /public/images/categories/cat-thresher.webp          : Multi-crop grain thresher operating during post-harvest
- /public/images/categories/cat-drone.webp             : Hexacopter precision agriculture drone spraying field
- /public/images/categories/cat-cultivator.webp        : Spring-loaded tine cultivator tilling dry field
- /public/images/categories/cat-laser-leveller.webp    : Laser transmitter and scraper levelling paddy basin
- /public/images/categories/cat-paddy-transplanter.webp: Mechanical 4/8-row paddy transplanter in wet puddled field
- /public/images/categories/cat-baler.webp             : Round or square straw baler packaging field crop residue
- /public/images/categories/cat-trolley.webp           : Hydraulic tipping agricultural trailer laden with harvested crop
- /public/images/categories/cat-chaff-cutter.webp      : Electric or PTO animal fodder chaff cutter machine

[How It Works (3 Steps)] - 800x600 each (4:3 aspect ratio, max 300 KB)
- /public/images/how-it-works/step-1-find.webp: Indian farmer checking machinery listings on smartphone in field
- /public/images/how-it-works/step-2-book.webp: Tractor implement arriving at village farm lane for booked job
- /public/images/how-it-works/step-3-farm.webp: Machinery performing deep tillage / harvesting in field

[Owner CTA] - 1200x800 (3:2 aspect ratio, max 300 KB)
- /public/images/owner/owner-cta.webp: Proud machine owner standing beside clean tractor ready for booking

[Regions (11 State Hubs)] - 1200x800 each (3:2 aspect ratio, max 300 KB)
- /public/images/regions/region-punjab-wheat.webp          : Combine harvester in golden Punjab wheat belt
- /public/images/regions/region-maharashtra-sugarcane.webp: Sugarcane mechanization & tillage in Maharashtra
- /public/images/regions/region-tamilnadu-paddy.webp      : Paddy harvesting in Thanjavur delta, Tamil Nadu
- /public/images/regions/region-assam-tea.webp             : Tea garden mechanized sprayer in upper Assam
- /public/images/regions/region-up.webp                    : Tubewell irrigation & wheat threshing in Uttar Pradesh
- /public/images/regions/region-gujarat.webp               : Cotton and groundnut mechanization in Saurashtra
- /public/images/regions/region-westbengal.webp            : Power tiller and transplanter in West Bengal paddy field
- /public/images/regions/region-karnataka.webp             : Red soil tractor tilling in Karnataka Deccan
- /public/images/regions/region-kerala.webp                : Compact rubber track paddy harvester in Palakkad
- /public/images/regions/region-odisha.webp                : Hirakud delta mechanized paddy farming in Odisha
- /public/images/regions/region-telangana.webp             : Cotton and maize mechanized cultivation in Telangana

[About Section] - 600x600 (1:1 square crop, max 200 KB)
- /public/images/about/founder.webp: Professional portrait photo of founder Dinesh Kumar Yadav

[Original Illustrations (SVG)] - Vector format (< 8 KB each, flat colors, no faces, no text inside SVG)
- /public/images/illustrations/404-field.svg           : Lost tractor and signpost in field
- /public/images/illustrations/error-tractor.svg        : Tractor with maintenance wrench
- /public/images/illustrations/empty-bookings.svg      : Calendar card with wheat ear motif
- /public/images/illustrations/empty-search.svg        : Magnifier scanning field rows
- /public/images/illustrations/empty-notifications.svg : Farm bell with sprouting grain

[Temporary Placeholders]
- /public/images/sample/sample-placeholder.webp: Neutral placeholder (#e8e8e0) used when real photo is pending.


2. ALLOWED SOURCES & ATTRIBUTION FORMAT
--------------------------------------------------------------------------------
- Own Photos (Best): Verified photos taken on Indian farms. License: "own".
- Wikimedia Commons: CC0, CC-BY, CC-BY-SA only. Requires photographer name & source URL.
  Attribution format: "Photo: [Photographer Name], [License]"
- Pexels: Free commercial license. Requires credit and source URL.
- Unsplash: Unsplash commercial license. Requires credit and source URL.
- Formal Permission: Signed consent release for owner/farmer photos.


3. STRICTLY FORBIDDEN
--------------------------------------------------------------------------------
- Google Images / Pinterest / Web scrape unverified photos.
- Brand-name tractor focus or visible manufacturer logos (Mahindra, John Deere, Swaraj, Sonalika, New Holland, etc.) as primary logos.
- Photos of identifiable people without signed written model release.
- AI-generated human faces or synthetic uncanny-valley farm renders.
- Foreign / western farm scenes (e.g., giant 12-row Midwestern American combines, European vineyards).
- Non-Commercial licenses (CC-NC, CC-BY-NC, CC-BY-NC-SA) are strictly prohibited.


4. SHOOTING & COMPOSITION TIPS
--------------------------------------------------------------------------------
- Time of Day: Shoot during golden hour (early morning or late afternoon).
- Orientation: Landscape orientation (4:3 or 3:2 aspect ratio).
- Composition: Tractor/implement slightly off-center (rule of thirds), showing context of the soil/crop.
- Privacy: Never capture vehicle registration plates or private farmer home addresses.
- Quality: No digital watermarks, stamps, or heavy filters.


5. NAMING & FILE CONVENTIONS
--------------------------------------------------------------------------------
- Naming rule: Strictly lowercase, hyphens only, no spaces or underscores (e.g. cat-seed-drill.webp).
- Optimize with `npm run images:optimize` to convert JPG/PNG to WebP and strip EXIF metadata.
- Verify registry compliance with `npm run images:check`.
================================================================================
