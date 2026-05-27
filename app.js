/* global state */
let currentCondition = 'default';
let canvasAnimId = null;
let particles = [];
let starsArr = [];

/* ─── WMO Code → condition type ──────────────────────────────────────────── */
const CONDITION_MAP = {
  0: 'clear',
  1: 'clear', 2: 'cloudy', 3: 'cloudy',
  45: 'fog', 48: 'fog',
  51: 'drizzle', 53: 'drizzle', 55: 'drizzle',
  61: 'rain', 63: 'rain', 65: 'rain',
  71: 'snow', 73: 'snow', 75: 'snow', 77: 'snow',
  80: 'rain', 81: 'rain', 82: 'rain',
  85: 'snow', 86: 'snow',
  95: 'storm', 96: 'storm', 99: 'storm',
};

function resolveCondition(weatherCode, isDay) {
  const type = CONDITION_MAP[weatherCode] ?? 'cloudy';
  if (type === 'clear') return isDay ? 'clear-day' : 'clear-night';
  return type;
}

/* ─── SVG Weather Icons ───────────────────────────────────────────────────── */
const ICONS = {
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
    <circle cx="12" cy="12" r="4.5"/>
    <line x1="12" y1="2" x2="12" y2="5.5"/>
    <line x1="12" y1="18.5" x2="12" y2="22"/>
    <line x1="2" y1="12" x2="5.5" y2="12"/>
    <line x1="18.5" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="4.93" x2="7.46" y2="7.46"/>
    <line x1="16.54" y1="16.54" x2="19.07" y2="19.07"/>
    <line x1="4.93" y1="19.07" x2="7.46" y2="16.54"/>
    <line x1="16.54" y1="7.46" x2="19.07" y2="4.93"/>
  </svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>`,
  cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>`,
  rain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="16" y1="13" x2="16" y2="21"/>
    <line x1="8" y1="13" x2="8" y2="21"/>
    <line x1="12" y1="15" x2="12" y2="23"/>
    <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
  </svg>`,
  drizzle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="8" y1="19" x2="8" y2="21"/>
    <line x1="8" y1="13" x2="8" y2="15"/>
    <line x1="16" y1="19" x2="16" y2="21"/>
    <line x1="16" y1="13" x2="16" y2="15"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="12" y1="15" x2="12" y2="17"/>
    <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
  </svg>`,
  snow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
    <line x1="8" y1="16" x2="8" y2="16"/>
    <line x1="8" y1="20" x2="8" y2="20"/>
    <line x1="12" y1="18" x2="12" y2="18"/>
    <line x1="12" y1="22" x2="12" y2="22"/>
    <line x1="16" y1="16" x2="16" y2="16"/>
    <line x1="16" y1="20" x2="16" y2="20"/>
  </svg>`,
  storm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/>
    <polyline points="13 11 9 17 15 17 11 23"/>
  </svg>`,
  fog: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
    <path d="M3 15h18M3 19h18M3 11h18M5 7h14"/>
  </svg>`,
  partlyCloudy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M13 16a5 5 0 0 1 0-10c2.76 0 5 2.24 5 5"/>
    <path d="M20 20H7a4 4 0 0 1 0-8 5 5 0 0 1 9.3-2"/>
  </svg>`,
};

function getIcon(condition) {
  if (condition === 'clear-day') return ICONS.sun;
  if (condition === 'clear-night') return ICONS.moon;
  if (condition === 'cloudy') return ICONS.cloud;
  if (condition === 'rain') return ICONS.rain;
  if (condition === 'drizzle') return ICONS.drizzle;
  if (condition === 'snow') return ICONS.snow;
  if (condition === 'storm') return ICONS.storm;
  if (condition === 'fog') return ICONS.fog;
  return ICONS.cloud;
}

/* ─── Canvas Particles ────────────────────────────────────────────────────── */
function initCanvas() {
  const canvas = document.getElementById('weatherCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function resetParticles(condition) {
    if (canvasAnimId) cancelAnimationFrame(canvasAnimId);
    particles = [];
    starsArr = [];

    if (condition === 'rain' || condition === 'drizzle' || condition === 'storm') {
      const count = condition === 'drizzle' ? 55 : 110;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 6 + Math.random() * (condition === 'drizzle' ? 4 : 8),
          len: condition === 'drizzle' ? 6 + Math.random() * 6 : 10 + Math.random() * 14,
          opacity: 0.2 + Math.random() * 0.45,
          angle: condition === 'storm' ? 0.35 : 0.12,
        });
      }
    } else if (condition === 'snow') {
      for (let i = 0; i < 70; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 1.5 + Math.random() * 3,
          speed: 0.5 + Math.random() * 1.2,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.01 + Math.random() * 0.02,
          opacity: 0.4 + Math.random() * 0.5,
        });
      }
    } else if (condition === 'clear-night') {
      for (let i = 0; i < 160; i++) {
        starsArr.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 0.4 + Math.random() * 1.4,
          phase: Math.random() * Math.PI * 2,
          speed: 0.004 + Math.random() * 0.012,
        });
      }
    }

    animate(condition, ctx);
  }

  function animate(condition, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (condition === 'rain' || condition === 'drizzle' || condition === 'storm') {
      ctx.save();
      for (const p of particles) {
        ctx.strokeStyle = `rgba(180, 210, 240, ${p.opacity})`;
        ctx.lineWidth = condition === 'drizzle' ? 0.8 : 1.2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + Math.sin(p.angle) * p.len, p.y + p.len);
        ctx.stroke();
        p.y += p.speed;
        p.x += p.angle * p.speed * 0.8;
        if (p.y > canvas.height + p.len) {
          p.y = -p.len;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width) p.x = 0;
      }
      ctx.restore();
    } else if (condition === 'snow') {
      ctx.save();
      for (const p of particles) {
        p.wobble += p.wobbleSpeed;
        p.y += p.speed;
        p.x += Math.sin(p.wobble) * 0.5;
        if (p.y > canvas.height) { p.y = -4; p.x = Math.random() * canvas.width; }
        ctx.fillStyle = `rgba(220, 235, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    } else if (condition === 'clear-night') {
      ctx.save();
      const now = Date.now() * 0.001;
      for (const s of starsArr) {
        const o = 0.25 + 0.65 * (0.5 + 0.5 * Math.sin(now * s.speed + s.phase));
        ctx.fillStyle = `rgba(220, 215, 255, ${o})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    canvasAnimId = requestAnimationFrame(() => animate(condition, ctx));
  }

  window._resetParticles = resetParticles;
  resetParticles('default');
}

/* ─── Set Condition (theme + particles) ───────────────────────────────────── */
function setCondition(condition) {
  if (condition === currentCondition) return;
  currentCondition = condition;
  document.documentElement.setAttribute('data-condition', condition);
  if (window._resetParticles) window._resetParticles(condition);
}

/* ─── Comfort Arc ─────────────────────────────────────────────────────────── */
const TOTAL_CIRC = 439.82;
const ARC_PORTION = TOTAL_CIRC * 0.75;

function animateComfortArc(score) {
  const fill = document.getElementById('comfortFill');
  if (!fill) return;
  const active = ARC_PORTION * (score / 100);
  const gap = TOTAL_CIRC - active;
  fill.style.strokeDasharray = `${active.toFixed(2)} ${gap.toFixed(2)}`;
}

/* ─── Animated Temperature Counter ───────────────────────────────────────── */
function animateTemperature(target) {
  const el = document.getElementById('tempValue');
  if (!el) return;
  const start = parseInt(el.textContent) || 0;
  const duration = 700;
  const startTime = performance.now();

  function step(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(start + (target - start) * eased);
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

/* ─── Format helpers ──────────────────────────────────────────────────────── */
function formatHour(isoStr) {
  try {
    const h = parseInt(isoStr.split('T')[1].split(':')[0], 10);
    if (h === 0) return '12 AM';
    if (h < 12) return `${h} AM`;
    if (h === 12) return '12 PM';
    return `${h - 12} PM`;
  } catch { return isoStr; }
}

function formatDay(dateStr, index) {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  try {
    return days[new Date(dateStr + 'T12:00:00').getDay()];
  } catch { return dateStr; }
}

/* ─── Render Hourly Cards ─────────────────────────────────────────────────── */
function renderHourly(hourly) {
  const container = document.getElementById('hourlyScroll');
  if (!container) return;
  const now = new Date();
  const currentHour = now.getHours();

  container.innerHTML = hourly.map((h, i) => {
    const hHour = parseInt(h.time.split('T')[1].split(':')[0], 10);
    const isNow = i === 0;
    const cond = resolveCondition(h.weatherCode, hHour >= 6 && hHour < 20);
    const icon = getIcon(cond);
    const precipText = h.precipitationProbability > 5 ? `${h.precipitationProbability}%` : '';
    return `<div class="hourly-card glass-card${isNow ? ' current-hour' : ''}" style="--hi:${i}" role="listitem">
      <span class="hourly-time">${isNow ? 'Now' : formatHour(h.time)}</span>
      <span class="hourly-icon">${icon}</span>
      <span class="hourly-temp">${h.temperature}°</span>
      <span class="hourly-precip">${precipText}</span>
    </div>`;
  }).join('');
}

/* ─── Render Daily Rows ───────────────────────────────────────────────────── */
function renderDaily(daily) {
  const container = document.getElementById('dailyList');
  if (!container) return;

  const allTemps = daily.flatMap(d => [d.maxTemp, d.minTemp]);
  const globalMin = Math.min(...allTemps);
  const globalMax = Math.max(...allTemps);
  const range = globalMax - globalMin || 1;

  container.innerHTML = daily.map((d, i) => {
    const isDay = true;
    const cond = resolveCondition(d.weatherCode, isDay);
    const icon = getIcon(cond);
    const barLeft = ((d.minTemp - globalMin) / range * 100).toFixed(1);
    const barWidth = ((d.maxTemp - d.minTemp) / range * 100).toFixed(1);
    const precipText = d.precipProbMax > 5 ? `${d.precipProbMax}%` : '';
    return `<div class="daily-row glass-card" style="--di:${i}" role="listitem">
      <span class="daily-day${i === 0 ? ' today' : ''}">${formatDay(d.date, i)}</span>
      <span class="daily-icon">${icon}</span>
      <div class="daily-bar-wrap">
        <span class="daily-min">${d.minTemp}°</span>
        <div class="daily-bar">
          <div class="daily-bar-fill" style="left:${barLeft}%; width:${barWidth}%"></div>
        </div>
        <span class="daily-max">${d.maxTemp}°</span>
      </div>
      <span class="daily-precip">${precipText}</span>
    </div>`;
  }).join('');
}

/* ─── Update UI with weather data ─────────────────────────────────────────── */
function updateWeatherUI(data) {
  const { location, current, ai, hourly, daily } = data;

  const cond = resolveCondition(current.weatherCode, current.isDay);
  setCondition(cond);

  animateTemperature(current.temperature);
  document.getElementById('weatherIconEl').innerHTML = getIcon(cond);
  document.getElementById('conditionText').textContent = current.condition;
  document.getElementById('feelsLikeText').textContent = `Feels like ${current.apparentTemperature}°C`;
  document.getElementById('locationFullText').textContent = location.display_name;

  document.getElementById('badgeLocationName').textContent = location.name;
  const badge = document.getElementById('locationBadge');
  badge.style.display = 'flex';

  document.getElementById('humidityVal').textContent = `${current.humidity}%`;
  document.getElementById('windVal').textContent = `${current.windSpeed} km/h`;
  document.getElementById('pressureVal').textContent = `${current.pressure} hPa`;
  document.getElementById('cloudVal').textContent = `${current.cloudCover}%`;
  document.getElementById('rainSignalVal').textContent = `${ai.rainSignal} / 100`;
  document.getElementById('comfortDetailVal').textContent = `${ai.comfortScore} / 100`;

  document.getElementById('comfortScoreNum').textContent = ai.comfortScore;
  document.getElementById('comfortLabelStr').textContent = ai.comfortLabel;
  document.getElementById('comfortSuggestionEl').textContent = ai.suggestions[0] || '';
  animateComfortArc(ai.comfortScore);

  document.getElementById('summaryTextEl').textContent = ai.summary || '';
  document.getElementById('summarySourceEl').textContent = ai.neuralModel || 'TinyWeatherNet v1';

  renderHourly(hourly);
  renderDaily(daily);
}

/* ─── API calls ───────────────────────────────────────────────────────────── */
async function fetchWeather(place) {
  const res = await fetch(`/api/weather?place=${encodeURIComponent(place)}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to fetch weather.');
  }
  return res.json();
}

async function fetchPlaces(query) {
  const res = await fetch(`/api/places?query=${encodeURIComponent(query)}`);
  if (!res.ok) return { suggestions: [] };
  return res.json();
}

/* ─── Search ──────────────────────────────────────────────────────────────── */
let searchDebounce = null;
let activeSuggestionIdx = -1;

function setupSearch() {
  const input = document.getElementById('searchInput');
  const list = document.getElementById('suggestionsList');
  const loader = document.getElementById('searchLoader');

  input.addEventListener('input', () => {
    const q = input.value.trim();
    clearTimeout(searchDebounce);
    activeSuggestionIdx = -1;

    if (q.length < 1) {
      hideSuggestions();
      return;
    }

    loader.style.display = 'block';
    searchDebounce = setTimeout(async () => {
      try {
        const data = await fetchPlaces(q);
        loader.style.display = 'none';
        showSuggestions(data.suggestions || []);
      } catch {
        loader.style.display = 'none';
      }
    }, 280);
  });

  input.addEventListener('keydown', e => {
    const items = list.querySelectorAll('.suggestion-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeSuggestionIdx = Math.min(activeSuggestionIdx + 1, items.length - 1);
      updateActiveSuggestion(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeSuggestionIdx = Math.max(activeSuggestionIdx - 1, -1);
      updateActiveSuggestion(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeSuggestionIdx >= 0 && items[activeSuggestionIdx]) {
        items[activeSuggestionIdx].click();
      } else if (input.value.trim()) {
        searchPlace(input.value.trim());
      }
    } else if (e.key === 'Escape') {
      hideSuggestions();
      input.blur();
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-section')) hideSuggestions();
  });

  document.querySelectorAll('.hint-pill').forEach(btn => {
    btn.addEventListener('click', () => searchPlace(btn.dataset.place));
  });
}

function updateActiveSuggestion(items) {
  items.forEach((item, i) => {
    item.classList.toggle('active', i === activeSuggestionIdx);
  });
}

function showSuggestions(suggestions) {
  const list = document.getElementById('suggestionsList');
  const input = document.getElementById('searchInput');
  if (!suggestions.length) { hideSuggestions(); return; }

  list.innerHTML = suggestions.map((s, i) =>
    `<li class="suggestion-item" style="--i:${i}" role="option" data-name="${s.display_name}">
      <span class="suggestion-pin">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="10" r="3"/><path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 14 8 14s8-8.75 8-14c0-4.42-3.58-8-8-8z"/>
        </svg>
      </span>
      <div>
        <div class="suggestion-name">${s.name}</div>
        <div class="suggestion-sub">${[s.admin1, s.country].filter(Boolean).join(', ')}</div>
      </div>
    </li>`,
  ).join('');

  list.querySelectorAll('.suggestion-item').forEach(item => {
    item.addEventListener('click', () => {
      searchPlace(item.dataset.name);
    });
  });

  list.style.display = 'block';
  input.setAttribute('aria-expanded', 'true');
}

function hideSuggestions() {
  const list = document.getElementById('suggestionsList');
  const input = document.getElementById('searchInput');
  list.style.display = 'none';
  input.setAttribute('aria-expanded', 'false');
  activeSuggestionIdx = -1;
}

/* ─── Search & Load Weather ───────────────────────────────────────────────── */
let currentPlace = null;

async function searchPlace(place) {
  if (!place) return;
  currentPlace = place;

  hideSuggestions();
  document.getElementById('searchInput').value = '';

  const emptyState = document.getElementById('emptyState');
  const loadingState = document.getElementById('loadingState');
  const weatherApp = document.getElementById('weatherApp');

  emptyState.style.display = 'none';

  if (weatherApp.style.display !== 'none') {
    weatherApp.classList.add('transitioning');
    await new Promise(r => setTimeout(r, 220));
  }

  weatherApp.style.display = 'none';
  loadingState.style.display = 'flex';

  try {
    const data = await fetchWeather(place);
    loadingState.style.display = 'none';
    weatherApp.classList.remove('transitioning');
    weatherApp.style.display = 'block';
    updateWeatherUI(data);
  } catch (err) {
    loadingState.style.display = 'none';
    weatherApp.style.display = 'none';
    emptyState.style.display = 'flex';
    showToast(err.message || 'Something went wrong. Try again.');
  }
}

/* ─── Toast notification ──────────────────────────────────────────────────── */
function showToast(msg) {
  let toast = document.getElementById('toastEl');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastEl';
    toast.style.cssText = `
      position:fixed; bottom:2rem; left:50%; transform:translateX(-50%);
      background:rgba(20,20,30,0.95); color:#ede9e2;
      padding:0.7rem 1.3rem; border-radius:0.6rem;
      border:1px solid rgba(255,255,255,0.12);
      font-family:'Barlow',sans-serif; font-size:0.88rem;
      backdrop-filter:blur(12px); z-index:1000;
      animation:fade-up 0.3s ease both;
      max-width:90vw; text-align:center;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => { toast.style.opacity = '0'; }, 4000);
}

/* ─── Init ────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  setupSearch();
});
