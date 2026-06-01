import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle,
         FaPaperPlane, FaWhatsapp, FaClock, FaArrowRight } from 'react-icons/fa';

const contactInfo = [
  { icon: <FaPhoneAlt />,     color: '#2ecc71', label: 'Phone',     val: '+91-9555240369',    sub: 'Mon–Sat, 8AM–6PM' },
  { icon: <FaWhatsapp />,     color: '#25D366', label: 'WhatsApp',  val: '+91-9555240369',    sub: 'Quick replies within 1 hr' },
  { icon: <FaEnvelope />,     color: '#3498db', label: 'Email',     val: 'support@agrolink.in', sub: '24-hour response' },
  { icon: <FaMapMarkerAlt />, color: '#e74c3c', label: 'Address',   val: 'MCAET, Nanded Campus', sub: 'Maharashtra — 431601' },
  { icon: <FaClock />,        color: '#9b59b6', label: 'Hours',     val: 'Mon – Sat',         sub: '8:00 AM to 6:00 PM' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <div className="contact-page">

      {/* ── HERO ── */}
      <section className="contact-hero">
        <div className="contact-hero-glow" />
        <div className="container contact-hero-inner">
          <span className="home-section-tag">Get In Touch</span>
          <h1 className="contact-hero-title">
            We'd Love to <span className="text-gradient">Hear From You</span> 📞
          </h1>
          <p className="contact-hero-sub">
            Have a query, feedback, or want to partner with us? Our team responds within 24 hours.
          </p>
          <a
            href="https://wa.me/9555240369"
            target="_blank"
            rel="noreferrer"
            className="contact-wa-btn"
          >
            <FaWhatsapp /> Chat on WhatsApp — Fastest Response
          </a>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="home-section">
        <div className="container contact-main-grid">

          {/* Left — Info + Map */}
          <div className="contact-left">
            <h3 className="contact-left-title">Contact Information</h3>
            <div className="contact-info-list">
              {contactInfo.map((item, i) => (
                <div key={i} className="contact-info-item">
                  <div className="contact-info-icon" style={{ color: item.color, background: `${item.color}18` }}>
                    {item.icon}
                  </div>
                  <div className="contact-info-text">
                    <span className="contact-info-label">{item.label}</span>
                    <span className="contact-info-val">{item.val}</span>
                    <span className="contact-info-sub">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-map-wrap">
              <div className="contact-map-label">📍 Our Location — Nanded, Maharashtra</div>
              <iframe
                title="Nanded Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.2910%2C19.1283%2C77.3510%2C19.1683&layer=mapnik&marker=19.1483%2C77.3210"
                className="contact-map-frame"
              />
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-right glass-card">
            {!sent ? (
              <>
                <h3 className="contact-form-title">Send Us a Message ✉️</h3>
                <p className="contact-form-sub">Fill in the details below and we'll get back to you shortly.</p>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input type="text" className="form-input" placeholder="e.g. Ramesh Kumar" required
                        value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input type="email" className="form-input" placeholder="you@example.com" required
                        value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>

                  <div className="contact-form-row">
                    <div className="form-group">
                      <label className="form-label">Phone (Optional)</label>
                      <input type="tel" className="form-input" placeholder="+91 9876543210"
                        value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <input type="text" className="form-input" placeholder="e.g. Equipment inquiry"
                        value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea className="form-input" rows={5}
                      placeholder="Describe your query in detail..."
                      required value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" className="contact-submit-btn" disabled={loading}>
                    {loading
                      ? <><span className="contact-spinner" /> Sending...</>
                      : <><FaPaperPlane /> Send Message</>
                    }
                  </button>
                </form>
              </>
            ) : (
              <div className="contact-success">
                <div className="contact-success-icon"><FaCheckCircle /></div>
                <h3 className="contact-success-title">Message Sent! 🎉</h3>
                <p className="contact-success-sub">
                  Thank you, <strong>{form.name}</strong>! We'll get back to you within 24 hours at <strong>{form.email}</strong>.
                </p>
                <button
                  className="home-cta-secondary"
                  onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                >
                  Send Another Message <FaArrowRight />
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
