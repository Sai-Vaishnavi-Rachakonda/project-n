import React from "react";
import Chevron from "./Chevron";

/**
 * Vertical list of product selector buttons.
 * Provides accessible tab semantics and current selection indication.
 */
export default function ThumbList({ products, activeIndex, ids, setActiveIndex, loading, error }) {
  if (loading) {
    return <div className="skeleton-list" aria-live="polite">Loading products...</div>;
  }
  if (error) {
    return <div className="error" role="alert">{error}</div>;
  }
  return (
    <ul className="thumb-list" role="tablist" aria-orientation="vertical">
      {products.map((p, i) => {
        const isActive = i === activeIndex;
        return (
          <li key={p.id} className={"thumb-item" + (isActive ? " active" : "")} role="presentation">
            <button
              id={ids[i]?.buttonId}
              className="thumb"
              role="tab"
              aria-selected={isActive}
              aria-controls={ids[i]?.panelId}
              onClick={() => setActiveIndex(i)}
            >
              <img src={p.image} alt={`${p.title} product`} loading="lazy" />
              <span className="thumb-text">
                <span className="name">{p.title}</span>
              </span>
              <Chevron active={isActive} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}


