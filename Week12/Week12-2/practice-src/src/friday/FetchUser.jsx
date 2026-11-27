import { useEffect, useState } from 'react'

// F4 · Study guide 2: fetch data once when the component mounts.
// The empty dependency array means the effect runs only after the first
// render. `ignore` is set by the cleanup, so a late answer is dropped.
function FetchUser() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function load() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
        if (!res.ok) throw new Error(`Server answered ${res.status}.`)
        const data = await res.json()
        if (!ignore) setUser(data)
      } catch (err) {
        if (!ignore) setError(err.message || 'Could not load the user.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()
    return () => {
      ignore = true
    }
  }, [])

  if (loading) return <p className="notice" role="status">Loading user…</p>
  if (error) return <p className="notice error" role="alert">{error}</p>

  return (
    <div className="card">
      <h3>{user.name}</h3>
      <p className="muted">@{user.username}</p>
      <ul className="chips">
        <li>{user.email.toLowerCase()}</li>
        <li>{user.address.city}</li>
        <li>{user.company.name}</li>
      </ul>
    </div>
  )
}

export default FetchUser
