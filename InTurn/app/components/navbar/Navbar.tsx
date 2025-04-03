"use client";

import React, { useState } from "react";
import { FaBars } from "react-icons/fa"; // Make sure to install react-icons if you haven't already
import "./Navbar.css";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
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
        <div className="mobile-nav-menu">
          <Link href="/">Home</Link>
          <a href="/all-jobs">All Jobs</a>
          <a href="/companies">Companies</a>
          <a href="/people">People</a>
        </div>
      )}

      <div className="navbar-auth">
        <Link href="/login" className="connexion-button">Connexion</Link>
      </div>
    </nav>
  );
};

export default Navbar;
