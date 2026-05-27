const SEED_PLACES = [
  { name: 'Amsterdam', display_name: 'Amsterdam, North Holland, Netherlands', admin1: 'North Holland', country: 'Netherlands', latitude: 52.374, longitude: 4.890, population: 873338 },
  { name: 'Athens', display_name: 'Athens, Attica, Greece', admin1: 'Attica', country: 'Greece', latitude: 37.983, longitude: 23.728, population: 664046 },
  { name: 'Auckland', display_name: 'Auckland, Auckland, New Zealand', admin1: 'Auckland', country: 'New Zealand', latitude: -36.867, longitude: 174.767, population: 467800 },
  { name: 'Bangkok', display_name: 'Bangkok, Bangkok, Thailand', admin1: 'Bangkok', country: 'Thailand', latitude: 13.754, longitude: 100.501, population: 10539000 },
  { name: 'Barcelona', display_name: 'Barcelona, Catalonia, Spain', admin1: 'Catalonia', country: 'Spain', latitude: 41.385, longitude: 2.173, population: 1620343 },
  { name: 'Beijing', display_name: 'Beijing, Beijing, China', admin1: 'Beijing', country: 'China', latitude: 39.929, longitude: 116.388, population: 11716000 },
  { name: 'Berlin', display_name: 'Berlin, Berlin, Germany', admin1: 'Berlin', country: 'Germany', latitude: 52.524, longitude: 13.410, population: 3562166 },
  { name: 'Buenos Aires', display_name: 'Buenos Aires, Buenos Aires F.D., Argentina', admin1: 'Buenos Aires F.D.', country: 'Argentina', latitude: -34.614, longitude: -58.374, population: 13596000 },
  { name: 'Cairo', display_name: 'Cairo, Cairo, Egypt', admin1: 'Cairo', country: 'Egypt', latitude: 30.064, longitude: 31.249, population: 10107125 },
  { name: 'Cape Town', display_name: 'Cape Town, Western Cape, South Africa', admin1: 'Western Cape', country: 'South Africa', latitude: -33.926, longitude: 18.424, population: 4618000 },
  { name: 'Chicago', display_name: 'Chicago, Illinois, United States', admin1: 'Illinois', country: 'United States', latitude: 41.850, longitude: -87.650, population: 2695598 },
  { name: 'Dallas', display_name: 'Dallas, Texas, United States', admin1: 'Texas', country: 'United States', latitude: 32.783, longitude: -96.806, population: 1288457 },
  { name: 'Delhi', display_name: 'Delhi, Delhi, India', admin1: 'Delhi', country: 'India', latitude: 28.652, longitude: 77.217, population: 32226000 },
  { name: 'Dubai', display_name: 'Dubai, Dubai, United Arab Emirates', admin1: 'Dubai', country: 'United Arab Emirates', latitude: 25.085, longitude: 55.171, population: 3478300 },
  { name: 'Edinburgh', display_name: 'Edinburgh, Scotland, United Kingdom', admin1: 'Scotland', country: 'United Kingdom', latitude: 55.953, longitude: -3.188, population: 524930 },
  { name: 'Frankfurt', display_name: 'Frankfurt, Hesse, Germany', admin1: 'Hesse', country: 'Germany', latitude: 50.116, longitude: 8.684, population: 764104 },
  { name: 'Geneva', display_name: 'Geneva, Geneva, Switzerland', admin1: 'Geneva', country: 'Switzerland', latitude: 46.201, longitude: 6.143, population: 198979 },
  { name: 'Hamburg', display_name: 'Hamburg, Hamburg, Germany', admin1: 'Hamburg', country: 'Germany', latitude: 53.574, longitude: 10.015, population: 1899160 },
  { name: 'Hong Kong', display_name: 'Hong Kong, Hong Kong', admin1: 'Hong Kong', country: 'China', latitude: 22.287, longitude: 114.215, population: 7291600 },
  { name: 'Houston', display_name: 'Houston, Texas, United States', admin1: 'Texas', country: 'United States', latitude: 29.763, longitude: -95.363, population: 2304580 },
  { name: 'Istanbul', display_name: 'Istanbul, Istanbul, Turkey', admin1: 'Istanbul', country: 'Turkey', latitude: 41.013, longitude: 28.950, population: 15460000 },
  { name: 'Jakarta', display_name: 'Jakarta, Jakarta, Indonesia', admin1: 'Jakarta', country: 'Indonesia', latitude: -6.215, longitude: 106.845, population: 34500000 },
  { name: 'Johannesburg', display_name: 'Johannesburg, Gauteng, South Africa', admin1: 'Gauteng', country: 'South Africa', latitude: -26.205, longitude: 28.040, population: 5635127 },
  { name: 'Karachi', display_name: 'Karachi, Sindh, Pakistan', admin1: 'Sindh', country: 'Pakistan', latitude: 24.861, longitude: 67.010, population: 14910352 },
  { name: 'Kuala Lumpur', display_name: 'Kuala Lumpur, Kuala Lumpur, Malaysia', admin1: 'Kuala Lumpur', country: 'Malaysia', latitude: 3.147, longitude: 101.697, population: 1588750 },
  { name: 'Lagos', display_name: 'Lagos, Lagos, Nigeria', admin1: 'Lagos', country: 'Nigeria', latitude: 6.435, longitude: 3.437, population: 14862000 },
  { name: 'Lisbon', display_name: 'Lisbon, Lisbon, Portugal', admin1: 'Lisbon', country: 'Portugal', latitude: 38.717, longitude: -9.133, population: 504718 },
  { name: 'London', display_name: 'London, England, United Kingdom', admin1: 'England', country: 'United Kingdom', latitude: 51.508, longitude: -0.128, population: 7556900 },
  { name: 'Los Angeles', display_name: 'Los Angeles, California, United States', admin1: 'California', country: 'United States', latitude: 34.052, longitude: -118.244, population: 3971883 },
  { name: 'Madrid', display_name: 'Madrid, Community of Madrid, Spain', admin1: 'Community of Madrid', country: 'Spain', latitude: 40.417, longitude: -3.703, population: 3255944 },
  { name: 'Manila', display_name: 'Manila, Metro Manila, Philippines', admin1: 'Metro Manila', country: 'Philippines', latitude: 14.593, longitude: 120.982, population: 1846513 },
  { name: 'Melbourne', display_name: 'Melbourne, Victoria, Australia', admin1: 'Victoria', country: 'Australia', latitude: -37.814, longitude: 144.963, population: 4940000 },
  { name: 'Mexico City', display_name: 'Mexico City, Mexico City, Mexico', admin1: 'Mexico City', country: 'Mexico', latitude: 19.427, longitude: -99.133, population: 9209944 },
  { name: 'Miami', display_name: 'Miami, Florida, United States', admin1: 'Florida', country: 'United States', latitude: 25.775, longitude: -80.210, population: 467963 },
  { name: 'Milan', display_name: 'Milan, Lombardy, Italy', admin1: 'Lombardy', country: 'Italy', latitude: 45.464, longitude: 9.190, population: 1371498 },
  { name: 'Moscow', display_name: 'Moscow, Moscow, Russia', admin1: 'Moscow', country: 'Russia', latitude: 55.751, longitude: 37.616, population: 11920000 },
  { name: 'Mumbai', display_name: 'Mumbai, Maharashtra, India', admin1: 'Maharashtra', country: 'India', latitude: 19.076, longitude: 72.878, population: 12442373 },
  { name: 'Nairobi', display_name: 'Nairobi, Nairobi County, Kenya', admin1: 'Nairobi County', country: 'Kenya', latitude: -1.283, longitude: 36.817, population: 4397073 },
  { name: 'New Delhi', display_name: 'New Delhi, Delhi, India', admin1: 'Delhi', country: 'India', latitude: 28.614, longitude: 77.202, population: 317797 },
  { name: 'New York', display_name: 'New York City, New York, United States', admin1: 'New York', country: 'United States', latitude: 40.713, longitude: -74.006, population: 8336817 },
  { name: 'Oslo', display_name: 'Oslo, Oslo, Norway', admin1: 'Oslo', country: 'Norway', latitude: 59.914, longitude: 10.752, population: 1064235 },
  { name: 'Paris', display_name: 'Paris, Île-de-France, France', admin1: 'Île-de-France', country: 'France', latitude: 48.853, longitude: 2.350, population: 2161000 },
  { name: 'Rio de Janeiro', display_name: 'Rio de Janeiro, Rio de Janeiro, Brazil', admin1: 'Rio de Janeiro', country: 'Brazil', latitude: -22.903, longitude: -43.173, population: 6747815 },
  { name: 'Rome', display_name: 'Rome, Lazio, Italy', admin1: 'Lazio', country: 'Italy', latitude: 41.896, longitude: 12.482, population: 2872800 },
  { name: 'San Francisco', display_name: 'San Francisco, California, United States', admin1: 'California', country: 'United States', latitude: 37.775, longitude: -122.419, population: 874784 },
  { name: 'Santiago', display_name: 'Santiago, Santiago Metropolitan, Chile', admin1: 'Santiago Metropolitan', country: 'Chile', latitude: -33.459, longitude: -70.647, population: 6310000 },
  { name: 'São Paulo', display_name: 'São Paulo, São Paulo, Brazil', admin1: 'São Paulo', country: 'Brazil', latitude: -23.549, longitude: -46.639, population: 12252023 },
  { name: 'Seoul', display_name: 'Seoul, Seoul, South Korea', admin1: 'Seoul', country: 'South Korea', latitude: 37.566, longitude: 126.978, population: 10349312 },
  { name: 'Shanghai', display_name: 'Shanghai, Shanghai, China', admin1: 'Shanghai', country: 'China', latitude: 31.222, longitude: 121.458, population: 22120000 },
  { name: 'Singapore', display_name: 'Singapore, Singapore', admin1: 'Singapore', country: 'Singapore', latitude: 1.289, longitude: 103.850, population: 5638700 },
  { name: 'Stockholm', display_name: 'Stockholm, Stockholm County, Sweden', admin1: 'Stockholm County', country: 'Sweden', latitude: 59.334, longitude: 18.067, population: 1633000 },
  { name: 'Sydney', display_name: 'Sydney, New South Wales, Australia', admin1: 'New South Wales', country: 'Australia', latitude: -33.869, longitude: 151.207, population: 5312000 },
  { name: 'Tehran', display_name: 'Tehran, Tehran, Iran', admin1: 'Tehran', country: 'Iran', latitude: 35.694, longitude: 51.422, population: 9259009 },
  { name: 'Tokyo', display_name: 'Tokyo, Tokyo, Japan', admin1: 'Tokyo', country: 'Japan', latitude: 35.690, longitude: 139.692, population: 13960000 },
  { name: 'Toronto', display_name: 'Toronto, Ontario, Canada', admin1: 'Ontario', country: 'Canada', latitude: 43.654, longitude: -79.384, population: 2731571 },
  { name: 'Vancouver', display_name: 'Vancouver, British Columbia, Canada', admin1: 'British Columbia', country: 'Canada', latitude: 49.249, longitude: -123.119, population: 631486 },
  { name: 'Vienna', display_name: 'Vienna, Vienna, Austria', admin1: 'Vienna', country: 'Austria', latitude: 48.209, longitude: 16.373, population: 1897000 },
  { name: 'Warsaw', display_name: 'Warsaw, Masovian Voivodeship, Poland', admin1: 'Masovian Voivodeship', country: 'Poland', latitude: 52.233, longitude: 21.012, population: 1864619 },
  { name: 'Zürich', display_name: 'Zürich, Zurich, Switzerland', admin1: 'Zurich', country: 'Switzerland', latitude: 47.376, longitude: 8.547, population: 415215 },
];

function tinyPlaceRanker(query, places) {
  const q = query.toLowerCase().trim();
  const results = [];

  for (const place of places) {
    const name = place.name.toLowerCase();
    const display = (place.display_name || '').toLowerCase();
    const words = display.split(/[\s,]+/);

    let score = 0;
    if (name === q) score += 55;
    else if (name.startsWith(q)) score += 38;
    else if (words.some(w => w.startsWith(q))) score += 22;
    else if (name.includes(q)) score += 12;
    else if (display.includes(q)) score += 6;
    else continue;

    score += Math.max(0, 15 - Math.abs(name.length - q.length));
    if (place.population) score += Math.min(22, Math.floor(Math.log10(place.population + 1) * 3.2));
    if (place.admin1) score += 3;

    results.push({ ...place, score: Math.min(100, Math.round(score)) });
  }

  return results.sort((a, b) => b.score - a.score);
}

function deduplicateByName(places) {
  const seen = new Set();
  return places.filter(p => {
    const key = p.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default async function handler(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get('query') || '';

  if (!query.trim()) {
    return new Response(JSON.stringify({ query, model: 'TinyPlaceRanker v1', suggestions: [] }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=8&language=en&format=json`,
    );
    const geoData = await geoRes.json();

    const apiPlaces = (geoData.results || []).map(r => ({
      name: r.name,
      display_name: [r.name, r.admin1, r.country].filter(Boolean).join(', '),
      admin1: r.admin1,
      country: r.country,
      latitude: r.latitude,
      longitude: r.longitude,
      population: r.population || 0,
      timezone: r.timezone,
    }));

    const seedMatches = tinyPlaceRanker(query, SEED_PLACES);
    const combined = deduplicateByName([...apiPlaces, ...seedMatches]);
    const ranked = tinyPlaceRanker(query, combined).slice(0, 8);

    return new Response(
      JSON.stringify({ query, model: 'TinyPlaceRanker v1', suggestions: ranked }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
        },
      },
    );
  } catch (err) {
    console.error('places function error:', err);
    const fallback = tinyPlaceRanker(query, SEED_PLACES).slice(0, 8);
    return new Response(
      JSON.stringify({ query, model: 'TinyPlaceRanker v1', suggestions: fallback }),
      { headers: { 'Content-Type': 'application/json' } },
    );
  }
}

export const config = {
  path: '/api/places',
};
