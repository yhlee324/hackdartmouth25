import React from 'react';
import './FeatureCard.css';
// import cardIcon from '../../assets/images/some-icon.svg'; // Example

// We expect 'title' and 'description' to be passed as props
function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="card-icon">
        {/* Placeholder for an icon - you might pass an image URL or an icon component via props */}
        {/* Example: <img src={icon} alt="" /> OR {icon} if passing a component */}
        <span>Icon</span> {/* Placeholder */}
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
}

export default FeatureCard;