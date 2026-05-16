import { Helmet } from "react-helmet-async";

const SITE_URL = "https://smluxesalon.com";
const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dguwwzd5z/image/upload/f_jpg,q_auto,w_1200,h_630,c_fill,g_auto/websites/sm-luxe-salon/desktop/s4";

interface PageMeta {
  title: string;
  description: string;
  /** Optional override of the social-share image (Cloudinary URL preferred). */
  image?: string;
  /** Optional human label for the breadcrumb (defaults to a sensible value from the URL). */
  breadcrumbLabel?: string;
  /** Extra JSON-LD object to merge alongside the global LocalBusiness schema. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "SM Luxe Salon — Premium Salon & Cafe in Safilguda, Hyderabad",
    description:
      "Premium salon and in-house cafe in Safilguda, Malkajgiri (Hyderabad). Hair, bridal makeup, facial, nails, balayage. Book on +91 93472 38248.",
    breadcrumbLabel: "Home",
  },
  "/about": {
    title: "About — SM Luxe Salon, Hyderabad",
    description:
      "Beauty crafted around you. Learn the story behind SM Luxe Salon — a premium salon and cafe in Safilguda, Malkajgiri, Hyderabad since 2000.",
    breadcrumbLabel: "About",
  },
  "/services": {
    title: "Salon Services — Hair, Bridal, Makeup, Nails, Facial | SM Luxe Salon",
    description:
      "Full salon menu: hair cut, balayage, hair spa, hair smoothening, bridal makeup, party makeup, manicure, pedicure, nail art, gold facial and more.",
    breadcrumbLabel: "Services",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      provider: { "@id": `${SITE_URL}/#salon` },
      areaServed: { "@type": "City", name: "Hyderabad" },
      name: "Salon Services",
    },
  },
  "/gallery": {
    title: "Gallery — Bridal, Hair Colour, Nails, Facial | SM Luxe Salon",
    description:
      "See real client transformations: bridal looks, hair colour, balayage, facials, nail art and salon interior at SM Luxe Salon, Hyderabad.",
    breadcrumbLabel: "Gallery",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "SM Luxe Salon Portfolio",
      url: `${SITE_URL}/gallery`,
    },
  },
  "/cafe": {
    title: "SM Luxe Cafe — Coffee, Frappes, Pizza & Pasta in Safilguda",
    description:
      "Sip and savour at SM Luxe Cafe — Italian-style coffee, frappes, thickshakes, mocktails, pizza, burgers and waffles, right inside the salon.",
    image:
      "https://res.cloudinary.com/dguwwzd5z/image/upload/f_jpg,q_auto,w_1200,h_630,c_fill,g_auto/websites/sm-luxe-salon/cafe/finalcafeview",
    breadcrumbLabel: "Cafe",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Menu",
      name: "SM Luxe Cafe Menu",
      url: `${SITE_URL}/cafe`,
    },
  },
  "/contact": {
    title: "Contact & Bookings — SM Luxe Salon, Safilguda Hyderabad",
    description:
      "Call +91 93472 38248 or fill the form to book your appointment at SM Luxe Salon, Jain Balaji BigTown Mall, Safilguda, Malkajgiri, Hyderabad 500047.",
    breadcrumbLabel: "Contact",
  },
};

function buildBreadcrumbJsonLd(pathname: string, meta: PageMeta) {
  // Home doesn't need a breadcrumb of its own.
  if (pathname === "/") return null;
  const label = meta.breadcrumbLabel ?? pathname.replace(/^\//, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: `${SITE_URL}${pathname}`,
      },
    ],
  };
}

interface SeoProps {
  pathname: string;
}

export const Seo: React.FC<SeoProps> = ({ pathname }) => {
  const meta = PAGE_META[pathname] ?? PAGE_META["/"];
  const url = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
  const image = meta.image ?? DEFAULT_OG_IMAGE;
  const jsonLdEntries: Record<string, unknown>[] = meta.jsonLd
    ? Array.isArray(meta.jsonLd)
      ? meta.jsonLd
      : [meta.jsonLd]
    : [];
  const breadcrumb = buildBreadcrumbJsonLd(pathname, meta);
  if (breadcrumb) jsonLdEntries.push(breadcrumb);
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />
      {jsonLdEntries.map((entry, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
};
