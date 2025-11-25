import React from "react";
import styles from "./About.module.css";
import SalonTreatment1 from "../images/WebsiteImages/NailTechnician.jpg"; // Placeholder
// import SalonTreatment1 from "../images/WebsiteImages/Makeup.jpeg"; // Placeholder - should be actual salon images
import momAndDaughter from "../images/WebsiteImages/momAndDaughterImage.jpeg"; // Placeholder
import SalonAmbiance from "../images/WebsiteImages/Glamour.jpeg"; // Placeholder
import SalonTreatmentClose from "../images/WebsiteImages/HairSpa.jpeg"; // Placeholder
import modelParty from "../images/AboutSectionImages/modelParty.jpeg"; // Placeholder
import aparnaHighFashion from "../images/AboutSectionImages/aparnaHighFashion.jpeg"; // Placeholder
import jabiliparty from "../images/AboutSectionImages/jabiliParty.jpeg"; // Placeholder
import lashCertificate from "../images/AboutSectionImages/lashCertificate.jpeg"; // Placeholder
// import SalonService1 from "../images/WebsiteImages/Makeup.jpeg"; // Placeholder
// import ProductShowcase from "../images/WebsiteImages/BeautyServices.jpg"; // Placeholder
// import CafeMoment2 from "../images/WebsiteImages/Glamour.jpeg"; // Placeholder

export const About: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.aboutPage}>

      {/* Section 1: Three-Column Layout (Images L-R, Text Center) */}
      <section className={styles.section1}>
        <div className={styles.container}>
          <div className={styles.threeColumnLayout}>
            <div className={styles.imageContainer}>
              <img src={SalonTreatment1} alt="Beauty treatment moment" />
            </div>

            <div className={styles.contentContainer}>
              <h2>OUR BEAUTIFUL STORY</h2>
              <p>At SM Salon + Cafe, we believe that beauty is not just about appearance—it's about feeling confident, radiant, and truly yourself. Our journey began with a simple vision: to create a sanctuary where luxury beauty services meet the warmth of a premium cafe experience.</p>
              <p>Located in the heart of Hyderabad, we combine cutting-edge beauty techniques with traditional artistry, ensuring every client leaves not just looking beautiful, but feeling transformed from within.</p>
            </div>

            <div className={`${styles.imageContainer} ${styles.certificateContainer}`}>
              <img src={lashCertificate} alt="Lash certification" className={styles.certificateImage} />
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
            <img src={modelParty} alt="Model at a party" />
            <div className={styles.caption}>
              <h4>Elegant Evenings</h4>
              <p>Capturing glamour at exclusive events</p>
            </div>
          </div>

          <div className={`${styles.galleryItem} ${styles.itemLarge}`}>
            <img src={jabiliparty} alt="Celebration moment" />
            <div className={styles.caption}>
              <h4>Celebrations</h4>
              <p>Unforgettable moments from special occasions</p>
            </div>
          </div>

          <div className={`${styles.galleryItem} ${styles.itemMedium}`}>
            <img src={aparnaHighFashion} alt="High fashion portrait" />
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
