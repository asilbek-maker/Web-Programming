import Exercise from './Exercise.jsx'
import GitHubUser from './exercises/GitHubUser.jsx'
import TitleSync from './exercises/TitleSync.jsx'
import FetchUser from './exercises/FetchUser.jsx'
import Stopwatch from './exercises/Stopwatch.jsx'
import CharCount from './exercises/CharCount.jsx'

const exercises = [
  { id: 'F1', anchor: 'github-user', title: 'GitHub user lookup', file: 'GitHubUser.jsx',
    goal: 'Code challenge: fetch a profile when the username changes; handle loading, 404, rate limit and network errors. Bonus: abort the previous request in cleanup.', Demo: GitHubUser },
  { id: 'F2', anchor: 'title-sync', title: 'Page title sync', file: 'TitleSync.jsx',
    goal: 'Study guide 1: update document.title as you type; restore it in cleanup.', Demo: TitleSync },
  { id: 'F3', anchor: 'fetch-user', title: 'Fetch a user on mount', file: 'FetchUser.jsx',
    goal: 'Study guide 2: fetch once with an empty dependency array, with loading and error states.', Demo: FetchUser },
  { id: 'F4', anchor: 'stopwatch', title: 'Stopwatch', file: 'Stopwatch.jsx',
    goal: 'Study guide 3: Start, Stop, Reset; setInterval inside the effect, cleared in cleanup.', Demo: Stopwatch },
  { id: 'F5', anchor: 'char-count', title: 'Live character count', file: 'CharCount.jsx',
    goal: 'End-of-slides practice: copy the text length into state with an effect.', Demo: CharCount },
]

function App() {
  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Week 12 · Friday practice · 202438394</p>
        <h1>Side effects with useEffect</h1>
        <p>Five exercises from the Friday class and the study guide: fetching data, syncing with the browser, timers and cleanup.</p>
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
        <a href="https://github.com/asilbek-maker/Web-Programming/tree/main/Week12/Week12-2/useeffect-practice/src">Source on GitHub</a>
      </footer>
    </main>
  )
}

export default App
