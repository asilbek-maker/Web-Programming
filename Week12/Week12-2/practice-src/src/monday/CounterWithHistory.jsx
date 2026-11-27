import { useState } from 'react'

// M1 · Monday code challenge: a counter with history.
// Two state variables that change together: the count, and the last 5 values.
function CounterWithHistory() {
  const [count, setCount] = useState(0)
  const [history, setHistory] = useState([0])

  function change(next) {
    setCount(next)
    setHistory((prev) => [...prev, next].slice(-5)) // a new array, never push
  }

  function undo() {
    if (history.length < 2) return
    setCount(history[history.length - 2])
    setHistory((prev) => prev.slice(0, -1))
  }

  return (
    <div className="stack">
      <p className="big" aria-live="polite">{count}</p>
      <div className="row">
        <button type="button" className="btn" onClick={() => change(count - 1)}>−1</button>
        <button type="button" className="btn btn-accent" onClick={() => change(count + 1)}>+1</button>
        <button type="button" className="btn" onClick={() => change(0)}>Reset</button>
        <button type="button" className="btn" onClick={undo} disabled={history.length < 2}>Undo</button>
      </div>
      <p className="muted">History: [{history.join(', ')}]</p>
    </div>
  )
}

export default CounterWithHistory
