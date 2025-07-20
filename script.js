// Weatherly App with Full Translation and Icon Stats (partial, modularized)
// API and DOM Elements
const API_KEY = '5c43dbc853247bdc9329717a7d80e720';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherMain = document.getElementById('weatherMain');
const weatherStats = document.getElementById('weatherStats');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMsg = document.getElementById('errorMsg');
const themeSwitcher = document.getElementById('themeSwitcher');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const unitSelect = document.getElementById('unitSelect');
const langSelect = document.getElementById('langSelect');
const closeSettings = document.getElementById('closeSettings');

// Translation map for all UI text
const translations = {
  en: {
    title: 'Weatherly - Minimalist Weather App',
    appName: 'Weatherly',
    settings: 'Settings',
    searchCity: 'Search city',
    getWeather: '→',
    settingsTitle: 'Settings',
    units: 'Units:',
    celsius: 'Celsius (°C)',
    fahrenheit: 'Fahrenheit (°F)',
    language: 'Language:',
    english: 'English',
    spanish: 'Spanish',
    french: 'French',
    german: 'German',
    chinese: 'Chinese',
    close: 'Close',
    poweredBy: 'Powered by <a href="https://openweathermap.org/" target="_blank" rel="noopener">OpenWeatherMap</a>',
    humidity: 'Humidity',
    wind: 'Wind Speed',
    feelsLike: 'Feels like',
    minMax: 'Min / Max',
    pressure: 'Pressure',
    cityNotFound: 'City not found',
  },
  es: {
    title: 'Weatherly - Aplicación del Clima Minimalista',
    appName: 'Weatherly',
    settings: 'Configuración',
    searchCity: 'Buscar ciudad',
    getWeather: '→',
    settingsTitle: 'Configuración',
    units: 'Unidades:',
    celsius: 'Celsius (°C)',
    fahrenheit: 'Fahrenheit (°F)',
    language: 'Idioma:',
    english: 'Inglés',
    spanish: 'Español',
    french: 'Francés',
    german: 'Alemán',
    chinese: 'Chino',
    close: 'Cerrar',
    poweredBy: 'Desarrollado por <a href="https://openweathermap.org/" target="_blank" rel="noopener">OpenWeatherMap</a>',
    humidity: 'Humedad',
    wind: 'Velocidad del viento',
    feelsLike: 'Sensación térmica',
    minMax: 'Mín / Máx',
    pressure: 'Presión',
    cityNotFound: 'Ciudad no encontrada',
  },
  fr: {
    title: 'Weatherly - Application Météo Minimaliste',
    appName: 'Weatherly',
    settings: 'Paramètres',
    searchCity: 'Rechercher une ville',
    getWeather: '→',
    settingsTitle: 'Paramètres',
    units: 'Unités:',
    celsius: 'Celsius (°C)',
    fahrenheit: 'Fahrenheit (°F)',
    language: 'Langue:',
    english: 'Anglais',
    spanish: 'Espagnol',
    french: 'Français',
    german: 'Allemand',
    chinese: 'Chinois',
    close: 'Fermer',
    poweredBy: 'Propulsé par <a href="https://openweathermap.org/" target="_blank" rel="noopener">OpenWeatherMap</a>',
    humidity: 'Humidité',
    wind: 'Vitesse du vent',
    feelsLike: 'Ressenti',
    minMax: 'Min / Max',
    pressure: 'Pression',
    cityNotFound: 'Ville introuvable',
  },
  de: {
    title: 'Weatherly - Minimalistische Wetter-App',
    appName: 'Weatherly',
    settings: 'Einstellungen',
    searchCity: 'Stadt suchen',
    getWeather: '→',
    settingsTitle: 'Einstellungen',
    units: 'Einheiten:',
    celsius: 'Celsius (°C)',
    fahrenheit: 'Fahrenheit (°F)',
    language: 'Sprache:',
    english: 'Englisch',
    spanish: 'Spanisch',
    french: 'Französisch',
    german: 'Deutsch',
    chinese: 'Chinesisch',
    close: 'Schließen',
    poweredBy: 'Bereitgestellt von <a href="https://openweathermap.org/" target="_blank" rel="noopener">OpenWeatherMap</a>',
    humidity: 'Luftfeuchtigkeit',
    wind: 'Windgeschwindigkeit',
    feelsLike: 'Gefühlt',
    minMax: 'Min / Max',
    pressure: 'Druck',
    cityNotFound: 'Stadt nicht gefunden',
  },
  zh_cn: {
    title: 'Weatherly - 极简天气应用',
    appName: 'Weatherly',
    settings: '设置',
    searchCity: '搜索城市',
    getWeather: '→',
    settingsTitle: '设置',
    units: '单位:',
    celsius: '摄氏度 (°C)',
    fahrenheit: '华氏度 (°F)',
    language: '语言:',
    english: '英语',
    spanish: '西班牙语',
    french: '法语',
    german: '德语',
    chinese: '中文',
    close: '关闭',
    poweredBy: '由 <a href="https://openweathermap.org/" target="_blank" rel="noopener">OpenWeatherMap</a> 提供',
    humidity: '湿度',
    wind: '风速',
    feelsLike: '体感温度',
    minMax: '最低 / 最高',
    pressure: '气压',
    cityNotFound: '未找到城市',
  }
};

// Stat icons
const statIcons = {
  humidity: '<svg class="stat-icon" viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M12 3.25C12 3.25 5 11.5 5 15.5C5 19.09 8.13 21.75 12 21.75C15.87 21.75 19 19.09 19 15.5C19 11.5 12 3.25 12 3.25ZM12 19.75C9.24 19.75 7 17.51 7 15.5C7 13.5 12 7.25 12 7.25C12 7.25 17 13.5 17 15.5C17 17.51 14.76 19.75 12 19.75Z"/></svg>',
  wind: '<svg class="stat-icon" viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M4 12h13a3 3 0 1 1 0 6H6"/></svg>',
  feelsLike: '<svg class="stat-icon" viewBox="0 0 24 24" width="32" height="32"><circle cx="12" cy="12" r="8" fill="#4f8cff" opacity="0.2"/><text x="12" y="16" text-anchor="middle" font-size="12" fill="#4f8cff">🌡️</text></svg>',
  minMax: '<svg class="stat-icon" viewBox="0 0 24 24" width="32" height="32"><rect x="6" y="10" width="12" height="4" fill="#4f8cff" opacity="0.2"/><text x="12" y="16" text-anchor="middle" font-size="12" fill="#4f8cff">↕️</text></svg>',
  pressure: '<svg class="stat-icon" viewBox="0 0 24 24" width="32" height="32"><circle cx="12" cy="12" r="8" fill="#4f8cff" opacity="0.2"/><text x="12" y="16" text-anchor="middle" font-size="12" fill="#4f8cff">🧭</text></svg>'
};

// Weather Quotes and Songs by Condition
const weatherQuotes = {
  Clear: [
    "It's a bright sunny day! ☀️",
    "Blue skies ahead!",
    "Enjoy the sunshine!",
    "Perfect day for a walk!"
  ],
  Clouds: [
    "Clouds can't hide your shine! ☁️",
    "A cloudy day is no match for a sunny disposition.",
    "Let the clouds inspire your dreams."
  ],
  Rain: [
    "Let the rain wash away your worries. 🌧️",
    "Rainy days are perfect for cozy moments.",
    "Dance in the rain!"
  ],
  Snow: [
    "Snowflakes are kisses from heaven. ❄️",
    "Bundle up, it's snowing!",
    "Every snowflake is unique, just like you."
  ],
  Thunderstorm: [
    "Storms make trees take deeper roots. ⛈️",
    "Thunder is good, thunder is impressive."
  ],
  Mist: [
    "Let the mist bring mystery to your day. 🌫️",
    "Mist in the air, magic everywhere."
  ],
  Drizzle: [
    "A little drizzle never hurt anyone. 🌦️",
    "Drizzle days are for dreaming."
  ],
  Fog: [
    "Fog is just clouds that have come to visit. 🌫️",
    "Let the fog inspire your imagination."
  ],
  default: [
    "Whatever the weather, always bring your own sunshine.",
    "Weather is a great metaphor for life."
  ]
};

// Weather Songs by Condition
const weatherSongs = {
  Clear: [
    { title: "Blinding Lights", artist: "The Weeknd", url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ" },
    { title: "Sunflower", artist: "Post Malone & Swae Lee", url: "https://www.youtube.com/watch?v=ApXoWvfEYVU" },
    { title: "Good Life", artist: "G-Eazy & Kehlani", url: "https://www.youtube.com/watch?v=SUfzURgG8xw" }
  ],
  Rain: [
    { title: "Rain On Me", artist: "Lady Gaga & Ariana Grande", url: "https://www.youtube.com/watch?v=AoAm4om0wTs" },
    { title: "Let It Rain", artist: "A Boogie Wit Da Hoodie", url: "https://www.youtube.com/watch?v=6Q6nXq6y2w8" },
    { title: "Drip Too Hard", artist: "Lil Baby & Gunna", url: "https://www.youtube.com/watch?v=Kvl6yJp2nno" }
  ],
  Clouds: [
    { title: "Clouds", artist: "NF", url: "https://www.youtube.com/watch?v=OvyTY_oYR_c" },
    { title: "Cloudy Day", artist: "Tones And I", url: "https://www.youtube.com/watch?v=K5KAc5CoCuk" }
  ],
  Snow: [
    { title: "Snowman", artist: "Sia", url: "https://www.youtube.com/watch?v=JHsvKKpQAq4" },
    { title: "Ice Tray", artist: "Quavo & Lil Yachty", url: "https://www.youtube.com/watch?v=1Q8fG0TtVAY" }
  ],
  Thunderstorm: [
    { title: "Thunder", artist: "Imagine Dragons", url: "https://www.youtube.com/watch?v=fKopy74weus" },
    { title: "HUMBLE.", artist: "Kendrick Lamar", url: "https://www.youtube.com/watch?v=tvTRZJ-4EyI" }
  ],
  Mist: [
    { title: "Goosebumps", artist: "Travis Scott", url: "https://www.youtube.com/watch?v=Dst9gZkq1a8" }
  ],
  Drizzle: [
    { title: "Drip Too Hard", artist: "Lil Baby & Gunna", url: "https://www.youtube.com/watch?v=Kvl6yJp2nno" },
    { title: "Rain", artist: "Aitch & AJ Tracey ft. Tay Keith", url: "https://www.youtube.com/watch?v=E1E6Z5JUgqU" }
  ],
  Fog: [
    { title: "No Role Modelz", artist: "J. Cole", url: "https://www.youtube.com/watch?v=jcF5HtGvXyE" }
  ],
  default: [
    { title: "God's Plan", artist: "Drake", url: "https://www.youtube.com/watch?v=xpVfcZ0ZcFM" },
    { title: "Sunflower", artist: "Post Malone & Swae Lee", url: "https://www.youtube.com/watch?v=ApXoWvfEYVU" }
  ]
};

function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeSwitcher.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}
themeSwitcher.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark'));
});
setTheme(localStorage.getItem('theme') === 'dark');

let unit = localStorage.getItem('unit') || 'metric';
let lang = localStorage.getItem('lang') || 'en';
unitSelect.value = unit;
langSelect.value = lang;

function translatePage() {
  const dict = translations[lang] || translations['en'];
  document.title = dict.title;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.placeholder = dict[key];
  });
  document.querySelectorAll('option[data-i18n]').forEach(opt => {
    const key = opt.getAttribute('data-i18n');
    if (dict[key]) opt.textContent = dict[key];
  });
}
langSelect.addEventListener('change', () => {
  lang = langSelect.value;
  localStorage.setItem('lang', lang);
  translatePage();
  if (cityInput.value) fetchWeather(cityInput.value);
});
unitSelect.addEventListener('change', () => {
  unit = unitSelect.value;
  localStorage.setItem('unit', unit);
  if (cityInput.value) fetchWeather(cityInput.value);
});
settingsBtn.addEventListener('click', () => {
  settingsPanel.classList.toggle('visible');
});
closeSettings.addEventListener('click', () => settingsPanel.classList.remove('visible'));
function showSpinner(show) {
  loadingSpinner.classList.toggle('hidden', !show);
}
function showError(msg) {
  errorMsg.textContent = msg;
  setTimeout(() => errorMsg.textContent = '', 4000);
}
function getUnitSymbol() {
  return unit === 'metric' ? '°C' : '°F';
}
function getWindUnit() {
  return unit === 'metric' ? 'm/s' : 'mph';
}
async function fetchWeather(city) {
  if (!city) return;
  showSpinner(true);
  errorMsg.textContent = '';
  try {
    const res = await fetch(`${BASE_URL}weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}&lang=${lang}`);
    if (!res.ok) throw new Error(translations[lang].cityNotFound);
    const data = await res.json();
    renderWeather(data);
  } catch (err) {
    showError(err.message);
    weatherMain.innerHTML = '';
    weatherStats.innerHTML = '';
  } finally {
    showSpinner(false);
  }
}
function getSymbol(main) {
  const weatherSymbols = {
    Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Smoke: '🌫️', Haze: '🌫️', Dust: '🌫️', Fog: '🌫️', Sand: '🌫️', Ash: '🌫️', Squall: '💨', Tornado: '🌪️'
  };
  return weatherSymbols[main] || '❔';
}
function getWeatherQuote(main) {
  const quotes = weatherQuotes[main] || weatherQuotes.default;
  return quotes[Math.floor(Math.random() * quotes.length)];
}
function getWeatherSongs(main) {
  return weatherSongs[main] || weatherSongs.default;
}
function renderWeather(data) {
  const dict = translations[lang] || translations['en'];
  const symbol = getSymbol(data.weather[0].main);
  weatherMain.innerHTML = `
    <span class="weather-symbol">${symbol}</span>
    <h2>${data.name}, ${data.sys.country}</h2>
    <div class="temp">${Math.round(data.main.temp)}${getUnitSymbol()}</div>
    <div class="desc">${data.weather[0].main} - ${data.weather[0].description}</div>
    <div class="weather-quote aesthetic-quote">
      <span class="quote-icon">❝</span>
      <span class="quote-text">${getWeatherQuote(data.weather[0].main)}</span>
      <span class="quote-icon">❞</span>
    </div>
    <div class="weather-songs">
      <span>Songs for this weather:</span>
      <div class="song-pill-list">
        ${getWeatherSongs(data.weather[0].main).map(song => `
          <a class="song-pill" href="${song.url}" target="_blank" title="${song.title} - ${song.artist}">
            <span class="song-icon">🎵</span>
            <span class="song-title">${song.title}</span>
            <span class="song-artist">${song.artist}</span>
          </a>
        `).join('')}
      </div>
    </div>
  `;
  weatherStats.innerHTML = `
    <div class="stat">${statIcons.humidity}<div>${data.main.humidity}%</div><div class="stat-label">${dict.humidity}</div></div>
    <div class="stat">${statIcons.wind}<div>${data.wind.speed} ${getWindUnit()}</div><div class="stat-label">${dict.wind}</div></div>
    <div class="stat">${statIcons.feelsLike}<div>${Math.round(data.main.feels_like)}${getUnitSymbol()}</div><div class="stat-label">${dict.feelsLike}</div></div>
    <div class="stat">${statIcons.minMax}<div>${Math.round(data.main.temp_min)}${getUnitSymbol()} / ${Math.round(data.main.temp_max)}${getUnitSymbol()}</div><div class="stat-label">${dict.minMax}</div></div>
    <div class="stat">${statIcons.pressure}<div>${data.main.pressure} hPa</div><div class="stat-label">${dict.pressure}</div></div>
  `;
  document.body.style.background = getBackgroundByWeather(data.weather[0].main);
}
function getBackgroundByWeather(main) {
  switch(main) {
    case 'Clear': return 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)';
    case 'Clouds': return 'linear-gradient(135deg, #d7d2cc 0%, #304352 100%)';
    case 'Rain': return 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)';
    case 'Thunderstorm': return 'linear-gradient(135deg, #232526 0%, #414345 100%)';
    case 'Snow': return 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)';
    case 'Drizzle': return 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)';
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog':
    case 'Sand':
    case 'Ash': return 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)';
    case 'Squall': return 'linear-gradient(135deg, #b6fbff 0%, #83a4d4 100%)';
    case 'Tornado': return 'linear-gradient(135deg, #232526 0%, #bdc3c7 100%)';
    default: return 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)';
  }
}

// Form Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;
  fetchWeather(city);
  cityInput.value = '';
});

// Optionally, fetch weather for a default city on load
translatePage();
fetchWeather('London');
