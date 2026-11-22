import { useEffect, useState } from 'react'
import { findCity, getWeather } from '../api/openMeteo.js'
import SearchForm from './SearchForm.jsx'
import CurrentWeather from './CurrentWeather.jsx'
import Forecast from './Forecast.jsx'
import StatusMessage from './StatusMessage.jsx'

// Owns the state. `search` is what the user asked for; the effect below
// turns it into a place and its weather every time it changes.
function WeatherDashboard() {
  const [search, setSearch] = useState({ kind: 'city', name: 'Seoul' })
  const [place, setPlace] = useState(null)
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setStatus('loading')
      setError(null)
      try {
        const where =
          search.kind === 'city'
            ? await findCity(search.name, controller.signal)
            : {
                name: search.label ?? 'Custom location',
                country: '',
                latitude: search.latitude,
                longitude: search.longitude,
              }
        const data = await getWeather(where.latitude, where.longitude, controller.signal)
        setPlace(where)
        setWeather(data)
        setStatus('ready')
      } catch (err) {
        if (err.name === 'AbortError') return // a newer search replaced this one
        setError(err)
        setStatus('error')
      }
    }

    load()
    // Cleanup: if the search changes before this request finishes,
    // cancel it so an old answer can never overwrite a newer one.
    return () => controller.abort()
  }, [search])

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Week 12 · Friday extra challenge · useEffect</p>
        <h1>Weather Dashboard</h1>
        <p className="muted">Live data from the Open-Meteo API. Search a city or enter coordinates.</p>
      </header>

      <SearchForm onSearch={setSearch} busy={status === 'loading'} />

      <StatusMessage status={status} error={error} />

      {weather && place && (
        <div className={status === 'loading' ? 'results is-stale' : 'results'}>
          <CurrentWeather place={place} current={weather.current} timezone={weather.timezone} />
          <Forecast days={weather.daily} />
        </div>
      )}

      <footer className="page-footer">
        Weather data by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo.com</a> ·{' '}
        <a href="../index.html">← Back to Week 12-2</a>
      </footer>
    </main>
  )
}

export default WeatherDashboard
