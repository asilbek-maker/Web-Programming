import { useEffect, useState } from 'react'

// Part of F1: the profile's recently updated public repositories.
// A second effect fetches the repos when `username` changes, with its own
// AbortController. Sorting and the language filter are worked out during
// render from the list that is already in state, with no extra effect.
// The parent gives this component key={username}, so sort and filter
// start fresh for each new user.
function RepoList({ username }) {
  const [repos, setRepos] = useState(null)
  const [error, setError] = useState('')
  const [sort, setSort] = useState('updated') // updated | stars
  const [language, setLanguage] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=8`,
      { signal: controller.signal })
      .then((res) => {
        if (res.status === 403 || res.status === 429) throw new Error('GitHub rate limit reached, so the repositories could not load.')
        if (!res.ok) throw new Error(`GitHub answered ${res.status}.`)
        return res.json()
      })
      .then(setRepos)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
    return () => controller.abort()
  }, [username])

  if (error) return <p className="notice warn" role="alert">{error}</p>
  if (!repos) return <p className="notice" role="status">Loading repositories…</p>
  if (repos.length === 0) return <p className="notice">No public repositories yet.</p>

  const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))].sort()
  const shown = repos
    .filter((r) => !language || r.language === language)
    .sort((a, b) => sort === 'stars'
      ? b.stargazers_count - a.stargazers_count
      : Date.parse(b.updated_at) - Date.parse(a.updated_at))

  return (
    <div className="stack">
      <div className="row">
        <h3 className="grow">Recent repositories</h3>
        <div className="row" role="group" aria-label="Sort repositories">
          <button type="button" className={sort === 'updated' ? 'btn btn-small btn-accent' : 'btn btn-small'}
            aria-pressed={sort === 'updated'} onClick={() => setSort('updated')}>Recently updated</button>
          <button type="button" className={sort === 'stars' ? 'btn btn-small btn-accent' : 'btn btn-small'}
            aria-pressed={sort === 'stars'} onClick={() => setSort('stars')}>Most stars</button>
        </div>
        <select className="input" aria-label="Filter by language" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">All languages</option>
          {languages.map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>
      <ul className="plain-list">
        {shown.map((r) => (
          <li key={r.id}>
            <span className="grow">
              <a href={r.html_url} target="_blank" rel="noopener noreferrer">{r.name}</a>
              {r.description && <span className="muted small"> · {r.description}</span>}
            </span>
            <span className="muted small">{[r.language, `★ ${r.stargazers_count}`].filter(Boolean).join(' · ')}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RepoList
