"use client";
import { useState, useEffect } from 'react';
import styles from './SearchFilters.module.css';

interface SearchFiltersProps {
  searchTerm: string;
  resultCount: number;
  onSearchChange: (term: string) => void;
  onFilterChange: (filterType: string, value: string) => void;
  onClearFilters: () => void;
  initialFilters: {
    location: string;
    workArrangement: string;
    workTime: string;
    companyType: string;
    payment: string;
  };
}

export default function SearchFilters({
  searchTerm,
  resultCount,
  onSearchChange,
  onFilterChange,
  onClearFilters,
  initialFilters
}: SearchFiltersProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSubmit = () => {
    onSearchChange(localSearchTerm);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = {
      ...selectedFilters,
      [filterType]: value
    };
    setSelectedFilters(newFilters);
    onFilterChange(filterType, value);
  };

  const handleClearAllFilters = () => {
    const resetFilters = {
      location: '',
      workArrangement: '',
      workTime: '',
      companyType: '',
      payment: ''
    };
    setSelectedFilters(resetFilters);
    setLocalSearchTerm("");
    onClearFilters();
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchRow}>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Search..."
            className={styles.searchInput}
            aria-label="Search internships"
          />
          <svg
            onClick={handleSubmit}
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className={styles.filtersContainer}>
          <div className={styles.filterGroup}>
            <label htmlFor="location-filter">Location</label>
            <select 
              id="location-filter"
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className={styles.filterSelect}
              value={selectedFilters.location}
            >
              <option value="">All Locations</option>
              <option value="Ariana">Ariana</option>
              <option value="Ben Arous">Ben Arous</option>
              <option value="Manouba">Manouba</option>
              <option value="Monastir">Monastir</option>
              <option value="Nabeul">Nabeul</option>
              <option value="Sfax">Sfax</option>
              <option value="Sousse">Sousse</option>
              <option value="Tunis">Tunis</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="work-arrangement-filter">Work Arrangement</label>
            <select 
              id="work-arrangement-filter"
              onChange={(e) => handleFilterChange('workArrangement', e.target.value)}
              className={styles.filterSelect}
              value={selectedFilters.workArrangement}
            >
              <option value="">All Arrangements</option>
              <option value="Onsite">On-site</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="work-time-filter">Work Time</label>
            <select 
              id="work-time-filter"
              onChange={(e) => handleFilterChange('workTime', e.target.value)}
              className={styles.filterSelect}
              value={selectedFilters.workTime}
            >
              <option value="">All Work Times</option>
              <option value="full time">Full-time</option>
              <option value="part time">Part-time</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="company-type-filter">Company type</label>
            <select 
              id="company-type-filter"
              onChange={(e) => handleFilterChange('companyType', e.target.value)}
              className={styles.filterSelect}
              value={selectedFilters.companyType}
            >
              <option value="">All Companies</option>
              <option value="Finance">Finance</option>
              <option value="Management">Management</option>
              <option value="IT">IT</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="payment-filter">Payment</label>
            <select 
              id="payment-filter"
              onChange={(e) => handleFilterChange('payment', e.target.value)}
              className={styles.filterSelect}
              value={selectedFilters.payment}
            >
              <option value="">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.resultsRow}>
        <div className={styles.resultsCount}>
          {resultCount} results{searchTerm && ` for `}
          {searchTerm && <span className={styles.searchTerm}>"{searchTerm}"</span>}
        </div>
        <button 
          onClick={handleClearAllFilters}
          className={styles.clearButton}
          disabled={Object.values(selectedFilters).every(value => !value) && !searchTerm}
          aria-label="Clear all filters"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}