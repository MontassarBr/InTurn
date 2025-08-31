// components/EditProfile/BenefitsSection.tsx
import { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import styles from './GeneralInfoSection.module.css';

interface BenefitsSectionProps {
  benefits: string[];
  setBenefits: (benefits: string[]) => void;
}

export default function BenefitsSection({ benefits, setBenefits }: BenefitsSectionProps) {
  const [newBenefit, setNewBenefit] = useState('');

  const handleAddBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (benefitToRemove: string) => {
    setBenefits(benefits.filter(benefit => benefit !== benefitToRemove));
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>COMPANY BENEFITS</h2>
      
      <div className={styles.formGroup}>
        <label>Employee Benefits</label>
        <div className={styles.skillsContainer}>
          {benefits.map((benefit) => (
            <div key={benefit} className={styles.skillTag}>
              {benefit}
              <button 
                onClick={() => handleRemoveBenefit(benefit)}
                className={styles.removeSkill}
                aria-label={`Remove ${benefit}`}
              >
                <FiX />
              </button>
            </div>
          ))}
          <div className={styles.addSkill}>
            <input
              type="text"
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddBenefit()}
              placeholder="Add benefit"
              className={styles.skillInput}
            />
            <button 
              onClick={handleAddBenefit} 
              className={styles.addSkillButton}
              disabled={!newBenefit.trim()}
            >
              <FiPlus />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}