
'use client';

import { useEffect, useState } from "react";
import { getUserItineraries } from "@/utils/getUserItineraries";
import { useUser } from "@/context/UserContext";

interface ItineraryItem {
  day: number;
  title: string;
}

interface Itinerary {
  id: string;
  destination: string;
  createdAt: string | number | Date;
  itinerary: ItineraryItem[];
}

export default function UserItineraries() {
  const { user } = useUser();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserItineraries(user.uid).then((data) => {
        setItineraries(data);
        console.log(user);
        setLoading(false);
      });
    }
  }, [user]);

  if (!user) return <p>Please log in to see your itineraries.</p>;
  if (loading) return <p>Loading itineraries...</p>;
  if (itineraries.length === 0) return <p>You haven&#39;t saved any itineraries yet.</p>;

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-bold">Your Itineraries</h2>
      {itineraries.map((itinerary) => (
        <div key={itinerary.id} className="border p-4 rounded shadow bg-white">
          <h3 className="font-semibold">{itinerary.destination}</h3>
          <p className="text-sm text-gray-500">{new Date(itinerary.createdAt).toLocaleString()}</p>
          <ul className="list-disc ml-5 mt-2 text-sm text-gray-800">
            {itinerary.itinerary.slice(0, 3).map((item: ItineraryItem, index: number) => (
              <li key={index}>
                <strong>Day {item.day}:</strong> {item.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
