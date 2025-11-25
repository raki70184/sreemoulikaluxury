import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight, Star } from '@mui/icons-material';
import styles from './GoogleReviews.module.css';
import ReviewImage from '../images/OurServicesImages/ReviewImage.jpeg';
import googleIcon from '../images/WebsiteImages/googleicon.jpeg';

// Mock data - replace with actual Google Reviews API data
const reviews = [
  {
    id: 1,
    name: 'Anjali Sharma',
    rating: 5,
    comment: 'Divya was very patient with me and she has done amazing job for my big day.I genuinely liked the makeup and hairstyle they did',
    // date: '2 weeks ago',
    avatar: 'AS',
  },
  {
    id: 2,
    name: 'Spandana Rupavath',
    rating: 5,
    comment: 'I got my nails done today. Innara and Prasanna were very sweet and did a great job! the massage after felt too good!!',
    // date: '1 month ago',
    avatar: 'SR',
  },
  {
    id: 3,
    name: 'Srikanth Mangu',
    rating: 5,
    comment: 'Nice experience and Stylist Rahmat is good and very polite. Will visit once again. Recommend to others too.',
    // date: '3 weeks ago',
    avatar: 'SM',
  },
  {
    id: 4,
    name: 'Suman Verma',
    rating: 5,
    comment: 'Thank you Divya ,Vikas and SM team. ' + <br /> + 'I got a balayage done on my previously home-colored hair, and I couldn’t be happier with the result! The hairstylist did an absolutely amazing job—perfectly blended tones, beautiful shine, and a completely natural look. I honestly didn’t think my hair could turn out this good after coloring it at home for so long! The attention to detail, professionalism, and the care taken throughout the process were outstanding. Highly recommend to anyone looking for a hair transformation .',
    // date: '3 weeks ago',
    avatar: 'SV',
  },
  {
    id: 5,
    name: 'Sirilecah Puli',
    rating: 5,
    comment: 'Inara was amazing and friendly and she was very good with her work and lovely to make nalis with inara',
    // date: '3 weeks ago',
    avatar: 'SP',
  },
];

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const GoogleReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState<{[key: number]: boolean}>({});

  const toggleExpand = (id: number) => {
    setExpandedReviews(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextReview();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsInnerContainer}>
        <div className={styles.contentWrapper}>
          {/* Left Side: Image */}
          <div className={styles.imageSection}>
            <img
              src={ReviewImage}
              alt="SM Luxury Salon"
              className={styles.image}
            />
          </div>

          {/* Right Side: Content */}
          <div className={styles.reviewsSection}>
            <div className={styles.reviewsContent}>
              <div className={styles.titleSection}>
                <div className={styles.titleText}>
                  What Our Clients Love About Us
                </div>
              </div>
              <div className={styles.reviewContent}>
                {reviews.map((review, index) => (
                  <div
                    key={review.id}
                    style={{
                      display: index === currentIndex ? 'block' : 'none',
                      transition: 'opacity 0.3s ease-in-out'
                    }}
                  >
                    <div className={styles.reviewCard}>
                      <div className={styles.reviewHeader}>
                        <Avatar className={styles.avatar}>
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <div className={styles.reviewerInfo}>
                          <div className={styles.reviewerName}>
                            {review.name}
                          </div>
                          <div className={styles.ratingContainer}>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={i < review.rating ? styles.star : styles.starInactive}
                                style={{ fontSize: '1rem' }}
                              />
                            ))}
                            <span className={styles.reviewDate}>
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.reviewText}>
                        <div className={expandedReviews[review.id] ? styles.expandedText : styles.collapsedText}>
                          "{review.comment}"
                        </div>
                        {review.comment.length > 200 && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(review.id);
                            }} 
                            className={styles.readMoreButton}
                          >
                            {expandedReviews[review.id] ? 'Read less' : 'Read more'}
                          </button>
                        )}
                      </div>
                      <a
                        href="https://search.google.com/local/reviews?placeid=ChIJu3tkyN-byzsRDq93zKzDG2M"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.googleReviewLink}
                      >
                        <img
                          width="20"
                          aria-hidden="true"
                          focusable="false"
                          className={styles.googleIcon}
                          role="img"
                          height="20"
                          src={googleIcon}
                          alt="Google"
                        />
                        Google review
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <IconButton
                onClick={prevReview}
                className={`${styles.navButton} ${styles.prevButton}`}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={nextReview}
                className={`${styles.navButton} ${styles.nextButton}`}
              >
                <ChevronRight />
              </IconButton>

              {/* Dots Indicator */}
              <div className={styles.dotsContainer}>
                {reviews.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={styles.dot}
                    style={{
                      backgroundColor: currentIndex === index ? '#1976d2' : '#e0e0e0',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleReviews;
