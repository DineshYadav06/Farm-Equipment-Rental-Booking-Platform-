import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaPhoneAlt, FaTractor,
         FaSeedling, FaBuilding, FaIdCard, FaMapMarkerAlt,
         FaShieldAlt, FaCheckCircle, FaArrowRight, FaLeaf } from 'react-icons/fa';

const CROPS = ['wheat', 'rice', 'sugarcane', 'maize', 'cotton', 'vegetables', 'other'];
const EQUIPMENT_TYPES = ['Tractor', 'Harvester', 'Rotavator', 'Seed Drill', 'Thresher', 'Sprayer', 'Excavator', 'Other'];

const StepBar = ({ step, total }) => (
  <div className="login-step-bar">
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} className={`login-step-seg ${i < step ? 'login-step-done' : ''}`} />
    ))}
  </div>
);

const InputIcon = ({ icon, children }) => (
  <div className="login-input-wrap">
    <span className="login-input-icon">{icon}</span>
    {children}
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [step, setStep]             = useState(1);
  const [role, setRole]             = useState('farmer');
  const [otpSent, setOtpSent]       = useState(false);
  const [otpInput, setOtpInput]     = useState('');
  const [success, setSuccess]       = useState(false);

  const [form, setForm] = useState({
    name: '', phone: '', email: '', password: '',
    landSize: '', cropType: 'wheat',
    businessName: '', experience: '', aadhaarFile: null,
    city: '', equipmentTypes: [],
  });
  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const handleSendOTP = () => { setOtpSent(true); alert('OTP Sent! (Demo: use 123456)'); };
  const handleVerifyOTP = () => {
    if (otpInput === '123456') { setSuccess(true); setTimeout(() => navigate('/dashboard'), 2000); }
    else alert('Invalid OTP. Demo OTP: 123456');
  };

  // ── LOGIN ──
  if (!isRegister) return (
    <div className="login-page">
      <div className="login-card glass-card">
        <div className="login-card-logo">
          <Link to="/"><img src="/logo.png" alt="AgroLink" className="login-logo-img" /></Link>
          <h2 className="login-card-title">Welcome Back 👋</h2>
          <p className="login-card-sub">Login to manage your bookings & listings</p>
        </div>

        <form className="login-form" onSubmit={e => { e.preventDefault(); navigate('/dashboard'); }}>
          <div className="form-group">
            <label className="form-label">Phone / Email</label>
            <InputIcon icon={<FaPhoneAlt />}>
              <input type="text" className="form-input login-field" placeholder="+91 9876543210" required />
            </InputIcon>
          </div>

          <div className="form-group">
            <div className="login-label-row">
              <label className="form-label">Password</label>
              <a href="#" className="text-gradient login-forgot">Forgot Password?</a>
            </div>
            <InputIcon icon={<FaLock />}>
              <input type="password" className="form-input login-field" placeholder="••••••••" required />
            </InputIcon>
          </div>

          <label className="login-remember">
            <input type="checkbox" style={{ accentColor: 'var(--primary-green)' }} /> Remember me
          </label>

          <button type="submit" className="login-submit-btn">
            <FaShieldAlt /> Secure Login
          </button>
        </form>

        <div className="login-divider"><span>or</span></div>

        <div className="login-switch">
          Don't have an account?{' '}
          <button className="login-switch-btn" onClick={() => { setIsRegister(true); setStep(1); }}>
            Create One <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );

  // ── REGISTER ──
  const totalSteps = 3;
  return (
    <div className="login-page">
      <div className="login-card glass-card">
        <div className="login-card-logo">
          <Link to="/"><img src="/logo.png" alt="AgroLink" className="login-logo-img" /></Link>
          <h2 className="login-card-title">Create Your Account</h2>
          <p className="login-card-sub">
            Step {step} of {totalSteps} —{' '}
            {step === 1 ? 'Basic Information' : step === 2 ? 'Your Profile' : 'Verify Phone'}
          </p>
        </div>

        <StepBar step={step} total={totalSteps} />

        {/* STEP 1 */}
        {step === 1 && (
          <div className="login-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <InputIcon icon={<FaUser />}>
                <input type="text" className="form-input login-field" placeholder="e.g. Ramesh Kumar" value={form.name} onChange={e => update('name', e.target.value)} />
              </InputIcon>
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <InputIcon icon={<FaPhoneAlt />}>
                <input type="tel" className="form-input login-field" placeholder="+91 9876543210" value={form.phone} onChange={e => update('phone', e.target.value)} />
              </InputIcon>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <InputIcon icon={<FaEnvelope />}>
                <input type="email" className="form-input login-field" placeholder="you@example.com" value={form.email} onChange={e => update('email', e.target.value)} />
              </InputIcon>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <InputIcon icon={<FaLock />}>
                <input type="password" className="form-input login-field" placeholder="Min. 8 characters" value={form.password} onChange={e => update('password', e.target.value)} />
              </InputIcon>
            </div>
            <div className="form-group">
              <label className="form-label">I am a...</label>
              <div className="login-role-row">
                <button type="button" className={`login-role-btn ${role === 'farmer' ? 'login-role-active' : ''}`} onClick={() => setRole('farmer')}>
                  <FaSeedling /> Farmer (Rent)
                </button>
                <button type="button" className={`login-role-btn ${role === 'owner' ? 'login-role-active' : ''}`} onClick={() => setRole('owner')}>
                  <FaTractor /> Owner (List)
                </button>
              </div>
            </div>
            <button className="login-submit-btn" onClick={() => setStep(2)}>
              Next: {role === 'farmer' ? 'Farm Details' : 'Business Details'} <FaArrowRight />
            </button>
          </div>
        )}

        {/* STEP 2 — FARMER */}
        {step === 2 && role === 'farmer' && (
          <div className="login-form">
            <div className="login-info-banner login-banner-green">
              <FaLeaf /> This info powers your <strong>AI crop recommendations</strong>
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
              <InputIcon icon={<FaMapMarkerAlt />}>
                <input type="text" className="form-input login-field" placeholder="e.g. Nanded, Latur..." value={form.city} onChange={e => update('city', e.target.value)} />
              </InputIcon>
            </div>
            <div className="login-btn-row">
              <button className="login-back-btn" onClick={() => setStep(1)}>← Back</button>
              <button className="login-submit-btn login-btn-flex" onClick={() => setStep(3)}>Next: Verify <FaArrowRight /></button>
            </div>
          </div>
        )}

        {/* STEP 2 — OWNER */}
        {step === 2 && role === 'owner' && (
          <div className="login-form">
            <div className="login-info-banner login-banner-blue">
              <FaShieldAlt /> Your details will be <strong>verified for farmer trust</strong>
            </div>
            <div className="form-group">
              <label className="form-label">Business Name</label>
              <InputIcon icon={<FaBuilding />}>
                <input type="text" className="form-input login-field" placeholder="e.g. Singh Agro Rentals" value={form.businessName} onChange={e => update('businessName', e.target.value)} />
              </InputIcon>
            </div>
            <div className="form-group">
              <label className="form-label">Equipment Types</label>
              <div className="login-chips-wrap">
                {EQUIPMENT_TYPES.map(eq => (
                  <button key={eq} type="button"
                    onClick={() => { const cur = form.equipmentTypes || []; update('equipmentTypes', cur.includes(eq) ? cur.filter(x => x !== eq) : [...cur, eq]); }}
                    className={`login-chip ${(form.equipmentTypes || []).includes(eq) ? 'login-chip-active' : ''}`}>
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
              <label htmlFor="aadhaarInput" className="login-upload-box">
                <FaIdCard className="login-upload-icon" />
                <p className="login-upload-text">Click to upload Aadhaar (JPG/PNG/PDF)</p>
                {form.aadhaarFile && <p className="login-upload-done">✅ {form.aadhaarFile.name}</p>}
              </label>
              <input type="file" id="aadhaarInput" accept="image/*,.pdf" style={{ display: 'none' }} onChange={e => update('aadhaarFile', e.target.files[0])} />
            </div>
            <div className="login-btn-row">
              <button className="login-back-btn" onClick={() => setStep(1)}>← Back</button>
              <button className="login-submit-btn login-btn-flex" onClick={() => setStep(3)}>Next: Verify <FaArrowRight /></button>
            </div>
          </div>
        )}

        {/* STEP 3 — OTP */}
        {step === 3 && !success && (
          <div className="login-otp-view">
            <div className="login-otp-icon">📱</div>
            <h3 className="login-otp-title">Verify Phone Number</h3>
            <p className="login-otp-sub">We'll send an OTP to <strong>{form.phone || '+91 XXXXXXXXXX'}</strong></p>
            {!otpSent ? (
              <button className="login-submit-btn" onClick={handleSendOTP}>Send OTP</button>
            ) : (
              <div className="login-otp-input-wrap">
                <p className="login-otp-sent">✅ OTP Sent! Demo OTP: 123456</p>
                <input type="text" maxLength={6} className="form-input login-otp-input" placeholder="_ _ _ _ _ _"
                  value={otpInput} onChange={e => setOtpInput(e.target.value)} />
                <button className="login-submit-btn" onClick={handleVerifyOTP}>
                  <FaShieldAlt /> Verify & Create Account
                </button>
                <button className="text-gradient login-resend" style={{ background: 'transparent' }} onClick={() => alert('OTP resent! Demo: 123456')}>
                  Resend OTP
                </button>
              </div>
            )}
            <button className="login-back-btn" style={{ marginTop: '12px' }} onClick={() => setStep(2)}>← Back</button>
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="login-success">
            <FaCheckCircle className="login-success-icon" />
            <h3 className="login-success-title">Account Created! 🎉</h3>
            <p className="login-success-sub">Redirecting to your dashboard…</p>
          </div>
        )}

        <div className="login-switch" style={{ marginTop: '20px' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button className="login-switch-btn" onClick={() => { setIsRegister(!isRegister); setStep(1); }}>
            {isRegister ? 'Login Here' : 'Create One'} <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
