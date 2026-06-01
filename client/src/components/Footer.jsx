import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaPhoneAlt, FaEnvelope, FaCode, FaLeaf, FaMapMarkerAlt,
  FaGithub, FaLinkedin, FaTwitter, FaWhatsapp,
  FaTractor, FaUsers, FaStar, FaShieldAlt,
  FaPaperPlane, FaMobileAlt, FaApple, FaGooglePlay,
  FaCheckCircle, FaArrowRight
} from 'react-icons/fa';

const footerLinks = {
  Platform: [
    { to: '/browse',    label: 'Browse Equipment'   },
    { to: '/search',   label: 'Find Nearby'         },
    { to: '/study',    label: 'Crop Guide'          },
    { to: '/login',    label: 'List Your Equipment' },
    { to: '/dashboard',label: 'Dashboard'           },
  ],
  Company: [
    { to: '/about',   label: 'About MCAET'   },
    { to: '/contact', label: 'Contact Us'    },
    { to: '/profile', label: 'My Profile'    },
    { to: '/about',   label: 'Our Mission'   },
    { to: '/about',   label: 'Future Roadmap'},
  ],
  Support: [
    { to: '/contact', label: 'Help Center'         },
    { to: '/contact', label: 'Report an Issue'     },
    { to: '/contact', label: 'Booking Support'     },
    { to: '/contact', label: 'Owner Verification'  },
    { to: '/contact', label: 'WhatsApp Support'    },
  ],
};

const trustStats = [
  { icon: <FaTractor />,   value: '500+',   label: 'Equipment Listed', color: '#2ecc71' },
  { icon: <FaUsers />,     value: '2,000+', label: 'Farmers Served',   color: '#3498db' },
  { icon: <FaStar />,      value: '4.8★',   label: 'Average Rating',   color: '#f1c40f' },
  { icon: <FaShieldAlt />, value: '100%',   label: 'Verified Owners',  color: '#9b59b6' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="site-footer">

      {/* ── TRUST STATS BAR ── */}
      <div className="footer-trust-bar">
        <div className="footer-trust-inner container">
          {trustStats.map((s, i) => (
            <div key={i} className="footer-trust-item">
              <div className="footer-trust-icon" style={{ color: s.color, background: `${s.color}18` }}>
                {s.icon}
              </div>
              <div>
                <div className="footer-trust-val" style={{ color: s.color }}>{s.value}</div>
                <div className="footer-trust-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NEWSLETTER BANNER ── */}
      <div className="footer-newsletter-wrap">
        <div className="footer-newsletter-glow" />
        <div className="container footer-newsletter-inner">
          <div className="footer-nl-left">
            <span className="footer-nl-tag">📬 Stay Updated</span>
            <h3 className="footer-nl-title">Get Farming Tips & New Equipment Alerts</h3>
            <p className="footer-nl-sub">
              Join 5,000+ farmers receiving weekly crop guides, equipment alerts, and seasonal discount offers directly in their inbox.
            </p>
            <div className="footer-nl-perks">
              {['Weekly Crop Guide', 'New Equipment Alerts', 'Exclusive Offers', 'Weather Updates'].map(p => (
                <span key={p} className="footer-nl-perk"><FaCheckCircle /> {p}</span>
              ))}
            </div>
          </div>
          <div className="footer-nl-right">
            {!subscribed ? (
              <form className="footer-nl-form" onSubmit={handleSubscribe}>
                <div className="footer-nl-input-wrap">
                  <FaEnvelope className="footer-nl-input-icon" />
                  <input
                    type="email"
                    className="footer-nl-input"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="footer-nl-btn">
                  <FaPaperPlane /> Subscribe Free
                </button>
                <p className="footer-nl-note">No spam. Unsubscribe anytime. 🌾</p>
              </form>
            ) : (
              <div className="footer-nl-success">
                <FaCheckCircle className="footer-nl-success-icon" />
                <h4>You're subscribed! 🎉</h4>
                <p>We'll send farming tips and alerts to your inbox.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── APP DOWNLOAD SECTION ── */}
      <div className="footer-app-section">
        <div className="container footer-app-inner">
          <div className="footer-app-left">
            <span className="footer-nl-tag">📱 Mobile App</span>
            <h3 className="footer-app-title">AgroLink on Your Phone</h3>
            <p className="footer-app-sub">
              Book equipment, track your rentals, check live weather, and get AI crop recommendations — all from your smartphone. Coming soon to Android & iOS.
            </p>
            <div className="footer-app-btns">
              <a href="#" className="footer-app-store-btn">
                <FaGooglePlay className="footer-app-store-icon" />
                <div>
                  <div className="footer-app-store-label">Get it on</div>
                  <div className="footer-app-store-name">Google Play</div>
                </div>
              </a>
              <a href="#" className="footer-app-store-btn">
                <FaApple className="footer-app-store-icon" />
                <div>
                  <div className="footer-app-store-label">Download on the</div>
                  <div className="footer-app-store-name">App Store</div>
                </div>
              </a>
              <a href="https://wa.me/9555240369" target="_blank" rel="noreferrer" className="footer-app-store-btn footer-app-wa">
                <FaWhatsapp className="footer-app-store-icon" />
                <div>
                  <div className="footer-app-store-label">Chat on</div>
                  <div className="footer-app-store-name">WhatsApp</div>
                </div>
              </a>
            </div>
          </div>
          <div className="footer-app-right">
            <div className="footer-app-mockup">
              <div className="footer-app-phone">
                <div className="footer-app-screen">
                  <div className="footer-app-screen-header">
                    <div className="footer-app-screen-dot" />
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>AgroLink</div>
                  </div>
                  <div className="footer-app-screen-item"><FaTractor style={{ color: '#2ecc71' }} /> Tractor — ₹500/hr</div>
                  <div className="footer-app-screen-item"><FaTractor style={{ color: '#3498db' }} /> Harvester — ₹1200/hr</div>
                  <div className="footer-app-screen-item"><FaTractor style={{ color: '#f1c40f' }} /> Rotavator — ₹200/hr</div>
                  <div className="footer-app-screen-badge">📍 3 km away · ✅ Available</div>
                </div>
              </div>
              <div className="footer-app-glow-circle" />
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LINKS ── */}
      <div className="footer-main-section">
        <div className="container footer-main-grid">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo-row">
              <div className="footer-logo-icon">
                <img src="/logo.png" alt="AgroLink" style={{ height: '26px', width: 'auto' }} />
              </div>
              <div>
                <span className="footer-logo-name text-gradient">AgroLink</span>
                <span className="footer-logo-tag">MCAET Platform</span>
              </div>
            </Link>
            <p className="footer-brand-desc">
              Empowering India's 140 million farmers through affordable, smart, and reliable agricultural equipment rentals.
            </p>
            <div className="footer-contact-chips">
              <a href="tel:+919555240369" className="footer-chip"><FaPhoneAlt /> +91-9555240369</a>
              <a href="mailto:support@agrolink.in" className="footer-chip"><FaEnvelope /> support@agrolink.in</a>
              <div className="footer-chip"><FaMapMarkerAlt /> Nanded, Maharashtra</div>
            </div>
            {/* Social */}
            <div className="footer-social-row" style={{ marginTop: '4px' }}>
              <a href="https://wa.me/9555240369" className="footer-social-btn footer-wa-btn" aria-label="WhatsApp" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
              <a href="#" className="footer-social-btn" aria-label="GitHub"><FaGithub /></a>
              <a href="#" className="footer-social-btn" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" className="footer-social-btn" aria-label="Twitter"><FaTwitter /></a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="footer-col">
              <h4 className="footer-col-title">{section}</h4>
              <ul className="footer-col-links">
                {links.map(({ to, label }) => (
                  <li key={label}>
                    <Link to={to} className="footer-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Developer */}
          <div className="footer-col">
            <h4 className="footer-col-title">Developer</h4>
            <div className="footer-dev-card">
              <div className="footer-dev-avatar">D</div>
              <div>
                <div className="footer-dev-name">Dinesh Kumar Yadav</div>
                <div className="footer-dev-role">Lead Developer & Project Head</div>
              </div>
            </div>
            <p className="footer-dev-desc">
              MCAET Agricultural Engineering & Technology — Building the future of Indian farming with smart technology.
            </p>
            <Link to="/contact" className="footer-contact-cta">
              Contact Developer <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">© {new Date().getFullYear()} MCAET AgroLink. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <a href="#" className="footer-bottom-link">Terms of Service</a>
            <a href="#" className="footer-bottom-link">Cookie Policy</a>
          </div>
          <p className="footer-made">
            <FaCode style={{ color: 'var(--accent-color)' }} />
            Made with <FaLeaf style={{ color: '#2ecc71' }} /> by{' '}
            <strong style={{ color: 'var(--text-main)' }}>Dinesh Kumar Yadav</strong>
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
