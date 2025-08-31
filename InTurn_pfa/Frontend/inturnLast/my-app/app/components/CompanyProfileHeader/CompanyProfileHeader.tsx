// app/components/CompanyProfileHeader/CompanyProfileHeader.tsx
"use client";
import React from "react";
import { Globe, MapPin, Calendar } from "lucide-react";
import { FaEdit, FaChartLine } from "react-icons/fa";
import { useRouter } from "next/navigation";
import "./CompanyProfileHeader.css";

interface CompanyProfileHeaderProps {
  coverPhotoUrl: string;
  profilePictureUrl: string;
  companyName: string;
  website: string;
  location: string;
  workDayStart: string;
  workDayEnd: string;
  isLoading?: boolean;
  isOwner?: boolean;
}

const CompanyProfileHeader: React.FC<CompanyProfileHeaderProps> = ({
  coverPhotoUrl,
  profilePictureUrl,
  companyName,
  website,
  location,
  workDayStart,
  workDayEnd,
  isLoading = false,
  isOwner = false,
}) => {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="profile-header loading">
        <div className="cover-photo shimmer"></div>
        <div className="profile-info-container">
          <div className="profile-pic-container shimmer"></div>
          <div className="company-details">
            <div className="company-header">
              <h1 className="company-name shimmer"></h1>
              <div className="action-buttons shimmer"></div>
            </div>
            <div className="company-meta">
              <span className="meta-item shimmer"></span>
              <span className="meta-item shimmer"></span>
              <span className="meta-item shimmer"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-header">
      <div className="cover-photo">
        <img
          src={coverPhotoUrl || "/images/default-cover.png"}
          alt="Company Cover"
          className="cover-img"
        />
      </div>

      <div className="profile-info-container">
        <div className="profile-pic-container">
          <img
            src={profilePictureUrl || "/default-company.png"}
            alt={companyName || "Company logo"}
            className="profile-pic"
          />
        </div>

        <div className="company-details">
          <div className="company-header">
            <h1 className="company-name">{companyName}</h1>
            <div className="action-buttons">
              {isOwner ? (
                <div className="owner-actions">
                  <button
                    className="header-action-btn edit"
                    onClick={() => router.push("/edit-company-profile")}
                  >
                    <FaEdit className="icon" />
                    Edit Profile
                  </button>
                  <button
                    className="header-action-btn track"
                    onClick={() => router.push("/Applications")}
                  >
                    <FaChartLine className="icon" />
                    Track Apps
                  </button>
                </div>
              ) : (
                <button className="follow-btn">Follow</button>
              )}
            </div>
          </div>

          <div className="company-meta">
            {website && (
              <span className="meta-item">
                <Globe size={16} />
                <a
                  href={
                    website.startsWith("http") ? website : `https://${website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {website.replace(/^https?:\/\//, "")}
                </a>
              </span>
            )}
            {location && (
              <span className="meta-item">
                <MapPin size={16} /> {location}
              </span>
            )}
            {workDayStart && workDayEnd && (
              <span className="meta-item">
                <Calendar size={16} /> {workDayStart} - {workDayEnd}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileHeader;
