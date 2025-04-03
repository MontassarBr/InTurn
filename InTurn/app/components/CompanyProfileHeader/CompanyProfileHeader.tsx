'use client';
import React, { useState } from 'react';
import { Globe, MapPin, Calendar } from 'lucide-react'; // Import Lucide icons
import './CompanyProfileHeader.css';

interface CompanyProfileHeaderProps {
  coverPhotoUrl: string;
  profilePictureUrl: string;
  companyName: string;
  website: string;
  location: string;
  workDayStart: string;
  workDayEnd: string;
  isLoading?: boolean;
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
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  if (isLoading) {
    return (
      <div className="profile-header loading">
        <div className="cover-photo shimmer"></div>
        <div className="profile-info-container">
          <div className="profile-pic-container shimmer"></div>
          <div className="company-details">
            <div className="company-header">
              <h1 className="company-name shimmer"></h1>
              <div className="follow-btn-container">
                <button className="follow-btn shimmer"></button>
              </div>
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
      {/* Cover Photo */}
      <div className="cover-photo">
        <img 
          src={coverPhotoUrl || "https://via.placeholder.com/1200x300"} 
          alt="Company Cover" 
          className="cover-img" 
        />
      </div>

      {/* Profile Picture & Info */}
      <div className="profile-info-container">
        <div className="profile-pic-container">
          <img 
            src={profilePictureUrl || "https://via.placeholder.com/150"} 
            alt={companyName ? `${companyName} logo` : "Company logo"}
            className="profile-pic" 
          />
        </div>

        <div className="company-details">
          <div className="company-header">
            <h1 className="company-name">{companyName || "Company Name"}</h1>
            <div className="follow-btn-container">
              <button 
                className={`follow-btn ${isFollowing ? 'unfollow' : ''}`} 
                onClick={toggleFollow}
                aria-label={isFollowing ? 'Unfollow company' : 'Follow company'}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          </div>

          {/* Company Meta Data */}
          <div className="company-meta">
            {website && (
              <span className="meta-item">
                <Globe size={16} strokeWidth={1.5} />
                <a 
                  href={website.startsWith('http') ? website : `https://${website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {website.replace(/^https?:\/\//, '')}
                </a>
              </span>
            )}
            {location && (
              <span className="meta-item">
                <MapPin size={16} strokeWidth={1.5} /> {location}
              </span>
            )}
            {workDayStart && workDayEnd && (
              <span className="meta-item">
                <Calendar size={16} strokeWidth={1.5} /> {workDayStart} - {workDayEnd}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileHeader;
