import { useEffect, useState } from 'react'

const LIMIT = 100

// F6 · Practice from the last slide: an effect copies the text length
// into state, as the slide asks.
// Note: `text.length` in render (like M6) is simpler and skips a render.
// The effect version is here to practise the dependency array.
function CharCount() {
  const [text, setText] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(text.length)
  }, [text])

  const left = LIMIT - count

  return (
    <div className="stack">
      <label htmlFor="char-text" className="muted">Short message (max {LIMIT})</label>
      <textarea id="char-text" className="input" rows="3" maxLength={LIMIT} value={text}
        onChange={(e) => setText(e.target.value)} placeholder="Type here…" />
      <p className={left <= 15 ? 'notice warn' : 'notice'} aria-live="polite">{count} / {LIMIT} · {left} left</p>
    </div>
  )
}

export default CharCount
