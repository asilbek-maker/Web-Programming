import { useState } from 'react'

// M6: live word count. Only the text is state; the counts are
// derived from it on every render, so they can never be out of date.
function WordCount() {
  const [text, setText] = useState('')

  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const characters = text.length
  const readingSeconds = Math.ceil((words / 200) * 60)

  return (
    <div className="stack">
      <label htmlFor="word-text" className="muted small">Write something</label>
      <textarea id="word-text" className="textarea" value={text} onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text here…" />
      <ul className="chips" aria-live="polite">
        <li>{words} {words === 1 ? 'word' : 'words'}</li>
        <li>{characters} characters</li>
        <li>~{readingSeconds}s to read</li>
      </ul>
    </div>
  )
}

export default WordCount
