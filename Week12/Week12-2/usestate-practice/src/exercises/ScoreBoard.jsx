import { useState } from 'react'

// M5: lifting state up. PlayerScore has no state of its own;
// ScoreBoard owns both scores, so it can also show the total and the leader.
function PlayerScore({ name, score, onScore }) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h3>{name}</h3>
      <p className="big-number">{score}</p>
      <div className="row" style={{ justifyContent: 'center' }}>
        <button type="button" className="btn btn-small" onClick={() => onScore(-1)} disabled={score === 0}>−1</button>
        <button type="button" className="btn btn-accent btn-small" onClick={() => onScore(1)}>+1</button>
      </div>
    </div>
  )
}

function ScoreBoard() {
  const [scores, setScores] = useState({ blue: 0, red: 0 })

  function addPoint(team, delta) {
    setScores((prev) => ({ ...prev, [team]: Math.max(0, prev[team] + delta) }))
  }

  const total = scores.blue + scores.red
  const leader =
    scores.blue === scores.red ? 'Tied' : scores.blue > scores.red ? 'Team Blue leads' : 'Team Red leads'

  return (
    <div className="stack">
      <div className="grid-cards">
        <PlayerScore name="Team Blue" score={scores.blue} onScore={(d) => addPoint('blue', d)} />
        <PlayerScore name="Team Red" score={scores.red} onScore={(d) => addPoint('red', d)} />
      </div>
      <p className="card row" style={{ justifyContent: 'space-between' }}>
        <span>Total points: <strong>{total}</strong></span>
        <span>{leader}</span>
        <button type="button" className="btn btn-small" onClick={() => setScores({ blue: 0, red: 0 })}>Reset</button>
      </p>
    </div>
  )
}

export default ScoreBoard
