import { useEffect, useState } from 'react'

// F9 (bonus): stale replies. Each click stores a new `request` object.
// When it changes, the cleanup clears the old timer, so a slow reply that
// is still waiting can never overwrite the newer, faster one.
// Try it: click "Slow (2 s)" and then quickly click "Fast (0.3 s)".
function StaleReplies() {
  const [request, setRequest] = useState(null)
  const [message, setMessage] = useState('Pick a reply speed.')
  const [cancelled, setCancelled] = useState(0)
  const [waiting, setWaiting] = useState(false)

  useEffect(() => {
    if (!request) return
    const timer = setTimeout(() => {
      setMessage(`${request.label} reply arrived after ${request.delay} ms.`)
      setWaiting(false)
    }, request.delay)
    return () => clearTimeout(timer)
  }, [request])

  function send(label, delay) {
    if (waiting) setCancelled((n) => n + 1)
    setWaiting(true)
    setMessage(`Waiting for the ${label.toLowerCase()} reply…`)
    setRequest({ label, delay })
  }

  return (
    <div className="stack">
      <div className="row">
        <button type="button" className="btn" onClick={() => send('Slow', 2000)}>Slow (2 s)</button>
        <button type="button" className="btn btn-accent" onClick={() => send('Fast', 300)}>Fast (0.3 s)</button>
      </div>
      <p className="notice" role="status">{message}</p>
      <p className="muted small">Old requests cancelled: {cancelled}</p>
    </div>
  )
}

export default StaleReplies
