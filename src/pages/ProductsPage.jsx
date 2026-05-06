import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import data from '../data/products.json';
import { NAV_ITEMS } from '../data/navigation';
import './ProductsPage.css';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default Sorting' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
];

export default function ProductsPage({ onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const [sort, setSort] = useState('default');
  const [viewMode, setViewMode] = useState('grid'); // grid | list
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const filtered = useMemo(() => {
    let arr = data.products;

    if (activeCategory !== 'all') {
      arr = arr.filter(p => p.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      arr = arr.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        (p.tagline && p.tagline.toLowerCase().includes(q))
      );
    }

    // Add demo products if the search/category yielded no results
    if (arr.length === 0) {
      const term = searchQuery || (activeCategory !== 'all' ? activeCategory : 'Product');
      const demoTerm = term.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      
      arr = [
        {
          id: `demo-1-${term}`,
          slug: `demo-1-${term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          name: `Premium ${demoTerm}`,
          tagline: `High quality ${demoTerm.toLowerCase()} for your business`,
          category: activeCategory !== 'all' ? activeCategory : 'marketing',
          price: 99,
          priceUnit: "per 100",
          image: "/images/custom-products.png",
          badge: "Popular",
          rating: 4.8,
          reviews: 12,
          description: `Showcase your brand with our premium ${demoTerm.toLowerCase()}. Made with the finest materials for a lasting impression.`,
          features: ["Premium Quality", "Fast Turnaround", "Custom Sizing"]
        },
        {
          id: `demo-2-${term}`,
          slug: `demo-2-${term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          name: `Custom ${demoTerm}`,
          tagline: `Fully customizable ${demoTerm.toLowerCase()} to stand out`,
          category: activeCategory !== 'all' ? activeCategory : 'marketing',
          price: 149,
          priceUnit: "per 200",
          image: "/images/custom-products.png",
          rating: 4.5,
          reviews: 8,
          description: `Get exactly what you need with our fully custom ${demoTerm.toLowerCase()}. Perfect for unique branding requirements.`,
          features: ["Any Shape", "Vibrant Colors", "Durable Finish"]
        },
        {
          id: `demo-3-${term}`,
          slug: `demo-3-${term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          name: `Eco-Friendly ${demoTerm}`,
          tagline: `Sustainable ${demoTerm.toLowerCase()} options`,
          category: activeCategory !== 'all' ? activeCategory : 'marketing',
          price: 89,
          priceUnit: "per 100",
          image: "/images/custom-products.png",
          badge: "Eco",
          rating: 4.9,
          reviews: 45,
          description: `Support the environment without sacrificing quality with our eco-friendly ${demoTerm.toLowerCase()}. Beautiful and responsible.`,
          features: ["Recycled Materials", "Soy-based Inks", "Biodegradable"]
        }
      ];
    }

    if (sort === 'name-asc') {
      arr = [...arr].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name-desc') {
      arr = [...arr].sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === 'newest') {
      arr = [...arr].sort((a, b) => b.id - a.id);
    } else if (sort === 'popular') {
      arr = [...arr].sort((a, b) => b.reviews - a.reviews);
    }
    return arr;
  }, [activeCategory, searchQuery, sort]);

  const activeCatLabel = data.categories.find(c => c.id === activeCategory)?.label || 'All Products';

  // Find the relevant nav item for the current category to populate the sidebar
  const activeNavItem = NAV_ITEMS.find(item => {
    if (activeCategory !== 'all' && item.to.includes(`category=${activeCategory}`)) return true;
    if (searchQuery && item.mega) {
      return item.mega.columns.some(col => 
        col.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.links.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return false;
  }) || NAV_ITEMS[0];

  const WHY_TRUST = [
    { title: "PREMIUM QUALITY", desc: "Every job passes our 22-point quality check before dispatch.", icon: "⭐" },
    { title: "SPEED & RELIABILITY", desc: "Express 48-hour turnaround on most products across UAE.", icon: "⚡" },
    { title: "PROFESSIONAL ADVICE", desc: "Our expert team is here to help you choose the best materials.", icon: "🎯" },
  ];

  return (
    <main className="products-page">
      <Helmet>
        <title>{activeCatLabel} — Evora Print Studio</title>
        <meta name="description" content={`Browse our ${activeCatLabel.toLowerCase()} collection. Premium quality print materials from Evora.`} />
      </Helmet>

      {/* Breadcrumb Section (White) */}
      <section className="products-breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>{searchQuery ? `Search: ${searchQuery}` : activeCatLabel}</span>
          </nav>
          <h1>{searchQuery ? `Results for "${searchQuery}"` : activeCatLabel}</h1>
        </div>
      </section>

      <div className="container products-layout">
        {/* Sidebar - Replicating BrandingBlitz logic */}
        <aside className="products-sidebar" aria-label="Product navigation">
          {activeNavItem.mega && activeNavItem.mega.columns.map(col => (
            <div key={col.heading} className="sidebar-group">
              <h4 className="sidebar-group-heading">{col.heading}</h4>
              <ul className="sidebar-links">
                {col.links.map(link => (
                  <li key={link}>
                    <Link 
                      to={`/products?search=${encodeURIComponent(link)}`}
                      className={`sidebar-link${searchQuery === link ? ' sidebar-link--active' : ''}`}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Sidebar CTA */}
          <div className="sidebar-cta">
            <span className="qs-icon">🎯</span>
            <h5>Need a Custom Quote?</h5>
            <p>Get professional advice for your unique printing requirements.</p>
            <Link to="/quote" className="btn-primary-sm">Get Quote →</Link>
          </div>
        </aside>

        {/* Main Content */}
        <div className="products-main">
          {/* Toolbar */}
          <div className="products-toolbar">
            <p className="products-count">
              Showing 1–{filtered.length} of {filtered.length} results
            </p>
            <div className="products-toolbar__right">
              <select
                className="sort-select"
                value={sort}
                onChange={e => setSort(e.target.value)}
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <div className="view-toggle">
                <button
                  className={`view-btn${viewMode === 'grid' ? ' view-btn--active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                </button>
                <button
                  className={`view-btn${viewMode === 'list' ? ' view-btn--active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div className="toolbar-divider" />

          {/* Grid Area */}
          <div className={`products-grid-area${viewMode === 'list' ? ' products-grid-area--list' : ''}`}>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </div>

      {/* Why Trust Us Section - Replicating BrandingBlitz */}
      <section className="products-trust-section container">
        <div className="trust-grid-title">
          <span className="section-label">OUR PROMISE</span>
          <h2>Why Businesses Trust Evora</h2>
          <div className="gold-divider" />
        </div>
        <div className="trust-grid">
          {WHY_TRUST.map(item => (
            <div key={item.title} className="trust-grid-item">
              <span className="trust-grid-icon">{item.icon}</span>
              <div className="trust-grid-text">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integrated SEO/Info Section - More detailed like BrandingBlitz */}
      <section className="container section-pad">
        <div className="products-info-blocks">
          <div className="info-block">
            <h3>Premium {activeCatLabel} for Impactful Branding</h3>
            <p>At Evora, we understand that {activeCatLabel.toLowerCase()} are more than just print materials—they are a reflection of your brand's commitment to excellence. Our state-of-the-art facility in Dubai utilizes the latest printing technology to ensure every piece is rendered with pin-sharp clarity and vibrant color accuracy.</p>
            <p>Whether you need professional business cards that make a lasting first impression or large-format event banners that capture attention from afar, we provide bespoke solutions tailored to your specific industry requirements across the UAE.</p>
          </div>

          <div className="info-block">
            <h4>Bespoke Finishes & Luxury Materials</h4>
            <p>Elevate your brand with our range of premium finishes. From elegant gold foiling and deep embossing to modern spot UV and soft-touch lamination, we offer the custom touches that turn standard print into a luxury experience. We work with high-grade sustainable materials to ensure your marketing collateral is as responsible as it is beautiful.</p>
          </div>

          <div className="info-block">
            <h4>Fast Delivery Across Dubai & UAE</h4>
            <p>Time is of the essence in the corporate world. That's why Evora offers express 48-hour delivery on most of our product range. From our hub in Dubai, we serve businesses in Abu Dhabi, Sharjah, and all other Emirates, ensuring your materials arrive exactly when you need them, without compromising on quality.</p>
          </div>
        </div>

        {/* FAQ Section Integrated at bottom of info */}
        <div className="products-faq-compact">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-list">
            {[
              { q: `What is the turnaround time for ${activeCatLabel.toLowerCase()}?`, a: "Standard turnaround is 3-5 business days. Express 48-hour delivery is available for urgent corporate requirements." },
              { q: "Can I get a custom quote for a large volume?", a: "Absolutely. We offer tiered pricing for bulk orders. Simply use our 'Request Quote' button or contact our sales team directly." },
              { q: "Do you offer design services?", a: "Yes, our in-house design team can assist you in creating or refining your artwork to ensure it is perfectly optimized for printing." }
            ].map((faq, i) => (
              <details key={i} className="faq-item" name="category-faq">
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
        </div>
      </section>

      {/* Trust Bar (Quick Stats) - At the very bottom */}
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

      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}
    </main>
  );
}
