import React from "react";
import {
  cldUrl,
  cldSrcSet,
  cldLqipUrl,
  DEFAULT_WIDTHS,
  type CldUrlOptions,
} from "../../lib/cld";

type ImgAttrs = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "loading"
>;

export interface CldImageProps extends ImgAttrs {
  /** Cloudinary public ID, e.g. "websites/sm-luxe-salon/website/familyimage". */
  publicId: string;
  alt: string;
  /** Width set for the responsive srcset. Default = mobile-to-retina-laptop range. */
  widths?: number[];
  /** sizes attribute. Default "100vw" — pass a more specific one when known. */
  sizes?: string;
  /** Transform options applied to every URL in the srcset (q, f, ar, c, g). */
  transform?: Omit<CldUrlOptions, "w" | "h">;
  /** If true, image is the LCP candidate: eager load + high priority + no lazy. */
  priority?: boolean;
  /** If true, use a tiny blurred LQIP as a CSS background until the real image loads. */
  blurUp?: boolean;
}

/**
 * Cloudinary-backed responsive image. Emits AVIF/WebP/JPEG via f_auto and a
 * full srcset at sensible breakpoints. Use `priority` for the hero / LCP image.
 */
export const CldImage = React.forwardRef<HTMLImageElement, CldImageProps>(
  function CldImage(
    {
      publicId,
      alt,
      widths = DEFAULT_WIDTHS,
      sizes = "100vw",
      transform,
      priority = false,
      blurUp = false,
      style,
      ...rest
    },
    ref
  ) {
    const fallbackSrc = cldUrl(publicId, { w: widths[Math.floor(widths.length / 2)], ...transform });
    const srcSet = cldSrcSet(publicId, widths, transform);
    const lqip = blurUp ? cldLqipUrl(publicId) : undefined;
    const mergedStyle: React.CSSProperties | undefined = lqip
      ? {
          backgroundImage: `url(${lqip})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...style,
        }
      : style;
    return (
      <img
        ref={ref}
        alt={alt}
        src={fallbackSrc}
        srcSet={srcSet}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        // @ts-expect-error fetchpriority is valid on HTMLImageElement but typings lag.
        fetchpriority={priority ? "high" : "auto"}
        style={mergedStyle}
        {...rest}
      />
    );
  }
);
