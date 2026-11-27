import { useEffect, useState } from 'react'

// F2 · Bonus: search GitHub users while typing, but only after a pause.
// Every key press changes `query`, so the old effect is cleaned up first:
// its timer is cleared and its request is aborted. Only the last value
// that stays for 500 ms is sent. That saves GitHub's small rate limit.
function DebouncedSearch() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null) // { users } or { error }

  useEffect(() => {
    const q = query.trim()
    if (q.length < 2) return
    const controller = new AbortController()

    const timer = setTimeout(() => {
      fetch(`https://api.github.com/search/users?per_page=5&q=${encodeURIComponent(q)}`, { signal: controller.signal })
        .then((res) => {
          if (res.status === 403 || res.status === 429) throw new Error('Too many searches. Wait a minute and try again.')
          if (!res.ok) throw new Error(`GitHub answered ${res.status}.`)
          return res.json()
        })
        .then((data) => setResult({ users: data.items }))
        .catch((err) => {
          if (err.name !== 'AbortError') setResult({ error: err.message })
        })
    }, 500)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  const typing = query.trim().length >= 2 && !result

  return (
    <div className="stack">
      <label htmlFor="gh-search" className="muted">Search GitHub users (at least 2 letters)</label>
      <input id="gh-search" className="input" value={query} placeholder="e.g. asilbek"
        onChange={(e) => { setQuery(e.target.value); setResult(null) }} />

      {typing && <p className="notice" role="status">Waiting for you to stop typing…</p>}
      {result?.error && <p className="notice error" role="alert">{result.error}</p>}
      {result?.users?.length === 0 && <p className="notice">No users found.</p>}
      {result?.users?.length > 0 && (
        <ul className="list">
          {result.users.map((u) => (
            <li key={u.id}>
              <img src={u.avatar_url} alt="" width="28" height="28" className="avatar" />
              <a className="grow" href={u.html_url} target="_blank" rel="noreferrer">{u.login}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DebouncedSearch
