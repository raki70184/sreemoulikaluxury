import React from "react";
import styles from "./HeroSection.module.css";
import defaultVideo from "../images/Videos/HighMakeupTrimmed.mp4";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  useVideo?: boolean;
  videoSrc?: string;
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
  imageSrc,
  heightVH = 90,
  className,
}) => {
  return (
    <section
      className={`${styles.hero} ${className || ""}`}
      style={{ minHeight: `${heightVH}vh` }}
    >
      {useVideo ? (
        <video
          className={styles.media}
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc || (defaultVideo as unknown as string)}
        />
      ) : (
        imageSrc && <img className={styles.media} src={imageSrc} alt="Hero" />
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
