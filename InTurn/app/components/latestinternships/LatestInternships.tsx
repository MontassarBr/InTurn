import React from 'react';
import './LatestInternships.css';
import InternshipCard from '../InternshipCard/InternshipCard'

const internships = [
    {
      id: 1,
      title: 'UI / UX Intern',
      company: 'Samsung',
      location: 'Chargueya , Tunis',
      salary: '100-200 DT',
      type: 'Onsite',
      logo: '/images/samsung.png', 
    },
    {
      id: 2,
      title: 'C# Developer Intern',
      company: 'AISYSNEXT',
      location: 'Lac 2 , Tunis',
      salary: '250-300 DT',
      type: 'Hybrid',
      logo: '/images/aisysnext.png', 
    },
    {
      id: 3,
      title: 'ReactJS Developer Intern',
      company: 'LineData',
      location: 'Lac 2 , Tunis',
      salary: 'Unpaid',
      type: 'Remote',
      logo: '/images/linedata.png', 
    },
    {
      id: 4,
      title: 'UI / UX Intern',
      company: 'NeoXam',
      location: 'Ezzahra , Tunis',
      salary: 'Unpaid',
      type: 'Onsite',
      logo: '/images/neoxam4.png', 
    },
    {
      id: 5,
      title: 'Financial Analyst Intern',
      company: 'Talan',
      location: 'Lac 1 , Tunis',
      salary: '150-350 DT',
      type: 'Hybrid',
      logo: '/images/talan.png', 
    },
    {
      id: 6,
      title: 'Sales Intern',
      company: 'Cynoia',
      location: 'Lac 2 , Tunis',
      salary: '400-450 DT',
      type: 'Remote',
      logo: '/images/cynoia.png', 
    },
    // Add more internships as needed
  ];
const LatestInternships: React.FC = () => {
  // Get the last 6 internships (or fewer if there are less than 6)
  const latestInternships = internships.slice(0, 6);

  return (
    <div className="latest-internships">
      {/* Section Title and Description */}
      <h1 className="section-title">Latest Internships</h1>
      <p className="section-description">
        Explore the most recently posted internship opportunities.
      </p>

      {/* Internship Cards Grid */}
      <div className="internship-grid">
        {latestInternships.map((internship) => (
          <InternshipCard key={internship.id} internship = {internship} />
        ))}
      </div>
    </div>
  );
};

export default LatestInternships;