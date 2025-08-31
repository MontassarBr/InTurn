"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "./Navbar.css";

interface userData {
  userID: string;
  userType: "Student" | "Company";
  userPic: string;
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<userData | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileIconRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/search-internships", label: "All Offers" },
    { href: "/companies", label: "Companies" },
    { href: "/people", label: "People" },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/auth/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUserData({
            userID: data.userID,
            userType: data.userType,
            userPic: data.profilePic,
          });
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

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

      // Modified this section to exclude clicking on the hamburger icon
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    document.cookie =
      "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    setDropdownVisible(false);
    router.push("/");
  };

  const isActive = (href: string) => {
    return href === "/" ? pathname === href : pathname.startsWith(href);
  };

  const getProfileLink = () => {
    if (!userData) return "#";
    return userData.userType === "Student"
      ? `/students/${userData.userID}`
      : `/CompanyProfile/${userData.userID}`;
  };

  const getApplications = () => {
    if (!userData) return "#";
    return userData.userType === "Student"
      ? `/InternshipDashboard`
      : `/Applications`;
  };

  // Toggle mobile menu
  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="hamburger-menu" ref={hamburgerRef}>
        <FaBars
          className="menu-icon"
          onClick={toggleMobileMenu}
        />
      </div>

      <div className="navbar-logo">
        <img src="/images/inturn.png" alt="Platform Logo" />
      </div>

      <div className="navbar-links desktop-links">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? "active-link" : ""}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav-menu mobile-menu-visible" ref={mobileMenuRef}>
          {navItems.map((item) => (
            <div
              key={item.href}
              className={`mobile-menu-item ${isActive(item.href) ? "active-link" : ""}`}
              onClick={() => {
                router.push(item.href);
                setMobileMenuOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}

      <div className="navbar-auth">
        {isLoggedIn ? (
          <div className="profile-section" ref={profileIconRef}>
            <div
              className="profile-icon"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              {userData?.userPic ? (
                <img
                  src={userData.userPic}
                  alt="Profile"
                  className="avatar-image"
                />
              ) : (
                <FaUserCircle />
              )}
            </div>
            {dropdownVisible && (
              <div className="profile-dropdown" ref={dropdownRef}>
                <Link
                  href={getProfileLink()}
                  className="dropdown-item"
                  onClick={() => setDropdownVisible(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={getApplications()}
                  className="dropdown-item"
                  onClick={() => setDropdownVisible(false)}
                >
                  Manage Applications
                </Link>
                <button onClick={handleLogout} className="dropdown-item">
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="connexion-button">
            Connexion
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;