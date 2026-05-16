#!/usr/bin/env node
/**
 * One-time Cloudinary upload script.
 *
 * Walks src/components/images/, uploads every JPG/JPEG/PNG/MP4 to Cloudinary
 * under folder `websites/sm-luxe-salon/<section>/<slug>`, and emits TypeScript
 * barrels at `src/components/images/<Section>/index.ts` whose exports are the
 * Cloudinary publicIds (strings). SVGs are left in place because they ship as
 * inlined React components via vite-plugin-svgr.
 *
 * Re-runs are safe: uploads use overwrite + invalidate, so re-publishing keeps
 * the same publicIds the codebase imports.
 *
 *   node scripts/cld-upload.mjs           # full run
 *   node scripts/cld-upload.mjs --dry     # plan only, no API calls
 */
import { readFile, readdir, stat, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, extname, join, relative, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = dirname(__dirname);
const IMAGES_ROOT = join(REPO_ROOT, "src", "components", "images");
const DRY_RUN = process.argv.includes("--dry");

// --- load .env ----------------------------------------------------------------
async function loadEnv() {
  const envFile = join(REPO_ROOT, ".env");
  if (!existsSync(envFile)) throw new Error(".env not found at " + envFile);
  const text = await readFile(envFile, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx < 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

await loadEnv();
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const BASE_FOLDER = process.env.CLOUDINARY_BASE_FOLDER || "websites/sm-luxe-salon";
if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  throw new Error("Cloudinary env vars missing in .env");
}

cloudinary.config({ cloud_name: CLOUD_NAME, api_key: API_KEY, api_secret: API_SECRET, secure: true });

// --- helpers ------------------------------------------------------------------
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_EXT = new Set([".mp4", ".mov", ".webm"]);
const SKIP_EXT = new Set([".svg", ".pptx", ".ts", ".tsx"]);
const SECTION_FOLDER_MAP = {
  WebsiteImages: "website",
  DesktopImages: "desktop",
  MobileImages: "mobile",
  CafeImages: "cafe",
  OurServicesImages: "services",
  AboutSectionImages: "about",
  Videos: "videos",
  GallerySectionImages: "gallery",
};

function toSlug(input) {
  return input
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-\/]/g, "")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function nameToIdent(rawName) {
  // Convert "haircolor1.jpeg" or "hair color.jpeg" -> "haircolor1" / "hairColor"
  const base = rawName.replace(/\.[a-z0-9]+$/i, "");
  const cleaned = base.replace(/[^a-zA-Z0-9]+/g, " ").trim();
  const parts = cleaned.split(/\s+/);
  const first = parts[0] || "img";
  const rest = parts
    .slice(1)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  let ident = first.charAt(0).toLowerCase() + first.slice(1) + rest;
  // ident must not start with digit
  if (/^[0-9]/.test(ident)) ident = "_" + ident;
  return ident;
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function maybeResize(srcPath, ext) {
  // Only resize JPGs/PNGs over 2 MB; cap longest edge at 2400px.
  if (!IMAGE_EXT.has(ext) || ext === ".webp") return srcPath;
  const s = await stat(srcPath);
  if (s.size < 2 * 1024 * 1024) return srcPath;

  const tmpDir = join(REPO_ROOT, "scripts", ".cld-tmp");
  if (!existsSync(tmpDir)) await mkdir(tmpDir, { recursive: true });
  const tmpFile = join(tmpDir, basename(srcPath).replace(/\.(jpe?g|png)$/i, ".jpg"));

  const img = sharp(srcPath, { failOn: "none" });
  const meta = await img.metadata();
  const longest = Math.max(meta.width || 0, meta.height || 0);
  if (longest <= 2400) return srcPath; // nothing to do
  await img
    .rotate()
    .resize({ width: meta.width >= meta.height ? 2400 : undefined, height: meta.height > meta.width ? 2400 : undefined, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(tmpFile);
  return tmpFile;
}

// --- planning -----------------------------------------------------------------
const tasks = []; // { localPath, sectionDir, sectionSlug, fileSlug, publicId, resourceType, ident, ext }

for await (const filePath of walk(IMAGES_ROOT)) {
  const rel = relative(IMAGES_ROOT, filePath); // e.g. WebsiteImages/Makeup.jpeg or GallerySectionImages/Bridal/bridal1.jpeg
  const parts = rel.split("/");
  if (parts.length < 2) continue;
  const ext = extname(rel).toLowerCase();
  if (SKIP_EXT.has(ext)) continue;
  if (basename(filePath).startsWith(".")) continue;

  const isImage = IMAGE_EXT.has(ext);
  const isVideo = VIDEO_EXT.has(ext);
  if (!isImage && !isVideo) continue;

  const topDir = parts[0]; // e.g. WebsiteImages, GallerySectionImages
  const sectionSlug = SECTION_FOLDER_MAP[topDir] || toSlug(topDir);

  // For Gallery, include sub-folder (Bridal, Facial, etc.) as nested slug
  let folderPath = sectionSlug;
  if (parts.length > 2) {
    folderPath = sectionSlug + "/" + toSlug(parts[1]);
  }

  const filename = parts[parts.length - 1];
  const fileSlug = toSlug(filename);
  const publicId = `${BASE_FOLDER}/${folderPath}/${fileSlug}`;
  const ident = nameToIdent(filename);

  tasks.push({
    localPath: filePath,
    rel,
    topDir,
    subDir: parts.length > 2 ? parts[1] : null,
    fileSlug,
    publicId,
    resourceType: isVideo ? "video" : "image",
    ident,
    ext,
  });
}

console.log(`Discovered ${tasks.length} assets to upload to ${BASE_FOLDER}/`);
if (DRY_RUN) {
  for (const t of tasks) console.log(`  ${t.rel}  ->  ${t.publicId}  (${t.resourceType})`);
  process.exit(0);
}

// --- upload -------------------------------------------------------------------
const results = [];
let i = 0;
for (const t of tasks) {
  i++;
  try {
    const uploadPath = await maybeResize(t.localPath, t.ext);
    const res = await cloudinary.uploader.upload(uploadPath, {
      public_id: t.publicId,
      resource_type: t.resourceType,
      overwrite: true,
      invalidate: true,
      use_filename: false,
      unique_filename: false,
    });
    results.push({ ...t, width: res.width, height: res.height, bytes: res.bytes, format: res.format, secureUrl: res.secure_url });
    process.stdout.write(`[${i}/${tasks.length}] ${t.publicId} (${res.width}x${res.height}, ${(res.bytes / 1024).toFixed(0)}KB)\n`);
  } catch (e) {
    console.error(`FAIL ${t.publicId}:`, e.message);
    throw e;
  }
}

// --- write barrels & manifest -------------------------------------------------
// Group by top dir for index.ts barrels
const byTopDir = {};
for (const r of results) {
  if (!byTopDir[r.topDir]) byTopDir[r.topDir] = [];
  byTopDir[r.topDir].push(r);
}

for (const [topDir, items] of Object.entries(byTopDir)) {
  const dir = join(IMAGES_ROOT, topDir);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  // Deduplicate idents (some files differ only by extension casing)
  const seen = new Set();
  const lines = ["// AUTO-GENERATED by scripts/cld-upload.mjs — do not edit by hand."];
  lines.push("// Each export is a Cloudinary publicId. Use with <CldImage publicId={...} /> or cldUrl(...).");
  lines.push("");
  for (const it of items) {
    let ident = it.ident;
    let n = 1;
    while (seen.has(ident)) {
      n++;
      ident = it.ident + n;
    }
    seen.add(ident);
    const meta = it.resourceType === "video"
      ? `{ publicId: ${JSON.stringify(it.publicId)}, w: ${it.width || 0}, h: ${it.height || 0}, kind: "video" as const }`
      : `{ publicId: ${JSON.stringify(it.publicId)}, w: ${it.width || 0}, h: ${it.height || 0}, kind: "image" as const }`;
    lines.push(`export const ${ident}Asset = ${meta};`);
    lines.push(`export const ${ident} = ${JSON.stringify(it.publicId)};`);
  }
  await writeFile(join(dir, "index.ts"), lines.join("\n") + "\n");
  console.log(`Wrote barrel: ${relative(REPO_ROOT, join(dir, "index.ts"))}`);
}

// Full machine-readable manifest for codegen sanity
const report = {
  cloudName: CLOUD_NAME,
  baseFolder: BASE_FOLDER,
  generatedAt: new Date().toISOString(),
  assets: results.map((r) => ({
    rel: r.rel,
    publicId: r.publicId,
    resourceType: r.resourceType,
    width: r.width,
    height: r.height,
    bytes: r.bytes,
    format: r.format,
    ident: r.ident,
  })),
};
await writeFile(join(REPO_ROOT, "scripts", "cld-upload-report.json"), JSON.stringify(report, null, 2));
console.log(`Wrote scripts/cld-upload-report.json (${results.length} assets)`);

console.log("\nDone.");
