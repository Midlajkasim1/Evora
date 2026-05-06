import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard';
import data from '../data/products.json';
import './ProductDetailPage.css';

const FAQS = [
  {
    q: "What is the minimum order quantity?",
    a: "The minimum order quantity varies by product, but is typically 50-100 units. You can find the exact minimum order quantity for this product above the Add to Cart button."
  },
  {
    q: "Can I get a custom shape or size?",
    a: "Absolutely! We specialize in custom die-cutting and bespoke shapes. Contact our team via the 'Request Quote' button to discuss your exact requirements."
  },
  {
    q: "What is the standard turnaround time?",
    a: "Our standard turnaround time is 3-5 business days after artwork approval. We also offer same-day and next-day rush printing options for urgent corporate needs."
  },
  {
    q: "Do you offer design assistance?",
    a: "Yes, our expert design team can help bring your vision to life. A free design consultation is included with premium orders."
  }
];

export default function ProductDetailPage({ onAddToCart }) {
  const { slug } = useParams();
  const product = data.products.find(p => p.slug === slug);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Reset active image when product changes
  useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  if (!product) {
    return (
      <main className="not-found-page">
        <h2>Product not found.</h2>
        <Link to="/products" className="btn-primary" style={{ marginTop: 24 }}>Back to Products</Link>
      </main>
    );
  }

  const related = data.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Fallback to demo images if product doesn't have a gallery array yet
  const gallery = product.gallery || [
    product.image,
    "/images/business_cards_angle.png",
    "/images/business_cards_close.png"
  ];

  return (
    <main className="detail-page">
      <Helmet>
        <title>{product.name} — Evora Print Studio</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} — Evora`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
      </Helmet>

      <div className="container detail-page__inner">
        {/* Breadcrumb */}
        <nav className="breadcrumb detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link> <span>/</span>
          <Link to="/products">Products</Link> <span>/</span>
          <span>{product.name}</span>
        </nav>

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

            {/* Key Features Box */}
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

            {/* Quantity + Actions */}
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
                <Link to="/quote" className="btn-black btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Request Quote
                </Link>
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
            </div>

            {/* Perfect For */}
            <div className="detail-perfect-for">
              <h4>Perfect For</h4>
              <p>
                Creative agencies, photographers, architects, interior designers, fashion boutiques, florists, jewellery stores, and luxury brands in Dubai, Abu Dhabi, Sharjah, and Al Ain seeking distinctive business cards. Ideal for tech startups wanting modern appeal, real estate professionals showcasing property shapes, restaurants with food-themed cutouts, fitness trainers with dynamic designs, event planners creating memorable impressions, and any professional who wants their business card to reflect creativity and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="related-section section-pad">
          <div className="container">
            <h2>Related Products</h2>
            <div className="products-grid related-grid">
              {related.map(p => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
            <div className="carousel-arrows">
              <button className="arrow-btn">❮</button>
              <button className="arrow-btn">❯</button>
            </div>
          </div>
        </section>
      )}

      {/* SEO Content Section */}
      <section className="seo-section container section-pad">
        <h2>{product.name} Printing in Dubai UAE</h2>
        <p>A business card is often the very first physical representation of your brand that a potential client or partner holds in their hand. When that card breaks away from the standard rectangle and arrives in a shape that mirrors your logo, your product, or your creative identity, it transforms from a disposable slip of paper into a conversation piece that people keep. Our custom solutions use precision steel blades formed into custom shapes, similar to a cookie cutter, to punch your design out of thick premium cardstock. The result is a card with clean edges and a silhouette that immediately communicates originality and attention to detail.</p>
        <p>At Evora, we produce custom shaped business cards for professionals and businesses across Dubai, Abu Dhabi, Sharjah, Al Ain, and all UAE emirates. Our die-cutting equipment handles everything from simple rounded corners on standard sized cards to fully bespoke outlines that trace the contour of a logo, a building, a leaf, or any other shape you can imagine. Every card is printed on heavyweight stock with full colour on both sides, and finished with your choice of lamination, foil, embossing, or spot UV before the die cuts through.</p>
        
        <h3>Standard Sizes and Custom Shape Dimensions</h3>
        <p>Custom cards can follow established size standards or break free entirely into custom territory. Understanding the size options helps you choose the right balance between creativity and wallet compatibility.</p>
        
        <h4>UAE Standard 90 x 50 mm</h4>
        <p>The most widely used business card size in the United Arab Emirates. Die cutting on this format typically involves rounded corners at various radii, internal window cutouts, or scalloped edges that add character while keeping the card wallet-friendly. Most cardholder slots and Rolodex systems accommodate this size comfortably, making it the safest choice for professionals who want creativity without sacrificing practicality.</p>
        
        <h4>EU Standard 85 x 55 mm</h4>
        <p>Popular with European businesses operating in the UAE and multinational companies that distribute cards internationally. The slightly wider proportions give designers more vertical space for bilingual Arabic and English layouts. Die cutting on this format works especially well for oval shapes, leaf silhouettes, and cards with notched tabs that double as bookmarks or bag tags.</p>
      </section>

      {/* FAQ Section */}
      <section className="faq-section container section-pad">
        <h2 className="faq-heading">Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <details key={i} className="faq-item" name="product-faq">
              <summary className="faq-summary">
                {faq.q}
                <span className="faq-icon">+</span>
              </summary>
              <div className="faq-content">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
