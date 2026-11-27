import { useState } from 'react'

// M3 · Study guide 1: show and hide a paragraph with boolean state.
function ToggleDetails() {
  const [open, setOpen] = useState(false)

  return (
    <div className="stack">
      <button type="button" className="btn btn-accent" aria-expanded={open} aria-controls="details-text"
        onClick={() => setOpen((prev) => !prev)}>
        {open ? 'Hide details' : 'Show details'}
      </button>
      {open && (
        <p id="details-text" className="card">
          State lets React update the page without a reload. When <code>open</code> changes,
          React renders the component again and this paragraph appears or disappears.
        </p>
      )}
    </div>
  )
}

export default ToggleDetails
