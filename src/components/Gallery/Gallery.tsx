import { useMemo } from 'react';
import { gallerySections } from './data/sections';
import GallerySection from './GallerySection';
import styles from './Gallery.module.css';

const Gallery = () => {
  // // Get the first item from the first section as featured
  // const featuredItem = useMemo(() => {
  //   return gallerySections[0]?.items[0];
  // }, []);

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryHeader}>
        <h1 className={styles.galleryTitle}>Our Work</h1>
        <p className={styles.galleryDescription}>
          Explore our portfolio of stunning transformations and artistic creations.
          Each section showcases our expertise in different beauty services.
        </p>
      </div>

      {/* {featuredItem && (
        <div className={styles.featuredSection}>
          <GallerySection 
            title="Featured" 
            items={[featuredItem]} 
          />
        </div> */}
      {/* )} */}

      <div className={styles.sectionsContainer}>
        {gallerySections.map((section) => (
          <GallerySection
            key={section.id}
            id={section.id}
            title={section.title}
            items={section.items}
            videoIndex={section.videoIndex}
            heightClasses={section.heightClasses}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
