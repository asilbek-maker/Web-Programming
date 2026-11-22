import { useState } from 'react'

// M2: shopping cart counter (video lecture challenge).
// All quantities live in ONE object keyed by item id.
// The total is computed during render, never stored in state.
const menu = [
  { id: 'americano', name: '아메리카노', price: 3000 },
  { id: 'gimbap', name: '김밥', price: 3500 },
  { id: 'tea', name: '녹차', price: 2500 },
]

function CafeOrder() {
  const [quantities, setQuantities] = useState({ americano: 0, gimbap: 0, tea: 0 })

  function change(id, delta) {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta), // never below 0
    }))
  }

  const total = menu.reduce((sum, item) => sum + item.price * quantities[item.id], 0)
  const count = Object.values(quantities).reduce((a, b) => a + b, 0)

  return (
    <div className="stack">
      <ul className="plain-list">
        {menu.map((item) => (
          <li key={item.id}>
            <span className="grow">
              {item.name} <span className="muted small">₩{item.price.toLocaleString('ko-KR')}</span>
            </span>
            <button type="button" className="btn btn-small" onClick={() => change(item.id, -1)}
              disabled={quantities[item.id] === 0} aria-label={`One less ${item.name}`}>−</button>
            <strong style={{ minWidth: '1.5em', textAlign: 'center' }}>{quantities[item.id]}</strong>
            <button type="button" className="btn btn-small" onClick={() => change(item.id, 1)}
              aria-label={`One more ${item.name}`}>+</button>
          </li>
        ))}
      </ul>
      <p className="card row" style={{ justifyContent: 'space-between' }}>
        <span>{count} items</span>
        <strong>Total ₩{total.toLocaleString('ko-KR')}</strong>
      </p>
    </div>
  )
}

export default CafeOrder
