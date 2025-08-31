'use client'
import { FaBriefcase, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import styles from './ExperienceCard.module.css';
interface Experience {
  id: string;
  logo: string;
  title: string;
  employmentType: string;
  companyName: string;
  duration: string;
  description: string;
}

interface ExperienceCardProps {
  experiences: Experience[];
}

export default function ExperienceCard({ experiences }: ExperienceCardProps) {
  return (
    <div className={styles.experienceCard}>
      <h2 className={styles.sectionTitle}>Professional Experience</h2>
      
      {experiences.map((exp) => (
        <div key={exp.id} className={styles.experienceItem}>
          <div className={styles.header}>
            <img 
              src={exp.logo} 
              alt={`${exp.companyName} logo`} 
              className={styles.companyLogo}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-company-logo.png';
              }}
            />
            
            <div className={styles.textContent}>
              <div className={styles.titleWrapper}>
                <h3 className={styles.jobTitle}>{exp.title}</h3>
                <div className={styles.metaInfo}>
                  <div className={styles.infoItem}>
                    <FaBriefcase className={styles.icon} />
                    <span>Full Time</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span>{exp.companyName}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <FaCalendarAlt className={styles.icon} />
                    <span>{exp.duration}</span>
                  </div>
                </div>
              </div>
              <p className={styles.jobDescription}>{exp.description}</p>
            </div>
          </div>

          <button className={styles.seeMoreButton}>
            See more
            <FaArrowRight className={styles.arrowIcon} />
          </button>

          {exp.id !== experiences[experiences.length - 1]?.id && <hr className={styles.divider} />}
        </div>
      ))}
    </div>
  );
}