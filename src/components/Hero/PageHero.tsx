import React from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "./HeroSection";
import AboutHeroImg from "../images/WebsiteImages/Makeup.jpeg";
import ServicesHeroImg from "../images/DesktopImages/S2.jpeg";
import GalleryHeroImg from "../images/WebsiteImages/Glamour.jpeg";
// import ContactHeroImg from "../images/WebsiteImages/NailTechnician.jpg";
import ContactHeroImg from "../images/DesktopImages/NailandPedicureView.jpeg";
import CafeHeroImg from "../images/WebsiteImages/HairSpa.jpeg";
import awardImage from "../images/DesktopImages/S7.jpeg";
import cafeImage from "../images/CafeImages/FinalCafeView.jpeg";
import mobileCafeImage from "../images/CafeImages/MobileCafeView.jpeg";
import DivMakeupContact from "../images/MobileImages/DivMakeupContact.jpeg";
import InaraHairColor from "../images/MobileImages/InaraHairColor.jpeg";
const PageHero: React.FC = () => {
  const { pathname } = useLocation();

  const common = {
    subtitle: "Premium Salon & Cafe",
    ctaLabel: "Continue",
    onCtaClick: () => {
      // scroll below hero
      const y = window.innerHeight - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
  } as const;

  if (pathname === "/services") {
    return (
      <HeroSection
        {...common}
        title={<>
          Our Signature Services
        </>}
        description={<>Indulge in our curated treatments<br />crafted to elevate your natural beauty.</>}
        useVideo={false}
        imageSrc={ServicesHeroImg}
        mobileImageSrc={InaraHairColor}
        className="centerHero"
        heightVH={92}
      />
    );
  }

  if (pathname === "/gallery") {
    return (
      <HeroSection
        {...common}
        title={<>
          The Art Of Beauty
        </>}
        description={<>Explore our portfolio of transformations<br />in photo and motion.</>}
        useVideo={false}
        imageSrc={GalleryHeroImg}
        className="centerHero"
        heightVH={92}
      />
    );
  }

  if (pathname === "/contact") {
    return (
      <HeroSection
        {...common}
        title={<>
          Let's Connect
        </>}
        description={<>Feel like having a chat or setting up an appointment?<br />We're here and happy to help.</>}
        useVideo={false}
        imageSrc={ContactHeroImg}
        mobileImageSrc={DivMakeupContact}
        className="centerHero"
        heightVH={92}
      />
    );
  }

  if (pathname === "/about") {
    return (
      <HeroSection
        {...common}
        title={<>
          Luxury Crafted Around You
        </>}
        description={<>Where luxury meets personalization<br />in every detail.</>}
        useVideo={false}
        imageSrc={awardImage}
        className="centerHero"
        heightVH={92}
      />
    );
  }

  if (pathname === "/cafe") {
    return (
      <HeroSection
        {...common}
        title={<>
          The Beauty Cafe
        </>}
        description={<>Relax, sip, and glow—our cozy cafe<br />experience inside the salon.</>}
        useVideo={false}
        imageSrc={cafeImage}
        mobileImageSrc={mobileCafeImage}
        className="centerHero"
        heightVH={92}
      />
    );
  }

  // Home
  return (
    <HeroSection
      {...common}
      title={<>The Art Of Beauty Perfection</>}
      description={<>Based in Hyderabad, SM Luxury Salon crafts natural-looking, flawless<br />results through the art of beauty care.</>}
      heightVH={92}
      className="centerHero"
    />
  );
};

export default PageHero;
