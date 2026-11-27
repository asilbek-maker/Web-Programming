import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './weather.css'
import WeatherDashboard from './WeatherDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeatherDashboard />
  </StrictMode>,
)
