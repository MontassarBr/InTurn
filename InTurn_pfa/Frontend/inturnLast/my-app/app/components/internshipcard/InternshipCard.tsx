import React from 'react';
import { Building2, MapPin, Clock } from 'lucide-react';
import styles from './InternshipCard.module.css';

interface InternshipCardProps {
  internship: {
    id: number;
    title: string;
    companyName: string;
    location: string;
    salary: string;
    workArrangement: string;
    workTime: string;
    profilePic: string | null;
  };
  isSelected: boolean;
  onClick: () => void;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ 
  internship, 
  isSelected,
  onClick
}) => {
  return (
    <div 
      className={`${styles.icCard} ${isSelected ? styles.icSelected : ''}`}
      onClick={onClick}
    >
      <div className={styles.icHeader}>
        <div className={styles.icLogo}>
          <img 
            src={internship.profilePic || ''} 
            alt={`${internship.companyName} Logo`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '';
            }}
          />
        </div>
        <div className={styles.icInfo}>
          <h3 className={styles.icTitle}>{internship.title}</h3>
          <p className={styles.icSalary}>
            {internship.salary === '0-0DT' ? 'Unpaid' : internship.salary.replace('DT', ' DT')}
          </p>
        </div>
      </div>

      <div className={styles.icDetail}>
        <Building2 size={16} />
        <p className={styles.icCompany}>{internship.companyName}</p>
      </div>
      
      <div className={styles.icDetail}>
        <MapPin size={16} />
        <p className={styles.icLocation}>{internship.location}</p>
      </div>
      
      <div className={styles.icDetail}>
        <Clock size={16} />
        <p className={styles.icType}>{internship.workTime} • {internship.workArrangement}</p>
      </div>
    </div>
  );
};

export default InternshipCard;