import { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isCartOpen, cartCount } from '../store/cart';
import data from '../data/products.json';
import { NAV_ITEMS } from '../data/navigation';
import Logo from './Logo';
import './Navbar.css';

export default function Navbar() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartCount = useStore(cartCount);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchVal, setSearchVal] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const megaTimeout = useRef(null);
  const searchRef = useRef(null);
  const [pathname, setPathname] = useState('');
  const [activeNavId, setActiveNavId] = useState(null);

  useEffect(() => {
    setPathname(window.location.pathname);
    const params = new URLSearchParams(window.location.search);
    setActiveNavId(params.get('nav'));
    setMenuOpen(false);
    setActiveMenu(null);
    setShowSuggestions(false);
    setSearchVal('');
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleMenuEnter = (label) => {
    clearTimeout(megaTimeout.current);
    setActiveMenu(label);
  };
  const handleMenuLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const renderHighlighted = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="search-highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  const filteredResults = searchVal.trim().length > 1
    ? data.products.filter(p => p.name.toLowerCase().includes(searchVal.toLowerCase()))
    : [];
  
  const searchResults = filteredResults.slice(0, 6);

  const fallbackActiveIndex = NAV_ITEMS.findIndex(i => {
    if (activeNavId && i.id === activeNavId) return true;
    if (pathname !== '/' && pathname.startsWith('/products')) {
       // if we are on products page but don't have nav param, we might fallback to something else,
       // but for now, matching the URL path is enough if nav param is missing
       return pathname === i.to.split('?')[0] && !activeNavId;
    }
    return pathname === i.to;
  });

  return (
    <>
      {/* ── Top Contact Bar (Dark) ────────────────────────────── */}
      <div className="header-top-bar">
        <div className="header-top-bar__inner container">
          <div className="header-top-bar__left">
            <a href="tel:+18008362376">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--gold)' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.26 2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z"/></svg>
              +1 (800) EVORA-PR
            </a>
            <a href="mailto:hello@evora.ae">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--gold)' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              hello@evora.ae
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Header: Logo | Search ───────────────────────── */}
      <header className="topbar" role="banner">
        <div className="topbar__inner container">
          {/* Official Logo */}
          <a href="/" className="topbar__logo" aria-label="Evora Home">
            <Logo className="topbar__logo-svg" />
          </a>

          {/* Search */}
          <div className="topbar__search-container" ref={searchRef}>
            <div className="topbar__search">
              <input
                type="search"
                placeholder="Search for products..."
                value={searchVal}
                onChange={e => {
                  setSearchVal(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                aria-label="Search products"
                id="site-search"
                autoComplete="off"
              />
              <button className="topbar__search-btn" aria-label="Submit search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </div>
            
            {/* Search Suggestions Dropdown */}
            {showSuggestions && searchVal.trim().length > 1 && (
              <div className="search-suggestions">
                {searchResults.length > 0 ? (
                  <>
                    <div className="suggestions-header">Products found:</div>
                    {searchResults.map(item => (
                      <a 
                        key={item.id} 
                        href={`/products/${item.slug}`} 
                        className="search-suggestion-item"
                        onClick={() => {
                          setShowSuggestions(false);
                          setSearchVal('');
                        }}
                      >
                        <div className="search-suggestion-img-wrap">
                          <img src={item.image} alt={item.name} className="search-suggestion-img" />
                        </div>
                        <span className="search-suggestion-text">
                          {renderHighlighted(item.name, searchVal.trim())}
                        </span>
                      </a>
                    ))}
                    {filteredResults.length > 6 && (
                      <a 
                        href={`/products?search=${encodeURIComponent(searchVal)}`}
                        className="search-suggestions-view-all"
                        onClick={() => setShowSuggestions(false)}
                      >
                        View all {filteredResults.length} results
                      </a>
                    )}
                  </>
                ) : (
                  <div className="search-suggestion-empty">
                    <span className="empty-icon">🔍</span>
                    No products found for "{searchVal}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Phone (Desktop only) */}
          <div className="topbar__right">
            <a href="tel:+18008362376" className="topbar__phone" aria-label="Call us">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+1 (800) 836-2376</span>
            </a>

            <button 
              className="topbar__cart" 
              onClick={() => isCartOpen.set(true)}
              aria-label={`View cart with ${$cartCount} items`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {$cartCount > 0 && <span className="cart-badge">{$cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Bar ──────────────────────────────────── */}
      <nav className="mobile-gold-nav" onClick={() => setMenuOpen(m => !m)}>
        <div className="container mobile-gold-nav__inner">
          <div className="mobile-gold-nav__content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
              )}
            </svg>
            <span>Menu</span>
          </div>
        </div>
      </nav>

      {/* ── Mobile Accordion Menu (Dropdown) ─────────────────── */}
      <div className={`mobile-dropdown-menu${menuOpen ? ' mobile-dropdown-menu--open' : ''}`}>
        <div className="container mobile-dropdown-menu__inner">
          {NAV_ITEMS.map((item, index) => {
            const isActive = index === fallbackActiveIndex;
            return (
              <a
                key={item.label}
                href={item.to}
                className={`mobile-dropdown-item${isActive ? ' mobile-dropdown-item--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            );
          })}
          <a href="/quote" className="mobile-dropdown-item mobile-dropdown-item--cta" onClick={() => setMenuOpen(false)}>
            Request a Quote
          </a>
        </div>
      </div>

      {/* ── Desktop Category Nav ────────────────────────────── */}
      <nav className="bottomnav" aria-label="Main navigation">
        <div className="bottomnav__inner container">
          {NAV_ITEMS.map((item, index) => {
            const isActive = index === fallbackActiveIndex;
            return (
            <div
              key={item.label}
              className="bottomnav__item"
              onMouseEnter={() => item.mega && handleMenuEnter(item.label)}
              onMouseLeave={handleMenuLeave}
            >
              <a
                href={item.to}
                className={`bottomnav__link${isActive ? ' bottomnav__link--active' : ''}${activeMenu === item.label ? ' bottomnav__link--open' : ''}`}
              >
                {item.label}
                {item.mega && (
                  <svg className="bottomnav__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </a>

              {/* Mega Dropdown */}
              {item.mega && (
                <div
                  className={`mega-menu${activeMenu === item.label ? ' mega-menu--open' : ''}`}
                  onMouseEnter={() => handleMenuEnter(item.label)}
                  onMouseLeave={handleMenuLeave}
                  role="region"
                  aria-label={`${item.label} submenu`}
                >
                  <div className="mega-menu__inner container">
                    {item.mega.columns.map(col => (
                      <div key={col.heading} className="mega-col">
                        <a href={col.to} className="mega-col__heading">{col.heading}</a>
                        <ul>
                          {col.links.map(link => (
                            <li key={link}>
                              <a href={`/products?search=${encodeURIComponent(link)}`} className="mega-col__link">{link}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )})}
        </div>
      </nav>

      {/* ── Mobile Bottom Navigation ────────────────────────── */}
      <nav className="bottom-tab" aria-label="Mobile bottom navigation">
        <a href="/" className={`bottom-tab__item${pathname === '/' ? ' active' : ''}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span>Home</span>
        </a>
        <a href="tel:+18008362376" className="bottom-tab__item">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          <span>Call</span>
        </a>
        <a href="https://wa.me/18008362376" className="bottom-tab__item bottom-tab__whatsapp" aria-label="WhatsApp">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
        <a href="mailto:hello@evora.ae" className="bottom-tab__item">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <span>Email</span>
        </a>
        <a href="/quote" className={`bottom-tab__item${pathname === '/quote' ? ' active' : ''}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
          <span>Enquiry</span>
        </a>
      </nav>
    </>
  );
}
