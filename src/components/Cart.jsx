import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { isCartOpen, cartItems, removeFromCart, updateQty } from '../store/cart';
import './Cart.css';

export default function Cart() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartItems = useStore(cartItems);
  const total = $cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const onClose = () => isCartOpen.set(false);

  useEffect(() => {
    document.body.style.overflow = $isCartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [$isCartOpen]);

  return (
    <>
      {$isCartOpen && <div className="cart-overlay" onClick={onClose} />}
      <aside className={`cart-drawer${$isCartOpen ? ' cart-drawer--open' : ''}`} aria-label="Shopping cart" role="dialog">
        <div className="cart-drawer__header">
          <h3>Your Cart <span className="cart-drawer__count">({$cartItems.length})</span></h3>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="cart-drawer__body">
          {$cartItems.length === 0 ? (
            <div className="cart-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--grey-200)" strokeWidth="1.2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <p>Your cart is empty.</p>
              <button className="btn-outline" onClick={onClose} style={{ marginTop: 16 }}>Continue Shopping</button>
            </div>
          ) : (
            <ul className="cart-items">
              {$cartItems.map(item => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item__img" loading="lazy" />
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__price">AED {item.price}</p>
                    <div className="cart-item__controls">
                      <button className="cart-qty-btn" onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">−</button>
                      <span className="cart-qty">{item.qty}</span>
                      <button className="cart-qty-btn" onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                  <button className="cart-item__remove" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {$cartItems.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span className="cart-total__amount">AED {total.toLocaleString()}</span>
            </div>
            <p className="cart-shipping-note">Shipping & taxes calculated at checkout</p>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Proceed to Checkout →
            </button>
            <button className="btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }} onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
