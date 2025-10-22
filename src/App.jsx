import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // import our styles

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setWeather(null);

      // Step 1: Convert city name to coordinates
      const geoRes = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: city,
          format: 'json',
          limit: 1
        }
      });

      if (geoRes.data.length === 0) {
        setError('City not found.');
        setLoading(false);
        return;
      }

      const { lat, lon, display_name } = geoRes.data[0];

      // Step 2: Fetch weather from Open-Meteo
      const weatherRes = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: lat,
          longitude: lon,
          current_weather: true
        }
      });

      setWeather({ ...weatherRes.data.current_weather, location: display_name });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data.');
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="weather-card">
        <h1 className="title">🌦️ Rwanda Metrology Centre</h1>

        <div className="search-section">
          <input
            type="text"
            placeholder="Enter city (e.g., Kigali)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleFetchWeather} disabled={loading}>
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.location}</h2>
            <p>🌡️ Temperature: {weather.temperature}°C</p>
            <p>💨 Wind Speed: {weather.windspeed} km/h</p>
            <p>🕒 Time: {new Date(weather.time).toLocaleTimeString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
