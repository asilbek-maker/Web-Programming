import { useState } from 'react'

// M5 · Study guide 3: lifting state up.
// Both scores live in the parent, so it can show the total and the leader.
// Each PlayerScore only gets its value and two callbacks as props.
function PlayerScore({ name, score, onAdd, onSubtract }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p className="big">{score}</p>
      <div className="row">
        <button type="button" className="btn" aria-label={`Subtract one from ${name}`} onClick={onSubtract}>−</button>
        <button type="button" className="btn btn-accent" aria-label={`Add one to ${name}`} onClick={onAdd}>+</button>
      </div>
    </div>
  )
}

function ScoreBoard() {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const leader = left === right ? 'It is a tie' : left > right ? 'Player A leads' : 'Player B leads'

  return (
    <div className="stack">
      <div className="two-up">
        <PlayerScore name="Player A" score={left} onAdd={() => setLeft((s) => s + 1)} onSubtract={() => setLeft((s) => s - 1)} />
        <PlayerScore name="Player B" score={right} onAdd={() => setRight((s) => s + 1)} onSubtract={() => setRight((s) => s - 1)} />
      </div>
      <p className="total" aria-live="polite">Total <strong>{left + right}</strong> · {leader}</p>
    </div>
  )
}

export default ScoreBoard
