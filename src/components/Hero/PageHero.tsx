import React from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "./HeroSection";
import AboutHeroImg from "../images/Makeup.jpeg";
import ServicesHeroImg from "../images/BeautyServices.jpg";
import GalleryHeroImg from "../images/Glamour.jpeg";
import ContactHeroImg from "../images/NailTechnician.jpg";
import CafeHeroImg from "../images/HairSpa.jpeg";

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
        title="Our Signature Services"
        description="Indulge in our curated treatments crafted to elevate your natural beauty."
        useVideo={false}
        imageSrc={ServicesHeroImg}
        className="centerHero"
      />
    );
  }

  if (pathname === "/gallery") {
    return (
      <HeroSection
        {...common}
        title="The Art Of Beauty"
        description="Explore our portfolio of transformations in photo and motion."
        useVideo={false}
        imageSrc={GalleryHeroImg}
        className="centerHero"
      />
    );
  }

  if (pathname === "/contact") {
    return (
      <HeroSection
        {...common}
        title="Let's Connect"
        description="Feel like having a chat or setting up an appointment? We’re here and happy to help."
        useVideo={false}
        imageSrc={ContactHeroImg}
        className="centerHero"
      />
    );
  }

  if (pathname === "/about") {
    return (
      <HeroSection
        {...common}
        title="About Sree Moulika"
        description="Where luxury meets personalization in every detail."
        useVideo={false}
        imageSrc={AboutHeroImg}
        className="centerHero"
      />
    );
  }

  if (pathname === "/cafe") {
    return (
      <HeroSection
        {...common}
        title="The Beauty Cafe"
        description="Relax, sip, and glow—our cozy cafe experience inside the salon."
        useVideo={false}
        imageSrc={CafeHeroImg}
        className="centerHero"
      />
    );
  }

  // Home
  return (
    <HeroSection
      {...common}
      title="The Art Of Beauty Perfection"
      description="Based in Hyderabad, Sree Moulika crafts natural-looking, flawless results through the art of beauty care."
      heightVH={92}
      className="centerHero"
    />
  );
};

export default PageHero;
