import { useState } from 'react'

const MAX = 200

// Study guide · Exercise 1: a live character counter.
// The textarea is controlled, so the count is just bio.length.
// The task says to "disable" the field at the limit, but a disabled
// textarea cannot be edited at all, so you could never delete text.
// Instead, slice() stops new text at 200 and the field stays usable.
function BioCounter() {
  const [bio, setBio] = useState('')
  const left = MAX - bio.length

  return (
    <div className="field">
      <label htmlFor="bio-field">Your bio</label>
      <textarea id="bio-field" className="input" rows="4" value={bio} aria-describedby="bio-field-count"
        onChange={(e) => setBio(e.target.value.slice(0, MAX))} placeholder="I study web programming at Gachon…" />
      <p id="bio-field-count" className={left < 20 ? 'counter over' : 'counter'} aria-live="polite">
        {bio.length} / {MAX}{left === 0 && ' · limit reached'}
      </p>
      <button type="button" className="btn btn-small" onClick={() => setBio('')} disabled={!bio}>Clear</button>
    </div>
  )
}

export default BioCounter
