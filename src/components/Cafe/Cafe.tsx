import React, { useRef, useEffect, useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './Cafe.css';
import coffeemachineLeft from '../images/CafeImages/coffeemachineLeft.jpeg';
import cafeCoffeeCupRight from '../images/CafeImages/cafeCoffeeCupRight.jpeg';
import { smCafeMenuData } from "../utils/smCafeMenu";

const categories = ["All", ...smCafeMenuData.menu.map(item => item.header)] as const;
type Category = (typeof categories)[number];

type MenuItem = {
  item_title: string;
  item_price: string;
  item_description: string;
  header?: string;
};

export const Cafe: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [scrollY, setScrollY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const allMenuItems = useMemo<MenuItem[]>(() => {
    const items: MenuItem[] = [];
    smCafeMenuData.menu.forEach(category => {
      category.items.forEach(item => {
        items.push({
          ...item,
          header: category.header
        });
      });
    });
    return items;
  }, []);

  const filteredItems = useMemo<{ header: string; items: MenuItem[] }[]>(() => {
    if (activeCategory === "All") {
      // Group items by header
      const grouped: { [key: string]: MenuItem[] } = {};
      allMenuItems.forEach(item => {
        if (item.header) {
          if (!grouped[item.header]) {
            grouped[item.header] = [];
          }
          grouped[item.header].push(item);
        }
      });
      return Object.entries(grouped).map(([header, items]) => ({
        header,
        items
      }));
    }

    // Filter by active category
    const category = smCafeMenuData.menu.find(cat => cat.header === activeCategory);
    if (!category) return [];

    return [{
      header: category.header,
      items: category.items.map(item => ({
        ...item,
        header: category.header
      }))
    }];
  }, [activeCategory, allMenuItems]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="cafe-container">
      {/* About Story Section with Side Images */}
      <section className="about-story">
        {/* Left Side Image */}
        <div
          className="side-image left-image"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        >
          <img
            src={coffeemachineLeft}
            alt="Coffee machine"
            className="parallax-image"
          />
        </div>

        {/* Center Content */}
        <div className="story-content">
          <div className="story-title">About Cafe</div>
          <div className="story-text">
            <p className="story-line">Pure ingredients, crafted with care.
              Fuel your beauty journey with clean, comforting flavors.</p>
          </div>
        </div>

        {/* Right Side Image */}
        <div
          className="side-image right-image"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`
          }}
        >
          <img
            src={cafeCoffeeCupRight}
            alt="Coffee cup"
            className="parallax-image"
          />
        </div>
      </section>

      {/* Category Pills */}
      <section className="category-section">
        <div className="category-pills-container">
          <button
            className="scroll-arrow scroll-arrow-left"
            onClick={scrollLeft}
            aria-label="Scroll categories left"
          >
            <ArrowLeft />
          </button>
          <div className="category-pills" ref={scrollContainerRef}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`category-pill ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
          <button
            className="scroll-arrow scroll-arrow-right"
            onClick={scrollRight}
            aria-label="Scroll categories right"
          >
            <ArrowRight />
          </button>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="menu-section">
        {filteredItems.map((categoryGroup) => (
          <div key={categoryGroup.header} className="menu-category-group">
            {activeCategory === "All" && categoryGroup.header && (
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
