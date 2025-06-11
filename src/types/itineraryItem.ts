export interface ItineraryItem {

  [key: string]: unknown;
   day: number;
  place: string;
  lat: number;
  lng: number;
  title?: string;
  description?: string;
}