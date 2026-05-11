import { atom, computed } from 'nanostores';

// Ensure atoms are singletons across Astro islands
if (typeof window !== 'undefined') {
  if (!window.__EVORA_CART_OPEN__) window.__EVORA_CART_OPEN__ = atom(false);
  if (!window.__EVORA_CART_ITEMS__) window.__EVORA_CART_ITEMS__ = atom([]);
}

export const isCartOpen = (typeof window !== 'undefined') ? window.__EVORA_CART_OPEN__ : atom(false);
export const cartItems = (typeof window !== 'undefined') ? window.__EVORA_CART_ITEMS__ : atom([]);
export const toasts = atom([]);
export const quickViewProduct = atom(null); // Dummy export for backwards compatibility

let toastId = 0;

export function addToast(message) {
  const id = ++toastId;
  toasts.set([...toasts.get(), { id, message }]);
  setTimeout(() => {
    toasts.set(toasts.get().filter(x => x.id !== id));
  }, 3000);
}

export function addToCart(product) {
  const items = cartItems.get();
  const existing = items.find(i => i.id === product.id);
  if (existing) {
    cartItems.set(items.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
  } else {
    cartItems.set([...items, { ...product, qty: 1 }]);
  }
  addToast(`"${product.name}" added to cart`);
}

export function removeFromCart(id) {
  cartItems.set(cartItems.get().filter(i => i.id !== id));
}

export function updateQty(id, qty) {
  if (qty < 1) {
    removeFromCart(id);
  } else {
    cartItems.set(cartItems.get().map(i => i.id === id ? { ...i, qty } : i));
  }
}

export const cartCount = computed(cartItems, (items) => 
  items.reduce((s, i) => s + i.qty, 0)
);
