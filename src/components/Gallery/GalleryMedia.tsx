import React, { useRef, useEffect, useState } from "react";
import { GalleryItem, VideoItem } from "./types";
import styles from "./GalleryMedia.module.css";

// Custom hook to check if screen is mobile (425px or less)
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

interface GalleryMediaProps {
  item: GalleryItem;
}

const GalleryMedia: React.FC<GalleryMediaProps> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();
  
  // Get the appropriate video source based on screen size
  const getVideoSource = (item: VideoItem): string => {
    return (isMobile && item.mobileSrc) ? item.mobileSrc : item.src;
  };

  useEffect(() => {
    if (videoRef.current) {
      // Enable controls and ensure video is loaded
      videoRef.current.controls = true;
      videoRef.current.load();
    }
  }, [isMobile, item]);

  return (
    <div className={styles.mediaContainer}>
      {item.type === "video" ? (
        <div className={`${styles.videoWrapper} ${styles.noHover}`}>
          <video
            ref={videoRef}
            className={styles.video}
            poster={item.poster}
            playsInline
            controls
            controlsList="nodownload"
            // These attributes ensure controls are always visible
            onMouseOver={e => e.currentTarget.controls = true}
            onMouseOut={e => e.currentTarget.controls = true}
            onFocus={() => {}}
            autoPlay
            muted
            loop
          >
            <source src={getVideoSource(item as VideoItem)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className={styles.mediaWrapper}>
          <div className={styles.imageContainer}>
            <img
              src={item.src}
              alt={item.alt || ''}
              className={styles.image}
              loading="lazy"
            />
            {(item.title || item.description) && (
              <div className={styles.caption}>
                {item.title && <h4>{item.title}</h4>}
                {item.description && <p>{item.description}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryMedia;
