import React, { useRef, useEffect, useState } from "react";
import { GalleryItem, VideoItem } from "./types";
import styles from "./GalleryMedia.module.css";
import { CldImage } from "../CldImage";
import { cldVideoUrl, cldVideoPosterUrl } from "../../lib/cld";

// SSR-safe mobile detector — assumes desktop during prerender, re-measures on mount.
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const compute = () => setIsMobile(window.innerWidth <= 425);
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return isMobile;
};

interface GalleryMediaProps {
  item: GalleryItem;
}

const GalleryMedia: React.FC<GalleryMediaProps> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();

  const getVideoPublicId = (v: VideoItem): string =>
    isMobile && v.mobileSrc ? v.mobileSrc : (v.src as string);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.controls = true;
      videoRef.current.load();
    }
  }, [isMobile, item]);

  // iOS-safe touch handling: prevent pinch-zoom inside the gallery, but keep vertical scroll.
  useEffect(() => {
    const blockMultiTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    document.documentElement.style.touchAction = "manipulation";
    document.addEventListener("touchmove", blockMultiTouch, { passive: false });
    return () => {
      document.removeEventListener("touchmove", blockMultiTouch);
      document.documentElement.style.touchAction = "";
    };
  }, []);

  if (item.type === "video") {
    const videoItem = item as VideoItem;
    const videoId = getVideoPublicId(videoItem);
    const posterId = (videoItem.poster as string) || videoId;
    return (
      <div className={styles.mediaContainer} style={{ width: "100%", height: "100%", overflow: "hidden", touchAction: "pan-y" }}>
        <div className={`${styles.videoWrapper} ${styles.noHover}`}>
          <video
            ref={videoRef}
            className={styles.video}
            poster={cldVideoPosterUrl(posterId, { w: isMobile ? 720 : 1280 })}
            playsInline
            controls
            controlsList="nodownload"
            preload="metadata"
            autoPlay
            muted
            loop
          >
            <source src={cldVideoUrl(videoId, { w: isMobile ? 720 : 1280 })} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mediaContainer} style={{ width: "100%", height: "100%", overflow: "hidden", touchAction: "pan-y" }}>
      <div className={styles.mediaWrapper}>
        <div className={styles.imageContainer}>
          {item.src && (
            <CldImage
              publicId={item.src}
              alt={item.alt || ""}
              className={styles.image}
              widths={[320, 480, 640, 960, 1280]}
              sizes="(max-width: 768px) 80vw, 33vw"
            />
          )}
          {(item.title || item.description) && (
            <div className={styles.caption}>
              {item.title && <h4>{item.title}</h4>}
              {item.description && <p>{item.description}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryMedia;
