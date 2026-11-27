import { useEffect, useState } from 'react'

// F1 · Friday code challenge: a GitHub profile card.
// The effect fetches the profile whenever `username` changes.
// Bonus: the cleanup aborts the old request, so a slow answer for an old
// name can never replace the newer one.
function GitHubUser() {
  const [input, setInput] = useState('asilbek-maker')
  const [username, setUsername] = useState('asilbek-maker')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { signal: controller.signal })
      .then((res) => {
        if (res.status === 404) throw new Error(`There is no GitHub user called "${username}".`)
        if (res.status === 403 || res.status === 429) throw new Error('GitHub rate limit reached. Try again in a while.')
        if (!res.ok) throw new Error(`GitHub answered ${res.status}.`)
        return res.json()
      })
      .then(setUser)
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err instanceof TypeError ? 'Network error. Check your connection.' : err.message)
      })

    return () => controller.abort()
  }, [username])

  function search(e) {
    e.preventDefault()
    const next = input.trim()
    if (!next || next === username) return
    setUser(null) // back to the loading state
    setError('')
    setUsername(next)
  }

  return (
    <div className="stack">
      <form className="row" onSubmit={search}>
        <label htmlFor="gh-name" className="sr-only">GitHub username</label>
        <input id="gh-name" className="input grow" value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit" className="btn btn-accent" disabled={!input.trim()}>Look up</button>
      </form>

      {error ? (
        <p className="notice error" role="alert">{error}</p>
      ) : !user ? (
        <p className="notice" role="status">Loading {username}…</p>
      ) : (
        <div className="card row">
          <img src={user.avatar_url} alt="" width="64" height="64" className="avatar" />
          <div className="grow">
            <h3><a href={user.html_url} target="_blank" rel="noreferrer">{user.name || user.login}</a></h3>
            <p className="muted">@{user.login}{user.location && ` · ${user.location}`}</p>
            {user.bio && <p>{user.bio}</p>}
            <ul className="chips">
              <li>{user.public_repos} repos</li>
              <li>{user.followers} followers</li>
              <li>{user.following} following</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default GitHubUser
