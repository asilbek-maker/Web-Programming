import { useEffect, useState } from 'react'

// F5 · Study guide 3: a stopwatch with Start, Stop and Reset.
// The interval only exists while `running` is true. The cleanup clears it,
// so pressing Start twice can never create two intervals.
function format(tenths) {
  const minutes = Math.floor(tenths / 600)
  const seconds = Math.floor(tenths / 10) % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths % 10}`
}

function Stopwatch() {
  const [tenths, setTenths] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setTenths((t) => t + 1), 100) // updater form: never a stale value
    return () => clearInterval(id)
  }, [running])

  return (
    <div className="stack">
      <p className="big" role="timer">{format(tenths)}</p>
      <div className="row">
        <button type="button" className="btn btn-accent" onClick={() => setRunning(true)} disabled={running}>Start</button>
        <button type="button" className="btn" onClick={() => setRunning(false)} disabled={!running}>Stop</button>
        <button type="button" className="btn" onClick={() => { setRunning(false); setTenths(0) }}
          disabled={!running && tenths === 0}>Reset</button>
      </div>
    </div>
  )
}

export default Stopwatch
