'use client'
import React from 'react';
import './CompanyFeedback.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const CompanyFeedback = () => {
  const averageRating = 4.5;
  const totalReviews = 12;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star empty" />);
      }
    }
    return stars;
  };

  const sampleReviews = [
    { id: 1, author: "Ahmed M.", rating: 5, comment: "Great mentorship and flexible hours!", profilePic: '/images/kat.jpg' },
    { id: 2, author: "Sarah K.", rating: 4, comment: "Solid internship program, but projects could be more challenging.", profilePic: '/images/sarah.jpg' },
  ];

  return (
    <div className="feedback-section">
      <h2 className="section-title">Student Feedback</h2>
      
      <div className="rating-summary">
        <div className="stars">{renderStars()}</div>
        <span className="average">{averageRating.toFixed(1)}</span>
        <span className="total-reviews">({totalReviews} reviews)</span>
      </div>

      <div className="reviews-list">
        {sampleReviews.map((review) => (
          <div key={review.id} className="review-card">
            <img src={review.profilePic} alt={review.author} className="review-profile-pic" />
            <div className="review-content">
              <div className="review-author">{review.author}</div>
              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={`star ${i < review.rating ? 'filled' : 'empty'}`} 
                  />
                ))}
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="see-all-btn">See All Reviews</button>
    </div>
  );
};

export default CompanyFeedback;
