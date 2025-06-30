# TripTailor 🌍

[Live Demo](https://triptailor-ai.vercel.app/) • [Source Code](https://github.com/papercri/triptailor.git)

---

## Overview

TripTailor is an AI-powered travel planning web app built with modern technologies. It helps users discover destinations, view essential information, and get personalized trip advice via an interactive assistant. The app supports search, browsing key data for cities, and offers an intelligent “Plan Your Trip” assistant.

---

## Features

### 1. Home Page 

The **Home Page** of TripTailor serves as the main entry point to the app and includes:

- **Smart Search Bar**:  
  Users can search for a destination using natural language. The app supports spaces, special characters, and fallback translations via `placeTranslations.json`.

- **AI-generated summary and recommendations**:  
  After completing the assistant, the app uses the **OpenAI API** to generate a custom trip summary and suggestions tailored to the input provided.

- **City Carousel**:  
  A responsive React Slick carousel displays a random selection of featured cities for quick discovery, with swipe support on mobile and arrow controls on desktop.

The design is responsive and animated with Framer Motion for smooth transitions and engaging user experience.

### 2. Destination Pages

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

### 3. Travel Assistant

- Interactive modal that opens only when user is authenticated.
- Guided multi-step form capturing traveler preferences:
  - Traveler type (e.g., Adventure, Culture, Luxury…)
  - Budget per day
  - Trip duration
  - Preferred season
  - Interests (e.g., Museums, Nature, Gastronomy)
- Feeds into AI assistant to generate tailored trip advice.
- Generated itineraries can be **saved as PDF** for offline use and easy sharing.

### 4. Authentication

- **Email/password signup & login** using Firebase Authentication.
- **Persistent user sessions** managed through a global `UserContext`.
- **Route protection**:
  - If a user clicks "Plan your trip" without being logged in, they are redirected to `/auth/signin?callbackUrl=<current-destination>`.
  - After login/signup, the user is returned to the page they were on.
- **Form validation & error handling**:
  - Inputs for email and password are validated (e.g., required, valid email format, minimum length).
  - Real-time feedback is shown for invalid credentials, registration errors (e.g., email already in use), and empty fields.
  - All error states are handled gracefully with informative messages using `Toastify` or inline hints.

### 5. Saved Itineraries

Saved itineraries are stored per user in **Firebase Firestore**. This feature is only accessible to **authenticated users**.

- If a user creates a new itinerary for the same destination, they can choose to overwrite the existing one or keep both.
- Each itinerary includes:
  - Travel preferences (traveler type, season, budget, etc.)
  - AI-generated summary and recommendations
  - A list of suggested locations to visit
  - Each location is enriched with **geographic coordinates** using the `enrichItineraryWithCoords` function (calls OpenStreetMap)
  - Locations are displayed as **interactive pins on a Leaflet map**, each with a **popover** showing the name and a short description

#### Filtering & Sorting

The Saved Itineraries page includes a dynamic client-side **filter and sort panel** to help users find trips easily:

- **Search**: Free-text search across destination names
- **Traveler Type**: Filter by profile (e.g., Adventure, Culture)
- **Season**: Filter by preferred travel time (e.g., Summer, Winter)
- **Budget**: Filter by daily spending range
- **Interests**: Multi-select by category (e.g., Museums, Nature)
- **Duration**: Filter by trip length

**Sort options**:
- Date Created (default)
- Budget (ascending/descending)
- Duration (short to long / long to short)

### 6. UI & Components

- **React + Next.js 15 (App Router)**: Full SSR/SSG and client interactions.
- **Sass + Tailwind CSS** for styling.
- **Framer Motion** for animations (hero backgrounds, step transitions).
- **React Slick** for homepage city carousel (mobile swipe support, desktop arrows).
- **Toastify** for user feedback (toasts).
- **Leaflet** for distributing interactive maps.

---

## Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS, Sass
- **Animations**: Framer Motion, Lucide & React-icons
- **Data Fetching**: SWR
- **APIs**:
  - Geocoding: [Nominatim OpenStreetMap](https://nominatim.openstreetmap.org/)
  - Country Info: [REST Countries](https://restcountries.com/)
  - Weather: [OpenWeatherMap](https://openweathermap.org/api)
  - Timezone: [TimeZoneDB](https://timezonedb.com/)
  - Wikimedia REST API [Wikimedia REST API](https://en.wikipedia.org/api/rest_v1/)
  - Unsplash: photo search [Unsplash](hhttps://unsplash.com/)
  - Personalized trip suggestions: [OpenAI API](https://platform.openai.com/) — GPT-based prompts tailored to user input (budget, travel style, season, interests)
- **Auth**: Firebase Authentication
- **Database**: Firebase Firestore
- **Maps**: Leaflet
- **Deployment**: Vercel, standalone build config in `next.config.js`

---

## Installation & Running Locally

```bash
git clone https://github.com/papercri/triptailor.git
cd triptailor

npm install

set up environment variables:
OPENAI_API_KEY
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
NEXT_PUBLIC_TIMEZONEDB_API_KEY
NEXT_PUBLIC_OPENWEATHER_API_KEY
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_DATABASE_URL
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID

npm run dev
```

Build for production:

```bash
npm run build
npm start
```

---

## How It Works

1. **Search a destination** – triggers dynamic route `/destination/[place]`
2. Server-side fetch builds metadata via chained calls to APIs
3. Client-side renders hero, quick info, map, cuisine, culture, and weather
4. Users can click “Plan your trip”:
   - If authenticated, modal opens with step-by-step assistant
   - Otherwise, prompts login & redirects back afterward
5. UI is fully responsive: hero background animates, carousel, scrollable sections

---

## To Do / Future Improvements

- Add bookmarking & history
- Add admin user and dashboard
- Accessibility tweaks (a11y)
- Internationalization (content translations)

---

## Got Questions? Missing Info?

Let me know if any API details or features above are incomplete or need more depth!

---

## Screenshots

![Home Page](/images/readme/hp-screenshot.png)
![Home Page Mobile](/images/readme/home-mobile.png)
![Destination Page](/images/readme/destination.png)
![AI Planner](/images/readme/ai-planner.png)
![Saved Itineraries Page](/images/readme/user-page-screenshot.png)
![Saved Itineraries Page Mobile](/images/readme/user-page-mobile.png)
![Saved Itineraries Filters Mobile](/images/readme/filters-mobile.png)
![Itinerary Modal](/images/readme/itinerary-modal.png)