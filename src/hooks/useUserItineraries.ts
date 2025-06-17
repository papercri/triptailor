"use client"
import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, query } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/services/firebaseConfig'

export const useUserItineraries = () => {
  const [user] = useAuthState(auth)
  const [itineraries, setItineraries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!user) {
      setItineraries([])
      setLoading(false)
      return
    }

    setLoading(true)
    const userDocRef = doc(db, 'users', user.uid)
    const itinerariesCollectionRef = collection(userDocRef, 'itineraries')
    const q = query(itinerariesCollectionRef)

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setItineraries(data)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user])

  return { itineraries, loading, error }
}
