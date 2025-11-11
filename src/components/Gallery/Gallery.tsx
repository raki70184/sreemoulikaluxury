import { galleryImages } from "./data/images";
import { galleryVideos } from "./data/videos";
import GalleryMedia from "./GalleryMedia";
import { CategoryGroup, GalleryItem } from "./types";
import styles from "./Gallery.module.css";

const Gallery = () => {
  const allMedia = [...galleryImages, ...galleryVideos];
  const featured = allMedia[0];

  // Group media by category
  const mediaByCategory = allMedia.reduce<Record<string, GalleryItem[]>>(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  // Create category groups
  const categoryGroups: CategoryGroup[] = Object.entries(mediaByCategory).map(
    ([title, items]) => ({
      title,
      items: items.sort((a, b) => a.subCategory.localeCompare(b.subCategory)),
    })
  );

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryHeader}>
        <h2 className={styles.galleryTitle}>Our Work</h2>
        <p className={styles.galleryDescription}>
          Experience our transformative work through our collection of videos
          and images, showcasing the artistry and expertise of our talented
          team.
        </p>
      </div>

      {featured && (
        <section className={styles.featuredSection}>
          <div className={styles.featuredWrapper}>
            {featured.type === "video" ? (
              <video
                className={styles.featuredMedia}
                controls
                poster={"poster" in featured ? featured.poster : undefined}
              >
                <source src={featured.src} type="video/mp4" />
              </video>
            ) : (
              <img
                className={styles.featuredMedia}
                src={featured.src}
                alt={(featured as any).alt}
              />
            )}
            <div className={styles.featuredCaption}>
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
            </div>
          </div>
        </section>
      )}

      {categoryGroups.map((group) => (
        <section key={group.title} className={styles.categorySection}>
          <h3 className={styles.categoryHeader}>{group.title}</h3>
          <div className={styles.categoryGrid}>
            {chunk(group.items, 2).map((pair, index) => (
              <div key={index} className={styles.pairContainer}>
                {pair.map((item) => (
                  <GalleryMedia key={`${item.type}-${item.id}`} item={item} />
                ))}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

// Helper function to chunk array into pairs
function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}

export default Gallery;
