import { useEffect, useState } from 'react'

// F4: a stopwatch. The interval is created inside the effect only while
// running, and the cleanup clears it, so there is never more than one.
function format(ms) {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const tenths = Math.floor((ms % 1000) / 100)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`
}

function Stopwatch() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setElapsed((e) => e + 100) // updater form, so it never reads a stale value
    }, 100)
    return () => clearInterval(id)
  }, [running])

  return (
    <div className="stack" style={{ justifyItems: 'start' }}>
      <p className="big-number" aria-live="off">{format(elapsed)}</p>
      <div className="row">
        <button type="button" className="btn btn-accent" onClick={() => setRunning(true)} disabled={running}>Start</button>
        <button type="button" className="btn" onClick={() => setRunning(false)} disabled={!running}>Stop</button>
        <button type="button" className="btn" onClick={() => { setRunning(false); setElapsed(0) }}
          disabled={elapsed === 0 && !running}>Reset</button>
      </div>
    </div>
  )
}

export default Stopwatch
