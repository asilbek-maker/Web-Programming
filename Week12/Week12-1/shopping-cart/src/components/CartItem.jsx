import formatPrice from '../formatPrice';

// One line in the cart: name, unit price, quantity controls and line total.
function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <li className="cart-item">
      <img className="cart-thumb" src={item.image} alt="" width="56" height="42" />
      <div className="cart-item-main">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-unit">{formatPrice(item.price)} each</p>
        <div className="qty" role="group" aria-label={`Quantity of ${item.name}`}>
          <button
            type="button"
            className="qty-btn"
            onClick={() => onDecrease(item.id)}
            aria-label={`Decrease ${item.name}`}
          >
            −
          </button>
          <span className="qty-value" aria-live="polite">{item.quantity}</span>
          <button
            type="button"
            className="qty-btn"
            onClick={() => onIncrease(item.id)}
            aria-label={`Increase ${item.name}`}
          >
            +
          </button>
        </div>
      </div>
      <div className="cart-item-side">
        <p className="cart-item-total">{formatPrice(item.price * item.quantity)}</p>
        <button
          type="button"
          className="link-btn"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name} from cart`}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default CartItem;
