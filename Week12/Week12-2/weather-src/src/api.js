// Open-Meteo needs no API key. Two endpoints:
//   geocoding: city name -> latitude/longitude
//   forecast:  latitude/longitude -> current weather + daily forecast

async function getJSON(url, signal) {
  let res
  try {
    res = await fetch(url, { signal })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new Error('No connection. Check your internet and try again.')
  }
  if (res.status === 429) throw new Error('Too many requests. Wait a minute and try again.')
  if (!res.ok) throw new Error(`The weather service answered ${res.status}.`)
  return res.json()
}

export async function findCity(name, signal) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&name=${encodeURIComponent(name)}`
  const data = await getJSON(url, signal)
  const place = data.results?.[0]
  if (!place) throw new Error(`No city called “${name}” was found.`)
  return {
    label: [place.name, place.admin1, place.country].filter(Boolean).join(', '),
    latitude: place.latitude,
    longitude: place.longitude,
  }
}

export async function getWeather(latitude, longitude, signal) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    timezone: 'auto',
    forecast_days: 5,
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
  })
  return getJSON(`https://api.open-meteo.com/v1/forecast?${params}`, signal)
}

// WMO weather codes used by Open-Meteo -> [description, emoji]
export function describe(code) {
  if (code === 0) return ['Clear sky', '☀️']
  if (code <= 2) return ['Partly cloudy', '⛅']
  if (code === 3) return ['Overcast', '☁️']
  if (code <= 48) return ['Fog', '🌫️']
  if (code <= 57) return ['Drizzle', '🌦️']
  if (code <= 67) return ['Rain', '🌧️']
  if (code <= 77) return ['Snow', '🌨️']
  if (code <= 82) return ['Rain showers', '🌦️']
  if (code <= 86) return ['Snow showers', '🌨️']
  return ['Thunderstorm', '⛈️']
}
