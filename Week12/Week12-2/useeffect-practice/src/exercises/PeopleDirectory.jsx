import { useEffect, useState } from 'react'

const PEOPLE = [1, 2, 3, 4, 5]
const TIMEOUT_MS = 8000

// F7: people directory. The effect fetches a user whenever `id` changes
// (unlike F3, which only fetches once on mount). `attempt` is a second
// dependency, so Retry can run the same request again. An AbortController
// cancels the old request in cleanup, and a timer gives up after 8 seconds.
function PeopleDirectory() {
  const [id, setId] = useState(1)
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState(null) // null = loading, { user } or { error }

  useEffect(() => {
    const controller = new AbortController()
    let timedOut = false
    const timer = setTimeout(() => {
      timedOut = true
      controller.abort()
    }, TIMEOUT_MS)

    async function load() {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { signal: controller.signal })
        if (res.status === 404) throw new Error(`There is no user with ID ${id}.`)
        if (!res.ok) throw new Error(`Server answered ${res.status}.`)
        setResult({ user: await res.json() })
      } catch (err) {
        if (timedOut) setResult({ error: 'The request timed out. Try again.' })
        else if (err.name !== 'AbortError')
          setResult({ error: err instanceof TypeError ? 'Network error. Check your connection.' : err.message })
      } finally {
        clearTimeout(timer)
      }
    }

    load()
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [id, attempt])

  function open(next) {
    setResult(null) // show "Loading…" from the event handler
    setId(next)
    setAttempt((a) => a + 1)
  }

  const user = result?.user

  return (
    <div className="stack">
      <div className="row" role="group" aria-label="Choose a user">
        {PEOPLE.map((n) => (
          <button key={n} type="button" className={n === id ? 'btn btn-accent btn-small' : 'btn btn-small'}
            aria-pressed={n === id} onClick={() => open(n)}>User {n}</button>
        ))}
        <button type="button" className="btn btn-small" aria-pressed={id === 999} onClick={() => open(999)}>Missing user (999)</button>
      </div>

      {!result && <p className="notice" role="status">Loading user {id}…</p>}
      {result?.error && (
        <div className="row">
          <p className="notice error grow" role="alert">{result.error}</p>
          <button type="button" className="btn" onClick={() => open(id)}>Retry</button>
        </div>
      )}
      {user && (
        <div className="card">
          <h3>{user.name}</h3>
          <p className="muted small">@{user.username} · ID {user.id}</p>
          <ul className="chips" style={{ marginTop: 8 }}>
            <li>🏙️ {user.address.city}</li>
            <li>🏢 {user.company.name}</li>
            <li>📧 {user.email.toLowerCase()}</li>
          </ul>
          <p className="muted small" style={{ marginTop: 8 }}>“{user.company.catchPhrase}”</p>
        </div>
      )}
    </div>
  )
}

export default PeopleDirectory
