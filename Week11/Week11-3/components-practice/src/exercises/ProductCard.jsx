// E6: in-class code challenge. Props: name, price, rating, inStock.
// Bonus 1: rating shown as "x / 5 stars".
// Bonus 2: out-of-stock products are greyed out with a label.
function Stars({ rating }) {
  const full = Math.round(rating)
  return <span aria-hidden="true">{'★'.repeat(full) + '☆'.repeat(5 - full)} </span>
}

function ProductCard({ name, price, rating, inStock }) {
  return (
    <div className="card" style={inStock ? undefined : { opacity: 0.55, filter: 'grayscale(1)' }}>
      <h3>{name}</h3>
      <p className="big-number" style={{ fontSize: '1.4rem' }}>
        ₩{price.toLocaleString('ko-KR')}
      </p>
      <p>
        <Stars rating={rating} />
        {rating} / 5 stars
      </p>
      {inStock ? (
        <p className="notice small">In stock</p>
      ) : (
        <p className="notice error small"><strong>Out of Stock</strong></p>
      )}
    </div>
  )
}

function ProductCardDemo() {
  return (
    <div className="grid-cards">
      <ProductCard name="USB-C Hub" price={39000} rating={4.5} inStock={true} />
      <ProductCard name="Desk Lamp" price={27000} rating={4} inStock={true} />
      <ProductCard name="Mechanical Keyboard" price={89000} rating={4.8} inStock={false} />
    </div>
  )
}

export default ProductCardDemo
