import { useEffect, useState } from 'react'

const LIMIT = 140

// F5: end-of-slides practice, done the way the slide asked: an effect
// copies the text length into its own state.
// Note: this is only for practice. `text.length` during render would be
// simpler and avoids an extra render; see the useState word count (M6).
function CharCount() {
  const [text, setText] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(text.length)
  }, [text])

  const left = LIMIT - count

  return (
    <div className="stack">
      <label htmlFor="char-text" className="muted small">Short post (max {LIMIT} characters)</label>
      <textarea id="char-text" className="textarea" maxLength={LIMIT} value={text}
        onChange={(e) => setText(e.target.value)} placeholder="What are you learning today?" />
      <p className={left <= 20 ? 'notice warn' : 'notice'} aria-live="polite">
        {count} / {LIMIT} characters · {left} left
      </p>
    </div>
  )
}

export default CharCount
