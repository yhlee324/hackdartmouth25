import React from 'react';
import './HeroSection.css';
// import heroImage from '../../assets/images/hero-image.jpg'; // Example if you have an image

function HeroSection() {
  return (
    <section className="hero-section">
      {/* If using a background image, it's often set in the CSS */}
      <div className="container">
        <h1>Welcome to ProtectOurPals</h1> {/* Placeholder */}
        <p>Your trusted partner in ensuring the safety and well-being of your furry friends.</p> {/* Placeholder */}
        <button className="cta-button">Get Started</button> {/* Placeholder */}
      </div>
      {/* Or if you have a foreground image: */}
      {/* <img src={heroImage} alt="Happy pets" /> */}
    </section>
  );
}

export default HeroSection;