import React, { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./FooterCarousel.module.css";

import img1 from "../images/haircut.jpeg";
import img2 from "../images/nails1.jpeg";
import img3 from "../images/HairSpa.jpeg";
import img4 from "../images/Makeup.jpeg";
import img5 from "../images/hair color.jpeg";
import img6 from "../images/NailTechnician.jpg";

const slides = [
  { src: img1, alt: "Haircut", caption: "Precision cuts tailored to your style." },
  { src: img2, alt: "Nail design", caption: "Nail art that speaks your vibe." },
  { src: img3, alt: "Hair spa", caption: "Deep hydration for a natural, radiant shine." },
  { src: img4, alt: "Makeup", caption: "Soft glam to full glam—your call." },
  { src: img5, alt: "Hair color", caption: "From subtle tones to bold statements." },
  { src: img6, alt: "Technician", caption: "Gentle care, beautiful transformations." },
];

const FooterCarousel: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.7) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const items = useMemo(() => slides, []);

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
