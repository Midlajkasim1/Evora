import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import data from '../data/products.json';
import './HomePage.css';

/* ── Hero Carousel Data ─────────────────────────────────────── */
const HERO_SLIDES = [
  {
    bg: '#e8e8e8',
    textColor: '#111',
    label: 'Premium Quality',
    headline: 'Your Brand Speaks\nTheir Desk, Every Day',
    sub: 'Bespoke luxury print solutions crafted for visionary brands.',
    cta: 'Get a Quote',
    ctaTo: '/quote',
    img: '/images/corporate-gifts.png',
  },
  {
    bg: '#1a1a2e',
    textColor: '#fff',
    label: 'Fast Turnaround',
    headline: 'Delivered in 48 Hours\nAcross the UAE',
    sub: 'Express print service on 350+ products — guaranteed on time.',
    cta: 'Shop Now',
    ctaTo: '/products',
    img: '/images/hero-slide1.png',
  },
  {
    bg: '#0d2010',
    textColor: '#fff',
    label: '🇦🇪 National Day',
    headline: 'Celebrate the UAE\nWith Custom Gifts',
    sub: 'Exclusive patriotic merchandise for the National Day season.',
    cta: 'Shop National Day',
    ctaTo: '/products',
    img: '/images/national-day.png',
  },
];

/* ── Section Products ───────────────────────────────────────── */
const BEST_SELLERS = data.products.slice(0, 5);
const EVENTS_PRODUCTS = data.products.filter(p => p.category === 'outdoor');
const PACKAGING_PRODUCTS = data.products.filter(p => p.category === 'packaging');
const CORPORATE_PRODUCTS = data.products.filter(p => p.category === 'corporate').slice(0, 5);
const WHATS_NEW = data.products.slice(-4).reverse();

/* ── Trusted Company Logos ──────────────────────────────────── */
const COMPANIES = ['Emaar','ADNOC','Dubai Holding','Majid Al Futtaim','Aldar','Etisalat','du','Noon','Carrefour','DEWA','Damac','Meraas','Rotana','Jumeirah','RAK Ceramics','Lulu'];

/* ── Why Choose Us ──────────────────────────────────────────── */
const WHY = [
  { icon: '⭐', title: 'Premium Quality', desc: 'Every job passes our 22-point quality check before dispatch.' },
  { icon: '⚡', title: 'Super Fast', desc: 'Express 48-hour turnaround on most products, guaranteed.' },
  { icon: '💰', title: 'Value for Money', desc: 'Competitive pricing with no compromise on quality.' },
  { icon: '🎨', title: 'Custom Designs', desc: 'Free design support from our expert in-house team.' },
  { icon: '🚚', title: 'Free Delivery', desc: 'Free delivery across UAE on orders above AED 200.' },
  { icon: '🏆', title: 'Award-Winning', desc: 'Recognised as the UAE\'s top print studio since 2018.' },
];

/* ── Testimonials ───────────────────────────────────────────── */
const TESTIMONIALS = data.testimonials;

/* ── Scroll-based section reveal hook ──────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Compact Banner Carousel ────────────────────────────────── */
function HeroCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const total = HERO_SLIDES.length;

  const goTo = (idx) => setActive((idx + total) % total);

  useEffect(() => {
    timerRef.current = setInterval(() => setActive(a => (a + 1) % total), 5000);
    return () => clearInterval(timerRef.current);
  }, [total]);

  const slide = HERO_SLIDES[active];

  return (
    <section className="banner-carousel" aria-label="Promotional banners">
      <div
        className="bc-wrap"
        style={{ background: slide.bg, color: slide.textColor }}
      >
        {/* Left: text */}
        <div className="bc-text">
          <span className="bc-label" style={{ color: slide.textColor === '#fff' ? 'var(--gold)' : 'var(--gold-dark)' }}>
            {slide.label}
          </span>
          <h2 className="bc-headline" style={{ color: slide.textColor }}>
            {slide.headline.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
          </h2>
          <p className="bc-sub" style={{ color: slide.textColor === '#fff' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}>
            {slide.sub}
          </p>
          <Link
            to={slide.ctaTo}
            className="bc-cta"
            style={{
              background: 'var(--gold-gradient-btn)',
              backgroundSize: '200% auto',
              color: 'var(--black)',
            }}
          >
            {slide.cta} →
          </Link>
        </div>

        {/* Right: image */}
        <div className="bc-img">
          <img src={slide.img} alt={slide.label} loading="eager" />
        </div>

        {/* Prev / Next arrows */}
        <button className="bc-arrow bc-arrow--prev" onClick={() => goTo(active - 1)} aria-label="Previous">
          ‹
        </button>
        <button className="bc-arrow bc-arrow--next" onClick={() => goTo(active + 1)} aria-label="Next">
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="bc-dots">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            className={`bc-dot${i === active ? ' bc-dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Section Header ─────────────────────────────────────────── */
function SectionHeader({ label, title, viewAllTo }) {
  return (
    <div className="sec-header">
      <div>
        <span className="section-label">{label}</span>
        <h2 className="sec-title">{title}</h2>
        <div className="gold-divider" />
      </div>
      {viewAllTo && <Link to={viewAllTo} className="view-all-link">View All →</Link>}
    </div>
  );
}

/* ── Product Row (horizontal scrollable) ────────────────────── */
function ProductRow({ products, onQuickView }) {
  return (
    <div className="product-row">
      {products.map(p => <ProductCard key={p.id} product={p} onQuickView={onQuickView} />)}
    </div>
  );
}

/* ── Category Banner ────────────────────────────────────────── */
function CategoryBanner({ img, label, sub, to, accent }) {
  return (
    <Link to={to} className="cat-banner" style={{ '--accent': accent }}>
      <img src={img} alt={label} loading="lazy" />
      <div className="cat-banner__overlay" />
      <div className="cat-banner__info">
        <h3>{label}</h3>
        <p>{sub}</p>
        <span className="cat-banner__cta">Shop Now →</span>
      </div>
    </Link>
  );
}

/* ══════════════════════════════════════════════════════════════
   HOME PAGE
 ══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [bsRef, bsVisible] = useReveal();
  const [evRef, evVisible] = useReveal();
  const [pkRef, pkVisible] = useReveal();
  const [corpRef, corpVisible] = useReveal();
  const [ndRef, ndVisible] = useReveal();
  
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <main className="home-page">
      <Helmet>
        <title>Evora — Your Print, Simplified</title>
        <meta name="description" content="Luxury bespoke print solutions for visionary brands in UAE. Business cards, brochures, packaging, events and exhibitions. Fast delivery across UAE." />
        <meta property="og:title" content="Evora — Premium Print Studio UAE" />
      </Helmet>

      {/* ① Hero Carousel */}
      <HeroCarousel />

      {/* ② Quick Stats Strip */}
      <div className="quick-stats">
        {[
          { icon: '⭐', val: 'Capital for Quality' },
          { icon: '💰', val: 'Value for Money' },
          { icon: '⚡', val: 'Speed & Reliability' },
          { icon: '🎯', val: 'Professional Adviser' },
          { icon: '📦', val: '350+ Products' },
        ].map(s => (
          <div key={s.val} className="qs-item">
            <span className="qs-icon">{s.icon}</span>
            <span className="qs-val">{s.val}</span>
          </div>
        ))}
      </div>

      {/* ③ Best Sellers */}
      <section className="home-section section-pad" ref={bsRef} aria-labelledby="bestsellers-h">
        <div className={`container reveal${bsVisible ? ' revealed' : ''}`}>
          <SectionHeader label="Top Picks" title="Best Sellers" viewAllTo="/products" />
          <ProductRow products={BEST_SELLERS} onQuickView={setQuickViewProduct} />
        </div>
      </section>

      {/* ④ Events & Exhibitions */}
      <section className="home-section section-pad bg-light" ref={evRef} aria-labelledby="events-h">
        <div className={`container reveal${evVisible ? ' revealed' : ''}`}>
          <SectionHeader label="Display Solutions" title="Events & Exhibitions" viewAllTo="/products?category=outdoor" />
          <ProductRow products={EVENTS_PRODUCTS} onQuickView={setQuickViewProduct} />
        </div>
      </section>

      {/* ⑤ Premium Packaging */}
      <section className="home-section section-pad" ref={pkRef} aria-labelledby="packaging-h">
        <div className={`container reveal${pkVisible ? ' revealed' : ''}`}>
          <SectionHeader label="Unbox the Experience" title="Premium Packaging" viewAllTo="/products?category=packaging" />
          <div className="packaging-feature">
            <div className="packaging-feature__img">
              <img src="/images/packaging.png" alt="Premium packaging" loading="lazy" />
            </div>
            <div className="packaging-feature__info">
              <span className="section-label">Why Our Packaging?</span>
              <h3>Elevate Every Unboxing Moment</h3>
              <div className="gold-divider" />
              <p>From rigid gift boxes with magnetic closures to fully custom retail packaging — every piece is crafted to make your brand unforgettable.</p>
              <ul className="feature-list">
                {['Custom rigid boxes with gold foil', 'Magnetic closure gift sets', 'Full interior & exterior printing', 'Eco-friendly options available', 'MOQ from just 50 units'].map(f => (
                  <li key={f}><span className="feature-check">✓</span>{f}</li>
                ))}
              </ul>
              <Link to="/products?category=packaging" className="btn-primary" style={{ marginTop: 24 }}>Shop Packaging →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ⑥ Corporate Gifts & Promotional Items */}
      <section className="home-section section-pad bg-light" ref={corpRef} aria-labelledby="corp-h">
        <div className={`container reveal${corpVisible ? ' revealed' : ''}`}>
          <SectionHeader label="Brand Your People" title="Corporate Gifts & Promotional Items" viewAllTo="/products?category=corporate" />
          <ProductRow products={CORPORATE_PRODUCTS} onQuickView={setQuickViewProduct} />
        </div>
      </section>

      {/* ⑦ National Day Products */}
      <section className="national-day-section section-pad" ref={ndRef} aria-labelledby="nd-h">
        <div className={`container reveal${ndVisible ? ' revealed' : ''}`}>
          <div className="nd-inner">
            <div className="nd-text">
              <span className="nd-badge">🇦🇪 Special Edition</span>
              <h2 id="nd-h">National Day Products</h2>
              <div className="gold-divider" />
              <p>Celebrate the UAE's National Day with our exclusive range of patriotic branded merchandise — from custom pins and lanyards to fully branded gift sets in the colours of the nation.</p>
              <div className="nd-ctas">
                <Link to="/products" className="btn-primary">Shop National Day →</Link>
                <Link to="/quote" className="nd-outline">Get Custom Quote</Link>
              </div>
            </div>
            <div className="nd-image">
              <img src="/images/national-day.png" alt="UAE National Day products" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ⑧ Create Custom Products */}
      <section className="custom-cta-section section-pad">
        <div className="container custom-cta-inner">
          <div className="custom-cta-text">
            <span className="section-label" style={{ color: 'var(--gold-light)' }}>Your Vision, Our Craft</span>
            <h2>Create Custom Products</h2>
            <div className="gold-divider" />
            <p>Have a unique idea? Our design team will bring it to life — from concept to delivery. We work with brands of all sizes to create truly bespoke print and merchandise.</p>
            <Link to="/quote" className="btn-primary" style={{ marginTop: 20 }}>Start Your Custom Order →</Link>
          </div>
          <div className="custom-cta-img">
            <img src="/images/custom-products.png" alt="Custom product creation" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ⑨ Super Fast */}
      <section className="superfast-section section-pad-sm">
        <div className="container sf-inner">
          <div className="sf-badge">⚡</div>
          <h2>Super Fast Turnaround</h2>
          <p>We know deadlines don't wait. That's why we offer 48-hour express delivery on most products across the UAE — without ever compromising on quality.</p>
          <div className="sf-stats">
            {[{ n: '48hr', l: 'Express Turnaround' }, { n: '350+', l: 'Products' }, { n: '12K+', l: 'Happy Clients' }, { n: '99%', l: 'Quality Rate' }].map(s => (
              <div key={s.n} className="sf-stat">
                <strong>{s.n}</strong>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
          <Link to="/products" className="btn-primary" style={{ marginTop: 32 }}>Browse All Products</Link>
        </div>
      </section>

      {/* ⑩ What's New */}
      <section className="home-section section-pad">
        <div className="container">
          <SectionHeader label="Fresh Arrivals" title="What's New" viewAllTo="/products" />
          <ProductRow products={WHATS_NEW} onQuickView={setQuickViewProduct} />
        </div>
      </section>

      {/* ── Recent Projects Gallery ───────────────────────── */}
      <section className="home-portfolio container section-pad">
        <div className="section-header-center">
          <span className="section-label">OUR WORK</span>
          <h2>Our Recent Projects</h2>
          <div className="gold-divider center"></div>
        </div>
        <div className="portfolio-grid">
          {[
            { img: '/images/business-cards.png', title: 'Luxury Hotel Stationery', cat: 'Hospitality' },
            { img: '/images/corporate-gifts.png', title: 'Executive Gift Sets', cat: 'Corporate' },
            { img: '/images/letterhead.png', title: 'Premium Brand Identity', cat: 'Branding' },
            { img: '/images/national-day.png', title: 'National Day Merchandise', cat: 'Events' },
            { img: '/images/hero-slide1.png', title: 'Exhibition Display Stand', cat: 'Outdoor' },
            { img: '/images/custom-products.png', title: 'Bespoke Product Packaging', cat: 'Packaging' },
          ].map((item, i) => (
            <div key={i} className="portfolio-item">
              <img src={item.img} alt={item.title} loading="lazy" />
              <div className="portfolio-overlay">
                <span className="portfolio-cat">{item.cat}</span>
                <h4 className="portfolio-title">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="trusted-section section-pad-sm" aria-label="Trusted by leading companies">
        <div className="container">
          <p className="trusted-label">Trusted by Leading Companies Across the UAE</p>
        </div>
        <div className="trusted-track-wrap">
          <div className="trusted-track">
            {[...COMPANIES, ...COMPANIES].map((c, i) => (
              <span key={i} className="trusted-logo">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ⑫ Why Choose Us */}
      <section className="why-section section-pad bg-dark" aria-labelledby="why-h">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label" style={{ color: 'var(--gold-light)' }}>Our Promise</span>
            <h2 id="why-h" style={{ color: 'var(--white)' }}>Why Choose Evora?</h2>
            <div className="gold-divider center" />
          </div>
          <div className="why-grid">
            {WHY.map(w => (
              <div key={w.title} className="why-card">
                <span className="why-icon">{w.icon}</span>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑬ What Our Clients Say */}
      <section className="testimonials-section section-pad" aria-labelledby="reviews-h">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Client Stories</span>
            <h2 id="reviews-h">What Our Clients Say</h2>
            <div className="gold-divider center" />
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map(t => (
              <blockquote key={t.id} className="testi-card">
                <div className="testi-stars">★★★★★</div>
                <p className="testi-quote">"{t.quote}"</p>
                <footer className="testi-footer">
                  <div className="testi-avatar">{t.avatar}</div>
                  <div>
                    <cite className="testi-name">{t.name}</cite>
                    <p className="testi-role">{t.title}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}
    </main>
  );
}
