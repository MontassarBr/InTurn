'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import styles from './page.module.css';

interface Application {
  id: number;
  companyName: string;
  profilePic: string;
  title: string;
  location: string;
  applicationDate: string;
  status: 'Pending' | 'Rejected' | 'Accepted';
  internshipID: number;
}

const InternshipDashboard = () => {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        const authToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('authToken='));

        if (!authToken) {
          router.push('/login');
          return;
        }

        const response = await fetch('http://localhost:3001/api/Students/applications', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${authToken.split('=')[1]}`
          }
        });
        
        if (response.status === 401) {
          router.push('/login');
          return;
        }

        if (!response.ok) throw new Error('Failed to fetch applications');
        
        const userData = await response.json();
        setApplications(userData.applications || []);
        setResumeName(userData.resumeName || '');
        setResumeUrl(userData.resumeUrl || '');
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          if (err.message.includes('401')) router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchData();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const fileUrl = URL.createObjectURL(file);
    setResumeFile(file);
    setResumeName(file.name);
    setResumeUrl(fileUrl);
  };

  const handleViewResume = () => {
    if (resumeUrl) window.open(resumeUrl, '_blank');
  };

  const handleRemoveResume = () => {
    if (resumeUrl) URL.revokeObjectURL(resumeUrl);
    setResumeFile(null);
    setResumeName('');
    setResumeUrl('');
  };

  const handleApplicationClick = (internshipId: number) => {
    router.push(`/search-internships?internshipId=${internshipId}`);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending': return styles.statusPending;
      case 'Rejected': return styles.statusRejected;
      case 'Accepted': return styles.statusAccepted;
      default: return '';
    }
  };

  if (loading) return <div className={styles.loading}>Loading applications...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className={styles.dashboard}>
        <main className={styles.content}>
          <section className={styles.resumeSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Your Resume</h2>
              {resumeName && (
                <span className={styles.resumeName}>{resumeName}</span>
              )}
            </div>
            <div className={styles.resumeActions}>
              <label className={styles.uploadButton}>
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className={styles.fileInput}
                />
                <span className={styles.buttonIcon}>📁</span>
                Upload Resume
              </label>
              <button 
                className={styles.viewButton}
                onClick={handleViewResume}
                disabled={!resumeUrl}
              >
                <span className={styles.buttonIcon}>👁️</span>
                View Resume
              </button>
              <button 
                className={styles.removeButton}
                onClick={handleRemoveResume}
                disabled={!resumeUrl}
              >
                <span className={styles.buttonIcon}>🗑️</span>
                Remove Resume
              </button>
            </div>
          </section>

          <section className={styles.applicationsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Internships Applied
                <span className={styles.applicationCount}>({applications.length})</span>
              </h2>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.applicationsTable}>
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>Company</th>
                    <th className={styles.tableHeader}>Internship Title</th>
                    <th className={styles.tableHeader}>Location</th>
                    <th className={styles.tableHeader}>Application Date</th>
                    <th className={styles.tableHeader}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr 
                      key={app.id} 
                      className={styles.tableRow}
                      onClick={() => handleApplicationClick(app.internshipID)}
                    >
                      <td className={styles.companyCell}>
                        <img src={app.profilePic} alt={app.companyName} className={styles.companyLogo} />
                        <span className={styles.companyName}>{app.companyName}</span>
                      </td>
                      <td className={styles.tableCell}>{app.title}</td>
                      <td className={styles.tableCell}>{app.location}</td>
                      <td className={styles.tableCell}>
                        {new Date(app.applicationDate).toLocaleDateString()}
                      </td>
                      <td className={styles.statusCell}>
                        <span className={`${styles.statusBadge} ${getStatusClass(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.mobileApplications}>
              {applications.map((app) => (
                <div 
                  key={app.id} 
                  className={styles.applicationCard}
                  onClick={() => handleApplicationClick(app.internshipID)}
                >
                  <div className={styles.cardHeader}>
                    <img src={app.profilePic} alt={app.companyName} className={styles.companyLogo} />
                    <div>
                      <h3 className={styles.companyName}>{app.companyName}</h3>
                      <p className={styles.cardTitle}>{app.title}</p>
                    </div>
                  </div>
                  <div className={styles.cardDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Location:</span>
                      <span>{app.location}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Date:</span>
                      <span>{new Date(app.applicationDate).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Status:</span>
                      <span className={`${styles.statusBadge} ${getStatusClass(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default InternshipDashboard;