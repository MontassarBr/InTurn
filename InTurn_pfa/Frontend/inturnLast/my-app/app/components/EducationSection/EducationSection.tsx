'use client'
import { FaCalendarAlt, FaLayerGroup } from 'react-icons/fa';
import styles from './EducationSection.module.css';

interface Education {
  id: string;
  logo: string;
  institution: string;
  location: string;
  diploma: string;
  duration: string;
}

interface EducationSectionProps {
  educationData: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ educationData }) => {
  return (
    <div className={styles.educationSection}>
      <h2 className={styles.sectionTitle}>Education</h2>
      <div className={styles.educationList}>
        {educationData.map(entry => (
          <div key={entry.id} className={styles.educationEntry}>
            <div className={styles.logoContainer}>
              <img 
                src='/images/111.png'
                alt={`${entry.institution} logo`} 
                className={styles.institutionLogo}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/1011.png';
                }}
              />
            </div>
            
            <div className={styles.details}>
              <h3 className={styles.institutionName}>
                {entry.institution}, <span className={styles.location}>{entry.location}</span>
              </h3>
              
              <div className={styles.degree}>
                <FaLayerGroup className={styles.degreeIcon} />
                <span>{entry.diploma}</span>
              </div>
              
              <div className={styles.duration}>
                <FaCalendarAlt className={styles.calendarIcon} />
                <span>{entry.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;