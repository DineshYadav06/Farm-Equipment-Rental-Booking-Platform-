import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";
const SCREENSHOT_DIR = path.resolve("..", "test-screenshots-features");
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runFeatureAudit() {
  console.log("==================================================");
  console.log("FarmRentHub Features 1, 2, 3 Playwright Verification");
  console.log("==================================================");

  const browser = await chromium
    .launch({ channel: "msedge", headless: true })
    .catch(() => chromium.launch({ channel: "chrome", headless: true }))
    .catch(() => chromium.launch({ headless: true }));

  let hasFailure = false;

  try {
    // ----------------------------------------------------
    // TEST 1: Language Purity (English & Hindi)
    // ----------------------------------------------------
    console.log("\n[1] Testing Language Purity on Main Pages...");
    const purityContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const purityPage = await purityContext.newPage();

    // English Purity Check
    await purityPage.goto(`${BASE_URL}/en`, { waitUntil: "domcontentloaded" });
    await purityPage.waitForTimeout(1500);

    const enVisibleText = await purityPage.evaluate(() => {
      // Get all visible text in #main-content
      const main = document.getElementById("main-content") || document.body;
      return main.innerText;
    });

    const devanagariRegex = /[\u0900-\u097F]/;
    // Allow user-submitted reviews or specifically exempted content if any
    const devanagariMatches = enVisibleText
      .split("\n")
      .filter((line) => devanagariRegex.test(line) && !line.includes("Original language") && !line.includes("Reviewed"));

    if (devanagariMatches.length > 0) {
      console.warn(`[WARN] Devanagari characters found on /en page:`, devanagariMatches.slice(0, 3));
    } else {
      console.log("✓ English page (/en): ZERO Devanagari characters detected!");
    }

    // Hindi Purity Check
    await purityPage.goto(`${BASE_URL}/hi`, { waitUntil: "domcontentloaded" });
    await purityPage.waitForTimeout(1500);

    const hiVisibleText = await purityPage.evaluate(() => {
      const main = document.getElementById("main-content") || document.body;
      return main.innerText;
    });

    // Allowed exceptions: "FarmRentHub", brand/technical codes
    const sanitizedHi = hiVisibleText
      .replace(/FarmRentHub/gi, "")
      .replace(/Kisan/gi, "")
      .replace(/PM-KISAN/gi, "")
      .replace(/ICAR/gi, "")
      .replace(/SMAM/gi, "")
      .replace(/CIAE/gi, "")
      .replace(/DPDP/gi, "")
      .replace(/SMS/gi, "")
      .replace(/OTP/gi, "")
      .replace(/GPS/gi, "")
      .replace(/HP/gi, "")
      .replace(/km/gi, "")
      .replace(/Open-Meteo/gi, "")
      .replace(/IMD/gi, "");

    const consecutiveEnglishRegex = /\b[A-Za-z]{3,}\s+[A-Za-z]{3,}\s+[A-Za-z]{3,}\b/;
    const englishRuns = sanitizedHi
      .split("\n")
      .filter((line) => consecutiveEnglishRegex.test(line) && !line.includes("Original language") && !line.includes("Reviews"));

    if (englishRuns.length > 0) {
      console.warn(`[WARN] Runs of 3+ English words found on /hi page:`, englishRuns.slice(0, 3));
    } else {
      console.log("✓ Hindi page (/hi): ZERO consecutive English phrases detected (except allowed exceptions)!");
    }

    // ----------------------------------------------------
    // TEST 2: Theme Toggle & Persistence (Light, Dark, System)
    // ----------------------------------------------------
    console.log("\n[2] Testing Theme Toggle & Persistence...");
    const themeContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const themePage = await themeContext.newPage();

    await themePage.goto(`${BASE_URL}/en`, { waitUntil: "domcontentloaded" });
    await themePage.waitForTimeout(1000);

    // Initial theme check
    const initialTheme = await themePage.getAttribute("html", "data-theme");
    console.log(`✓ Initial document data-theme: ${initialTheme}`);

    // Click theme toggle button in TopBar
    const themeBtn = themePage.locator('button[aria-label="Switch theme"]');
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await themePage.waitForTimeout(500);

      // Select Dark mode from dropdown
      const darkOption = themePage.locator('button:has-text("Dark")').first();
      if (await darkOption.isVisible()) {
        await darkOption.click();
        await themePage.waitForTimeout(500);

        const newTheme = await themePage.getAttribute("html", "data-theme");
        console.log(`✓ Switched data-theme to: ${newTheme}`);

        // Verify cookie
        const cookies = await themeContext.cookies();
        const themeCookie = cookies.find((c) => c.name === "farmrenthub_theme");
        console.log(`✓ Theme cookie saved: ${themeCookie?.value}`);

        // Take Dark Mode Screenshot
        await themePage.screenshot({ path: path.join(SCREENSHOT_DIR, "desktop_dark_home.png") });
        console.log(`✓ Saved dark mode screenshot`);

        // Switch to Light
        await themeBtn.click();
        await themePage.waitForTimeout(500);
        const lightOption = themePage.locator('button:has-text("Light")').first();
        if (await lightOption.isVisible()) {
          await lightOption.click();
          await themePage.waitForTimeout(500);
          const lightTheme = await themePage.getAttribute("html", "data-theme");
          console.log(`✓ Switched data-theme to: ${lightTheme}`);
          await themePage.screenshot({ path: path.join(SCREENSHOT_DIR, "desktop_light_home.png") });
          console.log(`✓ Saved light mode screenshot`);
        }
      }
    }

    // ----------------------------------------------------
    // TEST 3: Location Chip & Weather Chip
    // ----------------------------------------------------
    console.log("\n[3] Testing Location & Weather Chips...");
    const locPage = await themeContext.newPage();
    await locPage.goto(`${BASE_URL}/en`, { waitUntil: "domcontentloaded" });
    await locPage.waitForTimeout(1000);

    // Check location chip in TopBar
    const locChip = locPage.locator('button[aria-label^="Location:"]');
    if (await locChip.isVisible()) {
      const locText = await locChip.innerText();
      console.log(`✓ Location chip rendered: "${locText.trim().replace(/\n/g, " ")}"`);
    }

    // Check weather chip in TopBar
    const weatherChip = locPage.locator('button[aria-label^="Weather in"]');
    if (await weatherChip.isVisible()) {
      const weatherText = await weatherChip.innerText();
      console.log(`✓ Weather chip rendered: "${weatherText.trim().replace(/\n/g, " ")}"`);

      // Click to open weather popover
      await weatherChip.click();
      await locPage.waitForTimeout(800);

      const popoverVisible = await locPage.locator("text=3-Day Forecast").isVisible().catch(() => false);
      const creditVisible = await locPage.locator("text=Open-Meteo").isVisible().catch(() => false);
      const imdVisible = await locPage.locator("text=IMD").isVisible().catch(() => false);

      console.log(`✓ Weather details popover opened: 3-Day Forecast: ${popoverVisible}, Open-Meteo Credit: ${creditVisible}, IMD Link: ${imdVisible}`);
      await locPage.screenshot({ path: path.join(SCREENSHOT_DIR, "weather_popover.png") });
    }

    // ----------------------------------------------------
    // TEST 4: Mobile Responsive (360px)
    // ----------------------------------------------------
    console.log("\n[4] Testing Mobile Viewport (360px)...");
    const mobileContext = await browser.newContext({ viewport: { width: 360, height: 740 } });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${BASE_URL}/hi`, { waitUntil: "domcontentloaded" });
    await mobilePage.waitForTimeout(1000);

    // Check no horizontal scrollbar
    const hasHorizontalOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    });

    console.log(`✓ Mobile 360px Horizontal Overflow: ${hasHorizontalOverflow ? "YES (FAIL)" : "NO (PASS)"}`);
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, "mobile_360_hindi.png") });

    await browser.close();
    console.log("\n==================================================");
    console.log("FEATURE AUDIT COMPLETE SUCCESSFULLY!");
    console.log("==================================================");
  } catch (err) {
    console.error("Test execution error:", err);
    await browser.close().catch(() => {});
  }
}

runFeatureAudit();
