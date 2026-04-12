import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Compact Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--surface-color)',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '22px', fontWeight: 800, marginBottom: '2px' }}>Contact Us 📞</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>We respond within 24 hours. WhatsApp for urgent queries.</p>
        </div>
        <a href="https://wa.me/9555240369" target="_blank" rel="noreferrer"
          className="btn" style={{ background: '#25D366', color: 'white', padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, border: 'none' }}>
          <FaWhatsapp /> Chat on WhatsApp
        </a>
      </div>

      {/* Main Content — fills remaining screen */}
      <div className="flex-col-md sidebar-container" style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>

        {/* Left Panel — Contact Info + Map */}
        <div className="sidebar-left contact-panel-left" style={{
          width: '340px', flexShrink: 0,
          borderRight: '1px solid var(--border-color)',
          backgroundColor: 'var(--surface-color)',
          overflowY: 'auto',
          padding: '20px',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          {/* Contact Details */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Get In Touch</p>
            {[
              { icon: <FaPhoneAlt style={{ color: 'var(--primary-green)', flexShrink: 0 }} />, label: 'Phone', val: '+91-9555240369', sub: 'Mon–Sat, 8AM–6PM' },
              { icon: <FaWhatsapp style={{ color: '#25D366', flexShrink: 0 }} />, label: 'WhatsApp', val: '+91-9555240369', sub: 'Quick replies within 1 hr' },
              { icon: <FaEnvelope style={{ color: 'var(--primary-blue)', flexShrink: 0 }} />, label: 'Email', val: 'support@agrolink.in', sub: '24-hour response' },
              { icon: <FaMapMarkerAlt style={{ color: 'var(--danger)', flexShrink: 0 }} />, label: 'Address', val: 'Nanded Campus, Maharashtra', sub: 'Maharashtra - 431601' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '13px', marginTop: '2px' }}>{item.val}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Embedded Map — fills remaining space */}
          <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', minHeight: '200px' }}>
            <iframe
              title="Nanded Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.2910%2C19.1283%2C77.3510%2C19.1683&layer=mapnik&marker=19.1483%2C77.3210"
              style={{ width: '100%', height: '100%', border: 'none', display: 'block', minHeight: '180px' }}
            />
          </div>
        </div>

        {/* Right Panel — Contact Form fills remaining width */}
        <div className="contact-panel-right" style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
          <div style={{ width: '100%', maxWidth: '700px' }}>
            {!sent ? (
              <>
                <h3 style={{ fontWeight: 700, marginBottom: '20px', color: 'var(--text-main)', fontSize: '18px' }}>Send Us a Message ✉️</h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid-2" style={{ gap: '12px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-input" placeholder="e.g. Ramesh Kumar" required
                        value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-input" placeholder="you@example.com" required
                        value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '12px' }}>
                    <label className="form-label">Phone (Optional)</label>
                    <input type="tel" className="form-input" placeholder="+91 9876543210"
                      value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea className="form-input" rows={6} placeholder="How can we help you? Describe your query..." required
                      value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ resize: 'vertical' }} />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '15px' }} disabled={loading}>
                    {loading ? '⏳ Sending...' : <><FaPaperPlane /> Send Message</>}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <FaCheckCircle style={{ fontSize: '64px', color: 'var(--primary-green)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>Message Sent! 🎉</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Thank you, <strong>{form.name}</strong>! We'll get back to you within 24 hours.</p>
                <button className="btn btn-secondary" onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }); }}>
                  Send Another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
