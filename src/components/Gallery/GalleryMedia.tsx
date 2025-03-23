import React, { useRef, useEffect } from "react";
import { ImageIcon } from "lucide-react";
import { GalleryItem } from "./types";
import styles from "./GalleryMedia.module.css";

interface GalleryMediaProps {
  item: GalleryItem;
}

const GalleryMedia: React.FC<GalleryMediaProps> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Enable controls and ensure video is loaded
      videoRef.current.controls = true;
      videoRef.current.load();
    }
  }, []);

  return (
    <div className={styles.mediaContainer}>
      <div className={styles.mediaWrapper}>
        {item.type === "video" ? (
          <div className={styles.videoContainer}>
            <video
              ref={videoRef}
              className={styles.video}
              poster={item.poster}
              playsInline
              preload="metadata"
              crossOrigin="anonymous"
            >
              <source src={item.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className={styles.imageContainer}>
            <img src={item.src} alt={item.alt} className={styles.image} />
            <div className={`${styles.overlay} ${styles.imageOverlay}`}>
              <ImageIcon className="w-12 h-12 text-white" />
            </div>
          </div>
        )}
      </div>
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
        <span className={styles.category}>{item.subCategory}</span>
      </div>
    </div>
  );
};

export default GalleryMedia;
