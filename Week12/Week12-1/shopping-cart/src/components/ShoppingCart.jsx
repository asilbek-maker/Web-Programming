import { useState } from 'react';
import ProductList from './ProductList';

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

  return (
    <div className="shop-layout">
      <ProductList
        products={products}
        cart={cart}
        onAdd={addToCart}
        onRemove={removeFromCart}
      />
    </div>
  );
}

export default ShoppingCart;
