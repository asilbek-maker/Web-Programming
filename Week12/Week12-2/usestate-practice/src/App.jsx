import Exercise from './Exercise.jsx'
import CafeOrder from './exercises/CafeOrder.jsx'
import ToggleDetails from './exercises/ToggleDetails.jsx'
import StudyList from './exercises/StudyList.jsx'
import ScoreBoard from './exercises/ScoreBoard.jsx'
import WordCount from './exercises/WordCount.jsx'

// M1 is its own project (counter-history), so this page links to it.
function CounterLink() {
  return (
    <div className="stack">
      <p>
        The counter with history is a separate Vite project: two pieces of state (<code>count</code> and{' '}
        <code>history</code>), the last five values, and an Undo button that is disabled when there is nothing to undo.
      </p>
      <div className="row">
        <a className="btn btn-accent" href="../counter/">Open the counter ↗</a>
        <a className="btn" href="../index.html">Back to the overview</a>
      </div>
    </div>
  )
}

const exercises = [
  { id: 'M1', anchor: 'counter-history', title: 'Counter with history', file: "counter-history/CounterWithHistory.jsx",
    goal: 'Code challenge: +1, −1, Reset, the last 5 values, and Undo.', Demo: CounterLink },
  { id: 'M2', anchor: 'cart-counter', title: 'Café order counter', file: 'CafeOrder.jsx',
    goal: 'Video lecture challenge: three items with − and +, never below 0, quantities in one object, total computed in render.', Demo: CafeOrder },
  { id: 'M3', anchor: 'toggle', title: 'Toggle visibility', file: 'ToggleDetails.jsx',
    goal: 'Study guide 1: a boolean in state shows and hides a panel.', Demo: ToggleDetails },
  { id: 'M4', anchor: 'list', title: 'Add and remove list items', file: 'StudyList.jsx',
    goal: 'Study guide 2: add with spread, remove with filter.', Demo: StudyList },
  { id: 'M5', anchor: 'lift-state', title: 'Lifting state up', file: 'ScoreBoard.jsx',
    goal: 'Study guide 3: a parent owns the scores of two child counters and shows the total.', Demo: ScoreBoard },
  { id: 'M6', anchor: 'word-count', title: 'Live word count', file: 'WordCount.jsx',
    goal: 'End-of-slides practice: derive the count from the text instead of storing it.', Demo: WordCount },
]

function App() {
  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Week 12 · Monday practice · 202438394</p>
        <h1>State with useState</h1>
        <p>Six exercises from the Monday class, the video lecture and the study guide. Every demo below is the real component running.</p>
        <nav aria-label="Exercises">
          <ul className="toc">
            {exercises.map((e) => (
              <li key={e.id}><a href={`#${e.anchor}`}>{e.id} {e.title}</a></li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="exercise-list">
        {exercises.map(({ Demo, ...e }) => (
          <Exercise key={e.id} {...e}>
            <Demo />
          </Exercise>
        ))}
      </div>

      <footer className="page-footer">
        <a href="../index.html">← Back to Week 12-2</a> ·{' '}
        <a href="https://github.com/asilbek-maker/Web-Programming/tree/main/Week12/Week12-2/usestate-practice/src">Source on GitHub</a>
      </footer>
    </main>
  )
}

export default App
