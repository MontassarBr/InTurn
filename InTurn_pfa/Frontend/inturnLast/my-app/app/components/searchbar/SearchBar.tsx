"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create URLSearchParams object
      const params = new URLSearchParams();
      
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      
      if (locationFilter) {
        params.append('location', locationFilter);
      }

      // Construct the query string
      const queryString = params.toString();
      
      router.push(`/search-internships${queryString ? `?${queryString}` : ''}`);
      
    } catch (err) {
      console.error('Navigation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Updated list of Tunisian states (added missing states)
  const tunisianStates = [
    'Ariana',
    'Béja',
    'Ben Arous',
    'Bizerte',
    'Gabès',
    'Gafsa',
    'Jendouba',
    'Kairouan',
    'Kasserine',
    'Kébili',
    'Kef',
    'Mahdia',
    'Manouba',
    'Médenine',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sidi Bouzid',
    'Siliana',
    'Sousse',
    'Tataouine',
    'Tozeur',
    'Tunis',
    'Zaghouan'
  ];

  return (
    <section className="search-section">
      <h1>
        Explore More <span className="highlight">Internships</span>
      </h1>

      <form onSubmit={handleSearch} className="search-bar">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for internships..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
          aria-label="Search for internships"
        />

        {/* Location Filter */}
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="location-filter"
          aria-label="Select location"
        >
          <option value="">All Locations</option>
          {tunisianStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button 
          type="submit" 
          className="search-button"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </section>
  );
};

export default SearchBar;