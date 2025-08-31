'use client';
import React, { useState, useEffect, useRef } from 'react';
import './ApplicationsTable.css';

interface Application {
  id: number;
  studentID: number;
  internshipID: number;
  applicationDate: string;
  name: string;
  profilePic: string;
  title: string;
  location: string;
  resumeUrl: string;
  status: string;
}

const getAuthToken = () => {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('authToken='))
    ?.split('=')[1];
};

const ApplicationsTable: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const dropdownRefs = useRef<{[key: number]: HTMLDivElement | null}>({});

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const authToken = getAuthToken();
        const response = await fetch('http://localhost:3001/api/Companies/applications', {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const applicationsList = Array.isArray(data) ? data : 
                              (Array.isArray(data.applications) ? data.applications : []);
        
        setApplications(applicationsList);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownId !== null) {
        const target = event.target as HTMLElement;
        if (!target.closest('.dropdown')) {
          setOpenDropdownId(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdownId]);

  const toggleDropdown = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const dropdownElement = dropdownRefs.current[id];
    
    if (dropdownElement) {
      const dropdownHeight = dropdownElement.offsetHeight;
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      
      if (spaceBelow < dropdownHeight && buttonRect.top > dropdownHeight) {
        dropdownElement.style.bottom = '100%';
        dropdownElement.style.top = 'auto';
      } else {
        dropdownElement.style.top = '100%';
        dropdownElement.style.bottom = 'auto';
      }
    }

    setOpenDropdownId(prevId => prevId === id ? null : id);
  };

  const handleActionChange = async (
    studentID: number,
    internshipID: number,
    applicationDate: string,
    action: 'accept' | 'reject'
  ) => {
    try {
      const authToken = getAuthToken();
      const formattedDate = encodeURIComponent(applicationDate);
      
      const response = await fetch(
        `http://localhost:3001/api/Companies/applications/status`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            status: action === 'accept' ? 'accepted' : 'rejected',
            studentID :studentID,
            internshipID:internshipID,
            applicationDate:applicationDate.slice(0, 10)
          }),
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      setApplications(prev =>
        prev.map(app =>
          app.studentID === studentID &&
          app.internshipID === internshipID &&
          app.applicationDate === applicationDate
            ? { ...app, status: action === 'accept' ? 'accepted' : 'rejected' }
            : app
        )
      );
      
      setOpenDropdownId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update application status');
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
              <th>Applicant Name</th>
              <th>Title</th>
              <th>Location</th>
              <th>Resume</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => {
              const status = application.status.toLowerCase();
              return (
                <tr
                  key={application.id}
                  className={
                    status === 'accepted' ? 'accepted-row' :
                    status === 'rejected' ? 'rejected-row' : ''
                  }
                >
                  <td data-label="#">{index + 1}</td>
                  <td data-label="Applicant Name" className="user-cell">
                    <div className="user-info">
                      <img
                        src={application.profilePic || '/default-avatar.png'}
                        alt={`${application.name}'s profile`}
                        className="user-avatar"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/default-avatar.png'; 
                        }}
                      />
                      <span>{application.name}</span>
                    </div>
                  </td>
                  <td data-label="Title">{application.title}</td>
                  <td data-label="Location">{application.location}</td>
                  <td data-label="Resume">
                    <a
                      className="download-button"
                      href={application.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </td>
                  <td data-label="Status">
                    {status === 'pending' ? (
                      <div className="dropdown">
                        <button 
                          className="dropdown-button"
                          onClick={(e) => toggleDropdown(e, application.id)}
                        >
                          Action
                        </button>
                        <div
                          ref={el => dropdownRefs.current[application.id] = el}
                          className={`dropdown-content ${openDropdownId === application.id ? 'show' : ''}`}
                        >
                          <button
                            className="accept-button"
                            onClick={() =>
                              handleActionChange(
                                application.studentID,
                                application.internshipID,
                                application.applicationDate,
                                'accept'
                              )
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="reject-button"
                            onClick={() =>
                              handleActionChange(
                                application.studentID,
                                application.internshipID,
                                application.applicationDate,
                                'reject'
                              )
                            }
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className={`status-text ${status}`}>
                        {status === 'accepted' ? 'Accepted' : 'Rejected'}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;