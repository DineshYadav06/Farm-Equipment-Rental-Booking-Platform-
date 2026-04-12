import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaPhoneAlt, FaTractor, FaSeedling, FaBuilding, FaIdCard, FaMapMarkerAlt, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const CROPS = ['wheat', 'rice', 'sugarcane', 'maize', 'cotton', 'vegetables', 'other'];
const EQUIPMENT_TYPES = ['Tractor', 'Harvester', 'Rotavator', 'Seed Drill', 'Thresher', 'Sprayer', 'Excavator', 'Other'];

const StepIndicator = ({ step, total }) => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        width: i < step ? '32px' : '10px', height: '10px', borderRadius: '5px',
        background: i < step ? 'linear-gradient(135deg, var(--primary-green), var(--primary-blue))' : 'var(--border-color)',
        transition: 'all 0.4s ease',
      }} />
    ))}
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('farmer');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: '', phone: '', email: '', password: '',
    // Farmer
    landSize: '', cropType: 'wheat',
    // Owner
    businessName: '', experience: '', aadhaarFile: null,
    // Common
    city: '',
  });

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const handleSendOTP = () => {
    setOtpSent(true);
    // Simulated OTP — in production, call POST /api/auth/send-otp
    alert('OTP Sent! (Demo: use 1 2 3 4 5 6)');
  };

  const handleVerifyOTP = () => {
    if (otpInput === '123456') {
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } else {
      alert('Invalid OTP. Demo OTP is: 123456');
    }
  };

  // ── LOGIN VIEW ───────────────────────────────────────────────
  if (!isRegister) {
    return (
      <div className="container flex justify-center items-center" style={{ minHeight: 'calc(100vh - 72px)', padding: '24px' }}>
        <div className="glass-card" style={{ width: '100%', maxWidth: '420px' }}>
          <div className="text-center mb-4">
            <Link to="/"><img src="/logo.png" alt="AgroLink" style={{ height: '60px', margin: '0 auto' }} /></Link>
            <h2 className="text-2xl mt-2 mb-1">Welcome Back 👋</h2>
            <p className="text-muted text-sm">Login to manage your bookings and listings</p>
          </div>

          <form onSubmit={e => { e.preventDefault(); navigate('/dashboard'); }}>
            <div className="form-group">
              <label className="form-label">Phone / Email</label>
              <div style={{ position: 'relative' }}>
                <FaPhoneAlt style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                <input type="text" className="form-input" placeholder="+91 9876543210" style={{ paddingLeft: '40px' }} required />
              </div>
            </div>

            <div className="form-group mb-3">
              <div className="flex justify-between">
                <label className="form-label">Password</label>
                <a href="#" className="text-sm text-gradient">Forgot Password?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <FaLock style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                <input type="password" className="form-input" placeholder="••••••••" style={{ paddingLeft: '40px' }} required />
              </div>
            </div>

            <div className="flex justify-between items-center mb-3">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input type="checkbox" /> Remember me
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }}>
              <FaShieldAlt /> Secure Login
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted text-sm">Don't have an account?{' '}
              <button className="text-gradient font-bold" style={{ background: 'transparent' }} onClick={() => { setIsRegister(true); setStep(1); }}>
                Create One
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── REGISTRATION WIZARD ──────────────────────────────────────
  const totalSteps = 3;

  return (
    <div className="container flex justify-center items-center" style={{ minHeight: 'calc(100vh - 72px)', padding: '24px' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '480px' }}>
        <div className="text-center mb-3">
          <Link to="/"><img src="/logo.png" alt="AgroLink" style={{ height: '50px', margin: '0 auto' }} /></Link>
          <h2 className="text-xl mt-2 mb-1">Create Your Account</h2>
          <p className="text-muted text-sm">Step {step} of {totalSteps} — {
            step === 1 ? 'Basic Information' : step === 2 ? 'Your Profile Details' : 'Verify Phone'
          }</p>
        </div>

        <StepIndicator step={step} total={totalSteps} />

        {/* ── STEP 1: Basic Info & Role ── */}
        {step === 1 && (
          <div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <FaUser style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                <input type="text" className="form-input" placeholder="e.g. Ramesh Kumar" style={{ paddingLeft: '40px' }} value={form.name} onChange={e => update('name', e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div style={{ position: 'relative' }}>
                <FaPhoneAlt style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                <input type="tel" className="form-input" placeholder="+91 9876543210" style={{ paddingLeft: '40px' }} value={form.phone} onChange={e => update('phone', e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <FaEnvelope style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                <input type="email" className="form-input" placeholder="you@example.com" style={{ paddingLeft: '40px' }} value={form.email} onChange={e => update('email', e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <FaLock style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                <input type="password" className="form-input" placeholder="Min. 8 characters" style={{ paddingLeft: '40px' }} value={form.password} onChange={e => update('password', e.target.value)} />
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">I am a...</label>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setRole('farmer')} className={`btn flex-1 justify-center ${role === 'farmer' ? 'btn-primary' : 'btn-secondary'}`}>
                  <FaSeedling /> Farmer (Rent)
                </button>
                <button type="button" onClick={() => setRole('owner')} className={`btn flex-1 justify-center ${role === 'owner' ? 'btn-primary' : 'btn-secondary'}`}>
                  <FaTractor /> Owner (List)
                </button>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }} onClick={() => setStep(2)}>
              Next: {role === 'farmer' ? 'Farm Details' : 'Business Details'} →
            </button>
          </div>
        )}

        {/* ── STEP 2: Role-Specific Details ── */}
        {step === 2 && role === 'farmer' && (
          <div>
            <div style={{ padding: '10px 14px', background: 'rgba(46,204,113,0.1)', borderLeft: '3px solid var(--primary-green)', borderRadius: '6px', marginBottom: '16px' }}>
              <p className="text-sm">🌾 This info powers your <strong>AI crop recommendations</strong></p>
            </div>

            <div className="form-group">
              <label className="form-label">Main Crop Type</label>
              <select className="form-input" value={form.cropType} onChange={e => update('cropType', e.target.value)}>
                {CROPS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Land Size (Acres)</label>
              <input type="number" className="form-input" placeholder="e.g. 5" value={form.landSize} onChange={e => update('landSize', e.target.value)} min="0.5" step="0.5" />
            </div>

            <div className="form-group">
              <label className="form-label">Your City / Village</label>
              <div style={{ position: 'relative' }}>
                <FaMapMarkerAlt style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                <input type="text" className="form-input" placeholder="e.g. Nanded, Latur..." style={{ paddingLeft: '40px' }} value={form.city} onChange={e => update('city', e.target.value)} />
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button className="btn btn-secondary flex-1 justify-center" onClick={() => setStep(1)}>← Back</button>
              <button className="btn btn-primary flex-1 justify-center" onClick={() => setStep(3)}>Next: Verify →</button>
            </div>
          </div>
        )}

        {step === 2 && role === 'owner' && (
          <div>
            <div style={{ padding: '10px 14px', background: 'rgba(52,152,219,0.1)', borderLeft: '3px solid var(--primary-blue)', borderRadius: '6px', marginBottom: '16px' }}>
              <p className="text-sm">🔐 Your details will be <strong>verified for farmer trust</strong></p>
            </div>

            <div className="form-group">
              <label className="form-label">Business Name</label>
              <div style={{ position: 'relative' }}>
                <FaBuilding style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                <input type="text" className="form-input" placeholder="e.g. Singh Agro Rentals" style={{ paddingLeft: '40px' }} value={form.businessName} onChange={e => update('businessName', e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Equipment Types (Select all that apply)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {EQUIPMENT_TYPES.map(eq => (
                  <button key={eq} type="button"
                    onClick={() => {
                      const cur = form.equipmentTypes || [];
                      const val = cur.includes(eq) ? cur.filter(x => x !== eq) : [...cur, eq];
                      update('equipmentTypes', val);
                    }}
                    style={{
                      padding: '5px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer',
                      border: '1px solid var(--border-color)',
                      background: (form.equipmentTypes || []).includes(eq) ? 'var(--primary-green)' : 'var(--surface-color)',
                      color: (form.equipmentTypes || []).includes(eq) ? 'white' : 'var(--text-main)',
                    }}>
                    {eq}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Experience (Years)</label>
              <input type="number" className="form-input" placeholder="e.g. 3 (optional)" value={form.experience} onChange={e => update('experience', e.target.value)} min="0" />
            </div>

            <div className="form-group">
              <label className="form-label">Aadhaar / ID Proof</label>
              <div style={{ border: '2px dashed var(--border-color)', borderRadius: '8px', padding: '16px', textAlign: 'center', cursor: 'pointer' }}>
                <FaIdCard style={{ fontSize: '24px', color: 'var(--text-muted)', marginBottom: '6px' }} />
                <p className="text-sm text-muted">Click to upload Aadhaar (JPG/PNG)</p>
                <input type="file" accept="image/*,.pdf" style={{ display: 'none' }} id="aadhaarInput" onChange={e => update('aadhaarFile', e.target.files[0])} />
                <label htmlFor="aadhaarInput" className="btn btn-secondary text-sm mt-2" style={{ cursor: 'pointer' }}>Select File</label>
                {form.aadhaarFile && <p className="text-sm mt-1" style={{ color: 'var(--primary-green)' }}>✅ {form.aadhaarFile.name}</p>}
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button className="btn btn-secondary flex-1 justify-center" onClick={() => setStep(1)}>← Back</button>
              <button className="btn btn-primary flex-1 justify-center" onClick={() => setStep(3)}>Next: Verify →</button>
            </div>
          </div>
        )}

        {/* ── STEP 3: OTP Verification ── */}
        {step === 3 && !success && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📱</div>
            <h3 className="text-xl mb-1">Verify Phone Number</h3>
            <p className="text-muted text-sm mb-4">We'll send an OTP to <strong>{form.phone || '+91 XXXXXXXXXX'}</strong></p>

            {!otpSent ? (
              <button className="btn btn-primary" style={{ padding: '12px 32px', justifyContent: 'center' }} onClick={handleSendOTP}>
                Send OTP
              </button>
            ) : (
              <div>
                <p className="text-sm mb-3" style={{ color: 'var(--primary-green)' }}>✅ OTP Sent! (Demo: 123456)</p>
                <input
                  type="text" maxLength={6} className="form-input"
                  style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '12px', fontWeight: 700 }}
                  placeholder="———"
                  value={otpInput} onChange={e => setOtpInput(e.target.value)}
                />
                <button className="btn btn-primary mt-3" style={{ width: '100%', justifyContent: 'center', padding: '12px' }} onClick={handleVerifyOTP}>
                  <FaShieldAlt /> Verify & Create Account
                </button>
                <button className="text-sm text-gradient mt-2" style={{ background: 'transparent', display: 'block', margin: '8px auto 0' }} onClick={() => alert('OTP resent! (Demo: 123456)')}>
                  Resend OTP
                </button>
              </div>
            )}

            <button className="btn btn-secondary mt-3" onClick={() => setStep(2)}>← Back</button>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {success && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <FaCheckCircle style={{ fontSize: '64px', color: 'var(--primary-green)', marginBottom: '16px' }} />
            <h3 className="text-xl mb-2">Account Created! 🎉</h3>
            <p className="text-muted text-sm">Redirecting to your dashboard…</p>
          </div>
        )}

        <div className="text-center mt-3">
          <p className="text-muted text-sm">Already have an account?{' '}
            <button className="text-gradient font-bold" style={{ background: 'transparent' }} onClick={() => setIsRegister(false)}>
              Login Here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
