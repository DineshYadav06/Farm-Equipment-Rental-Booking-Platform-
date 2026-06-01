import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaUserCircle, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const MobileMenu = () => (
    <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
      <div className="mobile-nav-links">
        <Link to="/" className="nav-link text-xl mb-3" onClick={() => setIsMobileMenuOpen(false)}>{t('home')}</Link>
        <Link to="/browse" className="nav-link text-xl mb-3" onClick={() => setIsMobileMenuOpen(false)}>{t('browse')}</Link>
        <Link to="/study" className="nav-link text-xl mb-3" onClick={() => setIsMobileMenuOpen(false)}>{t('crop_guide')}</Link>
        <Link to="/search" className="nav-link text-xl mb-3" onClick={() => setIsMobileMenuOpen(false)}>📍 {t('nearby')}</Link>
        <Link to="/about" className="nav-link text-xl mb-3" onClick={() => setIsMobileMenuOpen(false)}>{t('about')}</Link>
        <Link to="/contact" className="nav-link text-xl mb-4" onClick={() => setIsMobileMenuOpen(false)}>{t('contact')}</Link>
        
        <Link to="/dashboard" className="nav-link text-xl mb-3 font-bold" onClick={() => setIsMobileMenuOpen(false)}>{t('dashboard')}</Link>
        <Link to="/profile" className="nav-link text-xl mb-4 font-bold" onClick={() => setIsMobileMenuOpen(false)}>{t('profile')}</Link>
        
        <Link to="/login" className="btn btn-primary mb-4" onClick={() => setIsMobileMenuOpen(false)}>
          <FaUserCircle /> {t('login')}
        </Link>

        <div className="flex gap-4 mt-4">
          <button onClick={toggleTheme} className="btn btn-secondary" style={{ padding: '12px', borderRadius: '50%' }}>
            {isDarkMode ? <FaSun className="text-accent" /> : <FaMoon />}
          </button>
          <button onClick={toggleLanguage} className="btn btn-secondary" style={{ padding: '10px 20px' }}>
            {i18n.language === 'en' ? 'हिन्दी' : 'English'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center" style={{ flexWrap: 'wrap' }}>
        <Link to="/" className="flex items-center gap-1">
          <img src="/logo.png" alt="MCAET AgroLink Logo" className="logo-img" />
          <span className="text-xl text-gradient">AgroLink</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="nav-links hide-on-mobile">
          <Link to="/" className="nav-link">{t('home')}</Link>
          <Link to="/browse" className="nav-link">{t('browse')}</Link>
          <Link to="/study" className="nav-link">{t('crop_guide')}</Link>
          <Link to="/search" className="nav-link flex items-center gap-1" style={{ color: 'var(--primary-blue)' }}>
            📍 {t('nearby')}
          </Link>
          <Link to="/about" className="nav-link">{t('about')}</Link>
          <Link to="/contact" className="nav-link">{t('contact')}</Link>
        </div>
        
        <div className="flex items-center gap-2 hide-on-mobile">
          <Link to="/dashboard" className="nav-link text-sm font-bold">{t('dashboard')}</Link>
          <span className="text-muted">|</span>
          <Link to="/profile" className="nav-link text-sm font-bold">{t('profile')}</Link>
          <span className="text-muted">|</span>

          <button onClick={toggleTheme} className="btn btn-secondary" style={{ padding: '8px', borderRadius: '50%' }} aria-label="Toggle Theme">
            {isDarkMode ? <FaSun className="text-accent" /> : <FaMoon />}
          </button>
          <button onClick={toggleLanguage} className="btn btn-secondary" style={{ padding: '5px 10px' }}>
            {i18n.language === 'en' ? 'हिन्दी' : 'English'}
          </button>
          <Link to="/login" className="btn btn-primary">
            <FaUserCircle /> {t('login')}
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button 
          className="btn btn-secondary show-on-mobile" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ padding: '10px', fontSize: '20px', display: 'none' }}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <MobileMenu />
    </nav>
  );
};

export default Navbar;
