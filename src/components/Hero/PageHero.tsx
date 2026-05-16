import React from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "./HeroSection";
import { glamour as GalleryHeroImg } from "../images/WebsiteImages";
import { s2 as ServicesHeroImg, nailandPedicureView as ContactHeroImg, s7 as awardImage } from "../images/DesktopImages";
import { finalCafeView as cafeImage, mobileCafeView as mobileCafeImage } from "../images/CafeImages";
import { divMakeupContact as DivMakeupContact, inaraHairColor as InaraHairColor } from "../images/MobileImages";

const PageHero: React.FC = () => {
  const { pathname } = useLocation();

  const common = {
    subtitle: "Premium Salon & Cafe",
    ctaLabel: "Continue",
    onCtaClick: () => {
      const y = window.innerHeight - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
  } as const;

  if (pathname === "/services") {
    return (
      <HeroSection
        {...common}
        title={<>Our Signature Services</>}
        description={<>Indulge in our curated treatments<br />crafted to elevate your natural beauty.</>}
        useVideo={false}
        imagePublicId={ServicesHeroImg}
        mobileImagePublicId={InaraHairColor}
        className="centerHero"
        heightVH={92}
      />
    );
  }

  if (pathname === "/gallery") {
    return (
      <HeroSection
        {...common}
        title={<>The Art Of Beauty</>}
        description={<>Explore our portfolio of transformations<br />in photo and motion.</>}
        useVideo={false}
        imagePublicId={GalleryHeroImg}
        className="centerHero"
        heightVH={92}
      />
    );
  }

  if (pathname === "/contact") {
    return (
      <HeroSection
        {...common}
        title={<>Let's Connect</>}
        description={<>Feel like having a chat or setting up an appointment?<br />We're here and happy to help.</>}
        useVideo={false}
        imagePublicId={ContactHeroImg}
        mobileImagePublicId={DivMakeupContact}
        className="centerHero"
        heightVH={92}
      />
    );
  }

  if (pathname === "/about") {
    return (
      <HeroSection
        {...common}
        title={<>Luxury Crafted Around You</>}
        description={<>Where luxury meets personalization<br />in every detail.</>}
        useVideo={false}
        imagePublicId={awardImage}
        className="centerHero"
        heightVH={92}
      />
    );
  }

  if (pathname === "/cafe") {
    return (
      <HeroSection
        {...common}
        title={<>The Beauty Cafe</>}
        description={<>Relax, sip, and glow—our cozy cafe<br />experience inside the salon.</>}
        useVideo={false}
        imagePublicId={cafeImage}
        mobileImagePublicId={mobileCafeImage}
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
