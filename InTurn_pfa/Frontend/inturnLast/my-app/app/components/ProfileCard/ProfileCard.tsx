"use client";
import { FaEdit, FaChartLine } from "react-icons/fa";
import { useRouter } from "next/navigation";
import styles from "./ProfileCard.module.css";
import { useState } from "react";

interface ProfileCardProps {
  name: string;
  title: string;
  description: string;
  skills: string[];
  profileLink: string;
  profilePic: string;
  coverImage: string;
  isOwner?: boolean;
}

export default function ProfileCard({
  name,
  title,
  description,
  skills,
  profileLink,
  profilePic,
  coverImage,
  isOwner = false,
}: ProfileCardProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.profileCard}>
      <div className={styles.coverContainer}>
        <img src={coverImage?coverImage:'/images/default-Cover.png'} alt="Cover" className={styles.coverPhoto} />
        <div className={styles.profilePictureContainer}>
          <img
            src={profilePic}
            alt={name}
            className={styles.profilePicture}
          />
        </div>
      </div>

      <div className={styles.profileInfo}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.title}>{title}</p>
        <p className={styles.bio}>{description}</p>

        {isOwner && (
          <div className={styles.actionButtons}>
            <button
              className={styles.editButton}
              onClick={() => router.push("/EditProfileStudent")}
            >
              <FaEdit className={styles.buttonIcon} />
              Edit Profile
            </button>
            <button
              className={styles.trackButton}
              onClick={() => router.push("/InternshipDashboard")}
            >
              <FaChartLine className={styles.buttonIcon} />
              Track Applications
            </button>
          </div>
        )}

        <div className={styles.skillsContainer}>
          {skills.map((skill, index) => (
            <span key={index} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>

        <div className={styles.profileLinkSection}>
          <label className={styles.profileLinkLabel}>Profile Link</label>
          <div className={styles.linkInputContainer}>
            <input
              type="text"
              value={profileLink}
              readOnly
              className={styles.linkInput}
            />
            <button
              className={`${styles.copyButton} ${copied ? styles.copied : ""}`}
              onClick={handleCopyLink}
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      </div>

      {copied && <div className={styles.copyNotification}>Link copied!</div>}
    </div>
  );
}
