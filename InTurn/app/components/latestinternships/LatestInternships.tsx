'use client'
import React, { useState, useEffect } from 'react';
import './LatestInternships.css';
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

const LatestInternships: React.FC = () => {
  // State to store fetched internships
  const [internships, setInternships] = useState<Internship[]>([]);
  // State to track loading status
  const [isLoading, setisLoading] = useState<boolean>(true);
  // State to track error status
  const [error, setError] = useState<string | null>(null);

  // Fetch internships when component mounts
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setisLoading(true);

        const response = await fetch(`https://api.yourbackend.com/latestInternships/`);
        const jsonData = await response.json();
        setInternships(jsonData);
      } catch (err) {
        setError('Failed to load internships');
      } finally {
        setisLoading(false);
      }
    };

    fetchInternships();
  }, []); // Empty dependency array means this effect runs once on mount

  // Get the latest internships (up to 6)
  const latestInternships = internships.slice(0, 6);

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
            <p>Loading latest internships...</p>
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

export default LatestInternships;
