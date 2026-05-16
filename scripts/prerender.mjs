#!/usr/bin/env node
/**
 * Post-build static prerender. After `vite build`, this script spins up the
 * Vite preview server, drives Puppeteer over every public route, and writes
 * the fully-rendered HTML to dist/<route>/index.html. Netlify serves the
 * static HTML on cold hits; React hydrates on the client.
 *
 * Without prerender: Googlebot/LinkedIn/WhatsApp see an empty <div id="root">.
 * With prerender: they see the real headings, copy, images and JSON-LD —
 * which is the whole SEO unlock for a CSR SPA.
 *
 *   node scripts/prerender.mjs            # uses default port 4173
 *   node scripts/prerender.mjs --port 5050
 */
import { spawn } from "node:child_process";
import { writeFile, mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = dirname(__dirname);
const DIST = join(REPO_ROOT, "dist");

if (!existsSync(DIST)) {
  console.error("dist/ does not exist. Run `npm run build` first.");
  process.exit(1);
}

const portIdx = process.argv.indexOf("--port");
const PORT = portIdx > 0 ? Number(process.argv[portIdx + 1]) : 4173;

const ROUTES = ["/", "/about", "/services", "/gallery", "/cafe", "/contact"];

console.log(`Starting vite preview on :${PORT}…`);
const previewProcess = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
  cwd: REPO_ROOT,
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env },
});
// Collect output for diagnostics. We don't parse it for the ready signal —
// Vite sometimes writes the "Local:" banner to stderr in CI, so log parsing
// is unreliable. Instead, we poll the port below.
const previewLog = [];
previewProcess.stdout.on("data", (chunk) => previewLog.push(chunk.toString()));
previewProcess.stderr.on("data", (chunk) => previewLog.push(chunk.toString()));
let previewExitedEarly = false;
previewProcess.on("exit", (code) => {
  if (code !== 0) previewExitedEarly = true;
});

// Poll the actual port until it responds with anything (even a redirect).
const baseUrl = `http://localhost:${PORT}`;
const startedAt = Date.now();
const READY_TIMEOUT_MS = 60000;
async function isUp() {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 1500);
    const res = await fetch(baseUrl + "/", { signal: ctrl.signal });
    clearTimeout(t);
    return res.status < 500;
  } catch {
    return false;
  }
}
while (!(await isUp())) {
  if (previewExitedEarly) {
    throw new Error("Vite preview exited before becoming ready:\n" + previewLog.join(""));
  }
  if (Date.now() - startedAt > READY_TIMEOUT_MS) {
    previewProcess.kill();
    throw new Error(
      `Vite preview did not respond on ${baseUrl} within ${READY_TIMEOUT_MS / 1000}s:\n` + previewLog.join("")
    );
  }
  await new Promise((r) => setTimeout(r, 400));
}
console.log("vite preview ready.");

console.log("Launching Puppeteer…");
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

let writtenAny = false;
try {
  for (const route of ROUTES) {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(30000);
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });

    const url = `${baseUrl}${route}`;
    console.log(`  ${route} -> rendering…`);
    // Use domcontentloaded — networkidle0 stalls on autoplay videos that
    // keep open connections forever.
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    // Wait until the React tree has flushed something into #root.
    await page.waitForFunction(() => {
      const el = document.getElementById("root");
      return el && el.children.length > 0 && el.innerText.trim().length > 50;
    }, { timeout: 30000 });

    // Give Helmet a moment to flush meta tags + Suspense to settle
    await new Promise((r) => setTimeout(r, 600));

    // Mark this DOM as prerendered so the client knows to hydrate
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-prerendered", "true");
    });

    const html = "<!DOCTYPE html>\n" + (await page.content());

    const outDir = route === "/" ? DIST : join(DIST, route.replace(/^\//, ""));
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, "index.html"), html);
    console.log(`    wrote ${outDir.replace(DIST, "dist")}/index.html (${(html.length / 1024).toFixed(0)}KB)`);
    writtenAny = true;
    await page.close();
  }
} finally {
  await browser.close();
  previewProcess.kill();
}

if (!writtenAny) {
  console.error("Prerender produced no output.");
  process.exit(1);
}

console.log("\nPrerender done. Routes:", ROUTES.length);
