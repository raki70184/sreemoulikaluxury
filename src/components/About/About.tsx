import React from "react";
import styles from "./About.module.css";
import { nailTechnician as SalonTreatment1 } from "../images/WebsiteImages";
import { modelparty as modelParty, aparnaHighFashion, jabiliParty as jabiliparty, lashCertificate } from "../images/AboutSectionImages";
import { CldImage } from "../CldImage";

export const About: React.FC = () => {
  return (
    <div className={styles.aboutPage}>

      {/* Section 1: Three-Column Layout (Images L-R, Text Center) */}
      <section className={styles.section1}>
        <div className={styles.container}>
          <div className={styles.threeColumnLayout}>
            <div className={styles.imageContainer}>
              <CldImage publicId={SalonTreatment1} alt="SM Luxe Salon — certified beauty treatment" widths={[480, 640, 960]} sizes="(max-width: 768px) 100vw, 33vw" />
            </div>

            <div className={styles.contentContainer}>
              <h2>OUR BEAUTIFUL STORY</h2>
              <p>At SM Salon + Cafe, we believe that beauty is not just about appearance—it's about feeling confident, radiant, and truly yourself. Our journey began with a simple vision: to create a sanctuary where luxury beauty services meet the warmth of a premium cafe experience.</p>
              <p>Located in the heart of Hyderabad, we combine cutting-edge beauty techniques with traditional artistry, ensuring every client leaves not just looking beautiful, but feeling transformed from within.</p>
            </div>

            <div className={`${styles.imageContainer} ${styles.certificateContainer}`}>
              <CldImage publicId={lashCertificate} alt="Lash extension certification" className={styles.certificateImage} widths={[320, 480, 640]} sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Two-Column Alternating (Image Left, Text Right)
      <section className={styles.section2}>
        <div className={styles.twoColumnLayout}>
          <div className={styles.imageContainer}>
            <img src={momAndDaughter} alt="Salon interior" />
          </div>

          <div className={styles.contentContainer}>
            <div className={styles.accentLine}></div>
            <h3>OUR PHILOSOPHY</h3>
            <p>Every detail of our salon and cafe has been thoughtfully curated to provide an unparalleled experience. From the moment you step through our doors, you're enveloped in an atmosphere of elegance and comfort.</p>
            <p>Our team of skilled professionals brings years of expertise combined with genuine passion for beauty and wellness. We understand that each client is unique, which is why we tailor every service to complement your individual style and personality.</p>
          </div>
        </div>
      </section> */}

      {/* Section 3: Two-Column Alternating (Text Left, Image Right)
      <section className={styles.section3}>
        <div className={styles.twoColumnLayoutReversed}>
          <div className={styles.contentContainer}>
            <div className={styles.accentLine}></div>
            <h3>METICULOUS ARTISTRY</h3>
            <p>Excellence in beauty requires precision, creativity, and an unwavering commitment to perfection. Our meticulous approach ensures that every treatment, every styling session, and every cafe creation meets the highest standards of quality.</p>
            <p>Whether you're seeking transformative makeup artistry, rejuvenating spa treatments, or simply a moment of indulgence in our cafe, we approach each service with the same level of dedication and care that defines our brand.</p>
          </div>

          <div className={styles.imageContainer}>
            <img src={SalonTreatmentClose} alt="Precision treatment" />
          </div>
        </div>
      </section> */}

      {/* Image Gallery Section */}
      <section className={styles.imageGallery}>
        <div className={styles.galleryHeader}>
          <h2 className={styles.galleryTitle}>OUR SIGNATURE LOOKS</h2>
          <p className={styles.gallerySubtitle}>
            From high-fashion editorials to glamorous party looks, we create the perfect style to match your vision.
            Discover your signature look with our expert makeup artists.
          </p>
        </div>
        <div className={styles.galleryContainer}>
          <div className={`${styles.galleryItem} ${styles.itemSmall}`}>
            <CldImage publicId={modelParty} alt="Glamorous evening event styled by SM Luxe Salon" widths={[480, 640, 960]} sizes="(max-width: 768px) 100vw, 33vw" />
            <div className={styles.caption}>
              <h4>Elegant Evenings</h4>
              <p>Capturing glamour at exclusive events</p>
            </div>
          </div>

          <div className={`${styles.galleryItem} ${styles.itemLarge}`}>
            <CldImage publicId={jabiliparty} alt="Celebration moment styled by SM Luxe Salon" widths={[640, 960, 1280]} sizes="(max-width: 768px) 100vw, 50vw" />
            <div className={styles.caption}>
              <h4>Celebrations</h4>
              <p>Unforgettable moments from special occasions</p>
            </div>
          </div>

          <div className={`${styles.galleryItem} ${styles.itemMedium}`}>
            <CldImage publicId={aparnaHighFashion} alt="High fashion editorial look by SM Luxe Salon" widths={[480, 640, 960]} sizes="(max-width: 768px) 100vw, 33vw" />
            <div className={styles.caption}>
              <h4>High Fashion</h4>
              <p>Editorial looks that make a statement</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
