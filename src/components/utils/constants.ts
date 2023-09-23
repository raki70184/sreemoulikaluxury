import hairTreatment from "../images/HairTreatment.jpeg";
import hairSpa from "../images/HairSpa.jpeg";
import hairServices from "../images/HairServices.jpeg";
import glamour from "../images/glamourServices.jpg";
import makeup from "../images/Makeup.jpeg";
import manicure from "../images/manicure.jpeg";
import pedicure from "../images/pedicure.jpg";
import nails from "../images/NailServices.jpeg";

import { ReactComponent as HairIcon } from "../images/hair-style.svg";
import { ReactComponent as HairCut } from "../images/hair-cut.svg";
import { ReactComponent as manicureIcon } from "../images/MANICURE-icon.svg";
import { ReactComponent as nailIcon } from "../images/NAILS-icon.svg";
import { ReactComponent as makeupIcon } from "../images/FACIALS-icon.svg";
export const staticData = {
    buttonText: {
        bookAppointment: 'Book Appointment',
    },
    home: {
        heading: '',
        tagLine: 'Exquisite Beauty, Tailored for You',
        description: 'As you Join us at Sree Moulika Salon, where luxury meets personalization, and beauty takes on a whole new meaning. We believe that beauty is an expression of individuality, and every client has a unique story waiting to be unveiled. With this principle at our core, our talented team of professionals is dedicated to tailoring our services to enhance your inherent beauty and embrace your distinct essence.',
        subDescription: 'Let\'s create a beauty story together, one that will be cherished for a lifetime. Welcome to our exquisite world of beauty and care',
        ourServices: 'Our Services'
    }
}

export const ImageServiceList = [
    {
        img: hairTreatment,
        title: 'Hair Treatment',
    },
    {
        img: hairServices,
        title: 'Hair Services',
    },
    {
        img: hairSpa,
        title: 'Hair Spa',
    },
    {
        img: glamour,
        title: 'Glamour Services',
    },
    {
        img: nails,
        title: 'Nails Services',
    },
    {
        img: makeup,
        title: 'Makeup',
    },
    {
        img: manicure,
        title: 'Manicure',
    },
    {
        img: pedicure,
        title: 'Pedicure',
    },
];


export const NailsService = [
    {
        name: "BUILDER/HARD GEL",
        list: ["hard gel overlay + gel polish",
            "hard gel ecapsulated nails"]
    },
    {
        name: "ACRYLICS",
        list: ["acrylic overlay + gel polish",
        "acrylic encapsulation",
        "pink and white/french nails",
        "ombre",
        "acrylic filling"]
    },
    {
        name: "GEL POLISH",
        list: ["anail extensions + gel polish",
        "gel polish",
        "gel french nails",
        "gel ombre ",
        "gel removal",
        "gel filling"]
    },
    {
        name: "DIP POWDER",
        list: ["dip + extensions",
        "dip powder color",
        "pink and white",
        "ombre"]
    },
    {
        name: "NAIL ART",
        list: ["animal prints",
        "chrome/holographic nails",
        "cateye",
        "marble nails",
        "3d flowers",
        "rhinestones",
        "swaroski crystals",
        "stamping"]
    },
    {
        name: "NAIL REPAIR",
        list: ["silk wrap"]
    },
]

export const ServicesList = [
    {
        img: HairIcon,
        title: "Hair Services",
        list: ["Hair Smoothening",
            "Keratin Treatment",
            "Hair Botox Therapy",
            "Hair Repair & Strengthening"
        ]
    },
    {
        img: HairCut,
        title: "Hair Spa",
        list: ["Deep Hydration Hair Spa",
            "Scalp Detox Hair Spa",
            "Repair & Strengthen Hair Spa",
            "Anti-Frizz Smoothing Hair Spa",
            "Color Protection Hair Spa",
            "Volumizing Hair Spa",
            "Anti-Dandruff Scalp Treatment"
        ]
    },
    {
        img: HairIcon,
        title: "Hair Treatment",
        list: ["Hair Smoothening",
            "Keratin Treatment",
            "Hair Botox Therapy",
            "Hair Repair & Strengthening"

        ]
    },
    {
        img: makeupIcon,
        title: "Glamour services",
        list: ["Eyebrow",
            "Upper lip"
        ]
    },
    {
        img: makeupIcon,
        title: "Makeup",
        list: ["Lash Extensions",
            "Hair Extensions",
            "Bridal Makeover",
            "Air Brush Makeup",
            "Party Makeup",
            "Kids Makeup"]
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
            "Natural Nail Strengthener Manicure"
        ]
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
            "Signature Pedicure (lavender,mango,mint)"
        ]
    },
    {
        img: nailIcon,
        title: "Nails",
        list: [
            "Nail extensions+ regular polish",
            "regular polish"
        ],
        nailsEnhancement: NailsService
    }
];
