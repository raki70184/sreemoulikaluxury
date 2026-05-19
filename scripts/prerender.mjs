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
 * IMPORTANT: this script MUST exit cleanly. The Vite preview server is spawned
 * as a detached process group and killed by group id; the script then calls
 * process.exit() explicitly. If the preview server is left running, Netlify
 * waits for the build's process tree to drain and eventually times out.
 *
 *   node scripts/prerender.mjs            # uses default port 4173
 *   node scripts/prerender.mjs --port 5050
 */
import { spawn } from "node:child_process";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = dirname(__dirname);
const DIST = join(REPO_ROOT, "dist");
// Run Vite's CLI entry directly with the current Node binary — no `npx`
// wrapper process to orphan, no .bin symlink/shebang surprises in CI.
const VITE_BIN = join(REPO_ROOT, "node_modules", "vite", "bin", "vite.js");

if (!existsSync(DIST)) {
  console.error("dist/ does not exist. Run `npm run build` first.");
  process.exit(1);
}
if (!existsSync(VITE_BIN)) {
  console.error("vite binary not found at " + VITE_BIN);
  process.exit(1);
}

const portIdx = process.argv.indexOf("--port");
const PORT = portIdx > 0 ? Number(process.argv[portIdx + 1]) : 4173;
const ROUTES = ["/", "/about", "/services", "/gallery", "/cafe", "/contact"];
const baseUrl = `http://localhost:${PORT}`;

console.log(`Starting vite preview on :${PORT}…`);
const previewProcess = spawn(
  process.execPath,
  [VITE_BIN, "preview", "--port", String(PORT), "--strictPort"],
  {
    cwd: REPO_ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env },
    detached: true, // own process group so we can kill the whole tree
  }
);

const previewLog = [];
previewProcess.stdout.on("data", (c) => previewLog.push(c.toString()));
previewProcess.stderr.on("data", (c) => previewLog.push(c.toString()));
let previewExitedEarly = false;
previewProcess.on("exit", (code) => {
  if (code !== 0 && code !== null) previewExitedEarly = true;
});

/** Kill the preview server and its whole process group. Safe to call twice. */
function killPreview() {
  if (!previewProcess.pid || previewProcess.killed) return;
  try {
    process.kill(-previewProcess.pid, "SIGKILL"); // negative pid = process group
  } catch {
    try {
      previewProcess.kill("SIGKILL");
    } catch {
      /* already gone */
    }
  }
}

/** Clean up every resource and terminate the Node process with `code`. */
async function finish(code, browser) {
  try {
    if (browser) await browser.close();
  } catch {
    /* ignore */
  }
  killPreview();
  // Explicit exit: open child pipes / sockets would otherwise keep Node alive.
  process.exit(code);
}

// Make sure an unexpected crash still tears the server down.
process.on("uncaughtException", (err) => {
  console.error("Uncaught:", err);
  killPreview();
  process.exit(1);
});

// --- wait for the preview server to accept connections -----------------------
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
    console.error("Vite preview exited before becoming ready:\n" + previewLog.join(""));
    await finish(1);
  }
  if (Date.now() - startedAt > READY_TIMEOUT_MS) {
    console.error(
      `Vite preview did not respond on ${baseUrl} within ${READY_TIMEOUT_MS / 1000}s:\n` +
        previewLog.join("")
    );
    await finish(1);
  }
  await new Promise((r) => setTimeout(r, 400));
}
console.log("vite preview ready.");

// --- drive Puppeteer over every route ----------------------------------------
console.log("Launching Puppeteer…");
let browser;
try {
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let writtenAny = false;
  for (const route of ROUTES) {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(30000);
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });

    const url = `${baseUrl}${route}`;
    console.log(`  ${route} -> rendering…`);
    // domcontentloaded, not networkidle0 — autoplay videos hold connections open.
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    await page.waitForFunction(
      () => {
        const el = document.getElementById("root");
        return el && el.children.length > 0 && el.innerText.trim().length > 50;
      },
      { timeout: 30000 }
    );

    // Let Helmet flush meta tags and Suspense settle.
    await new Promise((r) => setTimeout(r, 600));
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-prerendered", "true");
    });

    const html = "<!DOCTYPE html>\n" + (await page.content());
    const outDir = route === "/" ? DIST : join(DIST, route.replace(/^\//, ""));
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, "index.html"), html);
    console.log(
      `    wrote ${outDir.replace(DIST, "dist")}/index.html (${(html.length / 1024).toFixed(0)}KB)`
    );
    writtenAny = true;
    await page.close();
  }

  if (!writtenAny) {
    console.error("Prerender produced no output.");
    await finish(1, browser);
  }

  console.log("\nPrerender done. Routes:", ROUTES.length);
  await finish(0, browser);
} catch (err) {
  console.error("Prerender failed:", err);
  await finish(1, browser);
}
