"use client";
import React, { useEffect, useState } from "react";
import CompanyProfileHeader from "../../components/CompanyProfileHeader/CompanyProfileHeader";
import CompanyDescription from "../../components/CompanyDescription/CompanyDescription";
import CompanyFeedback from "../../components/CompanyFeedback/CompanyFeedback";
import InternshipList from "../../components/InternshipList/InternshipList";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CompanyGallery from "../../components/CompanyGallery/CompanyGallery";
import { useParams } from "next/navigation";
import "./CompanyProfile.css";

interface CompanyProfileData {
  companyID: string;
  userID: string;
  companyName: string;
  coverPhotoUrl: string;
  profilePic: string;
  website: string;
  location: string;
  workDayStart: string;
  workDayEnd: string;
  description: string;
  benefits: string[];
  internships: {
    id: string;
    companyLogo: string;
    title: string;
    salary: string;
    location: string;
  }[];
}

const CompanyProfilePage = () => {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState<CompanyProfileData | null>(null);
  const [profileUser, setProfileUser] = useState<CompanyProfileData | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/auth/me", {
          credentials: "include",
        });
        if (res.ok) setCurrentUser(await res.json());
      } catch (error) {
        console.error("Error fetching current user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (!userId) return;
      try {
        const res = await fetch(
          `http://localhost:3001/api/Companies/profile/${userId}`
        );
        if (res.ok) {
          const jsonData = await res.json();
          setProfileUser(jsonData);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfileUser();
  }, [userId]);

  useEffect(() => {
    if (currentUser && profileUser) {
      setIsOwner(currentUser.userID === profileUser.companyID);
    }
  }, [currentUser, profileUser]);

  if (loading)
    return <div className="profile-loading">Loading company profile...</div>;
  if (!profileUser)
    return <div className="profile-error">Company profile not found.</div>;

  return (
    <>
      <Navbar />
      <div className="company-profile-container">
        <main className="profile-content">
          <CompanyProfileHeader
            coverPhotoUrl={profileUser.coverPhotoUrl}
            profilePictureUrl={profileUser.profilePic}
            companyName={profileUser.companyName}
            website={profileUser.website}
            location={profileUser.location}
            workDayStart={profileUser.workDayStart}
            workDayEnd={profileUser.workDayEnd}
            isOwner={isOwner}
          />

          <div className="profile-sections">
            <div className="two-column-layout">
              <div className="left-column">
                <CompanyDescription
                  aboutUs={profileUser.description}
                  whyChooseUs={profileUser.benefits}
                />
                <CompanyGallery />
              </div>
              <div className="right-column">
                <CompanyFeedback />
              </div>
            </div>
            <InternshipList companyName={profileUser.companyName} />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default CompanyProfilePage;