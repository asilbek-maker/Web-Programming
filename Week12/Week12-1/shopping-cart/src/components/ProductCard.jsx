import formatPrice from '../formatPrice';

// One product. It does not own any state: it shows whether the product is
// in the cart (from props) and reports clicks up through callbacks.
function ProductCard({ product, quantityInCart, onAdd, onRemove }) {
  const inCart = quantityInCart > 0;

  return (
    <article className={inCart ? 'product-card is-in-cart' : 'product-card'}>
      <img className="product-image" src={product.image} alt="" width="400" height="300" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">{formatPrice(product.price)}</p>
      </div>
      <div className="product-actions">
        <button type="button" className="btn btn-primary" onClick={() => onAdd(product)}>
          {inCart ? `Add another (${quantityInCart})` : 'Add to cart'}
        </button>
        {inCart && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => onRemove(product.id)}
            aria-label={`Remove ${product.name} from cart`}
          >
            Remove
          </button>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
