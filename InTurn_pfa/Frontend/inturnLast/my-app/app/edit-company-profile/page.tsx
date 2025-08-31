// app/edit-company-profile/page.tsx
'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CompanySidebarNav from '../components/EditProfile/CompanySidebarNav';
import CompanyGeneralInfoSection from '../components/EditProfile/CompanyGeneralInfoSection';
import BenefitsSection from '../components/EditProfile/BenefitsSection';
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import styles from "./page.module.css";

interface CompanyProfileData {
  companyName: string;
  website: string;
  industry: string;
  workDayStart: string;
  workDayEnd: string;
  description: string;
  profilePic?: string;
  location: string;
  benefits: string[];
}

export default function EditCompanyProfile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [companyData, setCompanyData] = useState<CompanyProfileData>({
    companyName: '',
    website: '',
    industry: '',
    workDayStart: 'monday',
    workDayEnd: 'friday',
    description: '',
    location: '',
    benefits: []
  });
  const [initialData, setInitialData] = useState<CompanyProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const getAuthToken = () => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1];
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const token = getAuthToken();
        
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('http://localhost:3001/api/Companies/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.status === 401) {
          router.push('/login');
          return;
        }

        if (!response.ok) throw new Error('Failed to load profile');
        
        const data = await response.json();
        setCompanyData(data);
        setInitialData(data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [router]);

  const handleSave = async () => {
    try {
      setSaveLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:3001/api/Companies/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(companyData),
      });
      
      if (response.status === 401) {
        router.push('/login');
        return;
      }

      if (!response.ok) throw new Error('Save failed');
      
      const data = await response.json();
      setInitialData(data);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancel = () => {
    if (initialData) {
      setCompanyData(initialData);
    }
  };

  if (loading) return <div className={styles.loading}>Loading profile...</div>;

  return (
    <>
      <Navbar />
      {showNotification && (
        <div className={styles.saveNotification}>
          Profile saved successfully!
        </div>
      )}
      <div className={styles.editProfileContainer}>
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>Edit Company Profile</h1>
          <div className={styles.actionButtons}>
            <button 
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              className={styles.saveButton} 
              onClick={handleSave}
              disabled={saveLoading}
            >
              {saveLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
        
        <div className={styles.profileLayout}>
          <CompanySidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className={styles.profileContent}>
            {activeTab === 'general' && (
              <CompanyGeneralInfoSection 
                companyData={companyData}
                setCompanyData={setCompanyData}
              />
            )}
            
            {activeTab === 'benefits' && (
              <BenefitsSection
                benefits={companyData.benefits}
                setBenefits={(newBenefits) => 
                  setCompanyData({...companyData, benefits: newBenefits})
                }
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}