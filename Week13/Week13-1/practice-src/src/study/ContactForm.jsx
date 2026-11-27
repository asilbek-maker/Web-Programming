import { useState } from 'react'

// Study guide · Exercise 2: a contact form with validation.
// One handler for all three fields. On submit, the errors object is
// built; if it has keys, they are shown next to the fields. If not, the
// form shows a thank-you message and resets.
const EMPTY = { name: '', email: '', message: '' }
const FIELDS = [
  { name: 'name', label: 'Name' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'message', label: 'Message' },
]

function ContactForm() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [thanked, setThanked] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' })) // clear that field's error while typing
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.'
    if (!form.message.trim()) errs.message = 'Message is required.'
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setThanked(form.name.trim())
    setForm(EMPTY) // reset the form
  }

  if (thanked) {
    return (
      <div className="stack">
        <p className="notice ok" role="status">Thank you, {thanked}! I will be in touch.</p>
        <button type="button" className="btn" onClick={() => setThanked('')}>Send another message</button>
      </div>
    )
  }

  return (
    <form className="stack" onSubmit={handleSubmit} noValidate>
      {FIELDS.map(({ name, label, type = 'text' }) => {
        const Tag = name === 'message' ? 'textarea' : 'input'
        return (
          <div className="field" key={name}>
            <label htmlFor={`cf-${name}`}>{label}</label>
            <Tag id={`cf-${name}`} name={name} type={Tag === 'input' ? type : undefined} rows={Tag === 'textarea' ? 3 : undefined}
              className="input" value={form[name]} onChange={handleChange}
              aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `cf-${name}-error` : undefined} />
            {errors[name] && <p id={`cf-${name}-error`} className="error-text">{errors[name]}</p>}
          </div>
        )
      })}
      <button type="submit" className="btn btn-accent">Send</button>
    </form>
  )
}

export default ContactForm
