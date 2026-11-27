import { useState } from 'react'

// M6 · Practice from the last slide: a live word counter.
// Only the text is state. Words, characters and reading time are derived
// from it during render, so they can never get out of sync.
function WordCount() {
  const [text, setText] = useState('')

  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const minutes = Math.max(1, Math.ceil(words / 200))

  return (
    <div className="stack">
      <label htmlFor="word-text" className="muted">Write a few sentences</label>
      <textarea id="word-text" className="input" rows="4" value={text}
        onChange={(e) => setText(e.target.value)} placeholder="Today I learned about useState…" />
      <ul className="chips" aria-live="polite">
        <li>{words} words</li>
        <li>{text.length} characters</li>
        <li>{words ? `about ${minutes} min read` : 'nothing to read yet'}</li>
      </ul>
    </div>
  )
}

export default WordCount
