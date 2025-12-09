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
    return (isMobile && item.mobileSrc) ? item.mobileSrc : item.src as any;
  };

  useEffect(() => {
    if (videoRef.current) {
      // Enable controls and ensure video is loaded
      videoRef.current.controls = true;
      videoRef.current.load();
    }
  }, [isMobile, item]);

  // Add CSS to prevent zooming and ensure proper scaling
  useEffect(() => {
    const preventZoom = (e: TouchEvent) => {
      // Prevent zooming on multi-touch
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // iOS specific fixes
    const handleTouchMove = (e: TouchEvent) => {
      // Prevent elastic scrolling
      if (e.target === videoRef.current || e.target === document.documentElement) {
        e.preventDefault();
      }
    };

    // Disable double-tap zoom
    document.documentElement.style.touchAction = 'manipulation';
    document.documentElement.style.webkitTextSizeAdjust = '100%';
    
    // Add event listeners
    document.addEventListener('touchmove', preventZoom, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', preventZoom);
      document.removeEventListener('touchmove', handleTouchMove);
      document.documentElement.style.touchAction = '';
      document.documentElement.style.webkitTextSizeAdjust = '';
    };
  }, []);

  return (
    <div className={styles.mediaContainer} style={{
      WebkitTransform: 'scale(1)',
      transform: 'scale(1)',
      WebkitTransformOrigin: 'center center',
      transformOrigin: 'center center',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      touchAction: 'auto'
    }}>
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
