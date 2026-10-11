import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const incomingDir = path.join(rootDir, "public", "images", "incoming");

if (!fs.existsSync(incomingDir)) {
  fs.mkdirSync(incomingDir, { recursive: true });
}

console.log("=================================================");
console.log("FarmRentHub Image Optimization Engine (sharp)");
console.log("Converts incoming JPG/PNG to WebP, strips EXIF, and caps under 300 KB.");
console.log("=================================================");

const files = fs.readdirSync(incomingDir).filter((f) => {
  const ext = path.extname(f).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
});

if (files.length === 0) {
  console.log(`No raw images found in public/images/incoming/.`);
  console.log(`Tip: Drop uncompressed JPG or PNG photos into public/images/incoming/ and rerun.`);
  process.exit(0);
}

let optimizedCount = 0;

for (const file of files) {
  const inputPath = path.join(incomingDir, file);
  const baseName = path.parse(file).name;
  const outputPath = path.join(incomingDir, `${baseName}.webp`);

  try {
    let quality = 80;
    let buffer = await sharp(inputPath)
      .rotate() // auto-orient based on EXIF before stripping
      .resize(1600, 1200, { fit: "inside", withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();

    // If exceeding 300 KB, iteratively reduce quality
    while (buffer.length > 300 * 1024 && quality > 40) {
      quality -= 10;
      buffer = await sharp(inputPath)
        .rotate()
        .resize(1600, 1200, { fit: "inside", withoutEnlargement: true })
        .webp({ quality })
        .toBuffer();
    }

    fs.writeFileSync(outputPath, buffer);
    const sizeKb = Math.round(buffer.length / 1024);
    console.log(`Optimized: ${file} -> ${baseName}.webp (${sizeKb} KB, EXIF stripped, quality: ${quality})`);

    // Remove source file if it was JPG/PNG and distinct from output
    if (inputPath !== outputPath) {
      fs.unlinkSync(inputPath);
    }
    optimizedCount++;
  } catch (err) {
    console.error(`Error processing ${file}:`, err);
  }
}

console.log(`\nSuccessfully processed ${optimizedCount} incoming images.`);
