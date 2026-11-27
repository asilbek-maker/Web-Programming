import { useEffect, useState } from 'react'

// F3 · Study guide 1: keep document.title in sync with state.
// The effect runs after every change to `name`. The cleanup puts the old
// title back before the next run, and when the component goes away.
function TitleSync() {
  const [name, setName] = useState('')

  useEffect(() => {
    const before = document.title
    if (name.trim()) document.title = `Hello, ${name.trim()}!`
    return () => {
      document.title = before
    }
  }, [name])

  // Inside the iframe, the tab title is the iframe's own document title,
  // so this preview shows it too.
  return (
    <div className="stack">
      <label htmlFor="title-name" className="muted">Your name</label>
      <input id="title-name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Asilbek" />
      <p className="card">document.title = <code>{name.trim() ? `"Hello, ${name.trim()}!"` : '(unchanged)'}</code></p>
    </div>
  )
}

export default TitleSync
