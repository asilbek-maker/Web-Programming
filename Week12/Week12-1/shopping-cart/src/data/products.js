// Product catalogue: name, price (KRW) and image URL for each item.
// Images live in public/products, so they are served next to the built app.
const img = (file) => `${import.meta.env.BASE_URL}products/${file}`;

const products = [
  {
    id: 'p1',
    name: 'Wireless Earbuds',
    description: 'Bluetooth 5.3, 24-hour battery with the case.',
    price: 89000,
    image: img('earbuds.svg'),
  },
  {
    id: 'p2',
    name: 'Mechanical Keyboard',
    description: 'Compact 75% layout with hot-swap switches.',
    price: 129000,
    image: img('keyboard.svg'),
  },
  {
    id: 'p3',
    name: 'Laptop Stand',
    description: 'Aluminium, folds flat, six height levels.',
    price: 39000,
    image: img('stand.svg'),
  },
  {
    id: 'p4',
    name: 'USB-C Hub',
    description: '7-in-1: HDMI, 2× USB-A, SD, and 100 W pass-through.',
    price: 45000,
    image: img('hub.svg'),
  },
  {
    id: 'p5',
    name: 'LED Desk Lamp',
    description: 'Three colour temperatures and a dimmer.',
    price: 32000,
    image: img('lamp.svg'),
  },
  {
    id: 'p6',
    name: 'Notebook Set',
    description: 'Three A5 dot-grid notebooks, 120 pages each.',
    price: 12000,
    image: img('notebooks.svg'),
  },
];

export default products;
