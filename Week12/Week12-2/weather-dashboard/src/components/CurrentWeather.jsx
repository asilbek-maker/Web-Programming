import { describeWeather } from '../api/weatherCodes.js'

function CurrentWeather({ place, current, timezone }) {
  const { text, icon } = describeWeather(current.code, current.isDay)
  const updated = current.time.slice(11, 16)

  return (
    <section className="current" aria-labelledby="current-title">
      <div>
        <h2 id="current-title">
          {place.name}
          {place.country && <span className="muted">, {place.country}</span>}
        </h2>
        <p className="muted small">
          {place.latitude.toFixed(2)}°, {place.longitude.toFixed(2)}° · updated {updated} ({timezone})
        </p>
      </div>

      <div className="current-main">
        <span className="current-icon" aria-hidden="true">{icon}</span>
        <div>
          <p className="current-temp">{Math.round(current.temperature)}°C</p>
          <p className="current-text">{text}</p>
        </div>
      </div>

      <dl className="stats">
        <div><dt>Wind</dt><dd>{current.wind} km/h</dd></div>
        <div><dt>Feels like</dt><dd>{Math.round(current.feelsLike)}°C</dd></div>
        <div><dt>Humidity</dt><dd>{current.humidity}%</dd></div>
      </dl>
    </section>
  )
}

export default CurrentWeather
