"use client"

import React, { useState, useEffect } from 'react'
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from '@/services/firebaseConfig'
import { useUserItineraries } from '@/hooks/useUserItineraries'
import ItineraryModal from '@/components/userPage/ItineraryModal'
import { Itinerary } from '@/types/itineraryItem'
import Spinner from '@/components/ui/Spinner/Spinner';
import { toast } from 'react-toastify';
import '@/styles/userItineraries.scss'
import ItineraryCard from '@/components/userPage/ItineraryCard';

export default function UserItinerariesPage() {
  const { itineraries, loading, error } = useUserItineraries()
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    travelerType: '',
    budget: '',
    days: '',
    season: '',
    interest: '',
  });
  const [sortBy, setSortBy] = useState<'destination' | 'createdAt'>('createdAt');
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserName(currentUser.displayName || currentUser.email); 
    }
  }, []);
  async function handleDelete(itineraryId: string) {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    try {
      await deleteDoc(doc(db, "users", userId, "itineraries", itineraryId));
      toast.success("Itinerary deleted successfully");

    } catch (error) {
      console.error("Failed to delete itinerary", error);
      toast.error("Failed to delete itinerary");
    }
  }

  if (loading) return <div className='grid items-center justify-center h-screen'><Spinner /></div>
  if (error) return <p>Error loading itineraries: {error.message}</p>
  if (itineraries.length === 0) return <p>No itineraries saved yet.</p>


  //Buscador Y filtros


  

const filteredItineraries = itineraries
  .filter((itinerary) =>
    itinerary.destination.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .filter((itinerary) => {
    const i = itinerary as Itinerary;

    return (
      (!filters.travelerType || i.prompt?.travelerType === filters.travelerType) &&
      (!filters.budget || i.prompt?.budget === filters.budget) &&
      (!filters.days || i.prompt?.days === Number(filters.days)) &&
      (!filters.season || i.prompt?.season === filters.season) &&
      (!filters.interest || i.prompt?.interests?.includes(filters.interest))
    );
  })
  .sort((a, b) => {
    if (sortBy === 'destination') {
      return a.destination.localeCompare(b.destination);
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });




  return (
    <div className="user-itineraries">
      <h1 className='capitalize'>{userName ? `${userName}'s saved Itineraries` : 'Your Saved Itineraries'}</h1>
<div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-sm">
  <div className="grid md:grid-cols-3 gap-4">
    <input
      type="text"
      placeholder="Search by destination..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2 w-full"
    />
    <select
      value={filters.travelerType}
      onChange={(e) => setFilters(prev => ({ ...prev, travelerType: e.target.value }))}
      className="border border-gray-300 rounded px-3 py-2 w-full"
    >
      <option value="">All Traveler Types</option>
      <option value="Adventure">Adventure</option>
      <option value="Relax">Relax</option>
      <option value="Culture">Culture</option>
      <option value="Romantic">Romantic</option>
      <option value="Family">Family</option>
      <option value="Friends">Friends</option>
      <option value="Family">Family</option>
      <option value="Solo">Solo</option>
      <option value="Business">Business</option>
    </select>
    <select
      value={filters.season}
      onChange={(e) => setFilters(prev => ({ ...prev, season: e.target.value }))}
      className="border border-gray-300 rounded px-3 py-2 w-full"
    >
      <option value="">All Seasons</option>
      <option value="Spring">Spring</option>
      <option value="Summer">Summer</option>
      <option value="Autumn">Autumn</option>
      <option value="Winter">Winter</option>
    </select>
    <select
      value={filters.budget}
      onChange={(e) => setFilters(prev => ({ ...prev, budget: e.target.value }))}
      className="border border-gray-300 rounded px-3 py-2 w-full"
    >
      <option value="">All Budgets</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
    <select
      value={filters.interest}
      onChange={(e) => setFilters(prev => ({ ...prev, interest: e.target.value }))}
      className="border border-gray-300 rounded px-3 py-2 w-full"
    >
      <option value="">All Interests</option>
      <option value="Museums">Museums</option>
      <option value="History">History</option>
      <option value="Nature">Nature</option>
      <option value="Beaches">Beaches</option>
      <option value="Wellness & Spa">Wellness & Spa</option>
      <option value="Gastronomy">Gastronomy</option>
      <option value="Shopping">Shopping</option>
      <option value="Nightlife">Nightlife</option>
      <option value="Festivals">Festivals</option>
    </select>
    <input
      type="number"
      min="1"
      placeholder="Days"
      value={filters.days}
      onChange={(e) => setFilters(prev => ({ ...prev, days: e.target.value }))}
      className="border border-gray-300 rounded px-3 py-2 w-full"
    />
    
  </div>
  <div className="mt-4 flex gap-4 items-center">
    <label className="text-sm font-medium">Sort by:</label>
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value as 'destination' | 'createdAt')}
      className="border border-gray-300 rounded px-3 py-2"
    >
      <option value="createdAt">Date Created</option>
      <option value="destination">Destination (A-Z)</option>
    </select>
    <button
      className="ml-auto text-sm text-blue-600 underline"
      onClick={() => {
        setSearchQuery('');
        setFilters({ travelerType: '', budget: '', days: '', season: '', interest: '' });
        setSortBy('createdAt');
      }}
    >
      Reset filters
    </button>
  </div>
</div>



      <div className="itineraries-grid">
       {filteredItineraries.map((itinerary) => (
        <ItineraryCard
          key={itinerary.id}
          itinerary={itinerary as Itinerary}
          onView={(i) => setSelectedItinerary(i)}
          onDelete={handleDelete}
        />
      ))}
      </div>

      {selectedItinerary && (
        
         <ItineraryModal
          itinerary={selectedItinerary}
          onClose={() => setSelectedItinerary(null)}
        />
      )}
    </div>
  )
}