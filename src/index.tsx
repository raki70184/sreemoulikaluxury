import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

/**
 * The site is prerendered to static HTML (see scripts/prerender.mjs) for SEO
 * and fast first paint. We intentionally do NOT hydrate that markup: Puppeteer
 * captures each route at a fixed 1280px viewport, so responsive hooks
 * (MUI useMediaQuery, custom useIsMobile) would mismatch on any other screen
 * size and trigger React hydration error #418.
 *
 * Instead we always createRoot().render(): the prerendered HTML still serves
 * crawlers and paints instantly, then React renders cleanly over it. No
 * hydration step means no mismatch errors, regardless of device width.
 */
const rootElement = document.getElementById("root")!;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
