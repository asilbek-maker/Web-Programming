import ShoppingCart from './components/ShoppingCart';
import products from './data/products';

function App() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Web Programming K0126_002 · Week 12 · React state</p>
        <h1>Campus Gear Shop</h1>
        <p className="lede">Desk and study gear. Add items, change quantities, and the cart total updates from state.</p>
      </header>
      <ShoppingCart products={products} />
    </div>
  );
}

export default App;
