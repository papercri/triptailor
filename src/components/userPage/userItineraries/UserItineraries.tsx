"use client"
import React from 'react'
import { useUserItineraries } from '@/hooks/useUserItineraries'

export default function UserItinerariesPage() {
  const { itineraries, loading, error } = useUserItineraries()

  if (loading) return <p>Loading itineraries...</p>
  if (error) return <p>Error loading itineraries: {error.message}</p>
  if (itineraries.length === 0) return <p>No itineraries saved yet.</p>

  return (
    <div>
      <h1>Your saved itineraries</h1>
      <ul>
        {itineraries.map((itinerary) => (
          <li key={itinerary.id}>
            <strong>Destination:</strong> {itinerary.destination ?? '—'} <br />
            <strong>Created:</strong> {new Date(itinerary.createdAt).toLocaleDateString()} <br />
            {itinerary.prompt ? (
              <>
                <strong>Trip Type:</strong> {itinerary.prompt.travelerType ?? '—'} <br />
                <strong>Days:</strong> {itinerary.prompt.days ?? '—'} <br />
                <strong>Budget:</strong> {itinerary.prompt.budget ?? '—'} <br />
                <strong>Season:</strong> {itinerary.prompt.season ?? '—'} <br />
                <strong>Interests:</strong> {itinerary.prompt.interests?.join(', ') ?? '—'} <br />
              </>
            ) : (
              <em>..</em>
            )}
            <details>
              <summary>Stops</summary>
              <ul>
                {itinerary.itinerary?.map((stop: any, index: number) => (
                  <li key={index}>
                    <strong>Day {stop.day} - {stop.title}</strong><br />
                    {stop.place}<br />
                    {stop.description}
                  </li>
                )) ?? <li>No stops</li>}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  )
}
