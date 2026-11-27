import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './demo.css'
import { monday, friday } from './exercises.js'
import CounterWithHistory from './monday/CounterWithHistory.jsx'
import CafeOrder from './monday/CafeOrder.jsx'
import ToggleDetails from './monday/ToggleDetails.jsx'
import StudyList from './monday/StudyList.jsx'
import ScoreBoard from './monday/ScoreBoard.jsx'
import WordCount from './monday/WordCount.jsx'
import GitHubUser from './friday/GitHubUser.jsx'
import DebouncedSearch from './friday/DebouncedSearch.jsx'
import TitleSync from './friday/TitleSync.jsx'
import FetchUser from './friday/FetchUser.jsx'
import Stopwatch from './friday/Stopwatch.jsx'
import CharCount from './friday/CharCount.jsx'

const components = {
  'counter-history': CounterWithHistory,
  'cafe-order': CafeOrder,
  toggle: ToggleDetails,
  'study-list': StudyList,
  scoreboard: ScoreBoard,
  'word-count': WordCount,
  'github-user': GitHubUser,
  'debounced-search': DebouncedSearch,
  'title-sync': TitleSync,
  'fetch-user': FetchUser,
  stopwatch: Stopwatch,
  'char-count': CharCount,
}

// practice/?demo=stopwatch shows one exercise (that is what each iframe loads).
// practice/ with no demo shows all of them, which is handy with `npm run dev`.
const slug = new URLSearchParams(location.search).get('demo')
const list = [...monday, ...friday].filter((e) => !slug || e.slug === slug)

function App() {
  if (list.length === 0) return <p className="notice error">Unknown demo “{slug}”.</p>
  return list.map(({ id, slug: s, title }) => {
    const Demo = components[s]
    return (
      <section key={s} className={slug ? 'demo' : 'demo demo-all'} aria-label={`${id} ${title}`}>
        {!slug && <h2>{id} · {title}</h2>}
        <Demo />
      </section>
    )
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Tell the parent page how tall the demo is, so the iframe fits it with
// no inner scrollbar. Only same-origin parents listen (see index.html).
if (slug && window.parent !== window) {
  const report = () =>
    window.parent.postMessage({ type: 'demo-height', demo: slug, height: document.documentElement.scrollHeight }, location.origin)
  new ResizeObserver(report).observe(document.body)
}
