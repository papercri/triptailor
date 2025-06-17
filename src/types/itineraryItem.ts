
export interface ItineraryItem {

  day: number
  activity: string
  location?: string
}

export interface Itinerary {
  id: string
  destination: string
  createdAt: string
  email?: string
  itinerary: ItineraryItem[]
  prompt: string | object 
}