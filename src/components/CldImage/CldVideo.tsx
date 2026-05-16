import React from "react";
import { cldVideoUrl, cldVideoPosterUrl } from "../../lib/cld";

interface CldVideoProps extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "src" | "poster"> {
  publicId: string;
  /** Optional separate publicId for the poster frame. Defaults to a frame of the video itself. */
  posterPublicId?: string;
  /** Delivery width hint. Default 1280. */
  width?: number;
  /** If set, prefer this video for screens below this CSS px width (uses <source media>). */
  mobilePublicId?: string;
  mobileMaxWidth?: number;
}

/**
 * Cloudinary-backed responsive video. Two <source> tags when a mobile variant
 * is provided so the browser picks the smaller asset on phones without JS.
 */
export const CldVideo: React.FC<CldVideoProps> = ({
  publicId,
  posterPublicId,
  width = 1280,
  mobilePublicId,
  mobileMaxWidth = 768,
  ...rest
}) => {
  const poster = cldVideoPosterUrl(posterPublicId ?? publicId, { w: width });
  const desktopUrl = cldVideoUrl(publicId, { w: width });
  const mobileUrl = mobilePublicId ? cldVideoUrl(mobilePublicId, { w: 720 }) : null;
  return (
    <video poster={poster} preload="metadata" {...rest}>
      {mobileUrl && <source media={`(max-width: ${mobileMaxWidth}px)`} src={mobileUrl} type="video/mp4" />}
      <source src={desktopUrl} type="video/mp4" />
    </video>
  );
};
