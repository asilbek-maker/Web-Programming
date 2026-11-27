import { useEffect, useState } from 'react'
import SearchForm from './SearchForm.jsx'
import { describe, findCity, getWeather } from './api.js'

const START = { kind: 'city', name: 'Seoul' }

// Owns the state. The effect runs whenever `search` changes: it turns a
// city into coordinates if needed, then loads the weather. The cleanup
// aborts the old request, so an old answer never replaces a newer one.
function WeatherDashboard() {
  const [search, setSearch] = useState(START)
  const [result, setResult] = useState(null) // null = loading, { place, data } or { error }

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const place = search.kind === 'city'
          ? await findCity(search.name, controller.signal)
          : { label: search.label, latitude: search.latitude, longitude: search.longitude }
        const data = await getWeather(place.latitude, place.longitude, controller.signal)
        setResult({ place, data })
      } catch (err) {
        if (err.name !== 'AbortError') setResult({ error: err.message })
      }
    }

    load()
    return () => controller.abort()
  }, [search])

  function startSearch(next) {
    setResult(null) // show "Loading…" straight away
    setSearch(next)
  }

  const now = result?.data?.current
  const daily = result?.data?.daily

  return (
    <main className="app">
      <header>
        <p className="eyebrow">Week 12-2 · Friday homework · useEffect</p>
        <h1>Weather dashboard</h1>
      </header>

      <SearchForm onSearch={startSearch} busy={!result} />

      {!result && <p className="message" role="status"><span className="spinner" aria-hidden="true" /> Loading the weather…</p>}

      {result?.error && (
        <div className="message error" role="alert">
          <p>{result.error}</p>
          <button type="button" onClick={() => startSearch({ ...search })}>Try again</button>
        </div>
      )}

      {now && (
        <section className="now" aria-label="Current weather">
          <div>
            <h2>{result.place.label}</h2>
            <p className="muted">Local time {now.time.replace('T', ' ')}</p>
          </div>
          <p className="temp"><span aria-hidden="true">{describe(now.weather_code)[1]}</span> {Math.round(now.temperature_2m)}°C</p>
          <p className="desc">{describe(now.weather_code)[0]}</p>
          <dl className="stats">
            <div><dt>Feels like</dt><dd>{Math.round(now.apparent_temperature)}°C</dd></div>
            <div><dt>Wind</dt><dd>{now.wind_speed_10m} km/h</dd></div>
            <div><dt>Humidity</dt><dd>{now.relative_humidity_2m}%</dd></div>
          </dl>
        </section>
      )}

      {daily && (
        <section aria-label="Five-day forecast">
          <h2 className="small-title">Next 5 days</h2>
          <ul className="forecast">
            {daily.time.map((day, i) => (
              <li key={day}>
                <strong>{new Date(`${day}T12:00`).toLocaleDateString('en', { weekday: 'short' })}</strong>
                <span className="icon" aria-hidden="true">{describe(daily.weather_code[i])[1]}</span>
                <span className="muted">{describe(daily.weather_code[i])[0]}</span>
                <span>{Math.round(daily.temperature_2m_max[i])}° / {Math.round(daily.temperature_2m_min[i])}°</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer>
        <a href="../index.html">← Week 12-2</a> · Data from <a href="https://open-meteo.com/">Open-Meteo</a>
      </footer>
    </main>
  )
}

export default WeatherDashboard
