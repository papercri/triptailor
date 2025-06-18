
export interface ItineraryItem {

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
  destination: string
  createdAt: string
  email?: string
  itinerary: ItineraryItem[]
  prompt: string | object 
}