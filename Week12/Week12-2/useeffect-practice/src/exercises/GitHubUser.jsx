import { useEffect, useState } from 'react'

// F1: code challenge. Fetch a GitHub profile whenever the username changes.
// Bonus: the cleanup aborts the previous request with an AbortController,
// so a slow old response can never replace a newer one.
function GitHubUser() {
  const [input, setInput] = useState('asilbek-maker')
  const [username, setUsername] = useState('asilbek-maker')
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username) return
    const controller = new AbortController()

    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { signal: controller.signal })
      .then((res) => {
        if (res.status === 404) throw new Error(`No GitHub user called "${username}".`)
        if (res.status === 403 || res.status === 429)
          throw new Error('GitHub rate limit reached (60 requests an hour without login). Try again later.')
        if (!res.ok) throw new Error(`GitHub answered ${res.status}.`)
        return res.json()
      })
      .then((data) => {
        setUser(data)
        setStatus('ready')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err instanceof TypeError ? 'Network error. Check your connection.' : err.message)
        setStatus('error')
      })

    return () => controller.abort()
  }, [username])

  function submit(e) {
    e.preventDefault()
    const next = input.trim()
    if (!next || next === username) return
    // Show the loading state from the event, so the effect only has to fetch.
    setStatus('loading')
    setError('')
    setUsername(next)
  }

  return (
    <div className="stack">
      <form className="row" onSubmit={submit}>
        <label htmlFor="gh-user" className="muted small">Username</label>
        <input id="gh-user" className="input" style={{ flex: 1 }} value={input}
          onChange={(e) => setInput(e.target.value)} placeholder="e.g. torvalds" />
        <button type="submit" className="btn btn-accent" disabled={!input.trim()}>Look up</button>
      </form>

      {status === 'loading' && <p className="notice" role="status">Loading {username}…</p>}
      {status === 'error' && <p className="notice error" role="alert">{error}</p>}
      {status === 'ready' && user && (
        <div className="card row" style={{ alignItems: 'flex-start' }}>
          <img src={user.avatar_url} alt="" width="72" height="72" style={{ borderRadius: '50%' }} />
          <div className="grow">
            <h3>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.name || user.login}</a>
            </h3>
            <p className="muted small">@{user.login}</p>
            {user.bio && <p>{user.bio}</p>}
            <ul className="chips" style={{ marginTop: 8 }}>
              <li>{user.followers} followers</li>
              <li>{user.public_repos} public repos</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default GitHubUser
