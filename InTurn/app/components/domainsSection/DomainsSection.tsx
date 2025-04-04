import React from 'react';
import './DomainsSection.css';
import { BarChart3, Briefcase, LineChart, MonitorSmartphone } from 'lucide-react';

const DomainsSection: React.FC = () => {
  // Mock data for domains and number of offers with icons
  const domains = [
    { name: 'Finance', offers: 9, icon: <LineChart size={48} className="domain-icon finance-icon" /> },
    { name: 'Management', offers: 9, icon: <Briefcase size={48} className="domain-icon management-icon" /> },
    { name: 'IT', offers: 9, icon: <MonitorSmartphone size={48} className="domain-icon it-icon" /> },
    { name: 'Marketing', offers: 9, icon: <BarChart3 size={48} className="domain-icon marketing-icon" /> },
  ];
  
  return (
    <>
      <br />
      <br />
      <br />
      
      {/* Domain Cards */}
      <div className="domain-cards">
        {domains.map((domain, index) => (
          <div key={index} className="domain-card">
            <div className="domain-icon-container">
              {domain.icon}
            </div>
            <h3 className="domain-name">{domain.name}</h3>
            <p className="domain-offers">{domain.offers} offers</p>
          </div>
        ))}
      </div>
      <br />
      <br />
    </>
  );
};

export default DomainsSection;