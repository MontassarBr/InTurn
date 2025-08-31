// components/EditProfile/CompanyGeneralInfoSection.tsx
import { useRef } from 'react';
import { FiUpload, FiTrash2, FiBriefcase,FiMapPin, FiGlobe } from 'react-icons/fi';
import styles from './GeneralInfoSection.module.css';

interface CompanyGeneralInfoProps {
  companyData: {
    companyName: string;
    website: string;
    industry: string;
    workDayStart: string;
    workDayEnd: string;
    description: string;
    profilePic?: string;
  };
  setCompanyData: (data: any) => void;
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function CompanyGeneralInfoSection({ companyData, setCompanyData }: CompanyGeneralInfoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCompanyData({
          ...companyData,
          profilePic: event.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarRemove = () => {
    setCompanyData({
      ...companyData,
      avatar: undefined
    });
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>COMPANY INFORMATION</h2>
      
      <div className={styles.avatarSection}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarWrapper}>
            {companyData.profilePic ? (
              <img src={companyData.profilePic} alt="Company Logo" className={styles.avatar} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <FiBriefcase className={styles.placeholderIcon} />
              </div>
            )}
          </div>
          <div className={styles.avatarActions}>
            <button 
              className={styles.avatarButton}
              onClick={() => fileInputRef.current?.click()}
            >
              <FiUpload className={styles.buttonIcon} />
              Change
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className={styles.fileInput}
              />
            </button>
            <button 
              className={`${styles.avatarButton} ${styles.removeButton}`}
              onClick={handleAvatarRemove}
              disabled={!companyData.profilePic}
            >
              <FiTrash2 className={styles.buttonIcon} />
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Company Name</label>
        <input
          type="text"
          value={companyData.companyName}
          onChange={(e) => setCompanyData({...companyData, companyName: e.target.value})}
          className={styles.inputField}
        />
      </div>

      <div className={styles.formGroup}>
  <label>Website</label>
  <div className={styles.inputWithIcon}>
    <FiGlobe className={styles.inputIcon} />
    <input
      type="url"
      value={companyData.website}
      onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
      className={`${styles.inputField} ${styles.withIcon}`}
      placeholder="https://"
    />
  </div>
</div>
      <div className={styles.formGroup}>
        <label>Industry</label>
        <input
          type="text"
          value={companyData.industry}
          onChange={(e) => setCompanyData({...companyData, industry: e.target.value})}
          className={styles.inputField}
          placeholder="e.g. Technology, Finance"
        />
      </div>

      <div className={styles.nameGroup}>
        <div className={styles.formGroup}>
          <label>Work Week Start</label>
          <select
            value={companyData.workDayStart}
            onChange={(e) => setCompanyData({...companyData, workDayStart: e.target.value})}
            className={styles.inputField}
          >
            {DAYS.map(day => (
              <option key={day} value={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.formGroup}>
          <label>Work Week End</label>
          <select
            value={companyData.workDayEnd}
            onChange={(e) => setCompanyData({...companyData, workDayEnd: e.target.value})}
            className={styles.inputField}
          >
            {DAYS.map(day => (
              <option key={day} value={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.formGroup}>
  <label>Location</label>
  <div className={styles.inputWithIcon}>
    <FiMapPin className={styles.inputIcon} />
    <input
      type="text"
      value={companyData.location}
      onChange={(e) => setCompanyData({...companyData, location: e.target.value})}
      className={`${styles.inputField} ${styles.withIcon}`}
      placeholder="Enter company location"
    />
  </div>
</div>
      <div className={styles.formGroup}>
        <label>Company Description</label>
        <textarea
          value={companyData.description}
          onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
          className={styles.textareaField}
          rows={6}
          placeholder="Describe your company..."
        />
      </div>
    </section>
  );
}