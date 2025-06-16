
import { NextResponse } from 'next/server';
import { getCoordinatesWithTranslation } from '@/utils/geoCordTranslatorHelper';
import { getCountryData } from '@/utils/getCountryData';
import { getTimeZone } from '@/utils/getTimeZone';
import { getWeather } from '@/utils/getWeather';
import { getCuisineInfo } from '@/utils/getCuisineInfo';
import { getCultureInfo } from '@/utils/getCultureInfo';
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
    const coords = await getCoordinatesWithTranslation(decodedPlace);

    if (!coords || !coords.displayName) {
      return NextResponse.json({ error: 'Could not get coordinates' }, { status: 404 });
    }

    const parts = coords.displayName.split(', ');
    const cityName = translations[parts[0]] || parts[0];
    const countryName = coords.address?.country || parts[parts.length - 1];
    const countryNameTranslated = translations[countryName] || countryName;
    const breadcrumbDisplay = `${cityName}, ${countryNameTranslated}`;

    const countryData = await getCountryData(countryNameTranslated);
    const timeZone = await getTimeZone(coords.lat, coords.lng);
    const weatherData = await getWeather(coords.lat, coords.lng);
    const cuisineData = await getCuisineInfo(countryNameTranslated);
    const cultureData = await getCultureInfo(countryNameTranslated);

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
    console.error('Error in destination-info API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
