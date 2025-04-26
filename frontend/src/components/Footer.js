import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {currentYear} ProtectOurPals. All rights reserved.</p> {/* Placeholder */}
        {/* Add other footer content like links or social icons if needed */}
        {/* <div className="footer-links">
          <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;