import { useState } from 'react'

// Code challenge (page 29) · A 3-step registration wizard.
// All answers live in ONE form object, so Previous never loses data.
// Errors are not stored: they are worked out from the form on every
// render, so Next is enabled exactly when the current step is valid.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ROLES = ['Student', 'TA', 'Instructor']
const STEPS = ['Personal info', 'Account setup', 'Preferences']

function stepErrors(step, f) {
  const e = {}
  if (step === 1) {
    if (f.name.trim().length < 2) e.name = 'Name needs at least 2 characters.'
    if (!EMAIL.test(f.email)) e.email = 'Enter a valid email address.'
  }
  if (step === 2) {
    if (f.username.length < 3 || /\s/.test(f.username)) e.username = 'At least 3 characters and no spaces.'
    if (f.password.length < 8) e.password = 'Password needs at least 8 characters.'
    if (!f.confirm || f.confirm !== f.password) e.confirm = 'Passwords do not match.'
  }
  return e
}

function MultiStepRegistration() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', username: '', password: '', confirm: '', role: 'Student', newsletter: false,
  })
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(null)

  const errors = stepErrors(step, form)
  const valid = Object.keys(errors).length === 0

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const blur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }))

  function handleSubmit(e) {
    e.preventDefault()
    if (step < 3) {
      if (valid) setStep(step + 1)
      return
    }
    const { confirm: _confirm, ...fullFormObject } = form // the confirm copy is not needed
    console.log(fullFormObject)
    setSent(fullFormObject)
  }

  // Like the target result, the field name sits inside the input as a
  // placeholder; the <label> is still there for screen readers.
  // An error shows after the field is left, or at once for a confirm
  // password that does not match.
  function field(name, label, type = 'text', autoComplete) {
    const early = name === 'confirm' && form.confirm !== ''
    const bad = (touched[name] || early) && errors[name]
    return (
      <div className="field">
        <label htmlFor={`ms-${name}`} className="sr-only">{label}</label>
        <input id={`ms-${name}`} name={name} type={type} className="input" value={form[name]} placeholder={label}
          onChange={handleChange} onBlur={blur} autoComplete={autoComplete}
          aria-invalid={!!bad} aria-describedby={bad ? `ms-${name}-error` : undefined} />
        {bad && <p id={`ms-${name}-error`} className="error-text">{errors[name]}</p>}
      </div>
    )
  }

  if (sent) {
    return (
      <div className="stack wizard">
        <p className="notice ok" role="status">Registered! This is the object passed to console.log:</p>
        <pre className="log">{JSON.stringify({ ...sent, password: '••••••••' }, null, 2)}</pre>
        <button type="button" className="btn btn-dark" onClick={() => { setSent(null); setStep(1) }}>Start again</button>
      </div>
    )
  }

  return (
    <form className="stack wizard" onSubmit={handleSubmit} noValidate aria-labelledby="ms-step">
      <div>
        <h3 id="ms-step">Step {step} of 3 <span className="step-name">· {STEPS[step - 1]}</span></h3>
        <div className="steps" aria-hidden="true">
          {STEPS.map((s, i) => <span key={s} className={i < step ? 'done' : ''} />)}
        </div>
      </div>

      {step === 1 && <>{field('name', 'Name', 'text', 'name')}{field('email', 'Email', 'email', 'email')}</>}

      {step === 2 && (
        <>
          {field('username', 'Username', 'text', 'username')}
          {field('password', 'Password', 'password', 'new-password')}
          {field('confirm', 'Confirm password', 'password', 'new-password')}
        </>
      )}

      {step === 3 && (
        <>
          <fieldset className="field">
            <legend>Role</legend>
            <div className="row">
              {ROLES.map((r) => (
                <label key={r} className="choice">
                  <input type="radio" name="role" value={r} checked={form.role === r} onChange={handleChange} /> {r}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="choice">
            <input type="checkbox" name="newsletter" checked={form.newsletter} onChange={handleChange} /> Subscribe to the newsletter
          </label>
          <dl className="summary" aria-label="Review">
            <dt>Name</dt><dd>{form.name}</dd>
            <dt>Email</dt><dd>{form.email}</dd>
            <dt>Username</dt><dd>{form.username}</dd>
            <dt>Password</dt><dd>{'•'.repeat(form.password.length)}</dd>
            <dt>Role</dt><dd>{form.role}</dd>
            <dt>Newsletter</dt><dd>{form.newsletter ? 'Yes' : 'No'}</dd>
          </dl>
        </>
      )}

      <div className="row">
        <button type="button" className="btn btn-dark grow" onClick={() => setStep(step - 1)} disabled={step === 1}>Previous</button>
        <button type="submit" className="btn btn-next grow" disabled={!valid}>{step < 3 ? 'Next' : 'Submit'}</button>
      </div>
    </form>
  )
}

export default MultiStepRegistration
