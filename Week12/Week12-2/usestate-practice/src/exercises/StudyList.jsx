import { useState } from 'react'

// M4: add and remove list items.
// Add with spread (a new array), remove with filter (also a new array).
function StudyList() {
  const [items, setItems] = useState([
    { id: 1, text: 'Re-read the useState slides' },
    { id: 2, text: 'Finish the shopping cart homework' },
  ])
  const [text, setText] = useState('')

  function add(e) {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    setItems([...items, { id: Date.now(), text: value }])
    setText('')
  }

  function remove(id) {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="stack">
      <form className="row" onSubmit={add}>
        <label htmlFor="study-item" className="muted small">New item</label>
        <input id="study-item" className="input" style={{ flex: 1 }} value={text}
          onChange={(e) => setText(e.target.value)} placeholder="e.g. Practise useEffect" />
        <button type="submit" className="btn btn-accent">Add</button>
      </form>
      {items.length === 0 ? (
        <p className="muted">Nothing on the list. Add something above.</p>
      ) : (
        <ul className="plain-list">
          {items.map((item) => (
            <li key={item.id}>
              <span className="grow">{item.text}</span>
              <button type="button" className="btn btn-small" onClick={() => remove(item.id)}
                aria-label={`Remove ${item.text}`}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default StudyList
