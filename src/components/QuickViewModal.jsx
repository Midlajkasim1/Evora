import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './QuickViewModal.css';

export default function QuickViewModal({ product, onClose }) {
  const [qty, setQty] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to trigger animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    // Prevent scrolling behind modal
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for transition
  };

  if (!product) return null;

  return (
    <div className={`qv-overlay${isVisible ? ' qv-overlay--visible' : ''}`} onClick={handleClose}>
      <div className={`qv-modal${isVisible ? ' qv-modal--visible' : ''}`} onClick={e => e.stopPropagation()}>
        <button className="qv-close" onClick={handleClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div className="qv-layout">
          {/* Left: Image */}
          <div className="qv-image-side">
            <div className="qv-image-container">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          {/* Right: Info */}
          <div className="qv-info-side">
            <span className="qv-category">{product.category.toUpperCase()}</span>
            <h2 className="qv-title">{product.name}</h2>
            
            <p className="qv-desc">{product.description}</p>

            <ul className="qv-features">
              {product.features?.slice(0, 4).map(f => (
                <li key={f}>{f}</li>
              )) || (
                <>
                  <li>High-quality materials</li>
                  <li>Custom printing available</li>
                  <li>Fast delivery across UAE</li>
                  <li>Bulk discounts available</li>
                </>
              )}
            </ul>

            <div className="qv-action-row">
              <div className="qv-qty-group">
                <span className="qv-qty-label">Quantity</span>
                <div className="qv-qty-selector">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <input type="number" value={qty * (product.minQty || 100)} readOnly />
                  <button onClick={() => setQty(q => q + 1)}>+</button>
                </div>
              </div>
            </div>

            <div className="qv-buttons">
              <Link to={`/products/${product.slug}`} className="qv-btn-full" onClick={onClose}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                View Full Details
              </Link>
              <div className="qv-btn-row">
                <Link to="/quote" className="qv-btn-quote" onClick={onClose}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Request Quote
                </Link>
                <a 
                  href={`https://wa.me/971569786395?text=Hi%2C%20I'm%20interested%20in%20a%20quote%20for%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="qv-btn-instant"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  Get Instant Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
