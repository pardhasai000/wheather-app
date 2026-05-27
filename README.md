# Mighty Wheather

Mighty Wheather is a working Python weather web app prototype. It lets users search for a place, get live weather data, see an animated forecast dashboard, and receive an AI-style weather summary.

The project uses live weather and geocoding data from Open-Meteo. It also includes two small ML-style models built in Python:

- `TinyWeatherNet v1` scores weather comfort and rain signal.
- `TinyPlaceRanker v1` ranks predicted places while the user types in the search bar.

## Features

- Search any city or place.
- Predict places from the first typed letter.
- Show current temperature, feels-like temperature, humidity, wind, pressure, and condition.
- Show hourly and five-day forecast cards.
- Animate the UI for clear, cloudy, rainy, stormy, and night conditions.
- Provide an AI assistant weather summary.
- Run without paid API keys for weather data.
- Optionally use an OpenAI LLM when `OPENAI_API_KEY` is configured.

## Tech Stack

- Python standard library HTTP server
- HTML, CSS, and JavaScript frontend
- Open-Meteo weather and geocoding APIs
- Local Python neural-style scoring models
- Optional OpenAI Responses API integration

## Quick Start

```powershell
python weather_app.py
```

Open the app:

```text
http://127.0.0.1:8765
```

Optional LLM setup:

```powershell
$env:OPENAI_API_KEY="your_key_here"
python weather_app.py
```

You can also set `OPENAI_MODEL` to choose a model. If no OpenAI key is available, the app uses a local summary fallback.

## Project Files

```text
weather_app.py         Python server, APIs, weather fetch, ML models
weather_index.html     Main app markup
weather_styles.css     UI, responsive layout, and animations
weather_app.js         Frontend app behavior and autocomplete
WEATHER_README.md      Run and setup guide
docs/API_REFERENCE.md  Local API route documentation
docs/ML_MODELS.md      Model behavior documentation
```

## Documentation

- [Setup Guide](WEATHER_README.md)
- [API Reference](docs/API_REFERENCE.md)
- [ML Models](docs/ML_MODELS.md)

## Notes

This is a working prototype. It is designed to be easy to run locally and easy to extend into a larger weather application.