import { useEffect, useRef, useState } from 'react'

// Homework · Student profile editor.
// Every text field is controlled (value + onChange, one handler for all).
// The photo is a file input, which React cannot control, so it is read
// through a ref. Errors are an object: no keys means the form is valid.
const MAJORS = ['Computer Engineering', 'Software', 'Artificial Intelligence', 'Design']
const BIO_LIMIT = 200
const EMPTY = { name: '', studentId: '', major: '', year: '', bio: '' }

function validate(form, photo) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!/^\d{10}$/.test(form.studentId)) errors.studentId = 'Student ID must be exactly 10 digits.'
  if (!form.major) errors.major = 'Choose a major.'
  if (!form.year) errors.year = 'Choose a year.'
  if (!form.bio.trim()) errors.bio = 'Write a short bio.'
  else if (form.bio.length >= BIO_LIMIT) errors.bio = `Bio must be under ${BIO_LIMIT} characters.`
  if (!photo) errors.photo = 'Choose a profile photo.'
  return errors
}

function ProfileEditor() {
  const [form, setForm] = useState(EMPTY)
  const [skills, setSkills] = useState(['react', 'forms'])
  const [skillText, setSkillText] = useState('')
  const [photo, setPhoto] = useState(null) // { name, url }
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [saved, setSaved] = useState(false)
  const fileRef = useRef(null)

  // The preview URL points at the file in memory; free it when it changes.
  useEffect(() => {
    if (!photo) return
    return () => URL.revokeObjectURL(photo.url)
  }, [photo])

  function handleChange(e) {
    const { name, value } = e.target
    const next = { ...form, [name]: value }
    setForm(next)
    if (touched[name]) setErrors(validate(next, photo)) // keep a shown error up to date
  }

  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }))
    setErrors(validate(form, photo))
  }

  function choosePhoto() {
    const file = fileRef.current.files[0]
    const next = file && file.type.startsWith('image/') ? { name: file.name, url: URL.createObjectURL(file) } : null
    setPhoto(next)
    setTouched((t) => ({ ...t, photo: true }))
    setErrors(validate(form, next))
  }

  function addSkill(e) {
    if (e.key !== 'Enter') return
    e.preventDefault() // Enter would otherwise submit the form
    const tag = skillText.trim().toLowerCase()
    if (tag && !skills.includes(tag)) setSkills([...skills, tag])
    setSkillText('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate(form, photo)
    setErrors(found)
    setTouched({ name: true, studentId: true, major: true, year: true, bio: true, photo: true })
    if (Object.keys(found).length === 0) setSaved(true)
  }

  const show = (field) => touched[field] && errors[field]
  const describe = (field) => (show(field) ? `${field}-error` : undefined)

  if (saved) {
    const initials = form.name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    return (
      <section className="stack" aria-label="Profile preview">
        <p className="label">Profile preview</p>
        <div className="card row profile">
          {photo ? <img src={photo.url} alt="" className="photo" /> : <span className="photo">{initials}</span>}
          <div className="grow">
            <h3>{form.name.trim()}</h3>
            <p className="muted">ID {form.studentId} · Year {form.year}</p>
            <p className="accent">{form.major}</p>
            <p>{form.bio}</p>
            <p className="muted">bio: {form.bio.length} / {BIO_LIMIT}</p>
            {skills.length > 0 && <ul className="chips">{skills.map((s) => <li key={s}>{s}</li>)}</ul>}
          </div>
        </div>
        <button type="button" className="btn" onClick={() => setSaved(false)}>Edit profile</button>
      </section>
    )
  }

  return (
    <form className="stack" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="pe-name">Name <span aria-hidden="true">*</span></label>
        <input id="pe-name" name="name" className="input" value={form.name} onChange={handleChange} onBlur={handleBlur}
          autoComplete="name" aria-required="true" aria-invalid={!!show('name')} aria-describedby={describe('name')} />
        {show('name') && <p id="name-error" className="error-text">{errors.name}</p>}
      </div>

      <div className="field">
        <label htmlFor="pe-id">Student ID (10 digits) <span aria-hidden="true">*</span></label>
        <input id="pe-id" name="studentId" className="input" inputMode="numeric" value={form.studentId}
          onChange={handleChange} onBlur={handleBlur} placeholder="2024123456"
          aria-required="true" aria-invalid={!!show('studentId')} aria-describedby={describe('studentId')} />
        {show('studentId') && <p id="studentId-error" className="error-text">{errors.studentId}</p>}
      </div>

      <div className="field">
        <label htmlFor="pe-major">Major <span aria-hidden="true">*</span></label>
        <select id="pe-major" name="major" className="input" value={form.major} onChange={handleChange} onBlur={handleBlur}
          aria-required="true" aria-invalid={!!show('major')} aria-describedby={describe('major')}>
          <option value="">Choose a major…</option>
          {MAJORS.map((m) => <option key={m}>{m}</option>)}
        </select>
        {show('major') && <p id="major-error" className="error-text">{errors.major}</p>}
      </div>

      <fieldset className="field" aria-describedby={describe('year')}>
        <legend>Year <span aria-hidden="true">*</span></legend>
        <div className="row">
          {['1', '2', '3', '4'].map((y) => (
            <label key={y} className="choice">
              <input type="radio" name="year" value={y} checked={form.year === y} onChange={handleChange} onBlur={handleBlur} /> Year {y}
            </label>
          ))}
        </div>
        {show('year') && <p id="year-error" className="error-text">{errors.year}</p>}
      </fieldset>

      <div className="field">
        <label htmlFor="pe-bio">Bio <span aria-hidden="true">*</span></label>
        <textarea id="pe-bio" name="bio" className="input" rows="3" value={form.bio} onChange={handleChange} onBlur={handleBlur}
          aria-required="true" aria-invalid={!!show('bio')} aria-describedby={`bio-count ${describe('bio') ?? ''}`.trim()} />
        <p id="bio-count" className={form.bio.length >= BIO_LIMIT ? 'counter over' : 'counter'}>{form.bio.length} / {BIO_LIMIT} characters</p>
        {show('bio') && <p id="bio-error" className="error-text">{errors.bio}</p>}
      </div>

      <div className="field">
        <label htmlFor="pe-photo">Profile photo <span aria-hidden="true">*</span></label>
        <div className="row">
          {photo && <img src={photo.url} alt="Chosen photo" className="photo small" />}
          <input id="pe-photo" type="file" accept="image/*" ref={fileRef} onChange={choosePhoto}
            aria-invalid={!!show('photo')} aria-describedby={describe('photo')} />
        </div>
        {show('photo') && <p id="photo-error" className="error-text">{errors.photo}</p>}
      </div>

      <div className="field">
        <label htmlFor="pe-skill">Skills (press Enter to add)</label>
        <ul className="chips" aria-label="Skills">
          {skills.map((s) => (
            <li key={s}>{s} <button type="button" className="chip-x" aria-label={`Remove ${s}`}
              onClick={() => setSkills(skills.filter((x) => x !== s))}>×</button></li>
          ))}
        </ul>
        <input id="pe-skill" className="input" value={skillText} onChange={(e) => setSkillText(e.target.value)}
          onKeyDown={addSkill} placeholder="e.g. css" />
      </div>

      <button type="submit" className="btn btn-accent">Save profile</button>
    </form>
  )
}

export default ProfileEditor
