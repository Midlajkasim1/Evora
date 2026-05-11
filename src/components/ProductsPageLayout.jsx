import { useState, useMemo, useEffect } from 'react';
import ProductGrid from './ProductGrid';
import data from '../data/products.json';
import { NAV_ITEMS } from '../data/navigation';

export default function ProductsPageLayout({ initialCategory, initialSearch }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSearch, setActiveSearch] = useState(initialSearch);
  const [activeNav, setActiveNav] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setActiveCategory(params.get('category') || 'all');
      setActiveSearch(params.get('search') || '');
      setActiveNav(params.get('nav') || null);
    }
  }, []);

  const activeCatLabel = useMemo(() => {
    if (activeNav) {
      const found = NAV_ITEMS.find(item => item.id === activeNav);
      if (found) return found.label;
    }
    return data.categories.find(c => c.id === activeCategory)?.label || 'All Products';
  }, [activeCategory, activeNav]);

  const activeNavItem = useMemo(() => {
    if (activeNav) {
      const found = NAV_ITEMS.find(item => item.id === activeNav);
      if (found) return found;
    }
    return NAV_ITEMS.find(item => {
      if (activeCategory !== 'all' && item.to.includes(`category=${activeCategory}`)) return true;
      if (activeSearch && item.mega) {
        return item.mega.columns.some(col => 
          col.heading.toLowerCase().includes(activeSearch.toLowerCase()) ||
          col.links.some(l => l.toLowerCase().includes(activeSearch.toLowerCase()))
        );
      }
      return false;
    }) || NAV_ITEMS[0];
  }, [activeCategory, activeSearch, activeNav]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = activeSearch 
        ? `Results for "${activeSearch}" — Evora Print Studio`
        : `${activeCatLabel} — Evora Print Studio`;
    }
  }, [activeSearch, activeCatLabel]);

  return (
    <>
      <section className="products-breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a> <span>/</span> <span>{activeSearch ? `Search: ${activeSearch}` : activeCatLabel}</span>
          </nav>
          <h1>{activeSearch ? `Results for "${activeSearch}"` : activeCatLabel}</h1>
        </div>
      </section>

      <div className="container products-layout">
        <aside className="products-sidebar" aria-label="Product navigation">
          {activeNavItem.mega && activeNavItem.mega.columns.map(col => (
            <div key={col.heading} className="sidebar-group">
              <h4 className="sidebar-group-heading">{col.heading}</h4>
              <ul className="sidebar-links">
                {col.links.map(link => (
                  <li key={link}>
                    <a 
                      href={`/products?search=${encodeURIComponent(link)}`}
                      className={`sidebar-link${activeSearch === link ? ' sidebar-link--active' : ''}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="sidebar-cta">
            <span className="qs-icon">🎯</span>
            <h5>Need a Custom Quote?</h5>
            <p>Get professional advice for your unique printing requirements.</p>
            <a href="/quote" className="btn-primary-sm">Get Quote →</a>
          </div>
        </aside>

        <div className="products-main">
          <ProductGrid 
            initialCategory={activeCategory} 
            initialSearch={activeSearch} 
          />
        </div>
      </div>
    </>
  );
}
