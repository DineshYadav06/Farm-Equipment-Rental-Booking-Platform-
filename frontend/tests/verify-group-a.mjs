import { chromium } from "playwright";

async function verifyGroupA() {
  console.log("==================================================");
  console.log("FarmRentHub GROUP A: FARMER TOOLS Verification");
  console.log("==================================================");

  const browser = await chromium
    .launch({ channel: "msedge", headless: true })
    .catch(() => chromium.launch({ channel: "chrome", headless: true }));
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const baseUrl = "http://localhost:3000";

  // 1. Verify /api/mandi endpoint
  console.log("\n[1] Testing /api/mandi Route Handler...");
  const mandiRes = await page.request.get(`${baseUrl}/api/mandi`);
  if (!mandiRes.ok()) throw new Error(`/api/mandi failed with status ${mandiRes.status()}`);
  const mandiJson = await mandiRes.json();
  console.log(`✓ /api/mandi returned ${mandiJson.records?.length || 0} commodities. Source: ${mandiJson.sourceName}`);

  // 2. Verify /tools/land-converter
  console.log("\n[2] Testing /tools/land-converter...");
  await page.goto(`${baseUrl}/tools/land-converter`, { waitUntil: "networkidle" });
  const converterHeading = await page.textContent("h1");
  console.log(`✓ Land Converter Page Loaded: "${converterHeading?.trim()}"`);

  // 3. Verify /tools/cost-estimator
  console.log("\n[3] Testing /tools/cost-estimator...");
  await page.goto(`${baseUrl}/tools/cost-estimator`, { waitUntil: "networkidle" });
  const estimatorHeading = await page.textContent("h1");
  console.log(`✓ Cost Estimator Page Loaded: "${estimatorHeading?.trim()}"`);

  // 4. Verify /season-guide
  console.log("\n[4] Testing /season-guide...");
  await page.goto(`${baseUrl}/season-guide`, { waitUntil: "networkidle" });
  const seasonHeading = await page.textContent("h1");
  console.log(`✓ Season Guide Page Loaded: "${seasonHeading?.trim()}"`);

  // 5. Verify /mandi
  console.log("\n[5] Testing /mandi...");
  await page.goto(`${baseUrl}/mandi`, { waitUntil: "networkidle" });
  const mandiHeading = await page.textContent("h1");
  console.log(`✓ Mandi Rates Page Loaded: "${mandiHeading?.trim()}"`);

  // 6. Verify /saved
  console.log("\n[6] Testing /saved...");
  await page.goto(`${baseUrl}/saved`, { waitUntil: "networkidle" });
  const savedHeading = await page.textContent("h1");
  console.log(`✓ Saved Equipment Page Loaded: "${savedHeading?.trim()}"`);

  // 7. Verify /equipment/compare
  console.log("\n[7] Testing /equipment/compare...");
  await page.goto(`${baseUrl}/equipment/compare`, { waitUntil: "networkidle" });
  const compareText = await page.textContent("main");
  console.log(`✓ Compare Equipment Page Loaded successfully`);

  // 8. Verify /equipment detail page (A3, A8)
  console.log("\n[8] Testing /equipment/eq_sample_0001 detail page...");
  await page.goto(`${baseUrl}/equipment/eq_sample_0001`, { waitUntil: "networkidle" });
  const eqTitle = await page.textContent("h1");
  console.log(`✓ Equipment detail loaded: "${eqTitle?.trim()}"`);

  await browser.close();
  console.log("\n==================================================");
  console.log("GROUP A AUDIT COMPLETED SUCCESSFULLY!");
  console.log("==================================================");
}

verifyGroupA().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
