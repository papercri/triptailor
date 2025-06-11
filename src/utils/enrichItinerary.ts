import { getCoordinates } from '@/utils/geocode';
import { ItineraryItem } from '@/types/itineraryItem';


export async function enrichItineraryWithCoords(itinerary: ItineraryItem[]) {
  const enriched = await Promise.all(
    itinerary.map(async (item) => {
      const coords = await getCoordinates(item.place);
      return coords ? { ...item, lat: coords.lat, lng: coords.lng } : item;
    })
  );
  return enriched.filter((item) => item.lat && item.lng);
}
