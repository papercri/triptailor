# TripTailor 🌍

[Live Demo](https://triptailor-gamma.vercel.app/) • [Source Code](https://github.com/papercri/triptailor.git)

---

## 🚀 Overview

TripTailor is an AI-powered travel planning web app built with modern technologies. It helps users discover destinations, view essential information, and get personalized trip advice via an interactive assistant. The app supports search, browsing key data for cities, and offers an intelligent “Plan Your Trip” assistant.

---

## 🔍 Features

### 1. Destination Pages

- **Search by city**: Free-text search with support for special characters and spaces.
- **Geolocation & language fallback**:
  - Using translations from `placeTranslations.json` for multilingual input.
  - Fetch coordinates via OpenStreetMap’s Nominatim API (`getCoordinatesWithTranslation`).
- **Country info**: Interfacing with Rest Countries API (`getCountryData`) for data like languages, population, currencies.
- **Timezone**: Fetched using [TimeZoneDB API](https://timezonedb.com) (`getTimeZone`).
- **Weather**: Current weather via [OpenWeatherMap API](https://openweathermap.org/api) (`getWeather`).
- **Cuisine + Culture**: Summaries fetched from Wikipedia’s `/page/summary/` (`getCuisineInfo`, `getCultureInfo`).
- **Background Image**: Country visuals via Unsplash API (`getCountryBackgroundPhoto`).
- **Map Embedding**: Leaflet map centered on city.
- **Responsive UI**: Layout supports desktop and mobile; skeleton/fallback spinners during load.

### 2. Travel Assistant

- Interactive modal that opens only when user is authenticated.
- Guided multi-step form capturing traveler preferences:
  - Traveler type (e.g., Adventure, Culture, Luxury…)
  - Budget per day
  - Trip duration
  - Preferred season
  - Interests (e.g., Museums, Nature, Gastronomy)
- Feeds into AI assistant to generate tailored trip advice.

### 3. Authentication

- Email/password signup & login using Firebase Auth.
- Persistent sessions with `UserContext`.
- Route protection: planning modal redirects to `/auth/signin?callbackUrl=<current-destination>` if user not logged in.
- After login/signup, user is returned to the destination page they came from.

### 4. Saved Itineraries (Future)

- Placeholder for “My Itineraries” page.
- Placeholder link in header when logged in.

### 5. UI & Components

- **React + Next.js 15 (App Router)**: Full SSR/SSG and client interactions.
- **Sass + Tailwind CSS** for styling.
- **Framer Motion** for animations (hero backgrounds, step transitions).
- **React Slick** for homepage city carousel (mobile swipe support, desktop arrows).
- **Toastify** for user feedback (toasts).
- **Leaflet** for distributing interactive maps.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS, Sass
- **Animations**: Framer Motion, Lucide & React-icons
- **Data Fetching**: SWR
- **APIs**:
  - Geocoding: [Nominatim OpenStreetMap](https://nominatim.openstreetmap.org/)
  - Country Info: [REST Countries](https://restcountries.com/)
  - Weather: [OpenWeatherMap](https://openweathermap.org/api)
  - Timezone: [TimeZoneDB](https://timezonedb.com/)
  - Wikipedia summaries
  - Unsplash: photo search
- **Auth**: Firebase Authentication
- **Maps**: Leaflet
- **Deployment**: Vercel, standalone build config in `next.config.js`

---

## 📦 Installation & Running Locally

```bash
git clone https://github.com/papercri/triptailor.git
cd triptailor

npm install

# set up environment variables:
#   OPENWEATHER_API_KEY
#   TIMEZONEDB_API_KEY
#   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
#   FIREBASE_API_KEY, etc.

npm run dev
```

Build for production:

```bash
npm run build
npm start
```

---

## ⚙️ API Overview

### `/api/destination-info?place=...`
SSR route collates:
1. Coordinates (Nominatim)
2. Country data
3. Timezone
4. Weather
5. Cuisine & Culture
Returns aggregated JSON with meta debug info.

### Wikipedia Summary Endpoints:
- `getCuisineInfo(country)`
- `getCultureInfo(country)`

Both call:
```
https://en.wikipedia.org/api/rest_v1/page/summary/Cuisine_of_<Country>
https://en.wikipedia.org/api/rest_v1/page/summary/Culture_of_<Country>
```

### Unsplash Background:
```ts
GET https://api.unsplash.com/search/photos?query=<Country>&orientation=landscape&per_page=1&client_id=<API_KEY>
```

---

## 🧠 How It Works

1. **Search a destination** – triggers dynamic route `/destination/[place]`
2. Server-side fetch builds metadata via chained calls to APIs
3. Client-side renders hero, quick info, map, cuisine, culture, and weather
4. Users can click “Plan your trip”:
   - If authenticated, modal opens with step-by-step assistant
   - Otherwise, prompts login & redirects back afterward
5. UI is fully responsive: hero background animates, carousel, scrollable sections

---

## ✅ To Do / Future Improvements

- Save trip itineraries to user profile
- Add bookmarking & history
- Deploy user profile & saved trips pages
- Accessibility tweaks (a11y)
- Internationalization (content translations)
- Add map markers for POIs & itinerary

---

## ℹ️ Got Questions? Missing Info?

Let me know if any API details or features above are incomplete or need more depth!

---

**Enjoy TripTailor!** ✈️