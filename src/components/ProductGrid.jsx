import { useState, useMemo, useEffect } from 'react';
import ProductCardComponent from './ProductCardComponent';
import data from '../data/products.json';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default Sorting' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
];

export default function ProductGrid({ initialCategory, initialSearch }) {
  const [sort, setSort] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  
  // Initialize from props (SSR), but update from URL on client mount
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSearch, setActiveSearch] = useState(initialSearch);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setActiveCategory(params.get('category') || 'all');
      setActiveSearch(params.get('search') || '');
    }
  }, []);

  const filtered = useMemo(() => {
    let arr = data.products;

    if (activeCategory !== 'all') {
      arr = arr.filter(p => p.category === activeCategory);
    }

    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      arr = arr.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        (p.tagline && p.tagline.toLowerCase().includes(q))
      );
    }

    // Demo products logic
    if (arr.length === 0) {
      const term = activeSearch || (activeCategory !== 'all' ? activeCategory : 'Product');
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
          description: `Showcase your brand with our premium ${demoTerm.toLowerCase()}.`,
          features: ["Premium Quality", "Fast Turnaround", "Custom Sizing"]
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
  }, [activeCategory, activeSearch, sort]);

  return (
    <>
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

      <div className={`products-grid-area${viewMode === 'list' ? ' products-grid-area--list' : ''}`}>
        {filtered.map(p => (
          <ProductCardComponent 
            key={p.id} 
            product={p} 
          />
        ))}
      </div>
    </>
  );
}
