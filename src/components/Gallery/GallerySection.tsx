import React, { useRef, useState, useEffect } from 'react';
import { GalleryItem, GallerySection as GallerySectionType } from './types';
import GalleryMedia from './GalleryMedia';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './Gallery.module.css';

// Helper function to get height class based on index or item properties
const getHeightClass = (item: GalleryItem, index: number, sectionClasses?: string[]): string => {
  // Check if item has a custom height class
  if ('heightClass' in item && item.heightClass) {
    return item.heightClass;
  }
  
  // Use section-specific height classes if provided
  if (sectionClasses && sectionClasses.length > 0) {
    return sectionClasses[index % sectionClasses.length];
  }
  
  // Default pattern if no section classes provided
  const defaultPattern = [
    styles.heightMedium, 
    styles.heightLarge, 
    styles.heightSmall, 
    styles.heightXLarge
  ];
  
  return defaultPattern[index % defaultPattern.length];
};

type GallerySectionProps = Omit<GallerySectionType, 'items'> & {
  items: GalleryItem[];
  heightClasses?: string[];
};

const GallerySection: React.FC<GallerySectionProps> = ({ 
  id,
  title, 
  items, 
  heightClasses = [],
  videoIndex
}) => {
  // Generate a unique ID for this section to scope the styles
  const sectionId = `section-${id || title?.toLowerCase().replace(/\s+/g, '-')}`;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(true);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(true); // Always show both arrows by default

  const checkScroll = () => {
    // Always keep arrows visible
    setShowLeftArrow(true);
    setShowRightArrow(true);
    
    // The rest of the scroll logic can be used for other purposes
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      // These values can be used for additional logic if needed
      const isAtStart = scrollLeft <= 0;
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll(); // Initial check
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <section className={`${styles.gallerySection} ${sectionId}`}>
      <style>
        {`
          .${sectionId} .rowItem {
            flex: 0 0 auto;
            scroll-snap-align: start;
          }
          
          /* Define section-specific height classes */
          ${heightClasses.map((cls, index) => 
            `.${sectionId} .${styles.rowItem}:nth-child(${index + 1}) {
              height: ${cls} !important;
              min-height: ${cls} !important;
            }`
          ).join('\n')}
        `}
      </style>
      
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.carouselContainer}>
        {showLeftArrow && (
          <button 
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            onClick={() => scroll('left')}
            aria-label="Previous items"
          >
            <FaChevronLeft />
          </button>
        )}
        
        <div 
          ref={containerRef} 
          className={styles.rowContainer}
        >
          {items.map((item, index) => (
            <div 
              key={`${item.type}-${item.id}`} 
              className={`${styles.rowItem} ${getHeightClass(item, index, heightClasses)}`}
            >
              <GalleryMedia item={item} />
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button 
            className={`${styles.navButton} ${styles.navButtonRight}`}
            onClick={() => scroll('right')}
            aria-label="Next items"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
