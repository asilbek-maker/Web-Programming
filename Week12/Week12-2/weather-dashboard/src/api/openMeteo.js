// Small wrappers around the free Open-Meteo APIs (no API key needed).
// https://open-meteo.com/en/docs

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

// An error with a short code the UI can turn into a friendly message.
export class WeatherError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
  }
}

async function getJson(url, signal) {
  let response
  try {
    response = await fetch(url, { signal })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new WeatherError('network', 'Could not reach the weather service.')
  }
  if (response.status === 429) {
    throw new WeatherError('rate-limit', 'Too many requests.')
  }
  if (!response.ok) {
    throw new WeatherError('server', `The weather service answered ${response.status}.`)
  }
  return response.json()
}

// City name -> { name, country, latitude, longitude }
export async function findCity(name, signal) {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(name)}&count=1&language=en&format=json`
  const data = await getJson(url, signal)
  const city = data.results?.[0]
  if (!city) throw new WeatherError('not-found', `No city called "${name}" was found.`)
  return {
    name: city.name,
    country: city.country ?? '',
    latitude: city.latitude,
    longitude: city.longitude,
  }
}

// Coordinates -> current weather plus a 5-day forecast
export async function getWeather(latitude, longitude, signal) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_days: '5',
    wind_speed_unit: 'kmh',
  })
  const data = await getJson(`${FORECAST_URL}?${params}`, signal)
  return {
    current: {
      temperature: data.current.temperature_2m,
      feelsLike: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      wind: data.current.wind_speed_10m,
      code: data.current.weather_code,
      isDay: data.current.is_day === 1,
      time: data.current.time,
    },
    daily: data.daily.time.map((date, i) => ({
      date,
      code: data.daily.weather_code[i],
      max: data.daily.temperature_2m_max[i],
      min: data.daily.temperature_2m_min[i],
    })),
    timezone: data.timezone,
  }
}
