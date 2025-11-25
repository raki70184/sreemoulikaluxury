export interface MediaItem {
  id: number;
  title?: string;
  description?: string;
  category?: string;
  subCategory?: string;
  heightClass?: string; // Optional custom height class
}

export interface ImageItem extends MediaItem {
  type: "image";
  src?: string;
  alt?: string;
}

export interface VideoItem extends MediaItem {
  type: "video";
  src?: string;
  mobileSrc?: string; // For screens 425px or less
  poster?: string;
}

export type GalleryItem = ImageItem | VideoItem;

export interface GallerySection {
  id: string;
  title?: string;
  items: GalleryItem[];
  videoIndex: number; // Index where the video should be placed (0-3)
  heightClasses?: string[]; // Array of height values for each item in the section
}
