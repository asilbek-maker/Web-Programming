import { useState } from 'react'

// Two ways to search (city name or coordinates) plus a "Use my location"
// button. Validation happens here, before the parent's state changes.
function SearchForm({ onSearch, busy }) {
  const [mode, setMode] = useState('city')
  const [city, setCity] = useState('')
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [formError, setFormError] = useState('')
  const [locating, setLocating] = useState(false)

  function submitCity(e) {
    e.preventDefault()
    const name = city.trim()
    if (!name) {
      setFormError('Type a city name first.')
      return
    }
    setFormError('')
    onSearch({ kind: 'city', name })
  }

  function submitCoords(e) {
    e.preventDefault()
    const latitude = Number(lat)
    const longitude = Number(lon)
    if (lat.trim() === '' || Number.isNaN(latitude) || latitude < -90 || latitude > 90) {
      setFormError('Latitude must be a number between -90 and 90.')
      return
    }
    if (lon.trim() === '' || Number.isNaN(longitude) || longitude < -180 || longitude > 180) {
      setFormError('Longitude must be a number between -180 and 180.')
      return
    }
    setFormError('')
    onSearch({ kind: 'coords', latitude, longitude, label: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}` })
  }

  function useMyLocation() {
    if (!('geolocation' in navigator)) {
      setFormError('This browser cannot share its location.')
      return
    }
    setLocating(true)
    setFormError('')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false)
        const { latitude, longitude } = pos.coords
        onSearch({ kind: 'coords', latitude, longitude, label: 'My location' })
      },
      (err) => {
        setLocating(false)
        setFormError(
          err.code === err.PERMISSION_DENIED
            ? 'Location permission was denied. Search by city instead.'
            : 'Could not get your location.',
        )
      },
      { timeout: 10000 },
    )
  }

  return (
    <section className="search" aria-label="Search for a location">
      <div className="tabs" role="tablist" aria-label="Search by">
        <button type="button" role="tab" aria-selected={mode === 'city'} className="tab" onClick={() => setMode('city')}>
          City
        </button>
        <button type="button" role="tab" aria-selected={mode === 'coords'} className="tab" onClick={() => setMode('coords')}>
          Coordinates
        </button>
      </div>

      {mode === 'city' ? (
        <form className="search-row" onSubmit={submitCity}>
          <label className="sr-only" htmlFor="city">City name</label>
          <input id="city" className="input grow" placeholder="e.g. Seoul, Tashkent, London" value={city} onChange={(e) => setCity(e.target.value)} />
          <button className="btn btn-accent" type="submit" disabled={busy}>Search</button>
        </form>
      ) : (
        <form className="search-row" onSubmit={submitCoords}>
          <label className="sr-only" htmlFor="lat">Latitude</label>
          <input id="lat" className="input" inputMode="decimal" placeholder="Latitude (37.45)" value={lat} onChange={(e) => setLat(e.target.value)} />
          <label className="sr-only" htmlFor="lon">Longitude</label>
          <input id="lon" className="input" inputMode="decimal" placeholder="Longitude (127.13)" value={lon} onChange={(e) => setLon(e.target.value)} />
          <button className="btn btn-accent" type="submit" disabled={busy}>Search</button>
        </form>
      )}

      <div className="search-row">
        <button type="button" className="btn" onClick={useMyLocation} disabled={locating}>
          📍 {locating ? 'Finding you…' : 'Use my location'}
        </button>
      </div>

      {formError && <p className="notice error" role="alert">{formError}</p>}
    </section>
  )
}

export default SearchForm
