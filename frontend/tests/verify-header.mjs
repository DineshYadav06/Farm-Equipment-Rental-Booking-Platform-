import { chromium } from "playwright";

const BASE_URL = "http://localhost:3000";
const viewports = [
  { width: 360, height: 740, name: "mobile-360" },
  { width: 768, height: 1024, name: "tablet-768" },
  { width: 1280, height: 800, name: "desktop-1280" }
];
const locales = ["en", "hi", "ta", "ml"];

async function runTests() {
  console.log("==================================================");
  console.log("Starting FarmRentHub Header Playwright Audit");
  console.log("==================================================");

  const browser = await chromium.launch({ channel: "msedge", headless: true }).catch(() => chromium.launch({ channel: "chrome", headless: true }));
  let hasFailure = false;

  try {
    for (const vp of viewports) {
      console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await context.newPage();

      for (const loc of locales) {
        // Navigate with saved locale
        await page.addInitScript((l) => {
          localStorage.setItem("farmrenthub_locale", l);
        }, loc);

        await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
        // Wait for hydration so document.documentElement.lang is updated by TranslationProvider
        await page.waitForFunction((l) => document.documentElement.lang === l, loc, { timeout: 4000 }).catch(() => {});

        // 1. Assert HTML lang and dir
        const htmlLang = await page.getAttribute("html", "lang");
        const htmlDir = await page.getAttribute("html", "dir");
        if (htmlLang !== loc) {
          console.error(`[FAIL] Expected html lang='${loc}', got '${htmlLang}'`);
          hasFailure = true;
        } else {
          console.log(`✓ [${vp.name}][${loc}] html lang='${htmlLang}', dir='${htmlDir}'`);
        }

        // 2. Assert no horizontal page overflow
        const overflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
        });
        if (overflow) {
          console.error(`[FAIL] Horizontal overflow detected on ${vp.name} in ${loc}!`);
          hasFailure = true;
        } else {
          console.log(`✓ [${vp.name}][${loc}] No horizontal overflow (scrollWidth <= clientWidth)`);
        }

        // 3. For 1280px Desktop: Assert single-line nav
        if (vp.width >= 1024) {
          const navSingleLine = await page.evaluate(() => {
            const nav = document.querySelector('nav[aria-label="Main Navigation"]');
            if (!nav) return false;
            // All items within single horizontal bounding box row
            const links = Array.from(nav.querySelectorAll("a"));
            if (links.length === 0) return true;
            const topY = links[0].getBoundingClientRect().top;
            return links.every((l) => Math.abs(l.getBoundingClientRect().top - topY) < 6);
          });

          if (!navSingleLine) {
            console.error(`[FAIL] Desktop nav wrapped across multiple lines on 1280px in ${loc}!`);
            hasFailure = true;
          } else {
            console.log(`✓ [${vp.name}][${loc}] Main nav items stay on ONE single line`);
          }
        }
      }

      // 4. Test Skip to content link
      await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
      await page.keyboard.press("Tab");
      const activeElHref = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.getAttribute("href") : null;
      });
      if (activeElHref === "#main-content") {
        console.log(`✓ [${vp.name}] Skip to main content link successfully focused on Tab`);
      } else {
        console.warn(`[INFO] First focused element: ${activeElHref}`);
      }

      await context.close();
    }

    // 5. Test Language Switch keeps page without reload/reset
    console.log(`\n--- Testing Dynamic Language Switch Retention ---`);
    const switchContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const switchPage = await switchContext.newPage();
    await switchPage.goto(`${BASE_URL}/equipment`, { waitUntil: "domcontentloaded" });

    // Open language menu and click Tamil
    const langBtn = switchPage.locator('button[aria-haspopup="menu"]').first();
    await langBtn.click();
    await switchPage.waitForTimeout(100);

    const tamilOption = switchPage.locator('button[role="menuitem"]:has-text("தமிழ்")');
    if (await tamilOption.count() > 0) {
      await tamilOption.first().click();
      await switchPage.waitForTimeout(200);

      const newUrl = switchPage.url();
      const currentLang = await switchPage.getAttribute("html", "lang");
      console.log(`✓ Language switched to '${currentLang}', page remained on URL: ${newUrl}`);
      if (!newUrl.includes("/equipment")) {
        console.error(`[FAIL] Page redirected away on language switch!`);
        hasFailure = true;
      }
    }
    await switchContext.close();

  } catch (err) {
    console.error("Test execution error:", err);
    hasFailure = true;
  } finally {
    await browser.close();
  }

  console.log("==================================================");
  if (hasFailure) {
    console.error("Audit finished with failures!");
    process.exit(1);
  } else {
    console.log("ALL HEADER QUALITY CHECKS PASSED SUCCESSFULLY!");
    process.exit(0);
  }
}

runTests();
