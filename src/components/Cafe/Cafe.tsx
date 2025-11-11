import React, { useMemo, useState } from "react";
import "./Cafe.css";

const categories = ["All", "Coffee", "Tea", "Refreshers", "Bites"] as const;
type Category = (typeof categories)[number];

type MenuItem = {
  id: string;
  name: string;
  price: string;
  desc: string;
  tag?: string;
  category: Category;
  image: string;
  new?: boolean;
};

const MENU: MenuItem[] = [
  // Coffee
  {
    id: "espresso",
    name: "Signature Espresso",
    price: "₹180",
    desc: "Rich, velvety shot pulled to perfection.",
    category: "Coffee",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=60",
    tag: "Double Roast",
  },
  {
    id: "cappuccino",
    name: "Classic Cappuccino",
    price: "₹220",
    desc: "Silky foam, bold heart.",
    category: "Coffee",
    image:
      "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1200&q=60",
    tag: "House Blend",
  },
  {
    id: "latte",
    name: "Vanilla Latte",
    price: "₹240",
    desc: "Creamy, mellow and lightly sweet.",
    category: "Coffee",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: "iced-caramel",
    name: "Iced Caramel Latte",
    price: "₹260",
    desc: "Chilled, caramel-kissed indulgence.",
    category: "Coffee",
    image:
      "https://images.unsplash.com/photo-1529676468690-a3d5b96e1f81?auto=format&fit=crop&w=1200&q=60",
    new: true,
  },

  // Tea
  {
    id: "masala-chai",
    name: "Masala Chai",
    price: "₹160",
    desc: "Warming spices, slow-brewed.",
    category: "Tea",
    image:
      "https://images.unsplash.com/photo-1615485925600-95c6a7c6cd86?auto=format&fit=crop&w=1200&q=60",
    tag: "House Spice",
  },
  {
    id: "jasmine-green",
    name: "Jasmine Green Tea",
    price: "₹180",
    desc: "Fragrant and refreshing.",
    category: "Tea",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=60",
  },

  // Refreshers
  {
    id: "berry-sparkler",
    name: "Berry Sparkler",
    price: "₹220",
    desc: "Bubbly berries, mint finish.",
    category: "Refreshers",
    image:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=60",
    tag: "Low Sugar",
  },
  {
    id: "citrus-cooler",
    name: "Citrus Cooler",
    price: "₹210",
    desc: "Zesty, bright and super fresh.",
    category: "Refreshers",
    image:
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=60",
  },

  // Bites
  {
    id: "croissant",
    name: "Butter Croissant",
    price: "₹140",
    desc: "Flaky layers, baked daily.",
    category: "Bites",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    price: "₹260",
    desc: "Rye, smashed avo, chili flakes.",
    category: "Bites",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=60",
    new: true,
  },
  {
    id: "biscotti",
    name: "Almond Biscotti",
    price: "₹120",
    desc: "Crunchy dunking bliss.",
    category: "Bites",
    image:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1200&q=60",
    tag: "Eggless",
  },
  {
    id: "veggie-wrap",
    name: "Veggie Wrap",
    price: "₹240",
    desc: "Garden-fresh crunch, tahini drizzle.",
    category: "Bites",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=60",
  },
];

export const Cafe: React.FC = () => {

  const [activeCat, setActiveCat] = useState<Category>("All");

  const filtered = useMemo<MenuItem[]>(() => {
    if (activeCat === "All") return MENU;
    return MENU.filter((m: MenuItem) => m.category === activeCat);
  }, [activeCat]);

  return (
    <div className="cafeSection">
      <div className="cafeIntro">
        <h2 className="sectionTitle">Beauty Cafe</h2>
        <p className="tagline">
          Relax with artisan beverages and light bites while you glow. Our in-salon cafe
          brings cozy vibes to your beauty time.
        </p>
        <p className="comingSoonNote">More details coming soon.</p>
      </div>

      <nav className="menuToolbar" aria-label="Cafe categories">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={["chip", activeCat === c ? "active" : ""].join(" ")}
            onClick={() => setActiveCat(c)}
            aria-pressed={activeCat === c}
          >
            {c}
          </button>
        ))}
      </nav>

      <section className="menuGrid" aria-live="polite">
        {filtered.map((item: MenuItem) => (
          <article key={item.id} className="menuCard">
            <div className="menuImageWrap">
              <img
                src={item.image}
                alt={`${item.name} - ${item.category}`}
                loading="lazy"
              />
              {item.new ? <span className="badgeNew">NEW</span> : null}
            </div>
            <div className="menuContent">
              <div className="menuHeader">
                <h4 className="menuName">{item.name}</h4>
                <span className="menuPrice">{item.price}</span>
              </div>
              <p className="menuDesc">{item.desc}</p>
              {item.tag ? <span className="menuTag">{item.tag}</span> : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
