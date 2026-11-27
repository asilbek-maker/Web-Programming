import { useState } from 'react'

// The search controls. They only collect and check input; when it is
// valid they hand a new `search` object to the parent with onSearch.
function SearchForm({ onSearch, busy }) {
  const [mode, setMode] = useState('city') // city | coords
  const [city, setCity] = useState('')
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [problem, setProblem] = useState('')

  function submit(e) {
    e.preventDefault()
    setProblem('')
    if (mode === 'city') {
      if (city.trim().length < 2) return setProblem('Type at least 2 letters of a city name.')
      return onSearch({ kind: 'city', name: city.trim() })
    }
    const latitude = Number(lat)
    const longitude = Number(lon)
    if (lat.trim() === '' || lon.trim() === '' || !Number.isFinite(latitude) || !Number.isFinite(longitude)
      || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
      return setProblem('Latitude must be between −90 and 90, longitude between −180 and 180.')
    }
    onSearch({ kind: 'coords', latitude, longitude, label: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}` })
  }

  function useMyLocation() {
    setProblem('')
    if (!navigator.geolocation) return setProblem('This browser cannot share its location.')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => onSearch({ kind: 'coords', latitude: coords.latitude, longitude: coords.longitude, label: 'My location' }),
      () => setProblem('Location permission was denied, so search by city instead.'),
    )
  }

  return (
    <form className="search" onSubmit={submit}>
      <div className="tabs" role="group" aria-label="Search by">
        <button type="button" aria-pressed={mode === 'city'} onClick={() => setMode('city')}>City</button>
        <button type="button" aria-pressed={mode === 'coords'} onClick={() => setMode('coords')}>Coordinates</button>
      </div>

      {mode === 'city' ? (
        <label>City name
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Seoul, Tashkent, London…" />
        </label>
      ) : (
        <div className="pair">
          <label>Latitude<input inputMode="decimal" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="37.57" /></label>
          <label>Longitude<input inputMode="decimal" value={lon} onChange={(e) => setLon(e.target.value)} placeholder="126.98" /></label>
        </div>
      )}

      <div className="actions">
        <button type="submit" className="primary" disabled={busy}>Get weather</button>
        <button type="button" onClick={useMyLocation} disabled={busy}>📍 Use my location</button>
      </div>
      {problem && <p className="message error" role="alert">{problem}</p>}
    </form>
  )
}

export default SearchForm
