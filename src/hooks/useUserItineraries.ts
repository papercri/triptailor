// lib/hooks/useUserItineraries.ts
import { useEffect, useState } from 'react'
import { collection, getDocs, doc } from 'firebase/firestore'
import { auth, db } from '@/services/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'

interface Itinerary {
  id: string
  // Add other fields as needed, for example:
  // name: string
  // startDate: string
  // endDate: string
  // etc.
}

export const useUserItineraries = () => {
  const [user] = useAuthState(auth)
  const [itineraries, setItineraries] = useState<Itinerary[]>([])

  useEffect(() => {
    if (!user) return

    const fetchItineraries = async () => {
      const itinerariesRef = collection(doc(db, 'users', user.uid), 'itineraries')
      const snapshot = await getDocs(itinerariesRef)
      setItineraries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }

    fetchItineraries()
  }, [user])

  return { itineraries }
}
