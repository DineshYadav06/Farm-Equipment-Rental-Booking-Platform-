import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaSearch, FaTractor, FaMoneyBillWave, FaClock, FaStar, FaLeaf } from 'react-icons/fa';
import EquipmentCard from '../components/EquipmentCard';

const mockEquipment = [
  { _id: '1', name: 'Mahindra 575 DI Tractor', type: 'Tractor', ratePerHour: 500, distance: 3.5, image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c11?q=80&w=800&auto=format&fit=crop' },
  { _id: '2', name: 'John Deere Combine Harvester', type: 'Harvester', ratePerHour: 1200, distance: 8.2, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop' },
  { _id: '3', name: 'Rotavator Heavy Duty', type: 'Attachment', ratePerHour: 200, distance: 1.5, image: 'https://images.unsplash.com/photo-1596739668102-4fc46bbed167?q=80&w=800&auto=format&fit=crop' }
];

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero container">
        <div className="hero-bg-glow"></div>
        <div className="hero-content animate-fade-in">
          <span className="badge badge-warning mb-2" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <FaLeaf /> Beta Release 
          </span>
          <h1 className="text-4xl mb-2" style={{ fontSize: '3.5rem', lineHeight: '1.2' }}>
            <span className="text-gradient">{t('hero_title')}</span>
          </h1>
          <p className="text-xl text-muted mb-4" style={{ maxWidth: '90%' }}>
            {t('hero_subtitle')} Experience seamless bookings, transparent pricing, and trusted local owners.
          </p>
          
          <div className="glass-card flex-col-md" style={{ padding: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div className="form-group flex-1" style={{ marginBottom: 0 }}>
              <input type="text" className="form-input" style={{ border: 'none', background: 'var(--input-bg)' }} placeholder="Search by crop, type, or brand..." />
            </div>
            <button className="btn btn-primary">
              <FaSearch /> Search
            </button>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
             <Link to="/search" className="btn btn-secondary">{t('explore_btn')}</Link>
             <Link to="/login" className="btn" style={{ borderBottom: '1px solid var(--primary-green)', borderRadius: 0 }}>List your Equipment</Link>
          </div>
        </div>
      </section>

      {/* How it Works / Features */}
      <section className="container mt-4 mb-4 pt-4 pb-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl mb-1 text-gradient">Why Choose AgroLink?</h2>
          <p className="text-muted">We bring modern tech to rural farming solutions.</p>
        </div>
        
        <div className="grid-3 text-center">
          <div className="glass-card card-hover">
            <div style={{ fontSize: '2.5rem', color: 'var(--primary-blue)', marginBottom: '15px' }}><FaTractor /></div>
            <h3 className="text-xl mb-1">Quality Equipment</h3>
            <p className="text-muted text-sm">Access top-tier machinery vetted by our team from local owners.</p>
          </div>
          <div className="glass-card card-hover">
            <div style={{ fontSize: '2.5rem', color: 'var(--primary-green)', marginBottom: '15px' }}><FaMoneyBillWave /></div>
            <h3 className="text-xl mb-1">Transparent Pricing</h3>
            <p className="text-muted text-sm">No hidden fees. You pay exactly what you see per hour or per day.</p>
          </div>
          <div className="glass-card card-hover">
            <div style={{ fontSize: '2.5rem', color: 'var(--accent-color)', marginBottom: '15px' }}><FaClock /></div>
            <h3 className="text-xl mb-1">Instant Booking</h3>
            <p className="text-muted text-sm">Check real-time availability and confirm your machinery in seconds.</p>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="container mb-4 pb-4 border-t" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '3rem' }}>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-2xl">Featured Near You</h2>
            <p className="text-muted text-sm">Top-rated machinery available in your area.</p>
          </div>
          <Link to="/search" className="text-gradient">View All &rarr;</Link>
        </div>
        
        <div className="grid-3">
          {mockEquipment.map((eq) => (
            <EquipmentCard key={eq._id} equipment={eq} />
          ))}
        </div>
      </section>

      {/* Testimonial CTA */}
      <section className="mb-4 pt-4 pb-4" style={{ background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(52, 152, 219, 0.1))' }}>
        <div className="container text-center">
          <FaStar style={{ color: 'var(--accent-color)', fontSize: '2rem', marginBottom: '1rem' }} />
          <h2 className="text-2xl mb-2">"AgroLink changed how I farm. I rented a tractor in 10 minutes."</h2>
          <p className="text-muted">- Ramesh Bhai, Local Farmer</p>
          <div className="mt-4">
            <Link to="/login" className="btn btn-primary px-4 py-2 text-xl">Join the Community Today</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
