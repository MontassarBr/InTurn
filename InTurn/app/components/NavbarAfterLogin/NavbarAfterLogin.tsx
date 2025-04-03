"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { FaBars } from "react-icons/fa"; // Hamburger icon
import "./NavbarAfterLogin.css";
import Link from "next/link";

const NavbarAfterLogin: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileIconRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    // Logic for logging out goes here (e.g., clearing user session)
    console.log("Logged out!");
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
            <Link href="/CompanyProfile" className="dropdown-item">
              My Profile </Link>
              <Link href="/Applications" className="dropdown-item">
              Manage Applications
            </Link>
            <Link href="/" className="dropdown-item" onClick={handleLogout}>
              Log Out
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarAfterLogin;
