import ProductCard from './ProductCard';

// Renders every product with .map() and a stable key (the product id).
function ProductList({ products, cart, onAdd, onRemove }) {
  return (
    <section className="product-list" aria-labelledby="products-title">
      <h2 id="products-title" className="section-title">
        Products <span className="count">{products.length}</span>
      </h2>
      <div className="product-grid">
        {products.map((product) => {
          const item = cart.find((i) => i.id === product.id);
          return (
            <ProductCard
              key={product.id}
              product={product}
              quantityInCart={item ? item.quantity : 0}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ProductList;
