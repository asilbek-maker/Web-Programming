# Interactive Shopping Cart

Web Programming K0126_002 · Week 12 · Homework (React state & `useState`)

**Live:** https://asilbek-maker.github.io/Web-Programming/Week12/Week12-1/app/

## Requirements

| # | Requirement | Where |
| --- | --- | --- |
| 1 | Product list, at least 5 items with name, price and image URL | `src/data/products.js` (6 items), `public/products/*.svg` |
| 2 | Add / Remove buttons; state is an array of cart items | `ShoppingCart.jsx`: `useState([])`, `addToCart`, `removeFromCart` |
| 3 | Cart sidebar with items and a total computed from state | `CartPanel.jsx`: `cart.reduce(...)` on every render |
| 4 | Quantity controls, + and − per item | `CartItem.jsx` → `increaseQuantity` / `decreaseQuantity` |
| 5 | `ShoppingCart` component: product list + cart panel | `ShoppingCart.jsx` renders `ProductList` and `CartPanel` |

## Component tree

```
App
└── ShoppingCart          state: cart = [{ id, name, price, image, quantity }]
    ├── ProductList       props: products, cart, onAdd, onRemove
    │   └── ProductCard   one per product (key = product.id)
    └── CartPanel         props: cart, onIncrease, onDecrease, onRemove, onClear
        └── CartItem      one per cart line (key = item.id)
```

The cart state is lifted into `ShoppingCart`, the nearest common parent of the product
list and the cart panel, so both always show the same data. Data flows down as props,
and clicks flow up as callbacks.

## Immutable updates

- **Add:** `[...prev, { ...product, quantity: 1 }]`, or `prev.map(...)` to bump an existing line
- **Remove:** `prev.filter(item => item.id !== id)`
- **Quantity +/−:** `prev.map(...)` with a new object for the changed item. Going below 1 filters the line out.
- **Total:** derived with `reduce`, never stored in state

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # writes the production site to ../app
```
