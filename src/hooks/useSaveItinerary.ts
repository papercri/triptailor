
import { collection, doc, addDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/services/firebaseConfig'

export const useSaveItinerary = () => {
  const [user] = useAuthState(auth)

  const saveItinerary = async (itineraryData: {
    city: string
    prompt: {
      tripType: string
      days: number
      interests: string[]
      budget: string
      season: string
    }
    stops: {
      day: number
      title: string
      description: string
      lat: number
      lng: number
      place: string
    }[]
  }) => {
    if (!user) throw new Error("User not authenticated")

    const userDocRef = doc(db, 'users', user.uid)
    const itinerariesCollectionRef = collection(userDocRef, 'itineraries')
    await addDoc(itinerariesCollectionRef, itineraryData)
  }

  return { saveItinerary }
}
