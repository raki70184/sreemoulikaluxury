import { VideoItem } from "../types";
import HighMakeupTrimmed from "../../images/Videos/HighMakeupTrimmed.mp4";

export const galleryVideos: VideoItem[] = [
  {
    id: 1,
    type: "video",
    src: HighMakeupTrimmed,
    poster:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=1200",
    title: "Color Transformation",
    description: "Watch our expert colorists create stunning transformations",
    category: "Hair Care",
    subCategory: "Color",
  },
  {
    id: 2,
    type: "video",
    src: HighMakeupTrimmed,
    poster: "",
    // "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1200",
    title: "Makeup Tutorial",
    description: "Professional techniques for a perfect makeup application",
    category: "Makeup",
    subCategory: "Tutorial",
  },
];
