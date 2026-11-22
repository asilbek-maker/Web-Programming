import { describeWeather } from '../api/weatherCodes.js'

function dayName(date, index) {
  if (index === 0) return 'Today'
  // Parse as a plain calendar date so the weekday never shifts by timezone.
  const [y, m, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' })
}

function Forecast({ days }) {
  return (
    <section aria-labelledby="forecast-title">
      <h2 id="forecast-title" className="section-title">5-day forecast</h2>
      <ul className="forecast">
        {days.map((day, i) => {
          const { text, icon } = describeWeather(day.code)
          return (
            <li key={day.date} className="forecast-day">
              <span className="forecast-name">{dayName(day.date, i)}</span>
              <span className="forecast-icon" aria-hidden="true">{icon}</span>
              <span className="sr-only">{text}</span>
              <span className="forecast-temps">
                <strong>{Math.round(day.max)}°</strong> <span className="muted">{Math.round(day.min)}°</span>
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Forecast
