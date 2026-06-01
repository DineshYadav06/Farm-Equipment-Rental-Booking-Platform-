import React from 'react';
import { FaLeaf, FaRobot, FaMapMarkedAlt, FaStar, FaUsers,
         FaTractor, FaShieldAlt, FaGlobe, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const stats = [
  { val: '500+',  label: 'Equipment Listed', color: '#2ecc71' },
  { val: '2,000+', label: 'Farmers Served', color: '#3498db' },
  { val: '50+',   label: 'Districts Covered', color: '#9b59b6' },
  { val: '4.8★',  label: 'Avg Rating',        color: '#f1c40f' },
];

const features = [
  { icon: <FaMapMarkedAlt />, title: 'GPS-Based Search',      desc: 'Find equipment within 10 km of your field with pin-drop accuracy.' },
  { icon: <FaShieldAlt />,   title: 'Verified Owners',        desc: 'Aadhaar-verified, reviewed by real farmers for complete trust.' },
  { icon: <FaRobot />,       title: 'AI Recommendations',     desc: 'Smart equipment matching based on your crop type and land size.' },
  { icon: <FaStar />,        title: 'Rating System',          desc: 'Transparent ratings ensuring quality and trust every time.' },
];

const roadmap = [
  { icon: '🤖', title: 'AI Crop Advisor',    desc: 'Full ML-driven planting recommendations for every crop cycle.' },
  { icon: '🛸', title: 'Anti-Gravity Drones', desc: 'Aerial spraying and crop mapping systems for precision farming.' },
  { icon: '📡', title: 'IoT Soil Sensors',   desc: 'Real-time soil health and moisture tracking for every plot.' },
  { icon: '🌍', title: 'Pan-India Fleet',    desc: 'Every district, every village — no farmer left behind.' },
];

const team = [
  { name: 'Dinesh Kumar Yadav', role: 'Lead Developer & Project Head', avatar: 'D' },
];

const About = () => (
  <div className="about-page">

    {/* ── HERO ── */}
    <section className="about-hero">
      <div className="about-hero-glow" />
      <div className="container about-hero-inner">
        <div className="about-logo-wrap">
          <img src="/logo.png" alt="AgroLink" className="about-logo" />
        </div>
        <span className="home-section-tag">MCAET AgroLink</span>
        <h1 className="about-hero-title">
          India's <span className="text-gradient">Smartest</span> Farm Rental Platform
        </h1>
        <p className="about-hero-sub">
          Connecting 140 million Indian farmers with verified local equipment owners — in real-time, at fair prices.
        </p>
        <div className="about-hero-btns">
          <Link to="/browse" className="home-cta-primary"><FaTractor /> Browse Equipment</Link>
          <Link to="/contact" className="home-cta-secondary">Contact Us <FaArrowRight /></Link>
        </div>
      </div>
    </section>

    {/* ── STATS ── */}
    <section className="about-stats-bar">
      <div className="container about-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="about-stat-item glass-card">
            <div className="about-stat-val text-gradient">{s.val}</div>
            <div className="about-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* ── WHAT IS AGROLINK ── */}
    <section className="home-section">
      <div className="container about-split">
        <div className="about-split-text">
          <span className="home-section-tag">What Is AgroLink?</span>
          <h2 className="home-section-title" style={{ textAlign: 'left' }}>
            The Uber of <span className="text-gradient">Agricultural Equipment</span> 🚜
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '16px', fontSize: '1rem' }}>
            MCAET AgroLink is a modern platform built by the <strong style={{ color: 'var(--text-main)' }}>Mahamaya College of Agricultural Engineering & Technology</strong> to modernize how India's 140 million farmers access farming machinery.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, fontSize: '1rem' }}>
            Instead of buying expensive equipment, farmers can <strong style={{ color: 'var(--text-main)' }}>search, compare, and instantly book</strong> machinery from verified local owners — just like booking an Uber.
          </p>
        </div>
        <div className="about-split-cards">
          {features.map((f, i) => (
            <div key={i} className="about-mini-card glass-card">
              <div className="about-mini-icon">{f.icon}</div>
              <div>
                <h4 className="about-mini-title">{f.title}</h4>
                <p className="about-mini-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── MISSION & VISION ── */}
    <section className="home-section home-section-alt">
      <div className="container">
        <div className="home-section-header">
          <span className="home-section-tag">Our Purpose</span>
          <h2 className="home-section-title">Mission & <span className="text-gradient">Vision</span></h2>
        </div>
        <div className="about-mv-grid">
          <div className="about-mv-card about-mv-green glass-card">
            <div className="about-mv-emoji">🎯</div>
            <h3 className="about-mv-title">Our Mission</h3>
            <p className="about-mv-quote">"Smart + Affordable Farming for Every Indian Farmer"</p>
            <p className="about-mv-desc">
              We believe no farmer should go without modern machinery due to cost. Through AgroLink, every smallholder can access top-quality equipment at fair prices, boosting yield and income across rural India.
            </p>
          </div>
          <div className="about-mv-card about-mv-blue glass-card">
            <div className="about-mv-emoji">🔭</div>
            <h3 className="about-mv-title">Our Vision</h3>
            <p className="about-mv-quote">"Future Farming — AI-Driven Agriculture for All"</p>
            <p className="about-mv-desc">
              We are building toward a future where drone fleets, autonomous tractors, and AI-powered soil analysis are accessible to every Indian farmer through a single, intuitive platform.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ── ROADMAP ── */}
    <section className="home-section">
      <div className="container">
        <div className="home-section-header">
          <span className="home-section-tag">Future Roadmap</span>
          <h2 className="home-section-title">Where We're <span className="text-gradient">Heading 🚀</span></h2>
          <p className="home-section-sub">Next-generation agricultural technology — coming soon to every Indian farm.</p>
        </div>
        <div className="about-roadmap-grid">
          {roadmap.map((item, i) => (
            <div key={i} className="about-roadmap-card glass-card card-hover">
              <div className="about-roadmap-icon">{item.icon}</div>
              <h4 className="about-roadmap-title">{item.title}</h4>
              <p className="about-roadmap-desc">{item.desc}</p>
              <div className="about-roadmap-badge">Coming Soon</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── TEAM ── */}
    <section className="home-section home-section-alt">
      <div className="container">
        <div className="home-section-header">
          <span className="home-section-tag">Meet the Team</span>
          <h2 className="home-section-title">Built with <span className="text-gradient">💚 by MCAET</span></h2>
        </div>
        <div className="about-team-center">
          {team.map((m, i) => (
            <div key={i} className="about-team-card glass-card">
              <div className="about-team-avatar">{m.avatar}</div>
              <h4 className="about-team-name">{m.name}</h4>
              <p className="about-team-role">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="home-cta-banner">
      <div className="home-cta-banner-glow" />
      <div className="container home-cta-banner-inner">
        <div>
          <h2 className="home-cta-banner-title">Be Part of the Agri Revolution 🌾</h2>
          <p className="home-cta-banner-sub">Join thousands of farmers already using AgroLink across Maharashtra.</p>
        </div>
        <div className="home-cta-banner-btns">
          <Link to="/login" className="home-cta-primary">Get Started Free</Link>
          <Link to="/contact" className="home-cta-outline">Talk to Us</Link>
        </div>
      </div>
    </section>

  </div>
);

export default About;
