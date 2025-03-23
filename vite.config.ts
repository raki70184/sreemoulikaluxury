import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), svgr()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    fs: {
      strict: false,
    },
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
});
