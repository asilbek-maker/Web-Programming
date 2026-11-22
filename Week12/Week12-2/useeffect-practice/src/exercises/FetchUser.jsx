import { useEffect, useState } from 'react'

// F3: fetch once when the component mounts (empty dependency array),
// with loading and error states.
function FetchUser() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false // set by cleanup so a late answer is ignored

    async function load() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
        if (!res.ok) throw new Error(`Server answered ${res.status}`)
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
  if (error) return <p className="notice error" role="alert">Error: {error}</p>

  return (
    <div className="card">
      <h3>{user.name}</h3>
      <p className="muted small">@{user.username}</p>
      <p>📧 {user.email}</p>
      <p>🏙️ {user.address.city}</p>
      <p>🏢 {user.company.name}</p>
    </div>
  )
}

export default FetchUser
