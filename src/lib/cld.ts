/**
 * Cloudinary URL helpers.
 *
 * Cloudinary delivers responsive AVIF/WebP/JPEG via the f_auto/q_auto chain.
 * Pre-built transform strings keep call sites short and consistent. The cloud
 * name is the single piece of config that ships to the client; the API
 * key/secret are server-side only (scripts/cld-upload.mjs).
 */

export const CLOUDINARY_CLOUD_NAME = "dguwwzd5z";
export const CLOUDINARY_BASE_FOLDER = "websites/sm-luxe-salon";
export const CLOUDINARY_DELIVERY = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;

export type CldFit = "fill" | "limit" | "scale" | "fit" | "thumb" | "crop";
export type CldGravity = "auto" | "face" | "faces" | "center";

export interface CldUrlOptions {
  /** Output width in CSS pixels (Cloudinary will apply DPR multiplier separately). */
  w?: number;
  /** Output height in CSS pixels. */
  h?: number;
  /** Aspect ratio e.g. "16:9" or "1:1". Use instead of explicit h when you want responsive. */
  ar?: string;
  /** Crop/scale strategy. Default is "fill" with gravity:auto so faces stay in frame. */
  c?: CldFit;
  /** Gravity for fill/crop. Default "auto". */
  g?: CldGravity;
  /** Output quality. Default "auto" lets Cloudinary pick (best for performance). */
  q?: number | "auto" | "auto:eco" | "auto:low" | "auto:good" | "auto:best";
  /** Format. Default "auto" delivers AVIF/WebP to supporting browsers. */
  f?: "auto" | "avif" | "webp" | "jpg" | "png";
  /** Device pixel ratio (delivery hint, not browser DPR). */
  dpr?: 1 | 2 | 3 | "auto";
  /** Additional raw transformation string appended to the chain. */
  raw?: string;
}

const DEFAULT_OPTS: Required<Pick<CldUrlOptions, "q" | "f" | "c" | "g">> = {
  q: "auto",
  f: "auto",
  c: "fill",
  g: "auto",
};

function buildTransform(opts: CldUrlOptions): string {
  const merged = { ...DEFAULT_OPTS, ...opts };
  const parts: string[] = [];
  if (merged.f) parts.push(`f_${merged.f}`);
  if (merged.q !== undefined) parts.push(`q_${merged.q}`);
  if (merged.dpr) parts.push(`dpr_${merged.dpr}`);
  if (merged.w) parts.push(`w_${merged.w}`);
  if (merged.h) parts.push(`h_${merged.h}`);
  if (merged.ar) parts.push(`ar_${merged.ar}`);
  if (merged.c) parts.push(`c_${merged.c}`);
  if (merged.g && (merged.c === "fill" || merged.c === "crop" || merged.c === "thumb")) {
    parts.push(`g_${merged.g}`);
  }
  if (merged.raw) parts.push(merged.raw);
  return parts.join(",");
}

/** Build a delivery URL for an image asset. */
export function cldUrl(publicId: string, opts: CldUrlOptions = {}): string {
  const t = buildTransform(opts);
  return `${CLOUDINARY_DELIVERY}/image/upload/${t}/${publicId}`;
}

/** Build a delivery URL for a video asset. */
export function cldVideoUrl(
  publicId: string,
  opts: { w?: number; h?: number; q?: CldUrlOptions["q"]; format?: "mp4" | "webm" | "auto" } = {}
): string {
  const { w, h, q = "auto", format = "mp4" } = opts;
  const parts = [`q_${q}`];
  if (w) parts.push(`w_${w}`);
  if (h) parts.push(`h_${h}`);
  // Always end with c_limit so we never upscale
  parts.push("c_limit");
  const ext = format === "auto" ? "" : `.${format}`;
  return `${CLOUDINARY_DELIVERY}/video/upload/${parts.join(",")}/${publicId}${ext}`;
}

/** Build a poster URL (still frame) for a video asset. */
export function cldVideoPosterUrl(
  publicId: string,
  opts: CldUrlOptions = {}
): string {
  const t = buildTransform({ w: 1280, ...opts });
  return `${CLOUDINARY_DELIVERY}/video/upload/${t}/${publicId}.jpg`;
}

/** LQIP (low-quality image placeholder) for blur-up backgrounds. */
export function cldLqipUrl(publicId: string): string {
  return `${CLOUDINARY_DELIVERY}/image/upload/e_blur:600,q_auto:low,w_60,f_auto/${publicId}`;
}

/**
 * Build a srcset string at the given widths.
 * Returns `${url} ${w}w, ...` suitable for the `srcset` attribute.
 */
export function cldSrcSet(
  publicId: string,
  widths: number[],
  baseOpts: Omit<CldUrlOptions, "w"> = {}
): string {
  return widths
    .map((w) => `${cldUrl(publicId, { ...baseOpts, w })} ${w}w`)
    .join(", ");
}

/** Default responsive widths. Mobile-first; 1920 covers retina laptops. */
export const DEFAULT_WIDTHS = [320, 480, 640, 960, 1280, 1600, 1920];
