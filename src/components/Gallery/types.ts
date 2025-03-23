export interface MediaItem {
  id: number;
  title: string;
  description: string;
  category: string;
  subCategory: string;
}

export interface ImageItem extends MediaItem {
  type: "image";
  src: string;
  alt: string;
}

export interface VideoItem extends MediaItem {
  type: "video";
  src: string;
  poster?: string;
}

export type GalleryItem = ImageItem | VideoItem;

export interface CategoryGroup {
  title: string;
  items: GalleryItem[];
}
