import React from 'react';
import { FaLeaf, FaRobot, FaMapMarkedAlt, FaStar, FaUsers, FaTractor, FaShieldAlt, FaGlobe } from 'react-icons/fa';

const About = () => (
  <div style={{ width: '100%' }}>

    {/* Hero */}
    <div style={{
      background: 'linear-gradient(135deg, rgba(46,204,113,0.15), rgba(52,152,219,0.15))',
      borderBottom: '1px solid var(--border-color)',
      padding: '60px 0',
      textAlign: 'center',
    }}>
      <div className="container">
        <img src="/logo.png" alt="AgroLink" style={{ height: '80px', margin: '0 auto 16px' }} />
        <h1 className="text-gradient" style={{ fontSize: '42px', fontWeight: 800, marginBottom: '12px' }}>MCAET AgroLink</h1>
        <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          India's smartest agricultural equipment rental platform — connecting farmers with verified local owners in real-time.
        </p>
      </div>
    </div>

    {/* What We Are */}
    <div className="container" style={{ padding: '60px 24px' }}>
      <div className="grid-2" style={{ alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-green)', letterSpacing: '2px', textTransform: 'uppercase' }}>What Is AgroLink?</span>
          <h2 style={{ fontSize: '32px', fontWeight: 800, margin: '12px 0', color: 'var(--text-main)', lineHeight: 1.3 }}>
            The Uber of Agricultural Equipment 🚜
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
            MCAET AgroLink is a modern platform built by the <strong>Mahamaya College of Agricultural Engineering & Technology</strong> to modernize how India's 140 million farmers access farming machinery.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Instead of buying expensive tractors or harvesters, farmers can now <strong>search, compare, and instantly book</strong> equipment listed by verified local owners — just like booking an Uber or Trringo ride.
          </p>
          <div style={{ display: 'flex', gap: '32px', marginTop: '32px' }}>
            {[['500+', 'Equipment Listed'], ['2,000+', 'Farmers Served'], ['50+', 'Districts Covered']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div className="text-gradient" style={{ fontSize: '28px', fontWeight: 800 }}>{val}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid-2" style={{ gap: '16px' }}>
          {[
            { icon: <FaMapMarkedAlt />, title: 'GPS-Based Search', desc: 'Find equipment within 10 km of your field' },
            { icon: <FaShieldAlt />, title: 'Verified Owners', desc: 'Aadhaar-verified, rated by real farmers' },
            { icon: <FaRobot />, title: 'AI Recommendations', desc: 'Smart equipment matching by crop & land' },
            { icon: <FaStar />, title: 'Rating System', desc: 'Transparent ratings for trust & quality' },
          ].map(card => (
            <div key={card.title} className="glass-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', color: 'var(--primary-green)', marginBottom: '8px' }}>{card.icon}</div>
              <h4 style={{ fontWeight: 700, marginBottom: '4px', color: 'var(--text-main)', fontSize: '14px' }}>{card.title}</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Mission & Vision */}
    <div style={{ backgroundColor: 'var(--surface-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '60px 0' }}>
      <div className="container grid-2" style={{ gap: '40px' }}>
        <div style={{ padding: '32px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(46,204,113,0.1), transparent)', border: '1px solid rgba(46,204,113,0.3)' }}>
          <div style={{ fontSize: '36px', marginBottom: '16px' }}>🎯</div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>Our Mission</h2>
          <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--primary-green)', marginBottom: '12px', fontStyle: 'italic' }}>
            "Smart + Affordable Farming for Every Indian Farmer"
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            We believe that no farmer should go without modern machinery due to cost. Through AgroLink, every smallholder can access top-quality equipment at fair prices, boosting yield and income.
          </p>
        </div>
        <div style={{ padding: '32px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(52,152,219,0.1), transparent)', border: '1px solid rgba(52,152,219,0.3)' }}>
          <div style={{ fontSize: '36px', marginBottom: '16px' }}>🔭</div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>Our Vision</h2>
          <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--primary-blue)', marginBottom: '12px', fontStyle: 'italic' }}>
            "Future Farming — Anti-Gravity Technology + AI-Driven Agriculture"
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            We are building toward a future where drone fleets, autonomous tractors, and AI-powered soil analysis are accessible to every Indian farmer through a single platform.
          </p>
        </div>
      </div>
    </div>

    {/* Future Tech Roadmap */}
    <div className="container" style={{ padding: '60px 24px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>Future Roadmap 🚀</h2>
      <p className="text-muted mb-4">Where we are heading — next-generation agriculture tech</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {[
          { icon: '🤖', title: 'AI Crop Advisor', desc: 'Full ML-driven planting recommendations' },
          { icon: '🛸', title: 'Anti-Gravity Drones', desc: 'Aerial spraying and mapping systems' },
          { icon: '📡', title: 'IoT Soil Sensors', desc: 'Real-time soil health tracking' },
          { icon: '🌍', title: 'Pan-India Fleet', desc: 'Every district, every village covered' },
        ].map(item => (
          <div key={item.title} className="glass-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>{item.icon}</div>
            <h4 style={{ fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>{item.title}</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default About;
