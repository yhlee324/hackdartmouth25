import React from 'react';
import './Header.css'; // Import the CSS for this component
// import logo from '../../assets/images/logo.svg'; // Example: uncomment and adjust path if you have a logo image in src/assets

function Header() {
  return (
    <header className="site-header">
      <div className="container"> {/* Optional container for layout */}
        <div className="logo">
          {/* <img src={logo} alt="ProtectOurPals Logo" /> */}
          <span>ProtectOurPals</span> {/* Placeholder: Replace with actual logo/image */}
        </div>
        <nav className="main-navigation">
          <ul>
            <li><a href="#home">Home</a></li> {/* Placeholder links */}
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;