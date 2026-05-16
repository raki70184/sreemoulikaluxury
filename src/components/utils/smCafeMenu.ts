/**
 * Cafe menu data — kept in /public/data/cafe-menu.json so it can be edited
 * without recompiling. This module just types the shape and exposes a tiny
 * fetch hook. The Cafe page calls `useCafeMenu()` at render time.
 */

export interface CafeMenuItem {
  item_title: string;
  item_price: string;
  item_description: string;
}

export interface CafeMenuSection {
  header: string;
  items: CafeMenuItem[];
}

export interface CafeMenuData {
  menu: CafeMenuSection[];
}

// Empty default so the module can still be imported during prerender without
// hitting the network. The async loader replaces it at runtime.
export const smCafeMenuData: CafeMenuData = { menu: [] };

let cachedPromise: Promise<CafeMenuData> | null = null;

export function loadCafeMenu(): Promise<CafeMenuData> {
  if (cachedPromise) return cachedPromise;
  cachedPromise = fetch("/data/cafe-menu.json", { credentials: "omit" })
    .then((r) => {
      if (!r.ok) throw new Error("Failed to load cafe menu: " + r.status);
      return r.json() as Promise<CafeMenuData>;
    })
    .catch((err) => {
      // Reset so we retry on next call.
      cachedPromise = null;
      throw err;
    });
  return cachedPromise;
}
