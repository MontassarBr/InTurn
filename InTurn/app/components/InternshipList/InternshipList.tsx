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
  maxSalary:number;
  type: string;
  logo: string;
}

interface LatestCompanyInternshipsProps {
  companyName: string;
}

const LatestCompanyInternships: React.FC<LatestCompanyInternshipsProps> = ({ companyName }) => {
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

        // Encode the company name for URL safety
        const encodedCompanyName = encodeURIComponent(companyName);
        const response = await fetch(`https://api.yourbackend.com/companyInternships/?company=${encodedCompanyName}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        setInternships(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load internships');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInternships();
  }, [companyName]); // Re-run effect when companyName changes

  // Get the latest internships (up to 6)
  const latestInternships = internships.slice(0, 6);

  return (
    <>
      <div className="latest-internships">
        {/* Section Title and Description */}
        <h1 className="section-title">Latest Internships at {companyName}</h1>
        <p className="section-description">
          Explore the most recently posted internship opportunities at {companyName}.
        </p>

        {/* Loading State */}
        {isLoading && (
          <div className="loading-state">
            <p>Loading internships from {companyName}...</p>
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
              <p className="no-internships">No internships available at {companyName} at the moment.</p>
            )}
          </div>
        )}
      </div>
      <br />
    </>
  );
};

export default LatestCompanyInternships;
