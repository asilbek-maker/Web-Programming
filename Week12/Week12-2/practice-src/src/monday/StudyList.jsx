import { useState } from 'react'

// M4 · Study guide 2: add and remove list items.
// The array is never changed in place: spread adds, filter removes.
function StudyList() {
  const [items, setItems] = useState([
    { id: 1, text: 'Read the useState slides' },
    { id: 2, text: 'Finish the shopping cart' },
  ])
  const [text, setText] = useState('')

  function add(e) {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    setItems((prev) => [...prev, { id: Date.now(), text: value }])
    setText('')
  }

  function remove(id) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="stack">
      <form className="row" onSubmit={add}>
        <label htmlFor="study-item" className="sr-only">New item</label>
        <input id="study-item" className="input grow" value={text}
          onChange={(e) => setText(e.target.value)} placeholder="Something to study" />
        <button type="submit" className="btn btn-accent" disabled={!text.trim()}>Add</button>
      </form>
      {items.length === 0 ? (
        <p className="muted">Nothing left. Add an item above.</p>
      ) : (
        <ul className="list">
          {items.map((item) => (
            <li key={item.id}>
              <span className="grow">{item.text}</span>
              <button type="button" className="btn btn-small" aria-label={`Remove ${item.text}`}
                onClick={() => remove(item.id)}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default StudyList
