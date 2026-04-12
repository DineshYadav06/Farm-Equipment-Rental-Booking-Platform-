import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaCode, FaUser } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--surface-color)', borderTop: '1px solid var(--border-color)', padding: '40px 0 20px', marginTop: 'auto' }}>
      <div className="container grid-3" style={{ gap: '30px', marginBottom: '30px' }}>
        
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <img src="/logo.png" alt="AgroLink" style={{ height: '40px' }} />
            <h2 className="text-xl text-gradient">MCAET AgroLink</h2>
          </div>
          <p className="text-muted text-sm mb-3">
            Empowering Indian farmers through affordable, smart, and reliable agricultural equipment rentals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg mb-2" style={{ color: 'var(--text-main)' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><Link to="/browse" className="text-muted text-sm" style={{ textDecoration: 'none' }}>Browse Equipment</Link></li>
            <li><Link to="/about" className="text-muted text-sm" style={{ textDecoration: 'none' }}>About MCAET</Link></li>
            <li><Link to="/contact" className="text-muted text-sm" style={{ textDecoration: 'none' }}>Contact Us</Link></li>
            <li><Link to="/login" className="text-muted text-sm" style={{ textDecoration: 'none' }}>List Your Tractor (Owner)</Link></li>
          </ul>
        </div>

        {/* Website Queries */}
        <div>
          <h3 className="text-lg mb-2" style={{ color: 'var(--text-main)' }}>Website Queries & Support</h3>
          <div className="text-muted text-sm mb-2 flex items-center gap-2">
            <FaUser style={{ color: 'var(--primary-green)' }} />
            <span><strong>Representative:</strong> DINESH KUMAR YADAV</span>
          </div>
          <div className="text-muted text-sm mb-2 flex items-center gap-2">
            <FaPhoneAlt style={{ color: 'var(--primary-green)' }} />
            +91-9555240369
          </div>
          <div className="text-muted text-sm flex items-center gap-2">
            <FaEnvelope style={{ color: 'var(--primary-blue)' }} />
            support@agrolink.in
          </div>
        </div>

      </div>

      {/* Copyright & Developer */}
      <div className="container" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} MCAET AgroLink. All rights reserved.
        </p>
        <p className="text-sm text-muted flex items-center gap-2">
          <FaCode style={{ color: 'var(--accent-color)' }} /> Developed by <strong style={{ color: 'var(--text-main)' }}>DINESH KUMAR YADAV</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
