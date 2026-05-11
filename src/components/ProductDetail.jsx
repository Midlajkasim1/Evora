import { useState, useEffect } from 'react';
import { addToCart } from '../store/cart';
import ProductCardComponent from './ProductCardComponent';

export default function ProductDetail({ product, related }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const gallery = product.gallery || [
    product.image,
    "/images/business_cards_angle.png",
    "/images/business_cards_close.png"
  ];

  return (
    <>
      <div className="detail-layout">
        {/* Images */}
        <div className="detail-images">
          <div className="detail-images__main">
            <img src={gallery[activeImage]} alt={product.name} loading="eager" />
          </div>
          <div className="detail-images__thumbs">
            {gallery.map((src, i) => (
              <button 
                key={i} 
                className={`detail-thumb${i === activeImage ? ' detail-thumb--active' : ''}`}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={src} alt={`Thumbnail ${i + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="detail-info">
          {product.badge && <span className="badge">{product.badge}</span>}
          <h1 className="detail-info__name">{product.name}</h1>
          <p className="detail-info__tagline">{product.tagline}</p>

          <div className="detail-meta">
            <span className="stars" aria-label={`${product.rating} stars`}>{stars}</span>
            <span className="detail-meta__reviews">{product.reviews} reviews</span>
            <span className="detail-meta__separator">·</span>
            <span className="detail-meta__turnaround">🕐 {product.turnaround}</span>
          </div>

          <div className="detail-price">
            <span className="detail-price__label">From</span>
            <span className="detail-price__amount">AED {product.price}</span>
            <span className="detail-price__unit">{product.priceUnit}</span>
          </div>

          <div className="gold-divider" />

          <p className="detail-description">{product.description}</p>

          <div className="detail-features-box">
            <h4>Key Features</h4>
            <ul>
              {product.features.map(f => (
                <li key={f}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-action-area">
            <div className="detail-qty-group">
              <span className="qty-label">Quantity</span>
              <div className="detail-qty">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease">−</button>
                <span className="qty-val">{qty * product.minQty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)} aria-label="Increase">+</button>
              </div>
            </div>

            <div className="detail-buttons">
              <a href="/quote" className="btn-black btn-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Request Quote
              </a>
              <a 
                href={`https://wa.me/971569786395?text=Hi%2C%20I'm%20interested%20in%20a%20quote%20for%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green btn-icon"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                Get Instant Quote
              </a>
            </div>
            <button 
              className="btn-primary" 
              style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}
              onClick={handleAdd}
            >
              {added ? 'ADDED TO CART ✓' : 'ADD TO CART'}
            </button>
          </div>

          <div className="detail-perfect-for">
            <h4>Perfect For</h4>
            <p>
              Creative agencies, photographers, architects, interior designers, fashion boutiques, florists, jewellery stores, and luxury brands in Dubai, Abu Dhabi, Sharjah, and Al Ain seeking distinctive business cards.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-section section-pad">
          <div className="container">
            <h2>Related Products</h2>
            <div className="products-grid related-grid">
              {related.map(p => (
                <ProductCardComponent 
                  key={p.id} 
                  product={p} 
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
