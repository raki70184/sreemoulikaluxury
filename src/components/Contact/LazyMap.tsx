import { useEffect, useRef, useState } from "react";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.99724007655!2d78.53380847526489!3d17.459846200713518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9bdfc8647bbb%3A0x631bc3accc77af0e!2sSM%20LUXURY%20SALON!5e0!3m2!1sen!2sus!4v1702131032378!5m2!1sen!2sus";

/**
 * Defer Google Maps iframe until the section is near the viewport.
 * Until then we render a lightweight Cloudinary static placeholder so the
 * page paints fast and the Maps JS doesn't block first interaction.
 */
export const LazyMap: React.FC<{ heightPx?: number }> = ({ heightPx = 400 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (load) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  return (
    <div ref={ref} style={{ width: "100%", minHeight: heightPx, position: "relative" }}>
      {load ? (
        <iframe
          title="SM Luxe Salon location"
          src={MAP_SRC}
          width="100%"
          height={heightPx}
          style={{ border: 0, display: "block" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <a
          href="https://www.google.com/maps?cid=7142680596028571406"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open SM Luxe Salon on Google Maps"
          style={{
            display: "block",
            width: "100%",
            height: heightPx,
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.05)), url(https://res.cloudinary.com/dguwwzd5z/image/upload/f_auto,q_auto,w_1280/websites/sm-luxe-salon/desktop/s7)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            textAlign: "center",
            paddingTop: heightPx / 2 - 20,
            fontFamily: "system-ui, sans-serif",
            textDecoration: "none",
            fontSize: "1.1rem",
            letterSpacing: 0.5,
          }}
        >
          View on Google Maps →
        </a>
      )}
    </div>
  );
};
