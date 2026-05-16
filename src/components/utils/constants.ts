import {
  makeup,
  manicure,
  pedicure,
  nailServices as nails,
  hairTreatmentService as hairTreatment_service,
  hairSpaService as hairSpa_service,
  hairServices,
  beautyServices as beauty_service,
} from "../images/WebsiteImages";
import { s1 as S1, s2 as S2, s3 as S3, s4 as S4, s5 as S5, s6 as S6, s7 as S7 } from "../images/DesktopImages";
import { m1 as M1, m2 as M2, m3 as M3, m4 as M4, m5 as M5, m6 as M6 } from "../images/MobileImages";

import HairIcon from "../images/WebsiteImages/hair-style.svg?react";
import HairCut from "../images/WebsiteImages/hair-cut.svg?react";
import manicureIcon from "../images/WebsiteImages/MANICURE-icon.svg?react";
import nailIcon from "../images/WebsiteImages/NAILS-icon.svg?react";
import makeupIcon from "../images/WebsiteImages/FACIALS-icon.svg?react";

export const PostDetailsUrl =
  "https://script.google.com/macros/s/AKfycbwMSPa8M4nAcsJiYEI_TguIDAcvGZfMulBH01E-1FEBZo9i47ziV8p5R69uqUM_2_j7/exec";
export const staticData = {
  buttonText: {
    bookAppointment: "Book Appointment",
  },
  home: {
    heading: "",
    tagLine: "Exquisite Beauty, Tailored for You",
    description:
      "As you Join us at SM Salon, where luxury meets personalization, and beauty takes on a whole new meaning. We believe that beauty is an expression of individuality, and every client has a unique story waiting to be unveiled. With this principle at our core, our talented team of professionals is dedicated to tailoring our services to enhance your inherent beauty and embrace your distinct essence.",
    subDescription:
      "Let's create a beauty story together, one that will be cherished for a lifetime. Welcome to our exquisite world of beauty and care",
    ourServices: "Our Services",
  },
};

export const homeImagesList = [
  {
    img: S1,
    title: "Hair Treatment",
  },
  {
    img: S2,
    title: "Hair Services",
  },
  {
    img: S3,
    title: "Hair Spa",
  },
  {
    img: S4,
    title: "Glamour Services",
  },
  {
    img: S5,
    title: "Nails Services",
  },
  {
    img: S6,
    title: "Makeup",
  },
  {
    img: S7,
    title: "Manicure",
  },
  {
    img: pedicure,
    title: "Pedicure",
  },
];

export const mobileImagesList = [
  {
    img: M1,
    title: "Glamour Services",
  },
  {
    img: M2,
    title: "Makeup",
  },
  {
    img: M3,
    title: "Makeup",
  },
  {
    img: M4,
    title: "Makeup",
  },
  {
    img: M5,
    title: "Makeup",
  },
  {
    img: M6,
    title: "Makeup",
  },
];
export const ImageServiceList = [
  {
    img: hairTreatment_service,
    title: "Hair Treatment",
  },
  {
    img: hairServices,
    title: "Hair Services",
  },
  {
    img: hairSpa_service,
    title: "Hair Spa",
  },
  {
    img: beauty_service,
    title: "Beauty Services",
  },
  {
    img: nails,
    title: "Nails Services",
  },
  {
    img: makeup,
    title: "Makeup",
  },
  {
    img: manicure,
    title: "Manicure",
  },
  {
    img: pedicure,
    title: "Pedicure",
  },
];

export const NailsService = [
  {
    name: "Polish",
    list: ["Nail extensions+ regular polish", "regular polish"],
  },
  {
    name: "BUILDER/HARD GEL",
    list: ["hard gel overlay + gel polish", "hard gel ecapsulated nails"],
  },
  {
    name: "ACRYLICS",
    list: [
      "acrylic overlay + gel polish",
      "acrylic encapsulation",
      "pink and white/french nails",
      "ombre",
      "acrylic filling",
    ],
  },
  {
    name: "GEL POLISH",
    list: [
      "anail extensions + gel polish",
      "gel polish",
      "gel french nails",
      "gel ombre ",
      "gel removal",
      "gel filling",
    ],
  },
  {
    name: "DIP POWDER",
    list: ["dip + extensions", "dip powder color", "pink and white", "ombre"],
  },
  {
    name: "NAIL ART",
    list: [
      "animal prints",
      "chrome/holographic nails",
      "cateye",
      "marble nails",
      "3d flowers",
      "rhinestones",
      "swaroski crystals",
      "stamping",
    ],
  },
  {
    name: "NAIL REPAIR",
    list: ["silk wrap"],
  },
];

export const ServicesList = [
  {
    img: HairIcon,
    title: "Hair Services",
    list: [
      "women/Men Hair cut",
      "blow drying",
      "straightning, curling , crimping",
    ],
  },
  {
    img: HairCut,
    title: "Hair Spa",
    list: [
      "Deep Hydration Hair Spa",
      "Scalp Detox Hair Spa",
      "Repair & Strengthen Hair Spa",
      "Anti-Frizz Smoothing Hair Spa",
      "Color Protection Hair Spa",
      "Volumizing Hair Spa",
      "Anti-Dandruff Scalp Treatment",
    ],
  },
  {
    img: HairIcon,
    title: "Hair Treatment",
    list: [
      "Hair Smoothening",
      "Keratin Treatment",
      "Hair Botox Therapy",
      "Hair Repair & Strengthening",
    ],
  },
  {
    img: makeupIcon,
    title: "Glamour services",
    list: ["Eyebrow", "Upper lip"],
  },
  {
    img: makeupIcon,
    title: "Makeup",
    list: [
      "Lash Extensions",
      "Hair Extensions",
      "Bridal Makeover",
      "Air Brush Makeup",
      "Party Makeup",
      "Kids Makeup",
    ],
  },
  {
    img: manicureIcon,
    title: "Manicure",
    list: [
      "Classic Manicure",
      "Gel Manicure",
      "Luxury Spa Manicure",
      "Collagen Manicure",
      "French Manicure",
      "Nail Art Manicure",
      "Hydrating Paraffin Manicure",
      "Natural Nail Strengthener Manicure",
    ],
  },
  {
    img: manicureIcon,
    title: "Pedicure",
    list: [
      "Classic pedicure",
      "Gel pedicure",
      "Luxury Spa pedicure",
      "Collagen  pedicure",
      "French pedicure",
      "Nail Art pedicure",
      "Hydrating Paraffin pedicure",
      "Natural Nail Strengthener pedicure",
      "Glimmering Pedicure Delight",
      "Detoxifying pedicure",
      "Signature Pedicure (lavender,mango,mint)",
    ],
  },
  {
    img: nailIcon,
    title: "Nails",
    list: [],
    nailsEnhancement: NailsService,
  },
];
