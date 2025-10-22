# Rwanda Meteorology Centre — Weather App

A beginner-friendly React app that fetches city coordinates (OpenStreetMap / Nominatim) and current weather (Open‑Meteo). No API keys required.

## Table of contents
- Installation
- Quick start
- Files overview
- How it works (line‑by‑line)
  - App.jsx (core logic)
  - App.css (styling)
- APIs used
- Troubleshooting
- Contributing & License

---

## Installation

```bash
# clone
git clone https://github.com/yourusername/weather-app.git
cd weather-app

# install & run
npm install
npm start
# open http://localhost:3000
```

---

## Quick file overview
- src/App.jsx — main React component: input, API calls, UI.
- src/App.css — app styles and responsive rules.
- public/* — static assets and index.html.

---

## How it works — App.jsx (full file)


Explanation (beginner-friendly)
- useState hooks: store input (city), fetched weather, errors and loading flag.
- handleFetchWeather:
  - Validate input; show message if empty.
  - Call Nominatim to turn a city name into latitude/longitude.
  - If no geocode result -> show "City not found."
  - Call Open‑Meteo with the coordinates to get current_weather.
  - Save the result into state so React re-renders the UI.
  - Errors are caught and shown to the user; loading toggles to keep UX clear.

Line-by-line explanation:

   - Checks if the user entered a city name — if not, shows an error.
   - Resets old data and activates the loading state.
   - Calls Nominatim API to get latitude & longitude of the city.
   - If no results are found, displays an error message.
   - Calls Open-Meteo API using the coordinates to get real-time weather data.
   - Updates the weather state so the UI can re-render with new information.
   - If an error occurs at any point, it’s caught and displayed to the user.
---

## Styling — App.css (key parts)

Notes on styling:
- Uses subtle translucent card with blur for a modern feel.
- Mobile-first responsive rules stack input and button on small screens.

---

## APIs used
- Nominatim (OpenStreetMap) — geocoding: https://nominatim.openstreetmap.org/search
  - free, no API key; respect usage policies and add user-agent in production.
- Open‑Meteo — weather: https://api.open-meteo.com/v1/forecast
  - free current_weather parameter returns temperature, windspeed, time.

Tip: For production, set request headers with a descriptive User-Agent when calling Nominatim and respect rate limits.

---

## Kevin was here 🤫
