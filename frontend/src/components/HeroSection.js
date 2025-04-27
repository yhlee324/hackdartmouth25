import React from 'react';
import './HeroSection.css';
import heroImage from '../assets/images/deepocean.jpg'; // Example if you have an image

function HeroSection() {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="container">
        <h1>Welcome to Protect Our Pals</h1> 
        <p>Your educational tool in tracking the safety and well-being of your furry friends.</p> 
      </div>
    </section>
  );
}

export default HeroSection;