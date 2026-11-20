import { useState } from 'react';
import ProductList from './ProductList';
import CartPanel from './CartPanel';

// ShoppingCart owns the cart state: an array of cart items,
// e.g. [{ id, name, price, image, quantity }].
// Every update builds a NEW array, never mutating the old one.
function ShoppingCart({ products }) {
  const [cart, setCart] = useState([]);

  // Add: append a new item, or bump the quantity if it is already there
  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  // Remove: filter creates a new array without that item
  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  // The state lives here, so ProductList and CartPanel (siblings)
  // always show the same cart: data down as props, events up as callbacks.
  return (
    <div className="shop-layout">
      <ProductList
        products={products}
        cart={cart}
        onAdd={addToCart}
        onRemove={removeFromCart}
      />
      <CartPanel
        cart={cart}
        onIncrease={() => {}}
        onDecrease={() => {}}
        onRemove={removeFromCart}
        onClear={clearCart}
      />
    </div>
  );
}

export default ShoppingCart;
