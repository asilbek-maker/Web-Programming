import { useEffect, useState } from 'react'

// F6: tab-title reminders. The unread count is shown in the browser tab,
// like "(3) Study list". The effect depends on the finished title string,
// so it only runs when the title really changes. The cleanup puts the
// previous title back.
function TabReminders() {
  const [count, setCount] = useState(0)
  const [space, setSpace] = useState('Study list')

  const name = space.trim() || 'Study list'
  const title = count > 0 ? `(${count}) ${name}` : name

  useEffect(() => {
    const previous = document.title
    document.title = title
    return () => {
      document.title = previous
    }
  }, [title])

  return (
    <div className="stack">
      <label htmlFor="tab-space" className="muted small">Workspace name</label>
      <input id="tab-space" className="input" value={space} onChange={(e) => setSpace(e.target.value)} />

      <div className="card">
        <p className="muted small">Browser tab preview</p>
        <p><code>{title}</code></p>
        <p className="muted small" role="status">{count > 0 ? `${count} unread reminder${count === 1 ? '' : 's'}` : 'Inbox clear'}</p>
      </div>

      <div className="row">
        <button type="button" className="btn btn-accent" onClick={() => setCount((n) => n + 1)}>Add reminder</button>
        <button type="button" className="btn" onClick={() => setCount(0)} disabled={count === 0}>Clear all</button>
      </div>
    </div>
  )
}

export default TabReminders
