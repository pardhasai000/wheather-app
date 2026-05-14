# ML Models

Cozzy Wheather includes two lightweight ML-style models implemented directly in Python. They are designed for a working prototype and do not require external ML packages.

## TinyWeatherNet v1

`TinyWeatherNet v1` is a small feed-forward neural-style model used for weather interpretation.

### Inputs

The model reads current weather values from Open-Meteo:

- Temperature
- Apparent temperature
- Relative humidity
- Wind speed
- Precipitation and rain
- Cloud cover

### Outputs

The model produces:

- `comfortScore`: 0 to 100 score for outdoor comfort
- `comfortLabel`: `Great`, `Okay`, `Mixed`, or `Rough`
- `rainSignal`: 0 to 100 signal for likely rain impact
- `suggestions`: practical user advice

### How It Works

The model normalizes weather values, passes them through a small hidden layer with ReLU activations, then converts the result into a 0 to 100 score with a sigmoid function.

It is not a production-trained model. It is a transparent prototype model that shows how neural-network style scoring can be included in the app.

## TinyPlaceRanker v1

`TinyPlaceRanker v1` ranks autocomplete suggestions for the search box.

### Candidate Sources

The model ranks candidates from:

- Open-Meteo geocoding results for normal queries
- A local seed list of popular places for first-letter predictions

The local seed list makes the app respond immediately when the user types the first letter, even when the external geocoding API does not return one-letter results.

### Ranking Features

The model considers:

- Whether the place name starts with the typed query
- Whether a word in the place display name starts with the query
- Whether the query appears in the display name
- Name length fit
- Population signal
- Region metadata signal

### Outputs

Each suggestion gets a `score` from 1 to 100. Higher scores are shown first in the dropdown.

## Optional LLM Summary

The app can call the OpenAI Responses API when `OPENAI_API_KEY` is set. The LLM receives a concise weather prompt and returns a short practical summary.

If no key is available, the app uses a local fallback summary so the prototype still works.