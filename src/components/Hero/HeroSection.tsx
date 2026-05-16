import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";
import { CldImage } from "../CldImage";
import { cldVideoUrl, cldVideoPosterUrl } from "../../lib/cld";
import { highMakeupTrimmed, dashaFacial } from "../images/Videos";

// SSR-safe mobile detector. During prerender there is no window, so we default
// to desktop and let the client effect re-measure on mount.
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const compute = () => setIsMobile(window.innerWidth <= 768);
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return isMobile;
};

interface HeroSectionProps {
  title?: string | React.ReactNode;
  subtitle?: string;
  description?: string | React.ReactNode;
  ctaLabel?: string;
  onCtaClick?: () => void;
  useVideo?: boolean;
  /** Cloudinary publicId for the desktop hero video. */
  videoPublicId?: string;
  /** Cloudinary publicId for the mobile hero video. */
  mobileVideoPublicId?: string;
  /** Cloudinary publicId for the desktop hero image (when useVideo is false). */
  imagePublicId?: string;
  /** Cloudinary publicId for the mobile hero image (when useVideo is false). */
  mobileImagePublicId?: string;
  /** Min hero height in vh. */
  heightVH?: number;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Exquisite Beauty, Tailored for You",
  subtitle,
  description,
  ctaLabel,
  onCtaClick,
  useVideo = true,
  videoPublicId,
  mobileVideoPublicId,
  imagePublicId,
  mobileImagePublicId,
  heightVH = 90,
  className,
}) => {
  const isMobile = useIsMobile();
  const desktopVideo = videoPublicId ?? highMakeupTrimmed;
  const mobileVideo = mobileVideoPublicId ?? dashaFacial;
  const activeVideo = isMobile ? mobileVideo : desktopVideo;
  const activeImage = isMobile && mobileImagePublicId ? mobileImagePublicId : imagePublicId;

  return (
    <section
      className={`${styles.hero} ${className || ""}`}
      style={{ minHeight: `${heightVH}vh` }}
    >
      {useVideo ? (
        <video
          key={isMobile ? "mobile" : "desktop"}
          className={styles.media}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={cldVideoPosterUrl(activeVideo, { w: isMobile ? 720 : 1280 })}
          src={cldVideoUrl(activeVideo, { w: isMobile ? 720 : 1280 })}
        />
      ) : (
        activeImage && (
          <CldImage
            publicId={activeImage}
            alt="SM Luxe Salon — hero"
            className={styles.media}
            widths={[640, 960, 1280, 1600, 1920, 2400]}
            sizes="100vw"
            priority
            key={isMobile ? "mobile-img" : "desktop-img"}
          />
        )
      )}
      <div className={styles.overlay} />
      <div className={styles.content}>
        {subtitle && <p className={styles.kicker}>{subtitle}</p>}
        {title && <h1 className={styles.title}>{title}</h1>}
        {description && <p className={styles.description}>{description}</p>}
        {ctaLabel && (
          <button className={styles.cta} onClick={onCtaClick}>
            {ctaLabel}
          </button>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
