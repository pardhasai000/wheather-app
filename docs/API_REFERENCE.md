# API Reference

Mighty Wheather runs a small Python HTTP server. The frontend calls local JSON APIs exposed by `weather_app.py`.

Base URL when running locally:

```text
http://127.0.0.1:8765
```

## GET `/api/weather`

Fetches weather for a searched place.

### Query Parameters

| Name | Required | Example | Description |
| --- | --- | --- | --- |
| `place` | Yes | `New Delhi` | City, region, or place name to search. |

### Example

```text
/api/weather?place=New%20Delhi
```

### Response Shape

```json
{
  "location": {
    "name": "New Delhi",
    "display_name": "New Delhi, Delhi, India",
    "country": "India",
    "latitude": 28.61,
    "longitude": 77.21,
    "timezone": "Asia/Kolkata"
  },
  "current": {
    "temperature": 31,
    "apparentTemperature": 33,
    "humidity": 52,
    "windSpeed": 9,
    "pressure": 1010,
    "cloudCover": 20,
    "weatherCode": 1,
    "condition": "Mainly clear"
  },
  "ai": {
    "summary": "Short practical weather summary.",
    "source": "Local fallback assistant",
    "neuralModel": "TinyWeatherNet v1",
    "comfortScore": 72,
    "comfortLabel": "Okay",
    "rainSignal": 18,
    "suggestions": ["Conditions look manageable for normal plans."]
  },
  "hourly": [],
  "daily": []
}
```

## GET `/api/places`

Returns predicted place suggestions for autocomplete.

### Query Parameters

| Name | Required | Example | Description |
| --- | --- | --- | --- |
| `query` | Yes | `N` | Text typed into the search box. |

### Example

```text
/api/places?query=N
```

### Response Shape

```json
{
  "query": "N",
  "model": "TinyPlaceRanker v1",
  "suggestions": [
    {
      "name": "New Delhi",
      "display_name": "New Delhi, Delhi, India",
      "admin1": "Delhi",
      "country": "India",
      "latitude": 28.61,
      "longitude": 77.21,
      "population": 318000,
      "timezone": "Asia/Kolkata",
      "score": 100
    }
  ]
}
```

## Static Routes

| Route | File |
| --- | --- |
| `/` | `weather_index.html` |
| `/weather` | `weather_index.html` |
| `/weather_styles.css` | `weather_styles.css` |
| `/weather_app.js` | `weather_app.js` |

## Error Format

Errors return JSON:

```json
{
  "error": "No matching place found for 'abc'."
}
```