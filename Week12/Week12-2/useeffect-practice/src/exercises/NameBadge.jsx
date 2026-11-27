import { useState } from 'react'

const COLORS = { Forest: '#2f5d50', Navy: '#26345f', Clay: '#8a3b2a' }

// F10 (bonus): when you don't need an effect. The full name and the
// initials come from two values that are already in state, so they are
// worked out during render. An effect plus extra state would only add
// a second render.
function NameBadge() {
  const [first, setFirst] = useState('Asilbek')
  const [last, setLast] = useState('')
  const [color, setColor] = useState('Forest')

  const fullName = [first.trim(), last.trim()].filter(Boolean).join(' ')
  const initials = fullName.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')

  return (
    <div className="stack">
      <div className="row">
        <label className="grow small muted">First name
          <input className="input" value={first} onChange={(e) => setFirst(e.target.value)} />
        </label>
        <label className="grow small muted">Last name
          <input className="input" value={last} onChange={(e) => setLast(e.target.value)} />
        </label>
        <label className="small muted">Color
          <select className="input" value={color} onChange={(e) => setColor(e.target.value)}>
            {Object.keys(COLORS).map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
      </div>
      <output className="row" style={{ background: COLORS[color], color: '#fff', padding: 14, borderRadius: 12 }}>
        <strong style={{ fontSize: '1.4rem' }}>{initials || '?'}</strong>
        <span>{fullName || 'Your name'}</span>
      </output>
    </div>
  )
}

export default NameBadge
