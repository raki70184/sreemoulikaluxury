import React, { useRef, useEffect, useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './Cafe.css';
import { coffeemachineLeft, cafeCoffeeCupRight } from '../images/CafeImages';
import { CldImage } from '../CldImage';
import { loadCafeMenu, type CafeMenuData, type CafeMenuItem } from '../utils/smCafeMenu';

type MenuItemWithHeader = CafeMenuItem & { header?: string };

export const Cafe: React.FC = () => {
  const [menu, setMenu] = useState<CafeMenuData>({ menu: [] });
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [scrollY, setScrollY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    loadCafeMenu()
      .then((data) => alive && setMenu(data))
      .catch((e) => console.error('Cafe menu load failed:', e));
    return () => {
      alive = false;
    };
  }, []);

  const categories = useMemo<string[]>(() => ['All', ...menu.menu.map((s) => s.header)], [menu]);

  const allMenuItems = useMemo<MenuItemWithHeader[]>(() => {
    const items: MenuItemWithHeader[] = [];
    menu.menu.forEach((category) => {
      category.items.forEach((item) => {
        items.push({ ...item, header: category.header });
      });
    });
    return items;
  }, [menu]);

  const filteredItems = useMemo<{ header: string; items: MenuItemWithHeader[] }[]>(() => {
    if (activeCategory === 'All') {
      const grouped: Record<string, MenuItemWithHeader[]> = {};
      allMenuItems.forEach((item) => {
        if (item.header) {
          if (!grouped[item.header]) grouped[item.header] = [];
          grouped[item.header].push(item);
        }
      });
      return Object.entries(grouped).map(([header, items]) => ({ header, items }));
    }
    const category = menu.menu.find((cat) => cat.header === activeCategory);
    if (!category) return [];
    return [
      {
        header: category.header,
        items: category.items.map((item) => ({ ...item, header: category.header })),
      },
    ];
  }, [activeCategory, allMenuItems, menu]);

  const scrollLeft = () => scrollContainerRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  const scrollRight = () => scrollContainerRef.current?.scrollBy({ left: 200, behavior: 'smooth' });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="cafe-container">
      {/* About Story Section with Side Images */}
      <section className="about-story">
        <div className="side-image left-image" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
          <CldImage
            publicId={coffeemachineLeft}
            alt="Espresso machine at SM Luxe Cafe"
            className="parallax-image"
            widths={[320, 480, 640]}
            sizes="(max-width: 768px) 40vw, 25vw"
          />
        </div>

        <div className="story-content">
          <div className="story-title">About Cafe</div>
          <div className="story-text">
            <p className="story-line">
              Pure ingredients, crafted with care. Fuel your beauty journey with clean, comforting flavors.
            </p>
          </div>
        </div>

        <div className="side-image right-image" style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
          <CldImage
            publicId={cafeCoffeeCupRight}
            alt="Coffee cup at SM Luxe Cafe"
            className="parallax-image"
            widths={[320, 480, 640]}
            sizes="(max-width: 768px) 40vw, 25vw"
          />
        </div>
      </section>

      {/* Category Pills */}
      <section className="category-section">
        <div className="category-pills-container">
          <button className="scroll-arrow scroll-arrow-left" onClick={scrollLeft} aria-label="Scroll categories left">
            <ArrowLeft />
          </button>
          <div className="category-pills" ref={scrollContainerRef}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`category-pill ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
          <button className="scroll-arrow scroll-arrow-right" onClick={scrollRight} aria-label="Scroll categories right">
            <ArrowRight />
          </button>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="menu-section">
        {filteredItems.map((categoryGroup) => (
          <div key={categoryGroup.header} className="menu-category-group">
            {activeCategory === 'All' && categoryGroup.header && (
              <h3 className="category-header">{categoryGroup.header}</h3>
            )}
            <div className="menu-grid">
              {categoryGroup.items.map((item, index) => (
                <article key={`${categoryGroup.header}-${item.item_title}-${index}`} className="menu-card">
                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="card-title">{item.item_title}</h3>
                      <span className="card-price">₹{item.item_price}</span>
                    </div>
                    <p className="card-description">{item.item_description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
