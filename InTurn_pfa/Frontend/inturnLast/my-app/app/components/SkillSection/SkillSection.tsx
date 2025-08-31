import { FaCheck } from 'react-icons/fa';
import styles from './SkillSection.module.css';

interface SkillSectionProps {
  skills: string[];
}

export default function SkillSection({ skills }: SkillSectionProps) {
  return (
    <div className={styles.skillSection}>
      <h2 className={styles.sectionTitle}>Skills</h2>
      <div className={styles.skillList}>
        {skills.map((skill, index) => (
          <div key={index} className={styles.skillItem}>
            <div className={styles.checkCircle}>
              <FaCheck className={styles.checkIcon} />
            </div>
            <span className={styles.skillName}>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}