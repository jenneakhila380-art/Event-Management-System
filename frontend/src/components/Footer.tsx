import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="/" className="logo">
          Event<span>ify</span>
        </Link>
        <p>Discover events. Create memories.</p>
      </div>
      <div className="footer-bottom">
        © 2026 Eventify. All rights reserved.
      </div>
    </footer>
  );
};
