import { FaUsers, FaStar, FaSearch, FaLock } from 'react-icons/fa';
import styles from './AnalyticsDashboard.module.css';

interface AnalyticsDashboardProps {
  title?: string;
  metrics?: {
    viewers: number;
    impressions: number;
    searches: number;
  };
  descriptions?: {
    viewers: string;
    impressions: string;
    searches: string;
  };
  isPrivate?: boolean;
}

export default function AnalyticsDashboard({
  title = "Analytics this month",
  metrics = {
    viewers: 200,
    impressions: 100,
    searches: 70
  },
  descriptions = {
    viewers: "Amet elusmod",
    impressions: "Amet elusmod",
    searches: "Amet elusmod"
  },
  isPrivate = true
}: AnalyticsDashboardProps) {
  // Static chart data
  const weeklyViews = [45, 60, 80, 15];
  const weeks = ["W1", "W2", "W3", "W4"];
  const maxViews = Math.max(...weeklyViews, 1);
  const maxChartHeight = 60;

  return (
    <div className={styles.dashboard}>
      {/* Header with privacy indicator */}
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {isPrivate && (
          <div className={styles.privacyBadge}>
            <FaLock className={styles.lockIcon} />
            <span>Private to you</span>
          </div>
        )}
      </div>

      {/* Combined Chart and Metrics */}
      <div className={styles.combinedSection}>
        {/* Static Mini Chart - now matching metric card dimensions */}
        <div className={styles.metricCard}>
          <h2 className={styles.sectionTitle}>Profile views</h2>
          <div className={styles.chartBars}>
            {weeklyViews.map((views, index) => {
              const barHeight = (views / maxViews) * maxChartHeight;
              return (
                <div key={weeks[index]} className={styles.barContainer}>
                  <div 
                    className={styles.bar}
                    style={{ 
                      height: `${barHeight}px`,
                      backgroundColor: `hsl(217, 91%, ${60 - (index * 5)}%)`
                    }}
                  ></div>
                  <span className={styles.weekLabel}>{weeks[index]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Metrics Cards */}
        <div className={styles.metricsGrid}>
          <MetricCard
            value={metrics.viewers}
            label="Viewers"
            description={descriptions.viewers}
            icon={<FaUsers />}
            color="hsl(217, 91%, 60%)"
          />
          <MetricCard
            value={metrics.impressions}
            label="Impressions"
            description={descriptions.impressions}
            icon={<FaStar />}
            color="hsl(272, 91%, 65%)"
          />
          <MetricCard
            value={metrics.searches}
            label="Searches"
            description={descriptions.searches}
            icon={<FaSearch />}
            color="hsl(330, 81%, 65%)"
          />
        </div>
      </div>
    </div>
  );
}

// MetricCard component remains the same
function MetricCard({
  value,
  label,
  description,
  icon,
  color
}: {
  value: number;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className={styles.metricCard}>
      <div className={styles.iconContainer} style={{ color }}>
        {icon}
      </div>
      <div className={styles.metricContent}>
        <span className={styles.metricValue}>{value.toLocaleString()}</span>
        <span className={styles.metricLabel}>{label}</span>
        <p className={styles.metricDescription}>{description}</p>
      </div>
    </div>
  );
}