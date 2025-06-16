// Translate place names to coordinates using a translation map and geocoding service

import { getCoordinates } from '@/utils/geocode';
import placeTranslations from '@/data/placeTranslations.json' assert { type: "json" };
const translations = placeTranslations as Record<string, string>;

export async function getCoordinatesWithTranslation(place: string) {
  const translatedPlace = translations[place] || place;

  let coords = await getCoordinates(translatedPlace);

  if (!coords) {
    coords = await getCoordinates(place);
  }

  return coords;
}
