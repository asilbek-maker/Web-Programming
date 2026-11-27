import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './demo.css'
import { all } from './exercises.js'
import ProfileEditor from './homework/ProfileEditor.jsx'
import MultiStepRegistration from './homework/MultiStepRegistration.jsx'
import BioCounter from './study/BioCounter.jsx'
import ContactForm from './study/ContactForm.jsx'
import SkillPicker from './study/SkillPicker.jsx'
import FeedbackForm from './video/FeedbackForm.jsx'

const components = {
  'profile-editor': ProfileEditor,
  wizard: MultiStepRegistration,
  'bio-counter': BioCounter,
  'contact-form': ContactForm,
  'skill-picker': SkillPicker,
  'feedback-form': FeedbackForm,
}

// practice/?demo=wizard shows one exercise (that is what each iframe loads).
// practice/ with no demo shows all of them, which is handy with `npm run dev`.
const slug = new URLSearchParams(location.search).get('demo')
const list = all.filter((e) => !slug || e.slug === slug)

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
