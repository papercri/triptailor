
export interface ItineraryItem {

  date: string

  day: number
  activity: string
  location?: string
  lat:number
  lng:number
  place: string
  description?: string
  title?: string
}

export interface Itinerary {
  id: string
  key: string 
  destination: string
  createdAt: string
  email?: string
  itinerary: ItineraryItem[]
  prompt: {
    travelerType: string;
    budget: string;
    days: number;
    season: string;
    interests: string[];
  };
  
}