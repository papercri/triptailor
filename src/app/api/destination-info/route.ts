'use client';
// This File is uset to fetch destination information based on a place parameter.
// It retrieves coordinates, country data, time zone, weather, cuisine, and culture information.

import { NextResponse } from 'next/server';
import { getCoordinatesWithTranslation } from '@/utils/geoCordTranslatorHelper';
import { getCountryData } from '@/services/getCountryData';
import { getTimeZone } from '@/services/getTimeZone';
import { getWeather } from '@/services/getWeather';
import { getCuisineInfo } from '@/services/getCuisineInfo';
import { getCultureInfo } from '@/services/getCultureInfo';
import placeTranslations from '@/data/placeTranslations.json';

const translations = placeTranslations as Record<string, string>;

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

    // Hacemos try/catch individual para cada fetch externo
    let countryData = null;
    try {
      countryData = await getCountryData(countryNameTranslated);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }

    let timeZone = null;
    try {
      timeZone = await getTimeZone(coords.lat, coords.lng);
    } catch (error) {
      console.error('Error fetching time zone:', error);
    }

    let weatherData = null;
    try {
      weatherData = await getWeather(coords.lat, coords.lng);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }

    let cuisineData = null;
    try {
      cuisineData = await getCuisineInfo(countryNameTranslated);
    } catch (error) {
      console.error('Error fetching cuisine info:', error);
    }

    let cultureData = null;
    try {
      cultureData = await getCultureInfo(countryNameTranslated);
    } catch (error) {
      console.error('Error fetching culture info:', error);
    }


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
    // Handle different types of errors
    console.error("API Route Error:", error)

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json({ error: "Failed to connect to external API" }, { status: 503 })
    }

    if (typeof error === "object" && error !== null && "name" in error && (error as { name: string }).name === "AbortError") {
      return NextResponse.json({ error: "Request timeout" }, { status: 504 })
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON response from external API" }, { status: 502 })
    }

    // Generic error fallback
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
