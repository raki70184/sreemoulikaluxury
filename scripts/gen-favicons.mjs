#!/usr/bin/env node
/**
 * Generate favicons + apple-touch-icon + PWA icons from the SM Luxe logo on
 * Cloudinary. Cloudinary applies `c_fill,g_north,ar_1:1` so we keep the
 * laurel + "SM" wordmark (the most recognizable part of the brand mark) and
 * drop the "SALON + CAFE" subtitle that's unreadable at favicon sizes.
 *
 * Run once after the logo changes; output goes to /public.
 *
 *   node scripts/gen-favicons.mjs
 */
import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = dirname(__dirname);
const PUBLIC = join(REPO_ROOT, "public");

// Crop a square from the top of the portrait logo (keeps laurel + SM letters).
// b_rgb:1a1a1a pads any sub-pixel slivers with the brand dark.
const LOGO_URL =
  "https://res.cloudinary.com/dguwwzd5z/image/upload/c_fill,g_north,ar_1:1,w_1024,b_rgb:1a1a1a,f_png,q_auto/websites/sm-luxe-salon/website/smlogo";

console.log("Fetching square crop of logo from Cloudinary…");
const res = await fetch(LOGO_URL);
if (!res.ok) throw new Error(`Failed to fetch logo: ${res.status}`);
const buf = Buffer.from(await res.arrayBuffer());

async function emit(size, name) {
  // `fit: cover` — fill the square without letterboxing. Source is already 1:1.
  const out = await sharp(buf)
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(join(PUBLIC, name), out);
  console.log(`  wrote ${name} (${size}x${size}, ${(out.length / 1024).toFixed(0)}KB)`);
}

await emit(16, "favicon-16.png");
await emit(32, "favicon-32.png");
await emit(180, "apple-touch-icon.png");
await emit(192, "favicon-192.png");
await emit(512, "favicon-512.png");

// Inline SVG favicon: wrap the same Cloudinary-cropped PNG as a data-URI image
// inside an SVG so we still ship a scalable favicon for modern browsers, but
// using the real brand mark instead of generic Georgia "SM" text.
const dataUri = `data:image/png;base64,${buf.toString("base64")}`;
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><image href="${dataUri}" width="64" height="64"/></svg>`;
await writeFile(join(PUBLIC, "favicon.svg"), faviconSvg);
console.log(`  wrote favicon.svg (${(faviconSvg.length / 1024).toFixed(0)}KB)`);

console.log("Done.");
