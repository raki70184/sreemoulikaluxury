import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";
import defaultVideo from "../images/Videos/HighMakeupTrimmed.mp4";
import mobileVideo from "../images/Videos/DashaFacial.mp4";

// Custom hook to check if screen is mobile (≤ 768px) for responsive images
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
  videoSrc?: string;
  mobileVideoSrc?: string;
  mobileImageSrc?: string;
  imageSrc?: string;
  heightVH?: number; // allow custom height if needed
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Exquisite Beauty, Tailored for You",
  subtitle,
  description,
  ctaLabel,
  onCtaClick,
  useVideo = true,
  videoSrc,
  mobileVideoSrc = mobileVideo,
  imageSrc,
  mobileImageSrc,
  heightVH = 90,
  className,
}) => {
  const isMobile = useIsMobile();
  const [currentVideo, setCurrentVideo] = useState<string>(
    videoSrc || (defaultVideo as unknown as string)
  );

  useEffect(() => {
    if (isMobile && mobileVideoSrc) {
      setCurrentVideo(mobileVideoSrc);
    } else {
      setCurrentVideo(videoSrc || (defaultVideo as unknown as string));
    }
  }, [isMobile, mobileVideoSrc, videoSrc]);
  return (
    <section
      className={`${styles.hero} ${className || ""}`}
      style={{ minHeight: `${heightVH}vh` }}
    >
      {useVideo ? (
        <video
          key={isMobile ? 'mobile' : 'desktop'}
          className={styles.media}
          autoPlay
          muted
          loop
          playsInline
          src={currentVideo}
        />
      ) : (
        imageSrc && (
          <img 
            className={styles.media} 
            src={isMobile && mobileImageSrc ? mobileImageSrc : imageSrc} 
            alt="Hero" 
            key={isMobile ? 'mobile-img' : 'desktop-img'}
          />
        )
      )}
      <div className={styles.overlay} />
      <div className={styles.content}>
        {subtitle && <p className={styles.kicker}>{subtitle}</p>}
        {title && <h1 className={styles.title}>{title}</h1>}
        {description && (
          <p className={styles.description}>{description}</p>
        )}
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
