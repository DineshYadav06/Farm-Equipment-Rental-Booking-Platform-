/**
 * Seed Data Generator for FarmRentHub
 * Generates 300 realistic sample equipment records across 10 agricultural regions of India.
 * Conforms to strict sample guidelines:
 * - isSample: true
 * - Fake phone numbers in 90000 000xx series
 * - Generic machine names with NO brand names (e.g. "50 HP Utility Tractor")
 * - Sample data status in content registry
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGIONS = [
  { state: "Punjab", district: "Ludhiana", lat: 30.90, lng: 75.85, specialMachines: ["Combine Harvester", "Super Seeder", "Happy Seeder", "Straw Baler"] },
  { state: "Haryana", district: "Karnal", lat: 29.68, lng: 76.99, specialMachines: ["Laser Land Leveller", "Super Seeder", "Tractor 55 HP"] },
  { state: "Uttar Pradesh", district: "Meerut", lat: 28.98, lng: 77.70, specialMachines: ["Multicrop Thresher", "Cultivator", "Diesel Pump Set", "Reaper"] },
  { state: "Bihar", district: "Patna", lat: 25.59, lng: 85.13, specialMachines: ["Power Tiller", "Multicrop Thresher", "Tubewell Pump"] },
  { state: "Maharashtra", district: "Kolhapur", lat: 16.70, lng: 74.24, specialMachines: ["Sugarcane Harvester", "Orchard Mist Sprayer", "Drip Kit"] },
  { state: "Gujarat", district: "Rajkot", lat: 22.30, lng: 70.80, specialMachines: ["Groundnut Digger", "Cotton Picker", "Rotavator"] },
  { state: "West Bengal", district: "Burdwan", lat: 23.23, lng: 87.86, specialMachines: ["Power Tiller", "Paddy Transplanter", "Mini Combine"] },
  { state: "Assam", district: "Dibrugarh", lat: 27.47, lng: 94.91, specialMachines: ["Tea Garden Sprayer", "Power Weeder", "Power Tiller"] },
  { state: "Tamil Nadu", district: "Thanjavur", lat: 10.78, lng: 79.13, specialMachines: ["Paddy Transplanter", "Mini Combine Harvester", "Power Weeder"] },
  { state: "Kerala", district: "Palakkad", lat: 10.78, lng: 76.65, specialMachines: ["Mini Tiller", "Coconut Tree Climber", "Power Weeder"] }
];

const CATEGORY_MAP = {
  "Tractor 50 HP": { category: "Tractor", rateHour: 1200, rateDay: 7500, hp: 50 },
  "Tractor 40 HP": { category: "Tractor", rateHour: 950, rateDay: 6200, hp: 40 },
  "Combine Harvester": { category: "Harvester", rateHour: 2800, rateDay: 18000, hp: 105 },
  "Mini Combine Harvester": { category: "Harvester", rateHour: 1900, rateDay: 12500, hp: 70 },
  "Rotavator 7-Feet": { category: "Rotavator", rateHour: 850, rateDay: 5000, hp: 45 },
  "Super Seeder": { category: "Seed Drill", rateHour: 1100, rateDay: 7000, hp: 55 },
  "Happy Seeder": { category: "Seed Drill", rateHour: 950, rateDay: 6000, hp: 50 },
  "Laser Land Leveller": { category: "Land Preparation", rateHour: 1100, rateDay: 7200, hp: 50 },
  "Multicrop Thresher": { category: "Thresher", rateHour: 750, rateDay: 4800, hp: 35 },
  "Boom Sprayer 600L": { category: "Sprayer", rateHour: 600, rateDay: 3800, hp: 35 },
  "Power Tiller 12 HP": { category: "Land Preparation", rateHour: 500, rateDay: 3200, hp: 12 },
  "Diesel Pump Set 10 HP": { category: "Irrigation Equipment", rateHour: 350, rateDay: 2200, hp: 10 },
  "Straw Baler": { category: "Straw and residue", rateHour: 1400, rateDay: 9000, hp: 60 },
  "Sugarcane Harvester": { category: "Harvesting", rateHour: 3200, rateDay: 22000, hp: 175 },
  "Groundnut Digger": { category: "Harvesting", rateHour: 900, rateDay: 5500, hp: 40 },
  "Cotton Picker": { category: "Harvesting", rateHour: 1500, rateDay: 9500, hp: 50 },
  "Tea Garden Sprayer": { category: "Plant protection", rateHour: 450, rateDay: 2800, hp: 15 },
  "Paddy Transplanter 4-Row": { category: "Sowing and planting", rateHour: 1000, rateDay: 6500, hp: 20 },
  "Mini Tiller": { category: "Land preparation", rateHour: 400, rateDay: 2600, hp: 8 },
  "Coconut Tree Climber": { category: "Horticulture and orchard", rateHour: 250, rateDay: 1500, hp: 3 }
};

const SAMPLE_NAMES = [
  "Ramesh Patel", "Gurmeet Singh", "Balwinder Dhillon", "Shivaji Shinde",
  "Anand Kumar", "Subhasish Mondal", "Murugan Velu", "Rangaswamy Gowda",
  "Kalyan Das", "Bikash Saikia", "Mohan Lal Sharma", "Naveen Reddy"
];

console.log("Generating 300 Indian regional sample equipment listings...");

const listings = [];
const machineKeys = Object.keys(CATEGORY_MAP);

for (let i = 1; i <= 300; i++) {
  const region = REGIONS[(i - 1) % REGIONS.length];
  // 60% chance to pick regional special machine, 40% general
  let machineName;
  if (Math.random() > 0.4 && region.specialMachines.length > 0) {
    machineName = region.specialMachines[Math.floor(Math.random() * region.specialMachines.length)];
    if (!CATEGORY_MAP[machineName]) machineName = machineKeys[i % machineKeys.length];
  } else {
    machineName = machineKeys[i % machineKeys.length];
  }

  const spec = CATEGORY_MAP[machineName] || CATEGORY_MAP["Tractor 50 HP"];
  const ownerName = SAMPLE_NAMES[(i - 1) % SAMPLE_NAMES.length];
  const phone = `90000 000${String(i).padStart(2, "0")}`.slice(0, 11);

  // Add realistic jitter to coordinates (+- 0.15 deg)
  const lat = parseFloat((region.lat + (Math.random() - 0.5) * 0.25).toFixed(4));
  const lng = parseFloat((region.lng + (Math.random() - 0.5) * 0.25).toFixed(4));

  listings.push({
    id: `eq_sample_${String(i).padStart(4, "0")}`,
    owner_id: `usr_sample_${(i % 25) + 1}`,
    owner_name: ownerName,
    owner_phone: phone,
    title: `${spec.hp ? spec.hp + " HP " : ""}${machineName}`,
    category: spec.category,
    brand: "Generic Agricultural Implements",
    model: `Model ${2021 + (i % 4)}`,
    year: 2021 + (i % 4),
    hp: spec.hp,
    fuel_type: spec.hp > 15 ? "Diesel" : "Petrol / Solar",
    description: `Reliable ${machineName} in field-ready condition for rent in ${region.district}, ${region.state}. Scheduled maintenance up to date.`,
    images: [
      "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1c?auto=format&fit=crop&w=600&q=80"
    ],
    hourly_rate: spec.rateHour,
    daily_rate: spec.rateDay,
    security_deposit: spec.rateDay,
    with_driver: i % 3 !== 0, // 66% with operator
    city: region.district,
    state: region.state,
    pincode: "140001",
    latitude: lat,
    longitude: lng,
    is_available: i % 5 !== 0,
    condition: "Excellent (Field Inspected)",
    average_rating: 4.5 + ((i % 5) * 0.1),
    total_reviews: 4 + (i % 18),
    total_bookings: 8 + (i % 30),
    distance_km: 5 + (i % 42),
    isSample: true
  });
}

const outputPath = path.join(__dirname, "../src/content/sample-listings.json");
fs.writeFileSync(outputPath, JSON.stringify(listings, null, 2), "utf-8");

console.log(`✓ Successfully generated ${listings.length} listings in: ${outputPath}`);
