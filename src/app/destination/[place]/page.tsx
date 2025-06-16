import { notFound } from 'next/navigation';
import DestinationClient from './DestinationClient';
import { getCoordinatesWithTranslation } from '@/utils/geoCordTranslatorHelper';
import { getCountryData } from '@/utils/getCountryData';
import { getTimeZone } from '@/utils/getTimeZone';
import { getWeather } from '@/utils/getWeather';
import { getCuisineInfo } from '@/utils/getCuisineInfo';
import { getCultureInfo } from '@/utils/getCultureInfo';
import placeTranslations from '@/data/placeTranslations.json';

const translations = placeTranslations as Record<string, string>;

type Props = {
  params: { place: string };
};

type CoordinatesWithAddress = {
  lat: number;
  lng: number;
  displayName: string;
  address?: {
    country?: string;
    [key: string]: unknown;
  };
};

function extractCountryFromDisplayName(displayName: string, fallback: string): string {
  const parts = displayName.split(', ');
  return parts[parts.length - 1] || fallback;
}

export default async function DestinationPage({ params }: Props) {
 // console.log('PLACE:', params.place);
  const place = decodeURIComponent(params.place);
  const coords = await getCoordinatesWithTranslation(place);
  //console.log('COORDS:', coords);
  if (!coords || !coords.displayName) notFound();

  const coordsWithAddress = coords as CoordinatesWithAddress;
  const countryName = coordsWithAddress.address?.country || extractCountryFromDisplayName(coords.displayName, place);
  const countryData = await getCountryData(countryName);
  const timeZone = await getTimeZone(coords.lat, coords.lng);
  
  const weatherData = await getWeather(coords.lat, coords.lng);
 

  if (!countryData || !countryData.name?.common) {
    notFound();
  }

  const parts = coords.displayName.split(', ');
  const cityName = translations[parts[0]] || parts[0];
  const countryNameFromDisplay = translations[parts[parts.length - 1]] || parts[parts.length - 1];
  const breadcrumbDisplay = `${cityName}, ${countryNameFromDisplay}`;
  const countryCommonName = countryData.name.common;
  const cuisineDataRaw = await getCuisineInfo(countryNameFromDisplay);
  const cuisineData = cuisineDataRaw ?? { title: '', extract: '', image: '', wikipediaUrl: '' };
  const cultureDataRaw = await getCultureInfo(countryNameFromDisplay);
  const cultureData = cultureDataRaw ?? { title: '', extract: '', image: '', wikipediaUrl: '' };

  return (
    <DestinationClient
      coords={coords}
      countryData={countryData}
      timeZone={timeZone}
      weatherData={weatherData}
      cityName={cityName}
      countryCommonName={countryCommonName}
      breadcrumbDisplay={breadcrumbDisplay}
      cuisineData={cuisineData}
      cultureData={cultureData}
    />
  );
}