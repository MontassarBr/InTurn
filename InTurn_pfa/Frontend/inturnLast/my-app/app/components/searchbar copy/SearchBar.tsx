"use client";
import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const handleSearch = () => {
    console.log('Search Query:', searchQuery);
    console.log('Location Filter:', locationFilter);
    // Add your search logic here
  };

  // List of Tunisian states
  const tunisianStates = [
    'Ariana',
    'Ben Arous',
    'Manouba',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sousse',
    'Tunis',
  ];

  return (
    <>
    <br /><br /><br />
    <h1>
    Explore More <span className="highlight">Internships</span>
    </h1>

    
<div className="search-bar">
  {/* Search Input */}
  <input
    type="text"
    placeholder="Search for internships..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="search-input"
  />

  {/* Location Filter */}
  <select
    value={locationFilter}
    onChange={(e) => setLocationFilter(e.target.value)}
    className="location-filter"
  >
    <option value="">All Locations</option>
    {tunisianStates.map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </select>

  {/* Search Button */}
  <button onClick={handleSearch} className="search-button">
    Search
  </button>
</div>
<br />
</>
    
  );
  
};

export default SearchBar;