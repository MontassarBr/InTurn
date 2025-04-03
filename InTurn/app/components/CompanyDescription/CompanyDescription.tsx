'use client'
import React from 'react';
import './CompanyDescription.css';

interface CompanyDescriptionProps {
  aboutUs: string;       // Long text description
  whyChooseUs: string[]; // Array of benefits (e.g., ["Flexible hours", "Free mentorship"])
  isLoading?: boolean;
}

const CompanyDescription: React.FC<CompanyDescriptionProps> = ({
  aboutUs,
  whyChooseUs,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="company-description loading">
        <div className="section shimmer"></div>
        <div className="section shimmer"></div>
      </div>
    );
  }

  return (
    <div className="company-description">
      {/* About Us Section */}
      <div className="section">
        <h2 className="section-title">About Us</h2>
        <p className="section-content">{aboutUs || "No description provided."}</p>
      </div>

      {/* Why Choose Us Section */}
      <div className="section">
        <h2 className="section-title">Why Choose Us</h2>
        <ul className="benefits-list">
          {whyChooseUs?.length > 0 ? (
            whyChooseUs.map((benefit, index) => (
              <li key={index} className="benefit-item">
                <span className="bullet">•</span> {benefit}
              </li>
            ))
          ) : (
            <li>No benefits listed.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CompanyDescription;
