"use client"
import React, { useState, useEffect, useRef  } from 'react'
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from '@/services/firebaseConfig'
import { useUserItineraries } from '@/hooks/useUserItineraries'
import ItineraryModal from '@/components/userPage/ItineraryModal'
import { Itinerary } from '@/types/itineraryItem'
import Spinner from '@/components/ui/Spinner/Spinner';
import { toast } from 'react-toastify';
import '@/styles/userItineraries.scss'
import ItineraryCard from '@/components/userPage/ItineraryCard';
import ItineraryFilters from '@/components/userPage/ItineraryFilters';
import { Funnel } from "lucide-react"
import Button from '@/components/ui/Button/Button';
import Link from "next/link";

export default function UserItinerariesPage() {
  const { itineraries, loading, error } = useUserItineraries()
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => setShowFilters(!showFilters);
  const panelRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState({
    travelerType: '',
    budget: '',
    days: '',
    season: '',
    interest: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'destination' | 'createdAt'>('createdAt');

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({ travelerType: '', budget: '', days: '', season: '', interest: '' });
    setSortBy('createdAt');
  };
 
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserName(currentUser.displayName || currentUser.email); 
    }
  }, []);
  useEffect(() => {
    if (!showFilters) return; // Solo activo cuando el panel está abierto

    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);
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
  if (itineraries.length === 0) return <div className='h-[40vh] flex flex-col items-center mt-10 '><p className='font-bold text-xl mb-6'>No itineraries saved yet.</p>
  <Link href="/" className="btn btn--primary">
    Back to Home Page
  </Link></div>


  //Buscador Y filtros

    const filteredItineraries = itineraries
    .filter((itinerary) => {
      const i = itinerary as Itinerary; 
      const matchSearch = i.destination
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchTravelerType = filters.travelerType
        ? i.prompt?.travelerType === filters.travelerType
        : true;

      const matchBudget = filters.budget
        ? i.prompt?.budget === filters.budget
        : true;

      const matchDays = filters.days
        ? i.prompt?.days === Number(filters.days)
        : true;

      const matchSeason = filters.season
        ? i.prompt?.season === filters.season
        : true;

      const matchInterest = filters.interest
        ? i.prompt?.interests?.includes(filters.interest)
        : true;

      return (
        matchSearch &&
        matchTravelerType &&
        matchBudget &&
        matchDays &&
        matchSeason &&
        matchInterest
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
        {/* BOTÓN FILTROS SOLO MÓVIL */}
      {/* <button 
        className="filters-button-mobile"
        onClick={toggleFilters}
        aria-expanded={showFilters}
        aria-controls="itinerary-filters-panel"
      >
        Filters
      </button> */}
      <div className="filters-button-mobile flex justify-end">
        <Button onClick={toggleFilters} variant="secondary" size = "md" icon={<Funnel />} aria-controls="itinerary-filters-panel" aria-expanded={showFilters} >
            Filters
        </Button>
      </div>
      
    <div className=' grid grid-cols-4 gap-6'>
              {/* En escritorio se muestra siempre el filtro, en móvil es el panel desplegable */}
        {/* Desktop */}
         <div className="filters-desktop">
          <ItineraryFilters
            filters={filters}
            setFilters={setFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onReset={handleResetFilters}
          />
         </div>
           {/* Móvil: panel lateral / modal */}
        {showFilters && (
          <div 
            id="itinerary-filters-panel"
            className="filters-mobile-panel"
            role="dialog"
            aria-modal="true"
            ref={panelRef}
          >
            <button className="close-filters-mobile" onClick={toggleFilters}>Close</button>
            <ItineraryFilters
              filters={filters}
              setFilters={setFilters}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onReset={() => {
                handleResetFilters();
                toggleFilters();
              }}
            />
          </div>
        )}
      
      <div className="itineraries-grid col-span-3">
       {filteredItineraries.map((itinerary) => (
        <ItineraryCard
          key={itinerary.id}
          itinerary={itinerary as Itinerary}
          onView={(i) => setSelectedItinerary(i)}
          onDelete={handleDelete}
        />
      ))}
      </div>
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