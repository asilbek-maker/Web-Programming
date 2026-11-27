import { useState } from 'react'

// M2 · Video lecture challenge: three menu items with − and + buttons.
// One state object maps each id to its quantity. The total is not stored;
// it is calculated from the quantities on every render.
const MENU = [
  { id: 'americano', name: '아메리카노', price: 4000 },
  { id: 'kimbap', name: '김밥', price: 3500 },
  { id: 'tea', name: '녹차', price: 3000 },
]

function CafeOrder() {
  const [qty, setQty] = useState({ americano: 0, kimbap: 0, tea: 0 })

  function change(id, amount) {
    setQty((prev) => ({ ...prev, [id]: Math.max(0, prev[id] + amount) })) // never below 0
  }

  const total = MENU.reduce((sum, item) => sum + item.price * qty[item.id], 0)

  return (
    <div className="stack">
      <ul className="list">
        {MENU.map((item) => (
          <li key={item.id}>
            <span className="grow">{item.name} <span className="muted">₩{item.price.toLocaleString()}</span></span>
            <button type="button" className="btn btn-small" aria-label={`One less ${item.name}`}
              onClick={() => change(item.id, -1)} disabled={qty[item.id] === 0}>−</button>
            <output className="qty">{qty[item.id]}</output>
            <button type="button" className="btn btn-small" aria-label={`One more ${item.name}`}
              onClick={() => change(item.id, 1)}>+</button>
          </li>
        ))}
      </ul>
      <p className="total">Total <strong>₩{total.toLocaleString()}</strong></p>
    </div>
  )
}

export default CafeOrder
