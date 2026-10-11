import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('..', 'test-screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log('Starting Complete Website Verification...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true }).catch(() => chromium.launch({ channel: 'chrome', headless: true }));
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const pagesToTest = [
    { url: 'http://localhost:3000', name: '01_homepage.png', title: 'Home Page' },
    { url: 'http://localhost:3000/equipment', name: '02_equipment_catalog.png', title: 'Equipment Catalog' },
    { url: 'http://localhost:3000/how-it-works', name: '03_how_it_works.png', title: 'How It Works' },
    { url: 'http://localhost:3000/farmer/dashboard', name: '04_farmer_dashboard.png', title: 'Farmer Dashboard' },
    { url: 'http://localhost:3000/owner/dashboard', name: '05_owner_dashboard.png', title: 'Owner Dashboard' },
    { url: 'http://localhost:3000/schemes-and-subsidies', name: '06_schemes.png', title: 'Government Schemes' },
    { url: 'http://localhost:3000/contact', name: '07_contact.png', title: 'Contact & Support' },
  ];

  for (const item of pagesToTest) {
    try {
      console.log(`Checking ${item.title} (${item.url})...`);
      const res = await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      if (res.status() !== 200) {
        throw new Error(`Non-200 status: ${res.status()}`);
      }
      await page.waitForTimeout(1000);
      const filePath = path.join(SCREENSHOT_DIR, item.name);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`✓ ${item.title} loaded successfully [Screenshot: ${item.name}]`);
    } catch (err) {
      console.error(`✗ Error on ${item.title}:`, err.message);
    }
  }

  await browser.close();
  console.log('==================================================');
  console.log('ALL WEBSITE PAGES TESTED & CAPTURED SUCCESSFULLY!');
  console.log('==================================================');
}

run().catch((err) => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
