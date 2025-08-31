// components/EditProfile/GeneralInfoSection.tsx
import { useState, useRef } from "react";
import {
  FiBriefcase,
  FiTrash2,
  FiPlus,
  FiX,
  FiUpload,
  FiUser,
} from "react-icons/fi";
import styles from "./GeneralInfoSection.module.css";

interface GeneralInfoSectionProps {
  profileData: {
    firstName: string;
    lastName: string;
    title: string;
    skills: string[];
    description: string;
    about: string;
    profilePic?: string;
    openToWork: boolean;
  };
  setProfileData: (data: any) => void;
}

export default function GeneralInfoSection({
  profileData,
  setProfileData,
}: GeneralInfoSectionProps) {
  const [newSkill, setNewSkill] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSkillAdd = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(
        (skill: string) => skill !== skillToRemove
      ),
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData({
          ...profileData,
          profilePic: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarRemove = () => {
    setProfileData({
      ...profileData,
      profilePic: undefined,
    });
  };
  const handleOpenToWorkChange = (isSelected: boolean) => {
    setProfileData({
      ...profileData,
      openToWork: isSelected,
    });
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>GENERAL INFORMATION</h2>

      <div className={styles.avatarSection}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarWrapper}>
            {profileData.profilePic ? (
              <img
                src={profileData.profilePic}
                alt="Profile"
                className={styles.avatar}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <FiUser className={styles.placeholderIcon} />
              </div>
            )}
          </div>
          <div className={styles.avatarActions}>
            <button
              className={styles.avatarButton}
              onClick={() => fileInputRef.current?.click()}
            >
              <FiUpload className={styles.buttonIcon} />
              Change
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className={styles.fileInput}
              />
            </button>
            <button
              className={`${styles.avatarButton} ${styles.removeButton}`}
              onClick={handleAvatarRemove}
              disabled={!profileData.profilePic}
            >
              <FiTrash2 className={styles.buttonIcon} />
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className={styles.nameGroup}>
        <div className={styles.formGroup}>
          <label>First Name</label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) =>
              setProfileData({ ...profileData, firstName: e.target.value })
            }
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Last Name</label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) =>
              setProfileData({ ...profileData, lastName: e.target.value })
            }
            className={styles.inputField}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Title</label>
        <input
          type="text"
          value={profileData.title}
          onChange={(e) =>
            setProfileData({ ...profileData, title: e.target.value })
          }
          className={styles.inputField}
          placeholder="Professional title"
        />
      </div>
      <div className={styles.openToWorkContainer}>
        <div className={styles.openToWorkContent}>
          <FiBriefcase className={styles.briefcaseIcon} />
          <div className={styles.openToWorkText}>
            <span className={styles.openToWorkTitle}>Open to Work</span>
            <span className={styles.openToWorkSubtitle}>
              Available for opportunities
            </span>
          </div>
          <div className={styles.toggleContainer}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={profileData.openToWork}
                onChange={(e) => handleOpenToWorkChange(e.target.checked)}
                className={styles.toggleInput}
              />
              <span
                className={`${styles.toggleTrack} ${
                  profileData.openToWork ? styles.checked : ""
                }`}
              >
                <span className={styles.toggleThumb} />
              </span>
            </label>
          </div>
        </div>

        {profileData.openToWork && (
          <div className={styles.statusIndicator}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>
              Actively looking for new opportunities
            </span>
          </div>
        )}
      </div>
      <div className={styles.formGroup}>
        <label>Professional Skills</label>
        <div className={styles.skillsContainer}>
          {profileData.skills.map((skill: string) => (
            <div key={skill} className={styles.skillTag}>
              {skill}
              <button
                onClick={() => handleSkillRemove(skill)}
                className={styles.removeSkill}
                aria-label={`Remove ${skill} skill`}
              >
                <FiX />
              </button>
            </div>
          ))}
          <div className={styles.addSkill}>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSkillAdd()}
              placeholder="Add skill"
              className={styles.skillInput}
            />
            <button
              onClick={handleSkillAdd}
              className={styles.addSkillButton}
              disabled={!newSkill.trim()}
            >
              <FiPlus />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.formGroup}>
  <label>Description</label>
  <textarea
    value={profileData.about}
    onChange={(e) =>
      setProfileData({ ...profileData,about: e.target.value })
    }
    className={styles.textareaField}
    rows={4}
    placeholder="Summarize your professional background..."
  />
</div>

      <div className={styles.formGroup}>
        <label>Bio</label>
        <textarea
          value={profileData.description}
          onChange={(e) =>
            setProfileData({ ...profileData, description: e.target.value })
          }
          className={styles.textareaField}
          rows={6}
          placeholder="Tell us about yourself..."
        />
      </div>
    </section>
  );
}
