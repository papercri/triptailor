import { translatePlaceName } from '@/utils/translatePlaces';
import { getCoordinates } from '@/utils/geocode';

export async function getCoordinatesWithTranslation(place: string) {
  // Primero traducir el lugar si existe traducción
  const translatedPlace = translatePlaceName(place);

  // Intentar con la traducción primero
  let coords = await getCoordinates(translatedPlace);

  // Si no encuentra, intentar con el nombre original
  if (!coords) {
    coords = await getCoordinates(place);
  }

  return coords;
}
