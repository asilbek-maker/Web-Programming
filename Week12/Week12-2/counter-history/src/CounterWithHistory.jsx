import { useState } from 'react';

const HISTORY_SIZE = 5;

// Code challenge: Counter with History
// Two state variables: the current count and an array of past counts.
function CounterWithHistory() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);

  // Every change sets the new count and appends it to history,
  // keeping only the last 5 values. A new array each time, never push().
  function change(next) {
    setCount(next);
    setHistory((prev) => [...prev, next].slice(-HISTORY_SIZE));
  }

  // Undo: go back to the previous value in history, then drop the last entry
  function undo() {
    if (history.length < 2) return;
    setCount(history[history.length - 2]);
    setHistory((prev) => prev.slice(0, -1));
  }

  const canUndo = history.length >= 2;

  return (
    <section className="counter" aria-labelledby="counter-title">
      <h2 id="counter-title" className="visually-hidden">Counter</h2>

      <output className="count" aria-live="polite" aria-label={`Count is ${count}`}>
        {count}
      </output>

      <div className="controls">
        <button type="button" className="btn" onClick={() => change(count + 1)}>+1</button>
        <button type="button" className="btn" onClick={() => change(count - 1)}>−1</button>
        <button type="button" className="btn" onClick={() => change(0)}>Reset</button>
        <button type="button" className="btn btn-undo" onClick={undo} disabled={!canUndo}>
          Undo
        </button>
      </div>

      <div className="history">
        <p className="history-label">
          History <span>last {HISTORY_SIZE} values</span>
        </p>
        <p className="history-array">
          <code>[{history.join(', ')}]</code>
        </p>
        <ol className="history-chips" aria-label="History, oldest to newest">
          {history.map((value, i) => (
            <li
              // history can repeat values, so the position in this short list is the key
              key={i}
              className={i === history.length - 1 ? 'chip is-current' : 'chip'}
            >
              {value}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default CounterWithHistory;
