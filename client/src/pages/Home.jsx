import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaSearch, FaTractor, FaMoneyBillWave, FaClock, FaStar,
         FaLeaf, FaArrowRight, FaMapMarkerAlt, FaCheckCircle, FaUsers } from 'react-icons/fa';
import EquipmentCard from '../components/EquipmentCard';

const mockEquipment = [
  { _id: '1', name: 'Mahindra 575 DI Tractor', type: 'Tractor', ratePerHour: 500, distance: 3.5,
    image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c11?q=80&w=800&auto=format&fit=crop' },
  { _id: '2', name: 'John Deere Combine Harvester', type: 'Harvester', ratePerHour: 1200, distance: 8.2,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop' },
  { _id: '3', name: 'Rotavator Heavy Duty', type: 'Attachment', ratePerHour: 200, distance: 1.5,
    image: 'https://images.unsplash.com/photo-1596739668102-4fc46bbed167?q=80&w=800&auto=format&fit=crop' },
];

const stats = [
  { icon: <FaTractor />, value: '500+', label: 'Equipment Listed', color: '#2ecc71' },
  { icon: <FaUsers />,   value: '2,000+', label: 'Farmers Served',  color: '#3498db' },
  { icon: <FaMapMarkerAlt />, value: '50+', label: 'Districts',     color: '#9b59b6' },
  { icon: <FaStar />,    value: '4.8★',   label: 'Avg Rating',      color: '#f1c40f' },
];

const features = [
  { icon: <FaTractor />,        color: '#3498db', title: 'Quality Equipment',    desc: 'Access top-tier machinery vetted by our team from verified local owners.' },
  { icon: <FaMoneyBillWave />,  color: '#2ecc71', title: 'Transparent Pricing',  desc: 'No hidden fees. Pay exactly what you see — per hour or per day.' },
  { icon: <FaClock />,          color: '#f1c40f', title: 'Instant Booking',       desc: 'Check real-time availability and confirm machinery in seconds.' },
  { icon: <FaLeaf />,           color: '#1abc9c', title: 'Seasonal Crop Guide',   desc: 'Learn crop cycles, check weather, and rent matched machinery instantly.' },
  { icon: <FaMapMarkerAlt />,   color: '#e74c3c', title: 'GPS-Based Search',      desc: 'Find equipment within your radius — pin drop precision.' },
  { icon: <FaCheckCircle />,    color: '#8e44ad', title: 'Verified Owners',       desc: 'Aadhaar-verified owners with transparent ratings and reviews.' },
];

const testimonials = [
  { quote: 'AgroLink changed how I farm. I rented a tractor in 10 minutes!', name: 'Ramesh Bhai', role: 'Wheat Farmer, Nanded', rating: 5 },
  { quote: 'Transparent pricing and quick booking saved me 40% this harvest season.', name: 'Priya Devi', role: 'Rice Farmer, Aurangabad', rating: 5 },
  { quote: 'The crop guide helped me plan my season perfectly. Amazing platform!', name: 'Suresh Patil', role: 'Cotton Farmer, Latur', rating: 5 },
];

const Home = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  return (
    <div className="home-page">

      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="home-hero-glow home-hero-glow-1" />
        <div className="home-hero-glow home-hero-glow-2" />
        <div className="home-hero-glow home-hero-glow-3" />

        <div className="home-hero-inner container">
          <div className="home-hero-content animate-fade-in">
            <div className="home-badge">
              <FaLeaf className="home-badge-icon" />
              <span>Beta Release — Now Live Across Maharashtra</span>
            </div>

            <h1 className="home-hero-title">
              <span className="text-gradient">{t('hero_title') || 'Modern Farming App'}</span>
              <span className="home-hero-emoji"> 🚜</span>
            </h1>

            <p className="home-hero-sub">
              India's smartest agricultural equipment rental platform — connecting farmers with verified local owners in real-time. Rent tractors, harvesters & more in minutes.
            </p>

            {/* Search Bar */}
            <div className="home-search-bar glass-card">
              <FaSearch className="home-search-icon" />
              <input
                type="text"
                className="home-search-input"
                placeholder="Search by crop, equipment type, or brand..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <Link to={`/browse?q=${query}`} className="home-search-btn">
                Search
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="home-cta-row">
              <Link to="/study" className="home-cta-primary">
                <FaLeaf /> {t('crop_guide') || 'Crop Guide'}
              </Link>
              <Link to="/search" className="home-cta-secondary">
                <FaMapMarkerAlt /> {t('explore_btn') || 'Explore Nearby'}
              </Link>
              <Link to="/login" className="home-cta-ghost">
                List Your Equipment <FaArrowRight />
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="home-hero-visual animate-fade-in">
            <div className="home-hero-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=900&auto=format&fit=crop"
                alt="Agricultural Equipment"
                className="home-hero-img"
              />
              <div className="home-hero-img-overlay" />
              <div className="home-floating-card home-float-1">
                <FaCheckCircle style={{ color: '#2ecc71' }} />
                <span>Verified Owner</span>
              </div>
              <div className="home-floating-card home-float-2">
                <FaStar style={{ color: '#f1c40f' }} />
                <span>4.9 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="home-stats-bar">
        <div className="container home-stats-inner">
          {stats.map((s, i) => (
            <div key={i} className="home-stat-item">
              <div className="home-stat-icon" style={{ color: s.color, background: `${s.color}18` }}>
                {s.icon}
              </div>
              <div>
                <div className="home-stat-value" style={{ color: s.color }}>{s.value}</div>
                <div className="home-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY AGROLINK ── */}
      <section className="home-section">
        <div className="container">
          <div className="home-section-header">
            <span className="home-section-tag">Why AgroLink?</span>
            <h2 className="home-section-title">Built for <span className="text-gradient">Every Indian Farmer</span></h2>
            <p className="home-section-sub">We bring modern technology to rural farming solutions — simple, fast, and affordable.</p>
          </div>

          <div className="home-features-grid">
            {features.map((f, i) => (
              <div key={i} className="home-feature-card glass-card card-hover">
                <div className="home-feature-icon" style={{ color: f.color, background: `${f.color}18` }}>
                  {f.icon}
                </div>
                <h3 className="home-feature-title">{f.title}</h3>
                <p className="home-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED EQUIPMENT ── */}
      <section className="home-section home-section-alt">
        <div className="container">
          <div className="home-section-header-row">
            <div>
              <h2 className="home-section-title" style={{ textAlign: 'left' }}>Featured <span className="text-gradient">Near You</span></h2>
              <p className="home-section-sub" style={{ textAlign: 'left' }}>Top-rated machinery available in your area right now.</p>
            </div>
            <Link to="/search" className="home-view-all">
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="grid-3">
            {mockEquipment.map(eq => <EquipmentCard key={eq._id} equipment={eq} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="home-section">
        <div className="container">
          <div className="home-section-header">
            <span className="home-section-tag">Simple Process</span>
            <h2 className="home-section-title">How It <span className="text-gradient">Works</span></h2>
          </div>
          <div className="home-steps-grid">
            {[
              { step: '01', title: 'Search Equipment', desc: 'Enter your crop type or equipment name and browse nearby results.', icon: '🔍' },
              { step: '02', title: 'Pick & Book', desc: 'Choose a verified owner, check availability, and book instantly.', icon: '📅' },
              { step: '03', title: 'Pay Securely', desc: 'Transparent pricing — pay per hour or per day. No surprises.', icon: '💳' },
              { step: '04', title: 'Start Farming', desc: 'Equipment arrives at your field. Farm smarter, harvest more.', icon: '🌾' },
            ].map((s, i) => (
              <div key={i} className="home-step-card">
                <div className="home-step-num">{s.step}</div>
                <div className="home-step-emoji">{s.icon}</div>
                <h3 className="home-step-title">{s.title}</h3>
                <p className="home-step-desc">{s.desc}</p>
                {i < 3 && <div className="home-step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="home-section home-section-alt">
        <div className="container">
          <div className="home-section-header">
            <span className="home-section-tag">Farmer Stories</span>
            <h2 className="home-section-title">Trusted by <span className="text-gradient">2,000+ Farmers</span></h2>
          </div>
          <div className="home-testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="home-testimonial-card glass-card">
                <div className="home-testimonial-stars">
                  {Array(t.rating).fill(0).map((_, j) => <FaStar key={j} style={{ color: '#f1c40f' }} />)}
                </div>
                <p className="home-testimonial-quote">"{t.quote}"</p>
                <div className="home-testimonial-author">
                  <div className="home-testimonial-avatar">{t.name[0]}</div>
                  <div>
                    <div className="home-testimonial-name">{t.name}</div>
                    <div className="home-testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="home-cta-banner">
        <div className="home-cta-banner-glow" />
        <div className="container home-cta-banner-inner">
          <div>
            <h2 className="home-cta-banner-title">Ready to Transform Your Farm? 🌱</h2>
            <p className="home-cta-banner-sub">Join 2,000+ farmers already using AgroLink to rent equipment faster and cheaper.</p>
          </div>
          <div className="home-cta-banner-btns">
            <Link to="/login" className="home-cta-primary">Get Started Free</Link>
            <Link to="/browse" className="home-cta-outline">Browse Equipment</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
