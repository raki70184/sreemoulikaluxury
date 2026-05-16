import React, { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./FooterCarousel.module.css";
import { CldImage } from "../CldImage";

// Beauty Services Images (Cloudinary publicIds)
import {
  haircut as img1,
  nails1 as img2,
  hairSpa as img3,
  makeup as img4,
  hairColor as img5,
  nails3 as img6,
  aparna as img7,
  jabiliParty as img8,
} from "../images/WebsiteImages";

// Cafe Images (Cloudinary publicIds)
import {
  bowlSSquare as cafe1,
  burgerSquare as cafe2,
  cafefood as cafe3,
  pasta as cafe4,
  coffeeSquare as cafe5,
  pancakes as cafe6,
  riceBowl as cafe7,
  sandwich as cafe8,
} from "../images/CafeImages";


const beautySlides = [
  { src: img1, alt: "Haircut", caption: "Precision cuts tailored to your style." },
  { src: img2, alt: "Nail design", caption: "Nail art that speaks your vibe." },
  { src: img3, alt: "Hair spa", caption: "Deep hydration for a natural, radiant shine." },
  { src: img4, alt: "Makeup", caption: "Soft glam to full glam—your call." },
  { src: img5, alt: "Hair color", caption: "From subtle tones to bold statements." },
  { src: img6, alt: "Technician", caption: "Gentle care, beautiful transformations." },
  { src: img7, alt: "PartyMakeup", caption: "High fashion makeup for your special day." },
  { src: img8, alt: "ReceptionMakeup", caption: "Elegant reception makeup to match your style." },
];

const cafeSlides = [
  { src: cafe1, alt: "Bowl", caption: "Fresh and healthy bowl options" },
  { src: cafe2, alt: "Burger", caption: "Juicy burgers made with love" },
  { src: cafe3, alt: "Cafe Food", caption: "Delicious cafe cuisine" },
  { src: cafe4, alt: "Cafe View", caption: "Cozy atmosphere to relax and enjoy" },
  { src: cafe5, alt: "Coffee", caption: "Artisanal coffee selection" },
  { src: cafe6, alt: "Pancakes", caption: "Fluffy pancakes for a perfect treat" },
  { src: cafe7, alt: "Rice Bowl", caption: "Fresh and healthy bowl options" },
  { src: cafe8, alt: "Sandwich", caption: "Juicy burgers made with love" },
];

interface FooterCarouselProps {
  activeTab?: 'beauty' | 'cafe';
}

const FooterCarousel: React.FC<FooterCarouselProps> = ({ activeTab = 'beauty' }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.7) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const items = useMemo(() => {
    return activeTab === 'cafe' ? cafeSlides : beautySlides;
  }, [activeTab]);

  return (
    <div className={styles.carouselWrap}>
      <div className={styles.inner}>
        <div className={styles.scroller} ref={scrollerRef}>
          {items.map((s, i) => (
            <div key={i} className={styles.slide}>
              <CldImage publicId={s.src} alt={s.alt} widths={[320, 480, 640]} sizes="(max-width: 768px) 50vw, 25vw" />
              <div className={styles.caption}>
                <div className={styles.captionText}>{s.caption}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.arrows} aria-hidden>
          <button className={styles.arrowBtn} onClick={() => scrollBy(-1)}>
            <ChevronLeft size={18} />
          </button>
          <button className={styles.arrowBtn} onClick={() => scrollBy(1)}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterCarousel;
