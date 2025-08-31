"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import ProfileCard from "@/app/components/ProfileCard/ProfileCard";
import AnalyticsDashboard from "@/app/components/AnalyticsCard/AnalyticsDashboard";
import AboutCard from "@/app/components/AboutCard/AboutCard";
import ExperienceCard from "@/app/components/ProfessionalExperience/ExperienceCard";
import SkillSection from "@/app/components/SkillSection/SkillSection";
import EducationSection from "@/app/components/EducationSection/EducationSection";
import styles from "./page.module.css";
interface User {
  userID: string;
  name: string;
  title: string;
  description: string;
  skills: string[];
  profileLink: string;
  profilePic: string;
  coverImage: string;
  openToWork: boolean;
  about: string;
  experiences: Experience[];
  education: Education[];
}

interface Experience {
  expeienceID: string;
  logo: string;
  title: string;
  employmentType: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  logo: string;
  institution: string;
  location: string;
  diploma: string;
  duration: string;
}

export default function StudentProfile() {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profileUser, setProfileUser] = useState<User | null>(null);
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
          `http://localhost:3001/api/students/profile/${userId}`
        );
        if (res.ok) setProfileUser(await res.json());
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfileUser();
  }, [userId]);

  useEffect(() => {
    if (currentUser && profileUser) {
      setIsOwner(currentUser.userID === profileUser.userID);
    }
  }, [currentUser, profileUser]);

  if (loading || !profileUser) {
    return (
      <main className={styles.mainContainer}>
        <Navbar />
        <div className={styles.skeletonContainer}>
          <div className={styles.profileLayout}>
            {/* Left Skeleton */}
            <div className={styles.leftSection}>
              <div className={styles.skeletonCard}>
                <div className={styles.skeletonCover} />
                <div className={styles.skeletonAvatar} />
                <div className={styles.skeletonLine} style={{ width: "60%" }} />
                <div className={styles.skeletonLine} style={{ width: "40%" }} />
                <div
                  className={styles.skeletonLine}
                  style={{ width: "80%", height: "4rem" }}
                />
                <div className={styles.skeletonButton} />
                <div className={styles.skeletonButton} />
              </div>
            </div>

            {/* Right Skeleton */}
            <div className={styles.rightSection}>
              <div
                className={styles.skeletonCard}
                style={{ height: "200px" }}
              />
              <div
                className={styles.skeletonCard}
                style={{ height: "180px" }}
              />
              <div
                className={styles.skeletonCard}
                style={{ height: "220px" }}
              />
              <div
                className={styles.skeletonCard}
                style={{ height: "240px" }}
              />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className={styles.mainContainer}>
      <Navbar />
      <div className={styles.profileLayout}>
        <div className={styles.leftSection}>
          <ProfileCard
            name={profileUser.name}
            title={profileUser.title}
            description={profileUser.description}
            skills={profileUser.skills}
            profileLink={profileUser.profileLink}
            profilePic={profileUser.profilePic}
            coverImage={profileUser.coverImage}
            isOwner={isOwner}
          />
        </div>

        <div className={styles.rightSection}>
          {isOwner && <AnalyticsDashboard />}
          <AboutCard
            openToWork={profileUser.openToWork}
            description={profileUser.about}
          />
          <ExperienceCard experiences={profileUser.experiences} />
          <SkillSection skills={profileUser.skills} />
          <EducationSection educationData={profileUser.education} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
