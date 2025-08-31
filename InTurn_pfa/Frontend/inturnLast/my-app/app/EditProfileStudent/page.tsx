// app/edit-profile/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SidebarNav from "../components/EditProfile/SidebarNav";
import GeneralInfoSection from "../components/EditProfile/GeneralInfoSection";
import WorkExperienceSection from "../components/EditProfile/WorkExperienceSection";
import EducationSection from "../components/EditProfile/EducationSection";
import styles from "./page.module.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

interface ProfileData {
  firstName: string;
  lastName: string;
  title: string;
  skills: string[];
  description: string;
  profilePic?: string;
  about: string;
  openToWork: boolean;
  experiences: any[];
  education: any[];
}

export default function EditProfile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    title: "",
    skills: [],
    description: "",
    about: "",
    openToWork: false,
    experiences: [],
    education: [],
  });
  const [initialData, setInitialData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const getAuthToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const token = getAuthToken();

        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:3001/api/students/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        if (!response.ok) throw new Error("Failed to load profile");

        const data = await response.json();
        setProfileData(data);
        setInitialData(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
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
        router.push("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:3001/api/students/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profileData),
        }
      );

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (!response.ok) throw new Error("Save failed");

      const data = await response.json();
      setInitialData(data);
      setShowNotification(true); 
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile");
    } finally {
      setSaveLoading(false);
    }
  };


  const handleCancel = () => {
    if (initialData) {
      setProfileData(initialData);
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
          <h1 className={styles.mainTitle}>Edit Profile</h1>
          <div className={styles.actionButtons}>
            <button className={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
            <button
              className={styles.saveButton}
              onClick={handleSave}
              disabled={saveLoading}
            >
              {saveLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className={styles.profileLayout}>
          <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className={styles.profileContent}>
            {activeTab === "general" && (
              <GeneralInfoSection
                profileData={profileData}
                setProfileData={setProfileData}
              />
            )}

            {activeTab === "experience" && (
              <WorkExperienceSection
                experiences={profileData.experiences}
                setWorkExperiences={(newExperiences) =>
                  setProfileData({
                    ...profileData,
                    experiences: newExperiences,
                  })
                }
              />
            )}

            {activeTab === "education" && (
              <EducationSection
                educationEntries={profileData.education}
                setEducationEntries={(newEducation) =>
                  setProfileData({ ...profileData, education: newEducation })
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
