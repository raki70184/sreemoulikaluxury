import { ImageItem } from '../types';
import S2 from "../../images/DesktopImages/S2.jpeg";
import S1 from "../../images/DesktopImages/S2.jpeg";
import Makeup from "../../images/WebsiteImages/Makeup.jpeg";

export const galleryImages: ImageItem[] = [
  {
    id: 1,
    type: 'image',
    src: S2,
    alt: "Professional hair treatment",
    title: "Luxury Hair Treatment",
    description: "Experience our signature deep conditioning and repair treatments",
    category: "Hair Care",
    subCategory: "Treatment"
  },
  {
    id: 2,
    type: 'image',
    src: S1,
    alt: "Hair styling session",
    title: "Expert Styling",
    description: "From classic to contemporary, we create the perfect style for you",
    category: "Hair Care",
    subCategory: "Styling"
  },
  {
    id: 3,
    type: 'image',
    src: Makeup,
    alt: "Professional makeup application",
    title: "Bridal Makeup",
    description: "Flawless makeup for your special day",
    category: "Makeup",
    subCategory: "Bridal"
  }
];