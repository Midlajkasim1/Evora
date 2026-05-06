import { useState, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyContactBar from './components/StickyContactBar';
import Cart from './components/Cart';
import Toast from './components/Toast';
import './App.css';

// Lazy-load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const QuotePage = lazy(() => import('./pages/QuotePage'));

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80dvh' }}>
      <div style={{ width: 36, height: 36, border: '3px solid var(--grey-200)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );
}

let toastId = 0;

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message) => {
    const id = ++toastId;
    setToasts(t => [...t, { id, message }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  const handleAddToCart = useCallback((product) => {
    setCartItems(items => {
      const existing = items.find(i => i.id === product.id);
      if (existing) {
        return items.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...items, { ...product, qty: 1 }];
    });
    addToast(`"${product.name}" added to cart`);
  }, [addToast]);

  const handleRemove = useCallback((id) => {
    setCartItems(items => items.filter(i => i.id !== id));
  }, []);

  const handleUpdateQty = useCallback((id, qty) => {
    if (qty < 1) {
      setCartItems(items => items.filter(i => i.id !== id));
    } else {
      setCartItems(items => items.map(i => i.id === id ? { ...i, qty } : i));
    }
  }, []);

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  return (
    <BrowserRouter>
      <Navbar onCartOpen={() => setCartOpen(true)} cartCount={cartCount} />
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={handleRemove}
        onUpdateQty={handleUpdateQty}
      />
      <Toast toasts={toasts} />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
          <Route path="/products" element={<ProductsPage onAddToCart={handleAddToCart} />} />
          <Route path="/products/:slug" element={<ProductDetailPage onAddToCart={handleAddToCart} />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/gallery" element={<ProductsPage onAddToCart={handleAddToCart} />} />
          <Route path="*" element={
            <main style={{ padding: 'calc(var(--nav-height) + 80px) 20px', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)' }}>404 — Page Not Found</h2>
              <a href="/" className="btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>Return Home</a>
            </main>
          } />
        </Routes>
      </Suspense>
      <Footer />
      <StickyContactBar />
    </BrowserRouter>
  );
}
