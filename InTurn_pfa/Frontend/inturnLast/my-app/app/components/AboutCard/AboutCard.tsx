import { FaBriefcase } from 'react-icons/fa';
import styles from './AboutCard.module.css';

interface AboutCardProps {
  openToWork: boolean;
  description: string;
}

const AboutCard: React.FC<AboutCardProps> = ({ openToWork, description }) => {
  return (
    <div className={styles.aboutCard}>
      <div className={styles.header}>
        <h2 className={styles.title}>About</h2>
        {openToWork && (
          <div className={styles.openToWork}>
            <FaBriefcase className={styles.workIcon} />
            <span>Open to work</span>
          </div>
        )}
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default AboutCard;