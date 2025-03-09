// "use client"; // Add this directive at the top

// import React, { useState, useEffect, useRef } from 'react';
// import './Navbar.css';

// const Navbar: React.FC = () => {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown menu

//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setDropdownOpen(false);
//       }
//     };

//     // Add event listener when the dropdown is open
//     if (isDropdownOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     // Cleanup the event listener
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isDropdownOpen]);

//   return (
//     <nav className="navbar">
//       {/* Logo */}
//       <div className="navbar-logo">
//         <img src="images/saul.jpg" alt="Platform Logo" />
//       </div>

//       {/* Navigation Links */}
//       <div className="navbar-links">
//         <a href="/">Home</a>
//         <a href="/all-jobs">All Jobs</a>
//         <a href="/companies">Companies</a>
//         <a href="/people">People</a>
//       </div>

//       User Profile Icon and Dropdown
//       <div className="navbar-profile" ref={dropdownRef}>
//         <div className="profile-icon" onClick={toggleDropdown}>
//           <img src="../images/profile-picture.png" alt="Profile" />
//         </div>
//         {isDropdownOpen && (
//           <div className="dropdown-menu">
//             <a href="/profile">Profile</a>
//             <a href="/my-applications">My Applications</a>
//             <a href="/signout">Sign Out</a>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
"use client";

import React from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">

      <div className="navbar-logo">
      <img src="/images/logo.jpg" alt="Platform Logo" />
      </div>

      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/all-jobs">All Jobs</a>
        <a href="/companies">Companies</a>
        <a href="/people">People</a>
      </div>

      <div className="navbar-auth">
        <a href="/login" className="connexion-button">Connexion</a>
      </div>
    </nav>
  );
};

export default Navbar;
