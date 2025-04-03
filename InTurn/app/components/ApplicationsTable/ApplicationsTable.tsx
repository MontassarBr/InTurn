'use client'
import React, { useState, useEffect } from 'react';
import './ApplicationsTable.css';

interface Application {
  id: number;
  userName: string;
  userImage: string;
  internshipTitle: string;
  location: string;
  resumeUrl: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const ApplicationsTable: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('api');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleActionChange = async (id: number, action: 'accept' | 'reject') => {
    try {
      const response = await fetch(`https://api.yourdomain.com/applications/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: action === 'accept' ? 'accepted' : 'rejected'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local state if API call succeeds
      setApplications(applications.map(app => {
        if (app.id === id) {
          return {
            ...app,
            status: action === 'accept' ? 'accepted' : 'rejected'
          };
        }
        return app;
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update application status');
      console.error('Error updating application status:', err);
    }
  };

  if (loading) {
    return (
      <div className="applications-container">
        <h2>Applications Management</h2>
        <div className="loading-message">Loading applications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="applications-container">
        <h2>Applications Management</h2>
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="applications-container">
        <h2>Applications Management</h2>
        <div className="no-applications-message">No applications found.</div>
      </div>
    );
  }

  return (
    <div className="applications-container">
      <h2>Applications Management</h2>
      <div className="table-container">
        <table className="applications-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Title</th>
              <th>Location</th>
              <th>Resume</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr 
                key={application.id}
                className={
                  application.status === 'accepted' 
                    ? 'accepted-row' 
                    : application.status === 'rejected' 
                      ? 'rejected-row' 
                      : ''
                }
              >
                <td>{application.id}</td>
                <td className="user-cell">
                  <div className="user-info">
                    <img 
                      src={application.userImage} 
                      alt={`${application.userName}'s profile`}
                      className="user-avatar"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/path/to/default-avatar.jpg';
                      }}
                    />
                    <span>{application.userName}</span>
                  </div>
                </td>
                <td>{application.internshipTitle}</td>
                <td>{application.location}</td>
                <td>
                  <button 
                    className="download-button"
                  >
                    Download
                  </button>
                </td>
                <td>
                  {application.status === 'pending' ? (
                    <div className="dropdown">
                      <button className="dropdown-button">Action</button>
                      <div className="dropdown-content">
                        <button 
                          className="accept-button"
                          onClick={() => handleActionChange(application.id, 'accept')}
                        >
                          Accept
                        </button>
                        <button 
                          className="reject-button"
                          onClick={() => handleActionChange(application.id, 'reject')}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span className="status-text">
                      {application.status === 'accepted' ? 'Accepted' : 'Rejected'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;
