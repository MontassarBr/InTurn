import { FaBuilding, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './CompanyProfile.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface CompanyProfileProps {
  companyId: string;
  name: string;
  description: string;
  companyType: string;
  employees: string;
  location: string;
  workingDays: string;
  logoUrl: string;
}

export default function CompanyProfile({
  companyId,
  name = "Unknown Company",
  description = "No description available",
  companyType = "Unknown",
  employees = "Unknown",
  location = "Unknown",
  workingDays = "Monday-Friday",
  logoUrl = ""
}: CompanyProfileProps) {
  return (
    <div className={styles.profileCard}>
      <div className={styles.header}>
        <h3 className={styles.sectionTitle}>About company</h3>
        <Link href={`/CompanyProfile/${companyId}`} className={styles.profileLink}>
          View company profile <FaExternalLinkAlt className={styles.linkIcon} />
        </Link>
      </div>
      <div className={styles.companyHeader}>
        <div className={styles.logoWrapper}>
          <Image 
            src={logoUrl}
            alt={`${name} logo`}
            width={48}
            height={48}
            className={styles.logo}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '';
            }}
          />
        </div>
        <h2 className={styles.companyName}>{name}</h2>
      </div>
      
      <p className={styles.description}>{description}</p>
      
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <FaBuilding className={styles.icon} />
          <span>{companyType}</span>
        </div>
        <div className={styles.detailItem}>
          <FaUsers className={styles.icon} />
          <span>{employees} employees</span>
        </div>
        <div className={styles.detailItem}>
          <FaMapMarkerAlt className={styles.icon} />
          <span>{location}</span>
        </div>
        <div className={styles.detailItem}>
          <FaCalendarAlt className={styles.icon} />
          <span>{workingDays}</span>
        </div>
      </div>
    </div>
  );
}