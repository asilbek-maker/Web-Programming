import { useEffect, useState } from 'react'

// F2: keep document.title in sync with state.
// The effect runs after every change to `name`; the cleanup puts the
// original title back when this component goes away.
function TitleSync() {
  const [name, setName] = useState('')

  useEffect(() => {
    const original = document.title
    document.title = name ? `Hello, ${name}! 👋` : original
    return () => {
      document.title = original
    }
  }, [name])

  return (
    <div className="stack">
      <label htmlFor="title-name" className="muted small">Your name (watch the browser tab title)</label>
      <input id="title-name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Asilbek" />
      <p className="muted small">Tab title now: <code>{name ? `Hello, ${name}! 👋` : '(the page title)'}</code></p>
    </div>
  )
}

export default TitleSync
