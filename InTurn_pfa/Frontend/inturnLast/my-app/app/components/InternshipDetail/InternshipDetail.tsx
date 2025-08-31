"use client";

import { FaCheckCircle, FaMapMarkerAlt, FaBuilding, FaBookmark, FaPaperPlane } from 'react-icons/fa';
import styles from './InternshipDetail.module.css';

interface InternshipDetailProps {
  title: string;
  salary: string;
  location: string;
  workArrangement: string;
  workArrangement: string;
  description: string;
  responsibilities: string[];
  companyData: {
    id: string;
    companyName: string;
    description: string;
    companyType: string;
    employees: string;
    location: string;
    workingDays: string;
    profilePic: string;
  };
  payment: string;
  isApplying: boolean;
  onApply: () => void;
}

export default function InternshipDetail({
  title,
  salary,
  location,
  workArrangement,
  workTime,
  description,
  responsibilities,
  companyData,
  payment,
  isApplying,
  onApply
}: InternshipDetailProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.salary}>
          {salary === '0-0DT' ? 'Unpaid' : salary.replace('DT', ' DT')}
        </span>
      </header>
      
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <FaBuilding className={styles.icon} />
          <span>{companyData.companyName}</span>
        </div>
        <div className={styles.metaItem}>
          <FaMapMarkerAlt className={styles.icon} />
          <span>{location}</span>
        </div>
      </div>

      <div className={styles.tagsActionsContainer}>
        <div className={styles.tags}>
          <span className={styles.tag}>{workTime}</span>
          <span className={styles.tag}>{workArrangement}</span>
        </div>
        <div className={styles.actions}>
          <button className={styles.saveButton}>
            <FaBookmark className={styles.buttonIcon} />
            Save Internship
          </button>
          <button 
            className={styles.applyButton} 
            onClick={onApply}
            disabled={isApplying}
          >
            <FaPaperPlane className={styles.buttonIcon} />
            {isApplying ? 'Applying...' : 'Apply Now'}
          </button>
        </div>
      </div>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Description</h2>
        <p className={styles.description}>{description || 'No description available'}</p>
      </section>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Responsibilities</h2>
        <ul className={styles.responsibilities}>
          {responsibilities.map((item, index) => (
            <li key={index} className={styles.responsibilityItem}>
              <FaCheckCircle className={styles.checkIcon} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}