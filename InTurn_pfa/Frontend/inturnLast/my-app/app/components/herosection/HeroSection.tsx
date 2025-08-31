import React from "react";
import "./HeroSection.css";

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section">
      {/* Title, Description, and Button */}
      <div className="hero-content">
        <h1>
          <span className="highlight">Internships</span> For You
        </h1>
        <p>
          Discover the best internship opportunities tailored for Tunisian
          students. Kickstart your career with us today!
        </p>
        <div className="centered-button">
          <button className="button">Explore now</button>
        </div>
      </div>

      {/* Rectangle Shape with Two Internship Highlights */}
      <div className="rectangle-container">
        <div className="highlight-card right">
          <div className="logo-placeholder">
            <img src="/images/ui.png" className="logo" />
          </div>
          <div className="highlight-details">
            <h3>UI/UX Intern</h3>
            <p>300-600 DT</p>
          </div>
        </div>
        <div className="highlight-card left">
          <div className="logo-placeholder">
            <img src="/images/java.png" className="logo" />
          </div>
          <div className="highlight-details">
            <h3>Java Intern</h3>
            <p>150-450 DT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
