import { useState } from 'react'

// Video lecture (page 13) · Course feedback form.
// Text fields, radio buttons (one string), checkboxes (an array) and a
// textarea with a live count, all controlled. Bonus: Submit stays
// disabled while any required field is empty.
const RATINGS = ['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐']
const TOPICS = ['HTML', 'CSS', 'JavaScript', 'Git', 'React']
const MAX = 300

function FeedbackForm() {
  const [form, setForm] = useState({ name: '', studentId: '', rating: '', comments: '' })
  const [topics, setTopics] = useState([])
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: name === 'comments' ? value.slice(0, MAX) : value }))
  }

  function toggleTopic(topic) {
    setTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!/^\d{8}$/.test(form.studentId)) errs.studentId = 'Student ID must be 8 digits.'
    if (!form.rating) errs.rating = 'Pick a rating.'
    setErrors(errs)
    if (Object.keys(errs).length === 0) setDone(true)
  }

  // Bonus: required fields that are still empty
  const missing = !form.name.trim() || !form.studentId || !form.rating

  if (done) {
    return (
      <div className="stack">
        <p className="notice ok" role="status">Thank you, {form.name.trim()}! Your feedback ({form.rating}) was received.</p>
        <button type="button" className="btn" onClick={() => setDone(false)}>Edit feedback</button>
      </div>
    )
  }

  return (
    <form className="stack" onSubmit={handleSubmit} noValidate>
      <div className="two-up">
        <div className="field">
          <label htmlFor="fb-name">Student name *</label>
          <input id="fb-name" name="name" className="input" value={form.name} onChange={handleChange}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? 'fb-name-error' : undefined} />
          {errors.name && <p id="fb-name-error" className="error-text">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="fb-id">Student ID (8 digits) *</label>
          <input id="fb-id" name="studentId" className="input" inputMode="numeric" value={form.studentId} onChange={handleChange}
            aria-invalid={!!errors.studentId} aria-describedby={errors.studentId ? 'fb-id-error' : undefined} />
          {errors.studentId && <p id="fb-id-error" className="error-text">{errors.studentId}</p>}
        </div>
      </div>

      <fieldset className="field">
        <legend>Rating *</legend>
        <div className="row">
          {RATINGS.map((r, i) => (
            <label key={r} className="choice">
              <input type="radio" name="rating" value={r} checked={form.rating === r} onChange={handleChange} />
              <span role="img" aria-label={`${5 - i} stars`}>{r}</span>
            </label>
          ))}
        </div>
        {errors.rating && <p className="error-text">{errors.rating}</p>}
      </fieldset>

      <fieldset className="field">
        <legend>Topics covered well</legend>
        <div className="row">
          {TOPICS.map((t) => (
            <label key={t} className="choice">
              <input type="checkbox" checked={topics.includes(t)} onChange={() => toggleTopic(t)} /> {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="fb-comments">Comments</label>
        <textarea id="fb-comments" name="comments" className="input" rows="3" value={form.comments} onChange={handleChange}
          aria-describedby="fb-count" />
        <p id="fb-count" className="counter">{form.comments.length} / {MAX}</p>
      </div>

      <button type="submit" className="btn btn-accent" disabled={missing}>Send feedback</button>
    </form>
  )
}

export default FeedbackForm
