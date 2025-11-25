import React, { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./FooterCarousel.module.css";

// Beauty Services Images
import img1 from "../images/WebsiteImages/haircut.jpeg";
import img2 from "../images/WebsiteImages/nails1.jpeg";
import img3 from "../images/WebsiteImages/HairSpa.jpeg";
import img4 from "../images/WebsiteImages/Makeup.jpeg";
import img5 from "../images/WebsiteImages/hair color.jpeg";
import img6 from "../images/WebsiteImages/nails3.jpeg";
import img7 from "../images/WebsiteImages/aparna.jpeg";
import img8 from "../images/WebsiteImages/jabiliParty.jpeg";

// Cafe Images
import cafe1 from "../images/CafeImages/BowlSSquare.jpeg";
import cafe2 from "../images/CafeImages/BurgerSquare.jpeg";
import cafe3 from "../images/CafeImages/cafefood.jpeg";
import cafe4 from "../images/CafeImages/pasta.jpeg";
import cafe5 from "../images/CafeImages/coffeeSquare.jpeg";
import cafe6 from "../images/CafeImages/pancakes.jpeg";
import cafe7 from "../images/CafeImages/riceBowl.jpeg";
import cafe8 from "../images/CafeImages/sandwich.jpeg";


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
              <img src={s.src} alt={s.alt} loading="lazy" />
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
