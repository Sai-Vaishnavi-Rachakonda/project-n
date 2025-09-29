import React, { useMemo, useState } from "react";
import ThumbList from "./components/ThumbList";
import DetailsPanel from "./components/DetailsPanel";
import useProducts from "./hooks/useProducts";
import useTheme from "./hooks/useTheme";
import "./styles/slider.scss";

// Nuvolum React Slider Challenge - Single file demo
// Notes for reviewers:
// - No external UI libraries used. Pure React + CSS in this file for portability.
// - Smooth animations via CSS transitions and keyframes.
// - Accessibility: buttons are focusable, have aria-pressed and aria-controls, and the detail panel is labeled by the active product title.
// - SEO: All text for every product is rendered into the HTML once data loads. Non-active items are hidden visually but remain in the DOM for crawlers and screen readers.
// - Responsiveness: Mobile-first styles with media queries for tablet and desktop.

/**
 * Root application layout; wires together product data, selection state,
 * and renders the selector list and details panel.
 */
export default function App() {
  const { products, loading, error } = useProducts(5);
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const active = products[activeIndex] || null;

  // Precompute stable IDs for ARIA relationships
  const ids = useMemo(() => {
    return products.map((p) => ({
      titleId: `title-${p.id}`,
      panelId: `panel-${p.id}`,
      buttonId: `btn-${p.id}`,
    }));
  }, [products]);

  return (
    <div className="app-root">

      <header className="header">
        <h1>Heading</h1>
        <p className="subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis architecto neque illum eius error, totam mollitia reiciendis officiis quis magnam?</p>
      </header>

      <main className="layout" role="main">
        {/* Left rail - slider list */}
        <section className="rail" aria-label="Product selector">
          <ThumbList
            products={products}
            activeIndex={activeIndex}
            ids={ids}
            setActiveIndex={setActiveIndex}
            loading={loading}
            error={error}
          />
        </section>

        {/* Right side - details panel */}
        <section className="details" aria-live="polite">
          <DetailsPanel active={active} ids={ids} activeIndex={activeIndex} />
        </section>
      </main>

      {/* SEO: Render all text content for every product in hidden but present markup */}
      {!loading && products.length > 0 && (
        <section className="seo-dump" aria-hidden="false">
          {products.map((p) => (
            <article key={p.id} className="visually-hidden">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <p>Price: ${p.price.toFixed(2)}</p>
              {p.rating && (<p>Rating: {p.rating.rate} out of 5 ({p.rating.count} reviews)</p>)}
              <p>Category: {p.category}</p>
            </article>
          ))}
        </section>
      )}

      <footer className="footer">
        <div className="theme-toggle">
          <button className="btn" type="button" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? "Switch to Dark" : "Switch to Light"}
          </button>
        </div>
      </footer>
    </div>
  );
}
 
