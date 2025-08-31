// components/EditProfile/CompanySidebarNav.tsx
import styles from './SidebarNav.module.css';

interface CompanySidebarNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TABS = [
  { id: 'general', label: 'General' },
  { id: 'benefits', label: 'Benefits' },
];

export default function CompanySidebarNav({ activeTab, setActiveTab }: CompanySidebarNavProps) {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.sidebarTitle}>Company Sections</h2>
      <nav>
        <ul className={styles.navList}>
          {TABS.map((tab) => (
            <li key={tab.id}>
              <button
                className={`${styles.navButton} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}