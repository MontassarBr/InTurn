'use client'
import React, { useEffect, useState } from 'react';
import CompanyProfileHeader from '../components/CompanyProfileHeader/CompanyProfileHeader';
import CompanyDescription from '../components/CompanyDescription/CompanyDescription';
import CompanyFeedback from '../components/CompanyFeedback/CompanyFeedback';
import InternshipList from '../components/InternshipList/InternshipList';
import NavbarAfterLogin from '../components/NavbarAfterLogin/NavbarAfterLogin';
import Footer from '../components/Footer/Footer';
import CompanyGallery from '../components/CompanyGallery/CompanyGallery';
import './CompanyProfile.css';

interface CompanyProfileData {
  id: string;
  name: string;
  coverPhotoUrl: string;
  profilePictureUrl: string;
  website: string;
  location: string;
  workDayStart: string;
  workDayEnd: string;
  aboutUs: string;
  whyChooseUs: string[];
  internships: {
    id: string;
    companyLogo: string;
    title: string;
    salary: string;
    location: string;
  }[];
}

const CompanyProfilePage = ({ companyId }: { companyId: string }) => {
  const [data, setData] = useState<CompanyProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        setLoading(true);
        // Simulate API call - replace with your actual fetch
        const response = await fetch(`https://api.yourbackend.com/companies/${companyId}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError('Failed to load company profile');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProfile();
  }, [companyId]);

  if (error) {
    return <div className="profile-error">Error: {error}</div>;
  }

  if (loading || !data) {
    return <div className="profile-loading">Loading company profile...</div>;
  }


  return (
    <>
      <NavbarAfterLogin/>
      <div className="company-profile-container">
        <main className="profile-content">
          <CompanyProfileHeader
            coverPhotoUrl={data.coverPhotoUrl}
            profilePictureUrl={data.profilePictureUrl}
            companyName={data.name}
            website={data.website}
            location={data.location}
            workDayStart={data.workDayStart}
            workDayEnd={data.workDayEnd}
          />

          <div className="profile-sections">
            <div className="two-column-layout">
              <div className="left-column">
                <CompanyDescription
                  aboutUs={data.aboutUs}
                  whyChooseUs={data.whyChooseUs}
                />
                <CompanyGallery/>
              </div>
              <div className="right-column">
                <CompanyFeedback />
              </div>
            </div>

            {data.internships.length > 0 && (
              <InternshipList companyName={data.name}/>
            )}
          </div>
        </main>
      </div>
      <br />
      <Footer/>
    </>
  );
};

export default CompanyProfilePage;
