import { useEffect, useState } from 'react'

// F4: a stopwatch with laps. The interval is created inside the effect only
// while running, and the cleanup clears it, so there is never more than one.
// The time comes from Date.now() instead of adding 100 ms per tick, so it
// stays accurate even if the browser delays a tick.
// Each lap stores the total time; its split is the gap to the lap before.
function format(ms) {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const tenths = Math.floor((ms % 1000) / 100)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`
}

function Stopwatch() {
  const [saved, setSaved] = useState(0)        // time from earlier runs
  const [startedAt, setStartedAt] = useState(null) // null = stopped
  const [now, setNow] = useState(0)
  const [laps, setLaps] = useState([])         // total time at each lap

  const running = startedAt !== null
  const elapsed = saved + (running ? now - startedAt : 0)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setNow(Date.now()), 50)
    return () => clearInterval(id)
  }, [running])

  function start() {
    const t = Date.now()
    setNow(t)
    setStartedAt(t)
  }

  function stop() {
    setSaved(saved + Date.now() - startedAt)
    setStartedAt(null)
  }

  function lap() {
    setLaps([...laps, saved + Date.now() - startedAt])
  }

  function reset() {
    setStartedAt(null)
    setSaved(0)
    setLaps([])
  }

  const splits = laps.map((total, i) => total - (laps[i - 1] ?? 0))
  const fastest = splits.length > 1 ? Math.min(...splits) : null

  return (
    <div className="stack" style={{ justifyItems: 'start' }}>
      <p className="big-number" role="timer" aria-live="off">{format(elapsed)}</p>
      <div className="row">
        <button type="button" className="btn btn-accent" onClick={start} disabled={running}>Start</button>
        <button type="button" className="btn" onClick={stop} disabled={!running}>Stop</button>
        <button type="button" className="btn" onClick={lap} disabled={!running}>Lap</button>
        <button type="button" className="btn" onClick={reset} disabled={elapsed === 0 && !running}>Reset</button>
      </div>

      {laps.length > 0 && (
        <ol className="plain-list" style={{ width: '100%' }}>
          {laps.map((total, i) => (
            <li key={i}>
              <span className="grow">Lap {i + 1}{splits[i] === fastest && ' · fastest'}</span>
              <code>+{format(splits[i])}</code>
              <span className="muted small">{format(total)}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default Stopwatch
