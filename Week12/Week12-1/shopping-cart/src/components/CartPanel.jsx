import CartItem from './CartItem';
import formatPrice from '../formatPrice';

// The cart sidebar. The item count and the total are not stored in state:
// they are computed from the cart array on every render.
function CartPanel({ cart, onIncrease, onDecrease, onRemove, onClear }) {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside className="cart-panel" aria-labelledby="cart-title">
      <div className="cart-head">
        <h2 id="cart-title" className="section-title">
          Your cart <span className="count">{itemCount}</span>
        </h2>
        {cart.length > 0 && (
          <button type="button" className="link-btn" onClick={onClear}>
            Clear
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty. Add something from the list.</p>
      ) : (
        <ul className="cart-items">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}

      <div className="cart-total">
        <span>Total</span>
        <strong>{formatPrice(total)}</strong>
      </div>
      <button type="button" className="btn btn-primary btn-block" disabled={cart.length === 0}>
        Checkout
      </button>
    </aside>
  );
}

export default CartPanel;
