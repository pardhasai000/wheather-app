const WMO_CODES = {
  0: 'Clear sky',
  1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Foggy', 48: 'Icy fog',
  51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
  71: 'Light snow', 73: 'Snow', 75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Light showers', 81: 'Showers', 82: 'Heavy showers',
  85: 'Snow showers', 86: 'Heavy snow showers',
  95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Severe thunderstorm',
};

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function tinyWeatherNet(current) {
  const {
    temperature, apparentTemperature, humidity, windSpeed,
    precipitation = 0, cloudCover,
  } = current;

  const relu = x => Math.max(0, x);
  const sigmoid = x => 1 / (1 + Math.exp(-10 * (x - 0.5)));

  const tNorm = clamp((temperature + 20) / 80, 0, 1);
  const ftNorm = clamp((apparentTemperature + 20) / 80, 0, 1);
  const hNorm = humidity / 100;
  const wNorm = clamp(windSpeed / 80, 0, 1);
  const rNorm = clamp(precipitation / 20, 0, 1);
  const cNorm = cloudCover / 100;

  const h1 = relu(0.6 * (1 - Math.abs(tNorm - 0.55)) + 0.4 * (1 - hNorm) - 0.5);
  const h2 = relu(0.8 * (1 - wNorm) + 0.2 * (1 - rNorm) - 0.3);
  const h3 = relu(0.5 * (1 - cNorm) + 0.5 * ftNorm - 0.2);

  const rawScore = h1 * 0.4 + h2 * 0.35 + h3 * 0.25;
  const comfortScore = Math.round(clamp(sigmoid(rawScore) * 100, 0, 100));
  const rainSignal = Math.round(clamp((rNorm * 0.5 + cNorm * 0.3 + hNorm * 0.2) * 100, 0, 100));

  let comfortLabel;
  if (comfortScore >= 75) comfortLabel = 'Great';
  else if (comfortScore >= 55) comfortLabel = 'Okay';
  else if (comfortScore >= 35) comfortLabel = 'Mixed';
  else comfortLabel = 'Rough';

  const suggestions = [];
  if (temperature > 38) {
    suggestions.push('Extreme heat. Avoid direct sun and stay hydrated.');
  } else if (temperature < -5) {
    suggestions.push('Well below freezing. Bundle up and watch for ice.');
  } else if (precipitation > 5) {
    suggestions.push('Significant rain expected. Carry an umbrella and waterproof layers.');
  } else if (windSpeed > 50) {
    suggestions.push('Strong winds. Secure loose items and wear windproof layers.');
  } else if (humidity > 80 && temperature > 28) {
    suggestions.push('Hot and humid. Light, breathable clothing recommended.');
  } else if (comfortScore >= 75) {
    suggestions.push('Ideal conditions for outdoor activities. Enjoy the day!');
  } else if (comfortScore >= 55) {
    suggestions.push('Reasonable conditions. Dress for the current forecast.');
  } else {
    suggestions.push('Uncomfortable outside. Check conditions before heading out.');
  }

  return {
    comfortScore, comfortLabel, rainSignal, suggestions,
    neuralModel: 'TinyWeatherNet v1',
    source: 'Local assistant',
  };
}

function buildSummary(current, ai) {
  const { temperature, condition, windSpeed, humidity } = current;
  const { comfortLabel, rainSignal, suggestions } = ai;
  const feel = temperature > 30 ? 'warm' : temperature > 18 ? 'mild' : temperature > 8 ? 'cool' : 'cold';
  return `Currently ${condition.toLowerCase()} at ${temperature}°C — a ${feel}, ${comfortLabel.toLowerCase()} day. `
    + `Wind at ${windSpeed} km/h, humidity ${humidity}%. `
    + (rainSignal > 60 ? 'Rain is likely. ' : rainSignal > 30 ? 'Some chance of rain. ' : 'Dry conditions expected. ')
    + suggestions[0];
}

export default async function handler(req) {
  const url = new URL(req.url);
  const place = url.searchParams.get('place');

  if (!place) {
    return new Response(JSON.stringify({ error: 'place parameter is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1&language=en&format=json`,
    );
    const geoData = await geoRes.json();

    if (!geoData.results?.length) {
      return new Response(
        JSON.stringify({ error: `No matching place found for '${place}'.` }),
        { status: 404, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const loc = geoData.results[0];

    const params = new URLSearchParams({
      latitude: loc.latitude,
      longitude: loc.longitude,
      current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,rain,cloud_cover,weather_code,pressure_msl,is_day',
      hourly: 'temperature_2m,apparent_temperature,weather_code,precipitation_probability',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max',
      timezone: 'auto',
      forecast_days: '7',
    });

    const wxRes = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    const wx = await wxRes.json();

    const c = wx.current;
    const current = {
      temperature: Math.round(c.temperature_2m),
      apparentTemperature: Math.round(c.apparent_temperature),
      humidity: c.relative_humidity_2m,
      windSpeed: Math.round(c.wind_speed_10m),
      pressure: Math.round(c.pressure_msl),
      cloudCover: c.cloud_cover,
      precipitation: c.precipitation || 0,
      weatherCode: c.weather_code,
      condition: WMO_CODES[c.weather_code] || 'Unknown',
      isDay: c.is_day === 1,
    };

    const ai = tinyWeatherNet(current);
    ai.summary = buildSummary(current, ai);

    // Find starting index near current time
    const nowIso = new Date().toISOString().slice(0, 13);
    let startIdx = wx.hourly.time.findIndex(t => t.startsWith(nowIso));
    if (startIdx < 0) startIdx = 0;

    const hourly = wx.hourly.time.slice(startIdx, startIdx + 24).map((time, i) => {
      const idx = startIdx + i;
      return {
        time,
        temperature: Math.round(wx.hourly.temperature_2m[idx]),
        apparentTemperature: Math.round(wx.hourly.apparent_temperature[idx]),
        weatherCode: wx.hourly.weather_code[idx],
        condition: WMO_CODES[wx.hourly.weather_code[idx]] || 'Unknown',
        precipitationProbability: wx.hourly.precipitation_probability[idx] ?? 0,
      };
    });

    const daily = wx.daily.time.map((date, i) => ({
      date,
      weatherCode: wx.daily.weather_code[i],
      condition: WMO_CODES[wx.daily.weather_code[i]] || 'Unknown',
      maxTemp: Math.round(wx.daily.temperature_2m_max[i]),
      minTemp: Math.round(wx.daily.temperature_2m_min[i]),
      precipSum: Math.round((wx.daily.precipitation_sum[i] ?? 0) * 10) / 10,
      precipProbMax: wx.daily.precipitation_probability_max[i] ?? 0,
    }));

    const body = JSON.stringify({
      location: {
        name: loc.name,
        display_name: [loc.name, loc.admin1, loc.country].filter(Boolean).join(', '),
        country: loc.country,
        latitude: loc.latitude,
        longitude: loc.longitude,
        timezone: loc.timezone,
      },
      current,
      ai,
      hourly,
      daily,
    });

    return new Response(body, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    });
  } catch (err) {
    console.error('weather function error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch weather data. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const config = {
  path: '/api/weather',
};
