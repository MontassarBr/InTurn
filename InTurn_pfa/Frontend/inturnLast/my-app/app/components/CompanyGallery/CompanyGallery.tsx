"use client";
import React, { useState } from "react";
import "./CompanyGallery.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const CompanyGallery = () => {
  const galleryImages = [
    "/images/lifeatcompany.jpg",
    "/images/lifeatcompany2.png",
    "/images/lifeatcompany3.jpg",
    "/images/lifeatcompany4.jpg",
    "/images/lifeatcompany5.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextImage = () => {
    if (currentIndex < galleryImages.length - 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Get current pair of images (current and next)
  const currentImages = [
    galleryImages[currentIndex],
    galleryImages[currentIndex + 1],
  ];

  return (
    <div className="company-gallery">
      <h2 className="gallery-title">Life at the Company</h2>
      <div className="gallery-container">
        {currentImages.map((image, index) => (
          <div key={`${currentIndex}-${index}`} className="gallery-item">
            <img
              src={image}
              alt={`Company photo ${currentIndex + index + 1}`}
              className="gallery-image"
            />
          </div>
        ))}
      </div>

      <div className="gallery-arrow-container">
        <button
          className={`gallery-arrow-btn prev-btn ${
            currentIndex === 0 ? "disabled" : ""
          }`}
          onClick={goToPrevImage}
          aria-label="Show previous photos"
          disabled={currentIndex === 0}
        >
          <FaArrowLeft />
        </button>

        <button
          className={`gallery-arrow-btn next-btn ${
            currentIndex >= galleryImages.length - 2 ? "disabled" : ""
          }`}
          onClick={goToNextImage}
          aria-label="Show next photos"
          disabled={currentIndex >= galleryImages.length - 2}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CompanyGallery;
