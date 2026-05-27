# Mighty Wheather Prototype

## Run The App

From the project folder, run:

```powershell
python weather_app.py
```

Then open:

```text
http://127.0.0.1:8765
```

## What The App Does

Mighty Wheather is a browser-based weather app powered by a Python backend. It searches places, fetches live weather, displays current conditions and forecasts, and adds AI-style analysis.

The app uses Open-Meteo for live weather and geocoding. No weather API key is required.

## ML And AI Features

The prototype includes two local ML-style models:

- `TinyWeatherNet v1`: scores weather comfort and rain signal from temperature, humidity, wind, rain, and cloud cover.
- `TinyPlaceRanker v1`: ranks place autocomplete predictions while the user types.

The app can also use an OpenAI LLM for the weather assistant summary.

## Optional LLM Summary

Set an OpenAI API key before starting the app:

```powershell
$env:OPENAI_API_KEY="your_key_here"
python weather_app.py
```

Optional model override:

```powershell
$env:OPENAI_MODEL="gpt-4o-mini"
python weather_app.py
```

Without an API key, the app uses a local assistant summary so the prototype still works.

## Local URLs

- App: `http://127.0.0.1:8765`
- Weather API: `http://127.0.0.1:8765/api/weather?place=New%20Delhi`
- Place prediction API: `http://127.0.0.1:8765/api/places?query=N`

## Requirements

- Python 3.10 or newer recommended
- Internet connection for live weather and geocoding
- Optional OpenAI API key for LLM summaries