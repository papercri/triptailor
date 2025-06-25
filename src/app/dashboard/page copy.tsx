"use client"
import ItineraryFilters from "@/components/userPage/ItineraryFilters";
import Header from "@/components/layout/header/Header"
import Footer from "@/components/layout/footer/Footer"
import { useState } from "react"
import './user.scss'

export default function DashboardPage() {
  const [filters, setFilters] = useState({
    travelerType: "",
    budget: "",
    days: "",
    season: "",
    interest: "",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"destination" | "createdAt">("createdAt")

  const handleReset = () => {
    setFilters({
      travelerType: "",
      budget: "",
      days: "",
      season: "",
      interest: "",
    })
    setSearchQuery("")
    setSortBy("createdAt")
  }
  
  return (
    <>
    <Header />
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Travel Destinations</h1>
        <div className="flex gap-8">
          <div className="flex-shrink-0">
            <ItineraryFilters
              filters={filters}
              setFilters={setFilters}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onReset={handleReset}
            />
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
             {filteredItineraries.map((itinerary) => (
                     <ItineraryCard
                       key={itinerary.id}
                       itinerary={itinerary as Itinerary}
                       onView={(i) => setSelectedItinerary(i)}
                       onDelete={handleDelete}
                     />
                   ))}
              <div className="mt-4 text-sm text-gray-500">
                <p>Active filters: {Object.values(filters).filter((v) => v).length}</p>
                <p>Search query: {searchQuery || "None"}</p>
                <p>Sort by: {sortBy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
    
  );
}
