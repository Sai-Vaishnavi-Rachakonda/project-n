import React from "react";
import { formatPrice } from "../utils/format";

/**
 * Right-hand product details panel for the currently selected item.
 */
export default function DetailsPanel({ active, ids, activeIndex }) {
  if (!active) {
    return <div className="placeholder">Select a product to view details</div>;
  }
  return (
    <article
      className="card"
      role="tabpanel"
      id={ids[activeIndex]?.panelId}
      aria-labelledby={ids[activeIndex]?.titleId}
    >
      <div className="media">
        <img className="hero" src={active.image} alt={`${active.title} large product`} />
      </div>
      <div className="content">
        <p className="price">{formatPrice(active.price)}</p>
        <p className="desc">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        {active.rating && (
          <p className="rating" aria-label={`Rating ${active.rating.rate} out of 5`}>
            {"★".repeat(Math.round(active.rating.rate))}
            {"☆".repeat(5 - Math.round(active.rating.rate))}
            <span className="muted"> ({active.rating.count})</span>
          </p>
        )}
        <div className="actions">
          <button className="btn" type="button" aria-label="Add to cart">Add to cart</button>
        </div>
      </div>
    </article>
  );
}


