import { NextResponse } from 'next/server';
import { getCoordinatesWithTranslation } from '@/utils/geoCordTranslatorHelper';
import { getCountryData } from '@/services/getCountryData';
import { getTimeZone } from '@/services/getTimeZone';
import { getWeather } from '@/services/getWeather';
import { getCuisineInfo } from '@/services/getCuisineInfo';
import { getCultureInfo } from '@/services/getCultureInfo';
import placeTranslations from '@/data/placeTranslations.json';

const translations = placeTranslations as Record<string, string>;

async function safeFetchJson<T>(fn: () => Promise<T>, label: string): Promise<T | null> {
  try {
    const result = await fn();
    return result;
  } catch (error) {

    if (error instanceof SyntaxError) {
      console.error(`❌ SyntaxError detected in ${label}:`, error);
    }
    console.error(`❌ Error fetching ${label}:`, error);
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const place = searchParams.get('place');

  if (!place) {
    return NextResponse.json({ error: 'Missing place parameter' }, { status: 400 });
  }

  try {
    const decodedPlace = decodeURIComponent(place);
    console.log('🔍 Decoded place:', decodedPlace);
    const coords = await getCoordinatesWithTranslation(decodedPlace);
    console.log('📍 Coords:', coords);
    if (!coords || !coords.displayName) {
      return NextResponse.json({ error: 'Could not get coordinates' }, { status: 404 });
    }

    const parts = coords.displayName.split(', ');
    const cityName = translations[parts[0]] || parts[0];
    const countryName = coords.address?.country || parts[parts.length - 1];
    console.log('🌍 Country:', countryName);
    const countryNameTranslated = translations[countryName] || countryName;
    const breadcrumbDisplay = `${cityName}, ${countryNameTranslated}`;

    // Aquí hacemos fetch con logs ampliados
    const countryData = await safeFetchJson(() => getCountryData(countryNameTranslated), 'countryData');
    const timeZone = await safeFetchJson(() => getTimeZone(coords.lat, coords.lng), 'timeZone');
    const weatherData = await safeFetchJson(() => getWeather(coords.lat, coords.lng), 'weatherData');
    const cuisineData = await safeFetchJson(() => getCuisineInfo(countryNameTranslated), 'cuisineData');
    const cultureData = await safeFetchJson(() => getCultureInfo(countryNameTranslated), 'cultureData');

    return NextResponse.json({
      coords,
      cityName,
      breadcrumbDisplay,
      countryData,
      countryCommonName: countryData?.name?.common ?? '',
      timeZone,
      weatherData,
      cuisineData,
      cultureData,
    });
  } catch (error) {
    console.error("API Route Error:", error);

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json({ error: "Failed to connect to external API" }, { status: 503 });
    }

    if (typeof error === "object" && error !== null && "name" in error && (error as { name: string }).name === "AbortError") {
      return NextResponse.json({ error: "Request timeout" }, { status: 504 });
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON response from external API" }, { status: 502 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
