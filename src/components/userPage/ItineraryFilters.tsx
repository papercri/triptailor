"use client"
import React, { useState } from 'react'
import '@/styles/userItineraries.scss'
import { Search, RotateCcw, Calendar, Users, Wallet, Heart, Clock, ChevronDown, ChevronUp } from "lucide-react"

type Filters = {
  travelerType: string
  budget: string
  days: string
  season: string
  interest: string
}

type Props = {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  sortBy: "destination" | "createdAt"
  setSortBy: React.Dispatch<React.SetStateAction<"destination" | "createdAt">>
  onReset: () => void
}

export default function ItineraryFilters({
  filters,
  setFilters,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  onReset,
}: Props) {
  const [openSections, setOpenSections] = useState({
    traveler: false,
    season: false,
    budget: false,
    interests: false,
    duration: false,
  })

  const travelerTypes = [
    { value: "Adventure", label: "Adventure" },
    { value: "Relax", label: "Relax" },
    { value: "Culture", label: "Culture" },
    { value: "Romantic", label: "Romantic" },
    { value: "Family", label: "Family" },
    { value: "Friends", label: "Friends" },
    { value: "Solo", label: "Solo" },
    { value: "Business", label: "Business" },
    { value: "Luxury", label: "Luxury" },
  ]

  const seasons = [
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Autumn", label: "Autumn" },
    { value: "Winter", label: "Winter" },
  ]

  const budgets = [
    { value: "Low", label: "Budget-friendly" },
    { value: "Medium", label: "Mid-range" },
    { value: "High", label: "Luxury" },
  ]

  const interests = [
    { value: "Museums", label: "Museums" },
    { value: "History", label: "History" },
    { value: "Nature", label: "Nature" },
    { value: "Beaches", label: "Beaches" },
    { value: "Wellness & Spa", label: "Wellness & Spa" },
    { value: "Gastronomy", label: "Gastronomy" },
    { value: "Shopping", label: "Shopping" },
    { value: "Nightlife", label: "Nightlife" },
    { value: "Festivals", label: "Festivals" },
  ]


  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "" : value,
    }))
  }

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const AccordionSection = ({
    id,
    title,
    icon: Icon,
    children,
    isOpen,
  }: {
    id: keyof typeof openSections
    title: string
    icon: React.ElementType
    children: React.ReactNode
    isOpen: boolean
  }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between !w-full py-4 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-gray-600" />
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-4" : "max-h-0"}`}>
        {children}
      </div>
    </div>
  )

  const CheckboxItem = ({
    id,
    checked,
    onChange,
    label,
  }: {
    id: string
    checked: boolean
    onChange: () => void
    label: string
  }) => (
    <div className="flex items-center space-x-3 py-2 hover:bg-gray-50 rounded-md px-2 -mx-2 transition-colors duration-150">
      <div className="relative">
        <input type="checkbox" id={id} checked={checked} onChange={onChange} className="sr-only" />
        <div
          onClick={onChange}
          className={`w-4 h-4 border-2 rounded cursor-pointer transition-all duration-200 ${
            checked ? "bg-blue-600 border-blue-600" : "border-gray-300 hover:border-gray-400"
          }`}
        >
          {checked && (
            <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      <label htmlFor={id} className="flex-1 text-sm cursor-pointer">
        {label}
      </label>
    </div>
  )

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

      {/* Reset Button */}
        <button
          onClick={onReset}
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="p-6">
        <div className="space-y-0">
          {/* Traveler Type */}
          <AccordionSection id="traveler" title="Traveler Type" icon={Users} isOpen={openSections.traveler}>
            <div className="space-y-1">
              {travelerTypes.map((type) => (
                <CheckboxItem
                  key={type.value}
                  id={`traveler-${type.value}`}
                  checked={filters.travelerType === type.value}
                  onChange={() => handleFilterChange("travelerType", type.value)}
                  label={type.label}
       
                />
              ))}
            </div>
          </AccordionSection>

          {/* Season */}
          <AccordionSection id="season" title="Season" icon={Calendar} isOpen={openSections.season}>
            <div className="space-y-1">
              {seasons.map((season) => (
                <CheckboxItem
                  key={season.value}
                  id={`season-${season.value}`}
                  checked={filters.season === season.value}
                  onChange={() => handleFilterChange("season", season.value)}
                  label={season.label}
                />
              ))}
            </div>
          </AccordionSection>

          {/* Budget */}
          <AccordionSection id="budget" title="Budget" icon={Wallet} isOpen={openSections.budget}>
            <div className="space-y-1">
              {budgets.map((budget) => (
                <CheckboxItem
                  key={budget.value}
                  id={`budget-${budget.value}`}
                  checked={filters.budget === budget.value}
                  onChange={() => handleFilterChange("budget", budget.value)}
                  label={budget.label} 
                />
              ))}
            </div>
          </AccordionSection>

          {/* Interests */}
          <AccordionSection id="interests" title="Interests" icon={Heart} isOpen={openSections.interests}>
            <div className="space-y-1">
              {interests.map((interest) => (
                <CheckboxItem
                  key={interest.value}
                  id={`interest-${interest.value}`}
                  checked={filters.interest === interest.value}
                  onChange={() => handleFilterChange("interest", interest.value)}
                  label={interest.label}
                />
              ))}
            </div>
          </AccordionSection>

          {/* Duration */}
          <AccordionSection id="duration" title="Duration" icon={Clock} isOpen={openSections.duration}>
            <div className="space-y-3">
              <label htmlFor="days" className="block text-sm font-medium text-gray-700">
                Number of days
              </label>
              <input
                id="days"
                type="number"
                min="1"
                max="365"
                placeholder="e.g., 7"
                value={filters.days}
                onChange={(e) => setFilters((prev) => ({ ...prev, days: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none transition-colors duration-200"
              />
            </div>
          </AccordionSection>
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        {/* Sort */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "destination" | "createdAt")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md  outline-none transition-colors duration-200 bg-white"
          >
            <option value="createdAt">Date Created</option>
            <option value="destination">Destination (A-Z)</option>
          </select>
        </div>

      </div>
    </div>
  )
}
