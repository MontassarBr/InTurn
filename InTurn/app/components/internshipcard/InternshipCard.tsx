import React from 'react';
import './InternshipCard.css';
import { Building2, MapPin, Clock } from 'lucide-react';

// Define the interface for the internship object
interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  logo: string; // Company logo
}

// Define the props for the InternshipCard component
interface InternshipCardProps {
  internship: Internship; // Internship data
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  return (
    <div className="internship-card">
      {/* Header section with company logo and title */}
      <div className="internship-header">
        <div className="company-logo">
          <img src={internship.logo} alt={`${internship.company} Logo`} />
        </div>
        <div className="internship-info">
          <h3 className="internship-title">{internship.title}</h3>
          <p className="internship-salary">{internship.salary}</p>
        </div>
      </div>

      {/* Internship Details with icons */}
      <div className="detail-with-icon">
        <Building2 size={16} />
        <p className="internship-company">{internship.company}</p>
      </div>
      
      <div className="detail-with-icon">
        <MapPin size={16} />
        <p className="internship-location">{internship.location}</p>
      </div>
      
      <div className="detail-with-icon">
        <Clock size={16} />
        <p className="internship-type">{internship.type}</p>
      </div>
      
      <button className="apply-button">Apply Now</button>
    </div>
  );
};

export default InternshipCard;