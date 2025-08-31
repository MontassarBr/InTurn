'use client'
import React, { useState, useEffect } from 'react';
import './InternshipList.css';
import InternshipCard from '../InternshipCard/InternshipCard';

// Define the interface for the internship object
interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  type: string;
  logo: string;
}

const getAuthToken = () => {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('authToken='))
    ?.split('=')[1];
};

const LatestCompanyInternships: React.FC = () => {
  // State to store fetched internships
  const [internships, setInternships] = useState<Internship[]>([]);
  // State to track loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State to track error status
  const [error, setError] = useState<string | null>(null);

  // Fetch internships when component mounts or companyName changes
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const authToken = getAuthToken();
        const response = await fetch('http://localhost:3001/api/Companies/internship', {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        
        // Make sure jsonData is an array before setting it to state
        if (Array.isArray(jsonData)) {
          setInternships(jsonData);
        } else {
          // If API returns an object with data property that contains the array
          if (jsonData && Array.isArray(jsonData.data)) {
            setInternships(jsonData.data);
          } else {
            // If API returns something else, set as empty array and log error
            console.error('Expected array from API but got:', jsonData);
            setInternships([]);
            setError('Received unexpected data format from server');
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load internships');
        setInternships([]); // Set internships to empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchInternships();
  }, []); 

  // Get the latest internships (up to 6)
  // Only slice if internships is an array
  const latestInternships = Array.isArray(internships) ? internships.slice(0, 6) : [];

  return (
    <>
      <div className="latest-internships">
        {/* Section Title and Description */}
        <h1 className="section-title">Latest Internships</h1>
        <p className="section-description">
          Explore the most recently posted internship opportunities.
        </p>

        {/* Loading State */}
        {isLoading && (
          <div className="loading-state">
            <p>Loading internships...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <p>{error}</p>
          </div>
        )}

        {/* Internship Cards Grid */}
        {!isLoading && !error && (
          <div className="internship-grid">
            {latestInternships.length > 0 ? (
              latestInternships.map((internship) => (
                <InternshipCard key={internship.id} internship={internship} />
              ))
            ) : (
              <p className="no-internships">No internships available at the moment.</p>
            )}
          </div>
        )}
      </div>
      <br />
    </>
  );
};

export default LatestCompanyInternships;