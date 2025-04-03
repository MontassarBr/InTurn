"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { FaBars } from "react-icons/fa"; // Hamburger icon
import "./NavbarAfterLogin.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavbarAfterLogin: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<{ name?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileIconRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the token from localStorage or cookies
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          // If no token exists, redirect to login
          router.push('/login');
          return;
        }
        
        // Fetch user data from the backend using native fetch
        const response = await fetch('/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          // If response is not ok (e.g., 401 Unauthorized)
          if (response.status === 401) {
            localStorage.removeItem('authToken');
            router.push('/login');
          }
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [router]);

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      // Show loading state or disable button if needed
      setLoading(true);
      
      // Get the token from localStorage
      const token = localStorage.getItem('authToken');
      
      // Send logout request to the backend using native fetch
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Empty body or you can add any required data
      });
      
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      
      // Clear authentication token and user data from client storage
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('userData');
      
      // After successful logout, redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle error (show error message to user)
      alert('Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to navigate to profile with data fetching
  const handleViewProfile = async () => {
    try {
      // This approach pre-fetches profile data before navigation
      const token = localStorage.getItem('authToken');
      
      // You could prefetch detailed profile data here if needed
      const response = await fetch('/api/user/detailed-profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      
      // Navigate to profile page
      router.push('/profile');
    } catch (error) {
      console.error('Error fetching profile data:', error);
      // Navigate anyway, and let the profile page handle any errors
      router.push('/profile');
    }
  };

  // Handle applications management
  const handleManageApplications = () => {
    // Simple navigation - the Applications page will fetch its own data
    router.push('/applications');
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        profileIconRef.current && 
        !profileIconRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar-after-login">
      {/* Hamburger menu icon - only visible on mobile */}
      <div className="hamburger-menu">
        <FaBars className="menu-icon" onClick={handleMobileMenuToggle} />
      </div>

      <div className="navbar-logo">
        <img src="/images/inturn.png" alt="Platform Logo" />
      </div>

      {/* Desktop navigation links */}
      <div className="navbar-links desktop-links">
        <Link href="/">Home</Link>
        <a href="/all-jobs">All Jobs</a>
        <a href="/companies">Companies</a>
        <a href="/people">People</a>
      </div>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu" ref={mobileMenuRef}>
          <Link href="/">Home</Link>
          <a href="/all-jobs">All Jobs</a>
          <a href="/companies">Companies</a>
          <a href="/people">People</a>
        </div>
      )}

      <div className="navbar-profile" ref={profileIconRef}>
        <FaUserCircle
          className="profile-icon"
          onClick={handleDropdownToggle}
        /> 
        {dropdownVisible && (
          <div className="profile-dropdown" ref={dropdownRef}>
            <div className="dropdown-item" onClick={handleViewProfile}>
              My Profile
            </div>
            <div className="dropdown-item" onClick={handleManageApplications}>
              Manage Applications
            </div>
            <div className="dropdown-item" onClick={handleLogout}>
              Log Out
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarAfterLogin;
