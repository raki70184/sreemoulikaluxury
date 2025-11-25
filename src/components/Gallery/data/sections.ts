import { GalleryItem } from '../types';

// Import all images and videos
// Salon Interior
import salon1 from '../../images/GallerySectionImages/SalonInterior/view1.jpeg';
import salon2 from '../../images/GallerySectionImages/SalonInterior/view2.jpeg';
import salon3 from '../../images/GallerySectionImages/SalonInterior/view3.jpeg';
import salon4 from '../../images/GallerySectionImages/SalonInterior/view4.jpeg';

// Bridal
import bridal1 from '../../images/GallerySectionImages/Bridal/bridal1.jpeg';
import bridal2 from '../../images/GallerySectionImages/Bridal/bridal2.jpeg';
import bridal3 from '../../images/GallerySectionImages/Bridal/bridal3.jpeg';
import bridal4 from '../../images/GallerySectionImages/Bridal/bridal4.jpg';

// Facial
import facial1 from '../../images/GallerySectionImages/Facial/facial1.mp4';
import facial2 from '../../images/GallerySectionImages/Facial/facial2.mp4';
import facial1Coverimage from '../../images/GallerySectionImages/Facial/facial1Coverimage.jpeg';
import facial2Coverimage from '../../images/GallerySectionImages/Facial/facial2Coverimage.jpeg';

// Fashion
import fashion1 from '../../images/GallerySectionImages/Fashion/fashion1.jpeg';
import fashion2 from '../../images/GallerySectionImages/Fashion/fashion2.jpeg';
import fashion3 from '../../images/GallerySectionImages/Fashion/fashion3.jpeg';
import fashion4 from '../../images/GallerySectionImages/Fashion/fashion4.jpeg';
import fashionVideo from '../../images/GallerySectionImages/Fashion/makeupAparna.mp4';

// Hair Color
import hairColor1 from '../../images/GallerySectionImages/HairColor/haircolor1.jpeg';
import hairColor2 from '../../images/GallerySectionImages/HairColor/haircolor2.jpeg';
import hairColor3 from '../../images/GallerySectionImages/HairColor/haircolor3.jpeg';
import hairColor4 from '../../images/GallerySectionImages/HairColor/haircolor4.jpeg';
import hairVideo from '../../images/GallerySectionImages/HairColor/hairCut.mp4';

// Nails
import nail1 from '../../images/GallerySectionImages/Nail/nail1.jpeg';
import nail2 from '../../images/GallerySectionImages/Nail/nail2.jpeg';
import nail3 from '../../images/GallerySectionImages/Nail/nail3.jpeg';
import nailVideo from '../../images/GallerySectionImages/Nail/nailtransform.mp4';

export interface GallerySection {
  id: string;
  title: string;
  items: GalleryItem[];
  videoIndex: number; // Index where the video should be placed (0-3)
}

// Default height values (used if section-specific heights aren't defined)
const DEFAULT_HEIGHTS = {
  SMALL: '250px',
  MEDIUM: '350px',
  LARGE: '450px',
  XLARGE: '550px',
};

// Section-specific height configurations
const SECTION_HEIGHTS = {
  // Bridal section - all items same height
  BRIDAL: {
    SMALL: '600px',
    MEDIUM: '600px',
    LARGE: '600px',
    XLARGE: '600px',
  },
  // Salon Interior - varied heights
  SALON_INTERIOR: {
    SMALL: '300px',
    MEDIUM: '400px',
    LARGE: '500px',
    XLARGE: '600px',
  },
  // Facial - taller items
  FACIAL: {
    SMALL: '350px',
    MEDIUM: '450px',
    LARGE: '550px',
    XLARGE: '650px',
  },
  // Add more sections as needed
};

// Helper function to get height values for a section
const getSectionHeights = (sectionId: string) => {
  console.log('sectionId', sectionId);
  const sectionKey = sectionId.toUpperCase().replace(/-/g, '_');
  const heights = SECTION_HEIGHTS[sectionKey as keyof typeof SECTION_HEIGHTS] || DEFAULT_HEIGHTS;
  console.log('heights', heights);
  return {
    SMALL: heights.SMALL,
    MEDIUM: heights.MEDIUM,
    LARGE: heights.LARGE,
    XLARGE: heights.XLARGE,
  };
};

export const gallerySections: GallerySection[] = [
  {
    id: 'salon-interior',
    title: 'Salon Interior',
    heightClasses: [
      getSectionHeights('salon-interior').SMALL,
      getSectionHeights('salon-interior').MEDIUM,
      getSectionHeights('salon-interior').SMALL,
      getSectionHeights('salon-interior').SMALL
    ],
    videoIndex: 2, // Video will be the 3rd item
    items: [
      { 
        id: 1, 
        type: 'image', 
        src: salon1, 
        alt: 'Salon Interior 1', 
        title: 'Elegant Interior', 
        description: 'Our beautifully designed salon space', 
        category: 'Salon', 
        subCategory: 'Interior' 
      },
      { 
        id: 2, 
        type: 'image', 
        src: salon2, 
        alt: 'Luxury Seating Area', 
        title: 'Luxury Seating', 
        description: 'Comfortable and stylish seating area', 
        category: 'Salon', 
        subCategory: 'Interior' 
      },
      { 
        id: 3, 
        type: 'image', 
        src: salon3, 
        alt: 'Styling Stations', 
        title: 'Styling Stations', 
        description: 'Professional styling stations', 
        category: 'Salon', 
        subCategory: 'Interior' 
      },
      { 
        id: 4, 
        type: 'image', 
        src: salon4, 
        alt: 'Salon Reception', 
        title: 'Welcome Area', 
        description: 'Our inviting reception area', 
        category: 'Salon', 
        subCategory: 'Interior' 
      },
    ]
  },
  {
    id: 'bridal',
    title: 'Bridal',
    heightClasses: [
      getSectionHeights('bridal').SMALL,
      getSectionHeights('bridal').LARGE,
      getSectionHeights('bridal').MEDIUM,
      getSectionHeights('bridal').XLARGE
    ],
    videoIndex: 1, // Video will be the 2nd item
    items: [
      { 
        id: 5, 
        type: 'image', 
        src: bridal1, 
        alt: 'Bridal Makeup 1', 
        title: 'Bridal Makeup', 
        description: 'Elegant bridal look', 
        category: 'Makeup', 
        subCategory: 'Bridal' 
      },
      { 
        id: 6, 
        type: 'image', 
        src: bridal2, 
        alt: 'Bridal Makeup 2', 
        title: 'Traditional Look', 
        description: 'Traditional bridal styling', 
        category: 'Makeup', 
        subCategory: 'Bridal' 
      },
      { 
        id: 7, 
        type: 'image', 
        src: bridal3, 
        alt: 'Bridal Makeup 3', 
        title: 'Modern Bride', 
        description: 'Contemporary bridal style', 
        category: 'Makeup', 
        subCategory: 'Bridal' 
      },
      { 
        id: 8, 
        type: 'image', 
        src: bridal4, 
        alt: 'Bridal Makeup 4', 
        title: 'Bridal Glam', 
        description: 'Full bridal transformation', 
        category: 'Makeup', 
        subCategory: 'Bridal' 
      },
    ]
  },
  {
    id: 'facial',
    title: 'Facial',
    heightClasses: [
      getSectionHeights('facial').SMALL,
      getSectionHeights('facial').SMALL,
      getSectionHeights('facial').MEDIUM,
      getSectionHeights('facial').XLARGE
    ],
    videoIndex: 0, // Video will be the 1st item
    items: [
      { 
        id: 9, 
        type: 'video', 
        src: facial1, 
        poster: facial1Coverimage, // Using a bridal image as a placeholder poster
        title: 'Luxury Facial', 
        description: 'Rejuvenating facial treatment', 
        category: 'Skincare', 
        subCategory: 'Facial' 
      },
      { 
        id: 10, 
        type: 'video', 
        src: facial2, 
        poster: facial2Coverimage, // Using a bridal image as a placeholder poster
        title: 'Gold Facial', 
        description: 'Premium gold-infused facial', 
        category: 'Skincare', 
        subCategory: 'Facial' 
      }
    ]
  },
  {
    id: 'fashion',
    title: 'Fashion',
    heightClasses: [
      DEFAULT_HEIGHTS.SMALL,
      DEFAULT_HEIGHTS.MEDIUM,
      DEFAULT_HEIGHTS.XLARGE,
      DEFAULT_HEIGHTS.MEDIUM
    ],
    videoIndex: 0, // Video will be the 1st item
    items: [
      { 
        id: 13, 
        type: 'video', 
        src: fashionVideo, 
        // poster: fashion1, 
        // title: 'Fashion Showcase', 
        // description: 'Latest fashion trends', 
        category: 'Styling', 
        subCategory: 'Fashion' 
      },
      { 
        id: 14, 
        type: 'image', 
        src: fashion1, 
        alt: 'Editorial Look', 
        title: 'Editorial Look', 
        description: 'High-fashion editorial styling', 
        category: 'Styling', 
        subCategory: 'Fashion' 
      },
      { 
        id: 15, 
        type: 'image', 
        src: fashion2, 
        alt: 'Casual Chic', 
        title: 'Casual Chic', 
        description: 'Everyday fashion with a twist', 
        category: 'Styling', 
        subCategory: 'Fashion' 
      },
      { 
        id: 16, 
        type: 'image', 
        src: fashion3, 
        alt: 'Glamorous Evening', 
        title: 'Glamorous Evening', 
        description: 'Evening wear styling', 
        category: 'Styling', 
        subCategory: 'Fashion' 
      },
    ]
  },
  {
    id: 'hair-color',
    title: 'Hair Color',
    heightClasses: [
      DEFAULT_HEIGHTS.MEDIUM,
      DEFAULT_HEIGHTS.MEDIUM,
      DEFAULT_HEIGHTS.MEDIUM,
      DEFAULT_HEIGHTS.MEDIUM
    ],
    videoIndex: 3, // Video will be the last item
    items: [
      { 
        id: 17, 
        type: 'image', 
        src: hairColor1, 
        alt: 'Balayage Highlights', 
        title: 'Balayage', 
        description: 'Natural-looking highlights', 
        category: 'Hair', 
        subCategory: 'Coloring' 
      },
      { 
        id: 18, 
        type: 'image', 
        src: hairColor2, 
        alt: 'Ombre Hair', 
        title: 'Ombre', 
        description: 'Gradual color transition', 
        category: 'Hair', 
        subCategory: 'Coloring' 
      },
      { 
        id: 19, 
        type: 'image', 
        src: hairColor3, 
        alt: 'Vibrant Colors', 
        title: 'Vibrant Colors', 
        description: 'Bold and beautiful colors', 
        category: 'Hair', 
        subCategory: 'Coloring' 
      },
      { 
        id: 20, 
        type: 'video', 
        src: hairVideo, 
        poster: hairColor4,
        title: 'Color Transformation', 
        description: 'Complete color makeover', 
        category: 'Hair', 
        subCategory: 'Coloring' 
      },
    ]
  },
  {
    id: 'nails',
    title: 'Nails',
    heightClasses: [
      DEFAULT_HEIGHTS.SMALL,
      DEFAULT_HEIGHTS.MEDIUM,
      DEFAULT_HEIGHTS.SMALL,
      DEFAULT_HEIGHTS.LARGE
    ],
    videoIndex: 3, // Video will be the last item
    items: [
      { 
        id: 21, 
        type: 'image', 
        src: nail1, 
        alt: 'French Tips', 
        title: 'French Tips', 
        description: 'Classic French manicure', 
        category: 'Nails', 
        subCategory: 'Manicure' 
      },
      { 
        id: 22, 
        type: 'image', 
        src: nail2, 
        alt: 'Gel Extensions', 
        title: 'Gel Extensions', 
        description: 'Long-lasting gel nails', 
        category: 'Nails', 
        subCategory: 'Extensions' 
      },
      { 
        id: 23, 
        type: 'image', 
        src: nail3, 
        alt: 'Designer Nails', 
        title: 'Designer Nails', 
        description: 'Custom nail designs', 
        category: 'Nails', 
        subCategory: 'Art' 
      },
      { 
        id: 24, 
        type: 'video', 
        src: nailVideo, 
        poster: nail1,
        title: 'Nail Art Process', 
        description: 'Creative nail art in action', 
        category: 'Nails', 
        subCategory: 'Art' 
      },
    ]
  }
];

// Helper function to get all items from all sections
export const getAllGalleryItems = (): GalleryItem[] => {
  return gallerySections.flatMap(section => section.items);
};
