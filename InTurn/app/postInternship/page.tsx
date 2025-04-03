"use client";
import React, { useState } from 'react';
import InternshipInfoForm from '../components/InternshipInfoForm/InternshipInfoForm';
import ApplicationDeliveryForm from '../components/ApplicationDeliveryForm/ApplicationDeliveryForm';
import NavbarAfterLogin from '../components/NavbarAfterLogin/NavbarAfterLogin';
import Footer from '../components/Footer/Footer';
import './postpage.css';

interface InternshipData {
  title: string;
  internshipType: string | undefined;
  location: string;
  minSalary: number;
  maxSalary: number;
  description: string;
  startDate: string;
  endDate: string;
}

interface ApplicationDeliveryData {
  deliveryMethod: 'email' | 'external';
  contactInfo: string;
}

const ParentPage: React.FC = () => {
  const [internshipData, setInternshipData] = useState<InternshipData>({
    title: '',
    internshipType: undefined,
    location: '',
    minSalary: 0,
    maxSalary: 0,
    description: '',
    startDate: '',
    endDate: ''
  });

  const [applicationDeliveryData, setApplicationDeliveryData] = useState<ApplicationDeliveryData>({
    deliveryMethod: 'email',
    contactInfo: '',
  });

  const [formStatus, setFormStatus] = useState({
    internshipInfo: false,
    applicationDelivery: true
  });

  const handleInternshipChange = (data: InternshipData) => {
    setInternshipData((prev) => ({ ...prev, ...data }));
    
    const isComplete = data.title && data.internshipType && data.location && 
                      data.startDate && data.endDate && data.description && 
                      data.minSalary >= 0 && data.maxSalary > 0;
    
    setFormStatus(prev => ({
      ...prev,
      internshipInfo: !!isComplete
    }));
  };

  const handleApplicationDeliveryChange = (data: ApplicationDeliveryData) => {
    setApplicationDeliveryData(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/internship-posting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(internshipData),
      });
      
      if (response.ok) {
        alert('Internship posting submitted successfully!');
        handleCancel();
      } else {
        alert('Failed to submit internship posting.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting.');
    }
  };

  const handleCancel = () => {
    setInternshipData({
      title: '',
      internshipType: undefined,
      location: '',
      minSalary: 0,
      maxSalary: 0,
      description: '',
      startDate: '',
      endDate: ''
    });
    
    setApplicationDeliveryData({
      deliveryMethod: 'email',
      contactInfo: '',
    });
    
    setFormStatus({
      internshipInfo: false,
      applicationDelivery: true
    });
  };

  return (
    <>
      <NavbarAfterLogin/>
      <div className="internship-posting-page">
        <div className="form-menu">
          <div className="menu-item">
            Internship Info
            {formStatus.internshipInfo && <span className="checkmark">✓</span>}
          </div>
          <div className="menu-item">
            Receive Application
          </div>
        </div>

        <div className="page-container">
          <h1>Post a new Internship</h1>
          <form onSubmit={handleSubmit}>
            <InternshipInfoForm 
              onChange={handleInternshipChange} 
              initialData={internshipData}
            />
            <ApplicationDeliveryForm/>
            <div className="button-group">
              <button 
                type="button" 
                className="cancel-button" 
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="post-button"
                disabled={!formStatus.internshipInfo}
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ParentPage;
