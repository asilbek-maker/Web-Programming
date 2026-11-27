import Exercise from './Exercise.jsx'
import GitHubUser from './exercises/GitHubUser.jsx'
import TitleSync from './exercises/TitleSync.jsx'
import FetchUser from './exercises/FetchUser.jsx'
import Stopwatch from './exercises/Stopwatch.jsx'
import CharCount from './exercises/CharCount.jsx'
import TabReminders from './exercises/TabReminders.jsx'
import PeopleDirectory from './exercises/PeopleDirectory.jsx'
import WindowWidth from './exercises/WindowWidth.jsx'
import StaleReplies from './exercises/StaleReplies.jsx'
import NameBadge from './exercises/NameBadge.jsx'

const exercises = [
  { id: 'F1', anchor: 'github-user', title: 'GitHub user lookup', file: 'GitHubUser.jsx',
    goal: 'Code challenge: fetch a profile when the username changes; handle loading, 404, rate limit and network errors. Bonus: abort the previous request in cleanup. Friday lab: also list recent repositories, sorted by update or stars and filtered by language.', Demo: GitHubUser },
  { id: 'F2', anchor: 'title-sync', title: 'Page title sync', file: 'TitleSync.jsx',
    goal: 'Study guide 1: update document.title as you type; restore it in cleanup.', Demo: TitleSync },
  { id: 'F3', anchor: 'fetch-user', title: 'Fetch a user on mount', file: 'FetchUser.jsx',
    goal: 'Study guide 2: fetch once with an empty dependency array, with loading and error states.', Demo: FetchUser },
  { id: 'F4', anchor: 'stopwatch', title: 'Stopwatch and laps', file: 'Stopwatch.jsx',
    goal: 'Study guide 3: Start, Stop, Reset; setInterval inside the effect, cleared in cleanup. Friday lab: Lap records splits and marks the fastest one.', Demo: Stopwatch },
  { id: 'F5', anchor: 'char-count', title: 'Live character count', file: 'CharCount.jsx',
    goal: 'End-of-slides practice: copy the text length into state with an effect.', Demo: CharCount },
  { id: 'F6', anchor: 'tab-reminders', title: 'Tab-title reminders', file: 'TabReminders.jsx',
    goal: 'Friday lab E1: show the unread reminder count in the browser tab; the cleanup restores the old title.', Demo: TabReminders },
  { id: 'F7', anchor: 'people-directory', title: 'People directory', file: 'PeopleDirectory.jsx',
    goal: 'Friday lab E2: fetch a user whenever the ID changes; handle loading, a missing user, Retry and an 8-second timeout; abort in cleanup.', Demo: PeopleDirectory },
  { id: 'F8', anchor: 'window-width', title: 'Window width listener', file: 'WindowWidth.jsx',
    goal: 'Bonus: add a resize listener in the effect and remove it in cleanup.', Demo: WindowWidth },
  { id: 'F9', anchor: 'stale-replies', title: 'Stale replies', file: 'StaleReplies.jsx',
    goal: 'Bonus: when a newer request starts, the cleanup cancels the old one, so a slow reply cannot overwrite a fast one.', Demo: StaleReplies },
  { id: 'F10', anchor: 'name-badge', title: 'Name badge (no effect)', file: 'NameBadge.jsx',
    goal: 'Bonus: values derived from state are calculated during render, so no effect is needed.', Demo: NameBadge },
]

function App() {
  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Week 12 · Friday practice · 202438394</p>
        <h1>Side effects with useEffect</h1>
        <p>Ten exercises from the Friday class, the study guide and the Friday lab: fetching data, syncing with the browser, timers, event listeners and cleanup.</p>
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
