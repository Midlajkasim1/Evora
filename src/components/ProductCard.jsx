import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product, onQuickView }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <article className="product-card">
      <div className="product-card__image-wrapper">
        <Link to={`/products/${product.slug}`} className="product-card__link">
          <div className="product-card__image-container">
            <div className="product-card__image-white-bg">
              {!imgLoaded && <div className="skeleton product-card__skeleton" />}
              <img
                src={product.image}
                alt={product.name}
                className={`product-card__image${imgLoaded ? ' product-card__image--loaded' : ''}`}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
              />
            </div>
          </div>
        </Link>
        
        <button 
          className="product-card__quick-view" 
          onClick={() => onQuickView(product)}
          aria-label="Quick View"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
      </div>

      <Link to={`/products/${product.slug}`} className="product-card__info-link">
        <div className="product-card__info">
          <h3 className="product-card__name">{product.name}</h3>
          <div className="btn-explore">EXPLORE PRODUCTS</div>
        </div>
      </Link>
    </article>
  );
}
