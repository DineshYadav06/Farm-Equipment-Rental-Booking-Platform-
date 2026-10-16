"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SourceNote } from "@/components/ui/SourceNote";
import {
  Calendar,
  Sun,
  CloudRain,
  Snowflake,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Wrench,
  Sparkles
} from "lucide-react";

interface SeasonStage {
  title: string;
  timing: string;
  description: string;
  recommendedEquipment: {
    name: string;
    category: string;
    query: string;
    role: string;
  }[];
}

interface SeasonData {
  key: string;
  name: string;
  nativeName: string;
  months: string;
  climate: string;
  majorCrops: string[];
  stages: SeasonStage[];
}

const SEASONS: SeasonData[] = [
  {
    key: "kharif",
    name: "Kharif Season (Monsoon)",
    nativeName: "खरीफ फसल",
    months: "June – October",
    climate: "Warm and humid monsoon conditions requiring efficient drainage and rapid sowing.",
    majorCrops: ["Paddy (Rice)", "Cotton", "Soybean", "Maize", "Groundnut", "Pigeon Pea (Arhar)"],
    stages: [
      {
        title: "1. Land Preparation & Puddling",
        timing: "May – June",
        description: "Primary tillage to break soil crust, followed by laser leveling for uniform water spread and wet puddling for paddy transplantation.",
        recommendedEquipment: [
          { name: "Laser Land Leveler", category: "Leveler", query: "leveler", role: "Ensures uniform water depth and saves up to 25% irrigation water." },
          { name: "Rotavator (Puddling)", category: "Tiller", query: "rotavator", role: "Prepares fine puddle bed for paddy seedlings." },
          { name: "MB Plough", category: "Plough", query: "plough", role: "Deep soil inversion to eradicate stubble and weed roots." }
        ]
      },
      {
        title: "2. Sowing & Transplanting",
        timing: "June – July",
        description: "Mechanized sowing aligned with monsoon onset to establish optimal plant population density.",
        recommendedEquipment: [
          { name: "Paddy Transplanter", category: "Transplanter", query: "transplanter", role: "Uniform 4-row/8-row mechanical paddy transplanting." },
          { name: "Seed-cum-Fertilizer Drill", category: "Seeder", query: "seeder", role: "Simultaneous seed and basal fertilizer placement for soybean/maize." }
        ]
      },
      {
        title: "3. Crop Protection & Inter-cultivation",
        timing: "July – September",
        description: "Weed management and timely prophylactic spraying against pest infestations during humid weather.",
        recommendedEquipment: [
          { name: "Tractor-mounted Boom Sprayer", category: "Sprayer", query: "sprayer", role: "High-clearance uniform canopy coverage across broad acres." },
          { name: "Power Weeder", category: "Weeder", query: "weeder", role: "Mechanized inter-row weeding without manual labor." }
        ]
      },
      {
        title: "4. Harvesting & Residue Management",
        timing: "October – November",
        description: "Rapid harvesting to prevent lodging and manage crop residue ahead of Rabi wheat sowing window.",
        recommendedEquipment: [
          { name: "Combine Harvester (Paddy)", category: "Harvester", query: "harvester", role: "Combined harvesting, threshing, and cleaning." },
          { name: "Super SMS / Straw Chopper", category: "Harvester", query: "straw", role: "Even straw distribution to avoid burning and enable direct drilling." }
        ]
      }
    ]
  },
  {
    key: "rabi",
    name: "Rabi Season (Winter)",
    nativeName: "रबी फसल",
    months: "October – April",
    climate: "Cool, dry conditions requiring well-aerated seedbeds and residual moisture retention.",
    majorCrops: ["Wheat", "Mustard (Sarson)", "Gram (Chana)", "Barley", "Potato", "Peas"],
    stages: [
      {
        title: "1. Stubble Management & Seedbed Prep",
        timing: "October – November",
        description: "Direct sowing into paddy residue without in-situ burning, or seedbed preparation for potato and mustard.",
        recommendedEquipment: [
          { name: "Happy Seeder / Super Seeder", category: "Seeder", query: "seeder", role: "Direct drilling of wheat into standing paddy stubble." },
          { name: "Rotavator", category: "Tiller", query: "rotavator", role: "Pulverizes dry soil into fine tilth for mustard and vegetables." }
        ]
      },
      {
        title: "2. Precision Sowing & Line Seeding",
        timing: "November – December",
        description: "Optimal depth seed placement for uniform germination and root crown development.",
        recommendedEquipment: [
          { name: "Zero-Till Seed Drill", category: "Seeder", query: "drill", role: "Saves diesel and time by eliminating repeat ploughing." },
          { name: "Potato Planter", category: "Planter", query: "planter", role: "Simultaneous ridging, tuber placement, and soil covering." }
        ]
      },
      {
        title: "3. Weed & Nutrient Management",
        timing: "December – February",
        description: "Micro-irrigation adjustments and broadleaf weed control during vegetative growth.",
        recommendedEquipment: [
          { name: "Tractor Sprayer (Electrostatic / Boom)", category: "Sprayer", query: "sprayer", role: "Targeted foliar spray and herbicide application." }
        ]
      },
      {
        title: "4. Harvesting & Threshing",
        timing: "March – April",
        description: "Harvesting ripe winter cereals ahead of summer heatwaves.",
        recommendedEquipment: [
          { name: "Combine Harvester (Wheat Cutter Bar)", category: "Harvester", query: "harvester", role: "High-capacity wheat reaping and grain separation." },
          { name: "Straw Reaper", category: "Harvester", query: "reaper", role: "Collects and shreds leftover wheat straw into fine cattle bhusa." }
        ]
      }
    ]
  },
  {
    key: "zaid",
    name: "Zaid Season (Summer)",
    nativeName: "जायद फसल",
    months: "March – June",
    climate: "Short summer window between Rabi and Kharif, dependent on assured canal/tubewell irrigation.",
    majorCrops: ["Watermelon", "Muskmelon", "Cucumber", "Green Gram (Moong)", "Fodder Sorghum", "Bitter Gourd"],
    stages: [
      {
        title: "1. Quick Bed Preparation",
        timing: "March – April",
        description: "Rapid turnaround ploughing and furrow formation immediately after Rabi wheat harvest.",
        recommendedEquipment: [
          { name: "Disc Harrow & Cultivator", category: "Cultivator", query: "cultivator", role: "Breaks compacted topsoil and mixes organic compost." },
          { name: "Bed Maker / Ditcher", category: "Leveler", query: "ditcher", role: "Creates raised beds and irrigation furrows for vine crops." }
        ]
      },
      {
        title: "2. Precision Seeding & Drip Laying",
        timing: "March – April",
        description: "Planting summer pulses or laying plastic mulch for cucurbits to conserve high-evaporation moisture.",
        recommendedEquipment: [
          { name: "Multi-crop Planter", category: "Seeder", query: "planter", role: "Accurate seed spacing for pulses and summer legumes." }
        ]
      },
      {
        title: "3. Intensive Irrigation & Care",
        timing: "April – May",
        description: "Frequent light waterings and pest surveillance against sucking insects in intense summer heat.",
        recommendedEquipment: [
          { name: "Tractor PTO Water Pump", category: "Pump", query: "pump", role: "High-volume emergency irrigation from farm ponds or canals." }
        ]
      },
      {
        title: "4. Fast Cycle Harvesting",
        timing: "May – June",
        description: "Staggered vegetable and melon picking, and combine harvesting of summer moong.",
        recommendedEquipment: [
          { name: "Multi-crop Thresher", category: "Thresher", query: "thresher", role: "Clean separation of pulse seeds with minimal grain cracking." }
        ]
      }
    ]
  }
];

export default function SeasonGuidePage() {
  const [activeSeasonKey, setActiveSeasonKey] = useState<string>("kharif");
  const activeSeason = SEASONS.find((s) => s.key === activeSeasonKey) || SEASONS[0];

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-7 h-7 text-[#16a34a]" />
          <span>Agricultural Cropping Calendar & Machinery Guide</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          Factual agronomic timeline of farm operations across India’s primary agricultural seasons. Plan your implement bookings for land prep, sowing, crop protection, and harvesting.
        </p>
      </div>

      {/* Season Selector Tabs */}
      <div className="flex rounded-2xl p-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        {SEASONS.map((season) => {
          const isActive = season.key === activeSeasonKey;
          return (
            <button
              key={season.key}
              type="button"
              onClick={() => setActiveSeasonKey(season.key)}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 ${
                isActive
                  ? "bg-white dark:bg-slate-900 text-[#14532d] dark:text-emerald-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {season.key === "kharif" && <CloudRain className="w-4 h-4 text-sky-500" />}
              {season.key === "rabi" && <Snowflake className="w-4 h-4 text-indigo-500" />}
              {season.key === "zaid" && <Sun className="w-4 h-4 text-amber-500" />}
              <span>{season.name}</span>
            </button>
          );
        })}
      </div>

      {/* Season Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#16a34a]">
              Active Calendar
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
              {activeSeason.name} ({activeSeason.nativeName})
            </h2>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
            <Clock className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>Duration: {activeSeason.months}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {activeSeason.climate}
        </p>

        <div>
          <span className="text-xs font-bold text-slate-900 dark:text-white block mb-2">
            Predominant Crops:
          </span>
          <div className="flex flex-wrap gap-2">
            {activeSeason.majorCrops.map((crop) => (
              <span
                key={crop}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-[#14532d] dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/60"
              >
                {crop}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Four Stages Progression */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Wrench className="w-5 h-5 text-[#16a34a]" />
          <span>Mechanization Stages & Recommended Equipment</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeSeason.stages.map((stage, idx) => (
            <div
              key={stage.title}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {stage.title}
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    {stage.timing}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Recommended Implements
                </span>
                <div className="space-y-1.5">
                  {stage.recommendedEquipment.map((eq) => (
                    <div
                      key={eq.name}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-2"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {eq.name}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {eq.role}
                        </div>
                      </div>
                      <Link
                        href={`/equipment?category=${encodeURIComponent(eq.category)}`}
                        className="text-[11px] font-bold text-[#14532d] dark:text-emerald-400 hover:text-[#16a34a] inline-flex items-center gap-1 shrink-0 p-1.5"
                      >
                        <span>Find</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Registry Citation & Content Integrity Note */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#16a34a] shrink-0" />
          <span className="text-slate-600 dark:text-slate-400">
            Agronomic calendar references official crop-machinery guidelines published by the Indian Council of Agricultural Research (ICAR). Zero speculative yield or financial claims.
          </span>
        </div>
        <SourceNote registryId="guide-icar-cropping-calendar" compact={false} />
      </div>
    </main>
  );
}
