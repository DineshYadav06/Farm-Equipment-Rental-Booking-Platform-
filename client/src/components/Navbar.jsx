import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaUserCircle, FaMoon, FaSun, FaBars, FaTimes, FaLeaf } from 'react-icons/fa';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const pageMain = document.querySelector('.page-main');
      if (pageMain) setScrolled(pageMain.scrollTop > 10);
    };
    const pageMain = document.querySelector('.page-main');
    if (pageMain) pageMain.addEventListener('scroll', handleScroll);
    return () => { if (pageMain) pageMain.removeEventListener('scroll', handleScroll); };
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/browse', label: t('browse') },
    { to: '/study', label: t('crop_guide') },
    { to: '/search', label: `📍 ${t('nearby')}` },
    { to: '/about', label: t('about') },
    { to: '/contact', label: t('contact') },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-inner">

          {/* ── Logo ── */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon-wrap">
              <img src="/logo.png" alt="AgroLink" className="logo-img" />
            </div>
            <div className="logo-text-wrap">
              <span className="logo-brand">AgroLink</span>
              <span className="logo-tagline">Smart Farm Rentals</span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="navbar-links">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`navbar-link ${isActive(to) ? 'navbar-link-active' : ''}`}
              >
                {label}
                {isActive(to) && <span className="link-active-dot" />}
              </Link>
            ))}
          </div>

          {/* ── Desktop Actions ── */}
          <div className="navbar-actions">
            <div className="navbar-divider" />
            <Link
              to="/dashboard"
              className={`navbar-link navbar-link-sm ${isActive('/dashboard') ? 'navbar-link-active' : ''}`}
            >
              {t('dashboard')}
            </Link>
            <Link
              to="/profile"
              className={`navbar-link navbar-link-sm ${isActive('/profile') ? 'navbar-link-active' : ''}`}
            >
              {t('profile')}
            </Link>
            <div className="navbar-divider" />

            <button
              onClick={toggleTheme}
              className="icon-btn"
              aria-label="Toggle Theme"
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {isDarkMode ? <FaSun className="icon-sun" /> : <FaMoon className="icon-moon" />}
            </button>

            <button
              onClick={toggleLanguage}
              className="lang-btn"
              title="Switch Language"
            >
              {i18n.language === 'en' ? 'हिन्दी' : 'EN'}
            </button>

            <Link to="/login" className="login-btn">
              <FaUserCircle />
              <span>{t('login')} / {t('register') || 'Register'}</span>
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-inner">
          <div className="mobile-section-label">Navigation</div>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`mobile-nav-link ${isActive(to) ? 'mobile-nav-link-active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="mobile-divider" />
          <div className="mobile-section-label">Account</div>
          <Link to="/dashboard" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            {t('dashboard')}
          </Link>
          <Link to="/profile" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            {t('profile')}
          </Link>

          <div className="mobile-divider" />
          <div className="mobile-bottom-row">
            <button onClick={toggleTheme} className="icon-btn">
              {isDarkMode ? <FaSun className="icon-sun" /> : <FaMoon className="icon-moon" />}
            </button>
            <button onClick={toggleLanguage} className="lang-btn">
              {i18n.language === 'en' ? 'हिन्दी' : 'EN'}
            </button>
            <Link to="/login" className="login-btn flex-1" onClick={() => setIsMobileMenuOpen(false)}>
              <FaUserCircle />
              <span>Login / Register</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div className="drawer-backdrop" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
