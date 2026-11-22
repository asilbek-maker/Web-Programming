import { useState } from 'react'

// M3: show / hide with a boolean in state.
function ToggleDetails() {
  const [open, setOpen] = useState(false)

  return (
    <div className="stack">
      <div className="row">
        <button type="button" className="btn btn-accent" aria-expanded={open} aria-controls="course-details"
          onClick={() => setOpen((o) => !o)}>
          {open ? 'Hide details' : 'Show details'}
        </button>
      </div>
      {open && (
        <div className="card" id="course-details">
          <h3>Web Programming</h3>
          <p>Weeks 11–12 cover React components, props, <code>useState</code> and <code>useEffect</code>.</p>
          <p className="muted small">The button&apos;s aria-expanded tells screen readers whether this panel is open.</p>
        </div>
      )}
    </div>
  )
}

export default ToggleDetails
