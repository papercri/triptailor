import React from 'react';

type Filters = {
  travelerType: string;
  budget: string;
  days: string;
  season: string;
  interest: string;
};

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  sortBy: 'destination' | 'createdAt';
  setSortBy: React.Dispatch<React.SetStateAction<'destination' | 'createdAt'>>;
  onReset: () => void;
};

export default function FiltersPanel({ filters, setFilters, searchQuery, setSearchQuery, sortBy, setSortBy, onReset }: Props) {
  return (
    <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-sm">
      <div className="grid md:grid-cols-4 gap-4">
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
        </div>
        <button
          className="ml-auto text-sm text-blue-600 underline"
          onClick={onReset}
        >
          Reset filters
        </button>
      
      </div>
      
    </div>
  );
}
