import React from "react";
import { Helmet } from "react-helmet-async";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "../../data/googleRating.generated";

/**
 * Visible Google rating badge + matching AggregateRating JSON-LD.
 *
 * Both the visible number and the schema come from the SAME source — the
 * build-time-generated constants in src/data/googleRating.generated.ts — so they
 * can never drift apart. Google enforces this: if the schema rating doesn't match
 * what's actually visible on the page, the rich result gets removed and (worst
 * case) you can get a manual action.
 *
 * Those constants are refreshed automatically on every build by
 * scripts/fetch-google-rating.mjs (Google Places API) — no env edits needed.
 * A zero/empty value disables both the badge count and the schema.
 */

const RATING: string | undefined = GOOGLE_RATING ? String(GOOGLE_RATING) : undefined;
const COUNT: string | undefined = GOOGLE_REVIEW_COUNT ? String(GOOGLE_REVIEW_COUNT) : undefined;

const PLACE_REVIEWS_URL =
  "https://search.google.com/local/reviews?placeid=ChIJu3tkyN-byzsRDq93zKzDG2M";

function Stars({ value }: { value: number }) {
  // Render 5 stars filled up to `value` (rounded to nearest 0.5).
  const half = Math.round(value * 2) / 2;
  return (
    <span aria-hidden="true" style={{ letterSpacing: "0.05em", color: "#f5b400" }}>
      {[1, 2, 3, 4, 5].map((i) => {
        if (i <= Math.floor(half)) return <span key={i}>★</span>;
        if (i - 0.5 === half) return <span key={i} style={{ opacity: 0.85 }}>⯨</span>;
        return <span key={i} style={{ opacity: 0.25 }}>★</span>;
      })}
    </span>
  );
}

export const GoogleRatingBadge: React.FC = () => {
  if (!RATING) return null;
  const ratingNum = Number(RATING);
  if (Number.isNaN(ratingNum)) return null;

  const countNum = COUNT ? Number(COUNT) : null;
  const hasCount = countNum !== null && !Number.isNaN(countNum) && countNum > 0;

  const aggregateRating = hasCount
    ? {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        "@id": "https://smluxesalon.com/#salon",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: ratingNum.toFixed(1),
          reviewCount: countNum,
          bestRating: "5",
          worstRating: "1",
        },
      }
    : null;

  return (
    <>
      {aggregateRating && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(aggregateRating)}</script>
        </Helmet>
      )}
      <a
        href={PLACE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Rated ${ratingNum} out of 5 on Google${hasCount ? `, ${countNum} reviews` : ""}`}
        style={badgeStyle}
      >
        <Stars value={ratingNum} />
        <span style={ratingNumberStyle}>{ratingNum.toFixed(1)}</span>
        <span style={dividerStyle}>·</span>
        <span style={labelStyle}>
          {hasCount ? `${countNum} Google reviews` : "Rated on Google"}
        </span>
      </a>
    </>
  );
};

const badgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.5rem 1rem",
  borderRadius: "999px",
  background: "#fff",
  border: "1px solid #e0d8c4",
  color: "#1a1a1a",
  textDecoration: "none",
  fontSize: "0.95rem",
  fontWeight: 500,
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  fontFamily: "inherit",
};

const ratingNumberStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: "1rem",
};

const dividerStyle: React.CSSProperties = {
  color: "#bbb",
};

const labelStyle: React.CSSProperties = {
  color: "#555",
};
