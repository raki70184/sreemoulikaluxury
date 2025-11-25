# Google Reviews Carousel Section - Implementation Guide for SWE-1

## Overview
This is a testimonial carousel section that displays Google reviews with auto-rotation, navigation arrows, and direct links to Google reviews.

## Section Requirements

### Layout Structure
- Split layout: Image on left (40%), Reviews on right (60%)
- Centered vertically
- Clean, minimal design with beige/cream background
- Responsive design

### Carousel Features
- Auto-rotation every 2 seconds
- Left/Right navigation arrows
- Smooth fade transition between cards
- Pause on hover
- Touch/swipe support for mobile

### Review Card Design
- White background with subtle shadow
- 5-star rating display
- Review text with "READ MORE" link if truncated
- Reviewer name and profile image
- Google logo with clickable link to Google Business page
- Navigation dots at bottom

---

## Complete HTML Structure

```html
<section class="testimonials-section">
  <div class="testimonials-container">
    <!-- Left Side: Image -->
    <div class="testimonials-image">
      <div class="brand-overlay">
        <h2 class="brand-number">904</h2>
        <p class="brand-text">brows</p>
      </div>
      <img src="/images/testimonial-person.jpg" alt="904 Brows Professional" />
    </div>

    <!-- Right Side: Reviews -->
    <div class="testimonials-content">
      <h2 class="testimonials-title">WORDS OF DELIGHT<br>FROM OUR CLIENTS</h2>
      
      <div class="reviews-carousel">
        <!-- Navigation Arrow Left -->
        <button class="carousel-arrow carousel-arrow-left" aria-label="Previous review">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Review Cards Container -->
        <div class="reviews-wrapper">
          <div class="review-card active" data-review-id="1">
            <div class="review-stars">
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
            </div>
            
            <p class="review-text">
              "Highly recommend Sophia! I felt very comfortable as she explained the procedure, what to expect, the healing timeline, etc and (bonus!) I was in and out in 90 min! Book your appoin..."
              <a href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review" target="_blank" class="read-more">READ MORE</a>
            </p>
            
            <div class="reviewer-info">
              <img src="/images/reviewers/reviewer1.jpg" alt="Tiffany Lovett" class="reviewer-avatar" />
              <div class="reviewer-details">
                <p class="reviewer-name">Tiffany Lovett</p>
                <a href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review" target="_blank" class="google-badge">
                  <img src="/images/google-logo.svg" alt="Google" class="google-logo" />
                  <span>Google review</span>
                </a>
              </div>
            </div>
          </div>

          <div class="review-card" data-review-id="2">
            <div class="review-stars">
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
            </div>
            
            <p class="review-text">
              "Amazing experience! The staff was professional and friendly. The results exceeded my expectations. Highly recommend this salon to anyone looking for quality service..."
              <a href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review" target="_blank" class="read-more">READ MORE</a>
            </p>
            
            <div class="reviewer-info">
              <img src="/images/reviewers/reviewer2.jpg" alt="Sarah Johnson" class="reviewer-avatar" />
              <div class="reviewer-details">
                <p class="reviewer-name">Sarah Johnson</p>
                <a href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review" target="_blank" class="google-badge">
                  <img src="/images/google-logo.svg" alt="Google" class="google-logo" />
                  <span>Google review</span>
                </a>
              </div>
            </div>
          </div>

          <div class="review-card" data-review-id="3">
            <div class="review-stars">
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
            </div>
            
            <p class="review-text">
              "Best salon experience ever! From booking to the final result, everything was perfect. The attention to detail and customer care is outstanding. Will definitely be back..."
              <a href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review" target="_blank" class="read-more">READ MORE</a>
            </p>
            
            <div class="reviewer-info">
              <img src="/images/reviewers/reviewer3.jpg" alt="Emily Chen" class="reviewer-avatar" />
              <div class="reviewer-details">
                <p class="reviewer-name">Emily Chen</p>
                <a href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review" target="_blank" class="google-badge">
                  <img src="/images/google-logo.svg" alt="Google" class="google-logo" />
                  <span>Google review</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrow Right -->
        <button class="carousel-arrow carousel-arrow-right" aria-label="Next review">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Carousel Dots -->
      <div class="carousel-dots">
        <button class="dot active" data-index="0" aria-label="Go to review 1"></button>
        <button class="dot" data-index="1" aria-label="Go to review 2"></button>
        <button class="dot" data-index="2" aria-label="Go to review 3"></button>
      </div>
    </div>
  </div>
</section>
```

---

## Complete CSS Styles

```css
/* ==========================================
   TESTIMONIALS SECTION
   ========================================== */

.testimonials-section {
  background: #f5f3f0;
  padding: 100px 20px;
  position: relative;
}

.testimonials-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 80px;
}

/* ==========================================
   LEFT SIDE: IMAGE
   ========================================== */

.testimonials-image {
  flex: 0 0 40%;
  position: relative;
  min-height: 500px;
}

.testimonials-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.brand-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.brand-number {
  font-size: 120px;
  font-weight: 300;
  line-height: 1;
  margin: 0;
  letter-spacing: 2px;
}

.brand-text {
  font-size: 32px;
  font-weight: 400;
  font-style: italic;
  margin: -10px 0 0 0;
  letter-spacing: 3px;
}

/* ==========================================
   RIGHT SIDE: REVIEWS
   ========================================== */

.testimonials-content {
  flex: 1;
  max-width: 600px;
}

.testimonials-title {
  font-size: 36px;
  font-weight: 400;
  letter-spacing: 2px;
  line-height: 1.3;
  margin-bottom: 50px;
  color: #1a1a1a;
  text-transform: uppercase;
}

/* ==========================================
   CAROUSEL CONTAINER
   ========================================== */

.reviews-carousel {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.reviews-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 280px;
}

/* ==========================================
   REVIEW CARD
   ========================================== */

.review-card {
  background: white;
  padding: 35px 40px;
  border-radius: 12px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}

.review-card.active {
  opacity: 1;
  visibility: visible;
  position: relative;
}

/* Stars */
.review-stars {
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
}

.review-stars .star {
  color: #d4a574;
  font-size: 18px;
}

/* Review Text */
.review-text {
  font-size: 15px;
  line-height: 1.7;
  color: #4a4a4a;
  margin-bottom: 25px;
  font-weight: 400;
}

.read-more {
  color: #d4a574;
  text-decoration: none;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: #b8895e;
  text-decoration: underline;
}

/* Reviewer Info */
.reviewer-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.reviewer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.reviewer-details {
  flex: 1;
}

.reviewer-name {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 5px 0;
}

.google-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: #5f6368;
  font-size: 13px;
  transition: opacity 0.3s ease;
}

.google-badge:hover {
  opacity: 0.7;
}

.google-logo {
  width: 16px;
  height: 16px;
}

/* ==========================================
   NAVIGATION ARROWS
   ========================================== */

.carousel-arrow {
  background: white;
  border: 1px solid #e0e0e0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  color: #666;
}

.carousel-arrow:hover {
  background: #f8f8f8;
  border-color: #d4a574;
  color: #d4a574;
}

.carousel-arrow:active {
  transform: scale(0.95);
}

.carousel-arrow svg {
  width: 24px;
  height: 24px;
}

/* ==========================================
   CAROUSEL DOTS
   ========================================== */

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #d0d0d0;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot:hover {
  background: #b0b0b0;
}

.dot.active {
  background: #d4a574;
  width: 12px;
  height: 12px;
}

/* ==========================================
   RESPONSIVE DESIGN
   ========================================== */

@media (max-width: 1024px) {
  .testimonials-container {
    gap: 50px;
  }

  .testimonials-title {
    font-size: 30px;
  }

  .brand-number {
    font-size: 90px;
  }

  .brand-text {
    font-size: 24px;
  }
}

@media (max-width: 768px) {
  .testimonials-section {
    padding: 60px 20px;
  }

  .testimonials-container {
    flex-direction: column;
    gap: 40px;
  }

  .testimonials-image {
    flex: 1;
    width: 100%;
    max-width: 400px;
    min-height: 400px;
  }

  .testimonials-content {
    max-width: 100%;
  }

  .testimonials-title {
    font-size: 26px;
    margin-bottom: 35px;
    text-align: center;
  }

  .review-card {
    padding: 30px 25px;
  }

  .reviews-carousel {
    gap: 15px;
  }

  .carousel-arrow {
    width: 40px;
    height: 40px;
  }

  .brand-number {
    font-size: 70px;
  }

  .brand-text {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .carousel-arrow {
    width: 36px;
    height: 36px;
  }

  .carousel-arrow svg {
    width: 20px;
    height: 20px;
  }

  .review-text {
    font-size: 14px;
  }

  .testimonials-title {
    font-size: 22px;
  }
}
```

---

## Complete JavaScript

```javascript
// ==========================================
// TESTIMONIALS CAROUSEL
// ==========================================

class TestimonialsCarousel {
  constructor() {
    this.carousel = document.querySelector('.reviews-carousel');
    if (!this.carousel) return;

    this.wrapper = this.carousel.querySelector('.reviews-wrapper');
    this.cards = Array.from(this.wrapper.querySelectorAll('.review-card'));
    this.dots = Array.from(document.querySelectorAll('.carousel-dots .dot'));
    this.leftArrow = this.carousel.querySelector('.carousel-arrow-left');
    this.rightArrow = this.carousel.querySelector('.carousel-arrow-right');
    
    this.currentIndex = 0;
    this.autoRotateInterval = null;
    this.autoRotateDelay = 2000; // 2 seconds
    this.isTransitioning = false;

    this.init();
  }

  init() {
    // Set first card as active
    this.showCard(0);

    // Arrow navigation
    this.leftArrow.addEventListener('click', () => this.previous());
    this.rightArrow.addEventListener('click', () => this.next());

    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Pause on hover
    this.wrapper.addEventListener('mouseenter', () => this.pauseAutoRotate());
    this.wrapper.addEventListener('mouseleave', () => this.startAutoRotate());

    // Touch/swipe support
    this.addSwipeSupport();

    // Start auto-rotation
    this.startAutoRotate();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.previous();
      if (e.key === 'ArrowRight') this.next();
    });
  }

  showCard(index) {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    
    // Remove active from all cards
    this.cards.forEach(card => card.classList.remove('active'));
    
    // Add active to current card
    this.cards[index].classList.add('active');
    
    // Update dots
    this.dots.forEach(dot => dot.classList.remove('active'));
    this.dots[index].classList.add('active');
    
    this.currentIndex = index;
    
    // Reset transition lock after animation
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  next() {
    const nextIndex = (this.currentIndex + 1) % this.cards.length;
    this.showCard(nextIndex);
    this.resetAutoRotate();
  }

  previous() {
    const prevIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    this.showCard(prevIndex);
    this.resetAutoRotate();
  }

  goToSlide(index) {
    if (index !== this.currentIndex) {
      this.showCard(index);
      this.resetAutoRotate();
    }
  }

  startAutoRotate() {
    this.autoRotateInterval = setInterval(() => {
      this.next();
    }, this.autoRotateDelay);
  }

  pauseAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
  }

  resetAutoRotate() {
    this.pauseAutoRotate();
    this.startAutoRotate();
  }

  addSwipeSupport() {
    let touchStartX = 0;
    let touchEndX = 0;

    this.wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    this.wrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          this.next();
        } else {
          this.previous();
        }
      }
    };

    this.handleSwipe = handleSwipe;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TestimonialsCarousel();
});
```

---

## Google Integration Setup

### Step 1: Get Your Google Place ID
1. Go to: https://developers.google.com/maps/documentation/places/web-service/place-id
2. Search for your salon
3. Copy the Place ID (looks like: `ChIJN1t_tDeuEmsRUsoyG83frY4`)

### Step 2: Update Links
Replace `YOUR_GOOGLE_PLACE_ID` in the HTML with your actual Place ID:

```html
<!-- Replace this URL format -->
https://g.page/r/YOUR_GOOGLE_PLACE_ID/review

<!-- With your actual Place ID -->
https://g.page/r/ChIJN1t_tDeuEmsRUsoyG83frY4/review
```

### Step 3: Google Logo SVG
Save this as `/images/google-logo.svg`:

```svg
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.68 8.18182C15.68 7.61455 15.6291 7.06909 15.5345 6.54545H8V9.64364H12.3055C12.1164 10.64 11.5491 11.4836 10.6982 12.0509V14.0655H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18182Z" fill="#4285F4"/>
  <path d="M8 16C10.16 16 11.9709 15.2873 13.2945 14.0655L10.6982 12.0509C9.98545 12.5309 9.07636 12.8218 8 12.8218C5.92 12.8218 4.15273 11.4182 3.52 9.52H0.858182V11.5927C2.17818 14.2036 4.87273 16 8 16Z" fill="#34A853"/>
  <path d="M3.52 9.52C3.36 9.04 3.27273 8.53091 3.27273 8C3.27273 7.46909 3.36 6.96 3.52 6.48V4.40727H0.858182C0.312727 5.49091 0 6.70545 0 8C0 9.29455 0.312727 10.5091 0.858182 11.5927L2.93091 9.97091L3.52 9.52Z" fill="#FBBC05"/>
  <path d="M8 3.17818C9.17818 3.17818 10.2255 3.58545 11.0618 4.37818L13.3527 2.08727C11.9636 0.792727 10.1527 0 8 0C4.87273 0 2.17818 1.79636 0.858182 4.40727L3.52 6.48C4.15273 4.58182 5.92 3.17818 8 3.17818Z" fill="#EA4335"/>
</svg>
```

---

## Implementation Checklist

### Files to Create/Modify:
- [ ] Add HTML section to your homepage
- [ ] Add CSS to your main stylesheet (or create `testimonials.css`)
- [ ] Add JavaScript to your main JS file (or create `testimonials.js`)
- [ ] Add Google logo SVG to `/images/google-logo.svg`
- [ ] Add reviewer avatar images to `/images/reviewers/`
- [ ] Add main testimonial image to `/images/testimonial-person.jpg`

### Dynamic Data (Optional Enhancement):
If you want to fetch real Google reviews dynamically, you'll need:

```javascript
// Example: Fetch reviews from Google Places API
async function fetchGoogleReviews() {
  const placeId = 'YOUR_GOOGLE_PLACE_ID';
  const apiKey = 'YOUR_GOOGLE_API_KEY';
  
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
  );
  
  const data = await response.json();
  return data.result.reviews;
}
```

**Note:** For security, this should be done server-side, not client-side.

---

## Testing Checklist

- [ ] Auto-rotation works (changes every 2 seconds)
- [ ] Left/Right arrows navigate correctly
- [ ] Dots navigate to specific reviews
- [ ] Carousel pauses on hover
- [ ] Smooth transitions between cards
- [ ] Google links open in new tab
- [ ] Responsive on mobile devices
- [ ] Touch swipe works on mobile
- [ ] Keyboard navigation works (arrow keys)

---

## Customization Options

### Change Auto-Rotation Speed:
```javascript
this.autoRotateDelay = 3000; // Change to 3 seconds
```

### Change Transition Speed:
```css
.review-card {
  transition: opacity 0.8s ease, visibility 0.8s ease; /* Slower */
}
```

### Change Colors:
```css
.testimonials-section {
  background: #your-color; /* Section background */
}

.review-stars .star {
  color: #your-color; /* Star color */
}

.dot.active {
  background: #your-color; /* Active dot color */
}
```

---

## Additional Notes

1. **Image Requirements:**
   - Testimonial person image: 800x1000px minimum
   - Reviewer avatars: 100x100px minimum, circular crop
   - All images should be optimized for web

2. **Performance:**
   - Images should be compressed (use WebP format if possible)
   - Lazy load images below the fold
   - Consider adding loading="lazy" attribute

3. **Accessibility:**
   - All buttons have aria-labels
   - Keyboard navigation supported
   - Color contrast meets WCAG standards

4. **Browser Support:**
   - Modern browsers (Chrome, Firefox, Safari, Edge)
   - IE11 requires polyfills for CSS variables

---

## Questions for SWE-1 Model

When providing this to SWE-1, include these clarifications:

1. **File Structure:** Where should the CSS and JS be added? (Separate files or inline?)
2. **Image Paths:** Confirm the correct image directory structure
3. **Google Place ID:** Provide your actual Google Place ID
4. **Number of Reviews:** How many review cards should be included?
5. **Mobile Breakpoints:** Any specific mobile design requirements?

---

This implementation guide provides everything needed for a professional Google Reviews carousel matching the design in your image!