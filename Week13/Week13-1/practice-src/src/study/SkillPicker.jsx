import { useState } from 'react'

const SKILLS = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python']
const MAX = 3

// Study guide · Exercise 3: a skills checklist with a counter.
// Many checkboxes share one array in state: checking adds with spread,
// unchecking removes with filter. Each box uses `checked`, not `value`.
function SkillPicker() {
  const [selected, setSelected] = useState([])

  function toggle(skill, checked) {
    setSelected((prev) => (checked ? [...prev, skill] : prev.filter((s) => s !== skill)))
  }

  return (
    <fieldset className="stack">
      <legend className="label">Pick your top skills</legend>
      <div className="check-grid">
        {SKILLS.map((skill) => (
          <label key={skill} className="choice box">
            <input type="checkbox" checked={selected.includes(skill)} onChange={(e) => toggle(skill, e.target.checked)} />
            {skill}
          </label>
        ))}
      </div>
      <p aria-live="polite">Selected: <strong>{selected.length} / {MAX}</strong>{selected.length > 0 && ` · ${selected.join(', ')}`}</p>
      {selected.length > MAX && <p className="notice error" role="alert">Please select at most {MAX} skills.</p>}
    </fieldset>
  )
}

export default SkillPicker
