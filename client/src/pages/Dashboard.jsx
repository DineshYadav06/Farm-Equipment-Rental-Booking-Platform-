import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaTractor, FaMoneyBillWave, FaMapMarkedAlt, FaChartLine, FaRobot,
  FaClipboardList, FaUserEdit, FaCog, FaStar, FaHistory, FaBell,
  FaMap, FaLeaf, FaCheckCircle, FaTimesCircle, FaPlus, FaShieldAlt,
  FaArrowUp, FaArrowDown, FaUsers, FaRupeeSign
} from 'react-icons/fa';
import WeatherWidget from '../components/dashboard/WeatherWidget';
import RatingModal from '../components/dashboard/RatingModal';

/* ── FARMER DASHBOARD ───────────────────────────────────────── */
const FarmerDashboard = () => {
  const [ratingOpen, setRatingOpen] = useState(false);
  const stats = [
    { label: 'Total Bookings', value: '12', icon: <FaClipboardList />, color: '#3498db', trend: '+3 this month' },
    { label: 'Active Rentals', value: '2',  icon: <FaTractor />,       color: '#2ecc71', trend: 'In progress' },
    { label: 'Completed',      value: '9',  icon: <FaCheckCircle />,   color: '#1abc9c', trend: '75% success' },
    { label: 'Pending',        value: '1',  icon: <FaBell />,          color: '#f1c40f', trend: 'Needs action' },
  ];
  const bookings = [
    { name: 'Mahindra 575 DI', dates: 'Oct 12–14', status: 'Active',  statusColor: '#2ecc71', action: 'View' },
    { name: 'Seed Drill',      dates: 'Oct 18–19', status: 'Pending', statusColor: '#f1c40f', action: 'Cancel' },
    { name: 'Rotavator',       dates: 'Sep 2–3',   status: 'Done',    statusColor: '#8395a7', action: 'Rate' },
  ];
  return (
    <div className="dash-content">
      <div className="dash-page-header">
        <div>
          <h2 className="dash-page-title">Farmer Operations <span>👨‍🌾</span></h2>
          <p className="dash-page-sub">Welcome back, Dinesh. Here's your farm summary.</p>
        </div>
        <div className="dash-header-actions">
          <a href="/browse" className="dash-action-btn dash-action-primary"><FaTractor /> Browse Equipment</a>
        </div>
      </div>

      {/* Stats */}
      <div className="dash-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="dash-stat-card glass-card">
            <div className="dash-stat-icon" style={{ color: s.color, background: `${s.color}18` }}>{s.icon}</div>
            <div className="dash-stat-val" style={{ color: s.color }}>{s.value}</div>
            <div className="dash-stat-label">{s.label}</div>
            <div className="dash-stat-trend">{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="dash-main-grid">
        {/* Bookings Table */}
        <div className="glass-card dash-card-wide">
          <div className="dash-card-header">
            <h3 className="dash-card-title"><FaClipboardList /> My Bookings</h3>
            <a href="/browse" className="dash-card-link">+ New Booking</a>
          </div>
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Equipment</th><th>Dates</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={i}>
                    <td className="dash-td-name">{b.name}</td>
                    <td className="dash-td-muted">{b.dates}</td>
                    <td><span className="dash-status-pill" style={{ color: b.statusColor, background: `${b.statusColor}15` }}>{b.status}</span></td>
                    <td>
                      <button
                        className="dash-row-btn"
                        onClick={b.action === 'Rate' ? () => setRatingOpen(true) : undefined}
                      >{b.action}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Planner */}
        <div className="glass-card">
          <div className="dash-card-header">
            <h3 className="dash-card-title"><FaRobot style={{ color: '#f1c40f' }} /> AI Farming Planner</h3>
          </div>
          <div className="form-group flex gap-2" style={{ display: 'flex', gap: '8px' }}>
            <select className="form-input" style={{ flex: 1, padding: '8px' }}>
              <option>Wheat</option><option>Rice</option><option>Sugarcane</option><option>Maize</option><option>Cotton</option>
            </select>
            <button className="dash-action-btn dash-action-primary" style={{ padding: '8px 16px' }}>Analyze</button>
          </div>
          <div className="dash-ai-card">
            <p className="dash-ai-crop">🌾 Crop: <strong>Wheat</strong> | 🧪 NPK 120:60:40 (Urea & DAP)</p>
            <p className="dash-ai-plan"><strong>Action:</strong> Rotavator (2–3 passes) → Zero-till Seed Drill for optimal germination.</p>
            <button className="dash-action-btn dash-action-outline" style={{ marginTop: '10px', width: '100%' }}>Find Equipment →</button>
          </div>
          <div style={{ marginTop: '14px' }}>
            <p className="dash-section-mini-label">📍 Nearby Matches in Nanded</p>
            {['Mahindra 575 DI · 2.1 km · ₹500/hr', 'Seed Drill · 3.4 km · ₹200/hr'].map(item => (
              <div key={item} className="dash-nearby-row">
                <span>{item}</span>
                <button className="dash-action-btn dash-action-primary" style={{ padding: '4px 12px', fontSize: '12px' }}>Book</button>
              </div>
            ))}
          </div>
        </div>

        {/* Weather */}
        <WeatherWidget city="Nanded" />
      </div>

      <RatingModal isOpen={ratingOpen} onClose={() => setRatingOpen(false)} targetName="Agri Rentals Ltd" targetRole="owner" />
    </div>
  );
};

/* ── OWNER DASHBOARD ────────────────────────────────────────── */
const OwnerDashboard = () => {
  const stats = [
    { label: 'This Month',       value: '₹42,500', icon: <FaMoneyBillWave />, color: '#2ecc71', trend: '+18% vs last month' },
    { label: 'Total Bookings',   value: '84',      icon: <FaClipboardList />, color: '#3498db', trend: '84 total' },
    { label: 'Equipment Fleet',  value: '4',       icon: <FaTractor />,       color: '#9b59b6', trend: '2 currently active' },
    { label: 'Pending Requests', value: '3',       icon: <FaBell />,          color: '#e74c3c', trend: 'Needs review' },
  ];
  const fleet = [
    { name: 'John Deere 5310',    type: 'Tractor',   state: '🟢 Working in Field', stateColor: '#2ecc71', status: 'Booked' },
    { name: 'Laser Land Leveler', type: 'Implement', state: '⚫ Idle (Garage)',    stateColor: '#8395a7', status: 'Available' },
    { name: 'TATA Hitachi EX200', type: 'Excavator', state: '🔵 In Transit',       stateColor: '#3498db', status: 'Booked' },
  ];
  return (
    <div className="dash-content">
      <div className="dash-page-header">
        <div>
          <h2 className="dash-page-title">Owner Command Center <span>⚙️</span></h2>
          <p className="dash-page-sub">Your fleet is performing well. 3 new requests pending.</p>
        </div>
        <div className="dash-header-actions">
          <button className="dash-action-btn dash-action-primary"><FaPlus /> Add Equipment</button>
        </div>
      </div>

      <div className="dash-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="dash-stat-card glass-card">
            <div className="dash-stat-icon" style={{ color: s.color, background: `${s.color}18` }}>{s.icon}</div>
            <div className="dash-stat-val" style={{ color: s.color }}>{s.value}</div>
            <div className="dash-stat-label">{s.label}</div>
            <div className="dash-stat-trend">{s.trend}</div>
          </div>
        ))}
      </div>

      <div className="dash-main-grid">
        {/* Fleet Table */}
        <div className="glass-card dash-card-wide">
          <div className="dash-card-header">
            <h3 className="dash-card-title"><FaTractor /> My Fleet (GPS Tracked)</h3>
            <button className="dash-action-btn dash-action-primary" style={{ fontSize: '13px', padding: '6px 14px' }}><FaPlus /> Add</button>
          </div>
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead><tr><th>Equipment</th><th>Type</th><th>State</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {fleet.map((f, i) => (
                  <tr key={i}>
                    <td className="dash-td-name">{f.name}</td>
                    <td className="dash-td-muted">{f.type}</td>
                    <td style={{ color: f.stateColor, fontSize: '12px', fontWeight: 600 }}>{f.state}</td>
                    <td>
                      <span className="dash-status-pill" style={{
                        color: f.status === 'Available' ? '#2ecc71' : '#e74c3c',
                        background: f.status === 'Available' ? 'rgba(46,204,113,0.12)' : 'rgba(231,76,60,0.12)'
                      }}>{f.status}</span>
                    </td>
                    <td><button className="dash-row-btn">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics */}
        <div className="glass-card">
          <div className="dash-card-header">
            <h3 className="dash-card-title"><FaChartLine /> Revenue Analytics</h3>
          </div>
          <div className="dash-chart-placeholder">
            <FaChartLine style={{ fontSize: '2rem', opacity: 0.2 }} />
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>Earnings Chart</p>
          </div>
          <div className="dash-revenue-row">
            <div className="dash-revenue-item">
              <div className="dash-revenue-label">Today</div>
              <div className="dash-revenue-val" style={{ color: '#2ecc71' }}>₹2,400</div>
            </div>
            <div className="dash-revenue-divider" />
            <div className="dash-revenue-item">
              <div className="dash-revenue-label">This Week</div>
              <div className="dash-revenue-val" style={{ color: '#3498db' }}>₹12,000</div>
            </div>
            <div className="dash-revenue-divider" />
            <div className="dash-revenue-item">
              <div className="dash-revenue-label">This Month</div>
              <div className="dash-revenue-val" style={{ color: '#9b59b6' }}>₹42,500</div>
            </div>
          </div>
        </div>

        {/* Map Tracker */}
        <div className="glass-card">
          <div className="dash-card-header">
            <h3 className="dash-card-title"><FaMapMarkedAlt /> Live Locomotion Map</h3>
            <span className="dash-live-badge">● LIVE</span>
          </div>
          <div className="dash-map-placeholder">
            <div className="dash-map-dot dash-map-dot-1" />
            <div className="dash-map-dot dash-map-dot-2" />
            <p className="dash-map-label">📍 Tracking 2 Active Machines near Nanded</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── ADMIN DASHBOARD ────────────────────────────────────────── */
const AdminDashboard = () => {
  const stats = [
    { label: 'Districts Covered', value: '5',         color: '#3498db' },
    { label: 'High Demand Zone',  value: 'Nanded S.', color: '#e74c3c' },
    { label: 'Most Needed',       value: 'Levelers',  color: '#9b59b6' },
    { label: 'Total Machines',    value: '145',        color: '#2ecc71' },
  ];
  const regions = [
    { region: 'Nanded North', demand: 'High (124)',  available: '45 Units', action: 'Relocate 15 Tractors', actionColor: '#e74c3c' },
    { region: 'Latur Border', demand: 'Medium (50)', available: '60 Units', action: 'Optimal Capacity',    actionColor: '#2ecc71' },
    { region: 'Parbhani Zone', demand: 'Low (15)',   available: '40 Units', action: 'Subsidize Rentals',   actionColor: '#8395a7' },
  ];
  return (
    <div className="dash-content">
      <div className="dash-page-header">
        <div>
          <h2 className="dash-page-title">State Head Analytics <span>🗺️</span></h2>
          <p className="dash-page-sub">Regional equipment distribution and demand overview.</p>
        </div>
      </div>

      <div className="dash-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="dash-stat-card glass-card">
            <div className="dash-stat-val" style={{ color: s.color, fontSize: '1.8rem' }}>{s.value}</div>
            <div className="dash-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="dash-main-grid">
        <div className="glass-card dash-card-wide">
          <div className="dash-card-header">
            <h3 className="dash-card-title">Equipment Deficit By Region</h3>
          </div>
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead><tr><th>Region</th><th>Machine Demand</th><th>Locally Available</th><th>Recommendation</th></tr></thead>
              <tbody>
                {regions.map((r, i) => (
                  <tr key={i}>
                    <td className="dash-td-name">{r.region}</td>
                    <td className="dash-td-muted">{r.demand}</td>
                    <td className="dash-td-muted">{r.available}</td>
                    <td><span style={{ color: r.actionColor, fontWeight: 700, fontSize: '13px' }}>{r.action}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card">
          <div className="dash-card-header">
            <h3 className="dash-card-title"><FaMap /> Resource Heatmap</h3>
          </div>
          <div className="dash-chart-placeholder">
            <FaMap style={{ fontSize: '2rem', opacity: 0.2 }} />
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>Geo-Spatial Heatmap</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── USER SETTINGS ──────────────────────────────────────────── */
const UserSettings = () => (
  <div className="dash-content">
    <div className="dash-page-header">
      <div>
        <h2 className="dash-page-title">Profile & Settings <span>⚙️</span></h2>
        <p className="dash-page-sub">Manage your account details and preferences.</p>
      </div>
    </div>
    <div className="dash-settings-grid">
      <div className="glass-card">
        <div className="dash-card-header"><h3 className="dash-card-title"><FaUserEdit /> Edit Profile</h3></div>
        <div className="form-group"><label className="form-label">Full Name</label><input type="text" className="form-input" defaultValue="Dinesh Kumar Yadav" /></div>
        <div className="form-group"><label className="form-label">Phone</label><input type="tel" className="form-input" defaultValue="+91 9555240369" /></div>
        <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-input" defaultValue="dinesh@agrolink.in" /></div>
        <div className="form-group"><label className="form-label">City / Village</label><input type="text" className="form-input" defaultValue="Nanded, Maharashtra" /></div>
        <button className="dash-action-btn dash-action-primary" style={{ marginTop: '8px' }}>Save Profile</button>
      </div>

      <div className="glass-card">
        <div className="dash-card-header"><h3 className="dash-card-title"><FaCog /> Preferences</h3></div>
        {[
          { label: 'Push Notifications', desc: 'Booking updates & reminders', checked: true },
          { label: 'SMS Alerts',         desc: 'OTP & payment confirmations', checked: true },
          { label: 'Email Digest',       desc: 'Weekly farm activity report', checked: false },
          { label: 'Nearby Alerts',      desc: 'New equipment in your area',  checked: true },
        ].map((pref, i) => (
          <div key={i} className="dash-pref-row">
            <div>
              <div className="dash-pref-label">{pref.label}</div>
              <div className="dash-pref-desc">{pref.desc}</div>
            </div>
            <input type="checkbox" defaultChecked={pref.checked} style={{ width: '18px', height: '18px', accentColor: 'var(--primary-green)', cursor: 'pointer' }} />
          </div>
        ))}
      </div>

      <div className="glass-card">
        <div className="dash-card-header"><h3 className="dash-card-title"><FaShieldAlt /> Security</h3></div>
        <div className="form-group"><label className="form-label">Current Password</label><input type="password" className="form-input" placeholder="••••••••" /></div>
        <div className="form-group"><label className="form-label">New Password</label><input type="password" className="form-input" placeholder="Min. 8 characters" /></div>
        <button className="dash-action-btn dash-action-outline" style={{ marginTop: '8px' }}>Update Password</button>
      </div>
    </div>
  </div>
);

/* ── OWNER REQUESTS ─────────────────────────────────────────── */
const OwnerRequests = () => {
  const requests = [
    { farmer: 'Ramesh Kumar', equip: 'John Deere 5310', dates: 'Oct 20–22', amount: '₹2,400', status: 'Pending' },
    { farmer: 'Priya Devi',   equip: 'Laser Land Leveler', dates: 'Oct 25', amount: '₹400', status: 'Pending' },
    { farmer: 'Suresh Patil', equip: 'John Deere 5310', dates: 'Nov 1–3',  amount: '₹3,600', status: 'Pending' },
  ];
  return (
    <div className="dash-content">
      <div className="dash-page-header">
        <div>
          <h2 className="dash-page-title">Booking Requests <span className="dash-badge-count">3</span></h2>
          <p className="dash-page-sub">Review and accept incoming rental requests from farmers.</p>
        </div>
      </div>
      <div className="glass-card">
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead><tr><th>Farmer</th><th>Equipment</th><th>Dates</th><th>Amount</th><th>Actions</th></tr></thead>
            <tbody>
              {requests.map((r, i) => (
                <tr key={i}>
                  <td className="dash-td-name">{r.farmer}</td>
                  <td className="dash-td-muted">{r.equip}</td>
                  <td className="dash-td-muted">{r.dates}</td>
                  <td style={{ fontWeight: 700, color: '#2ecc71' }}>{r.amount}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="dash-action-btn dash-action-primary" style={{ padding: '5px 12px', fontSize: '12px' }}>✅ Accept</button>
                      <button className="dash-action-btn dash-action-danger"  style={{ padding: '5px 12px', fontSize: '12px' }}>✗ Decline</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ── MAIN DASHBOARD ─────────────────────────────────────────── */
const navItems = {
  farmer: [
    { key: 'overview', icon: <FaChartLine />, label: 'Overview' },
    { key: 'profile',  icon: <FaUserEdit />,  label: 'Profile & Settings' },
  ],
  owner: [
    { key: 'overview',  icon: <FaChartLine />,    label: 'Overview' },
    { key: 'requests',  icon: <FaClipboardList />, label: 'Booking Requests', badge: '3' },
    { key: 'profile',   icon: <FaUserEdit />,      label: 'Profile & Settings' },
  ],
  admin: [
    { key: 'overview',   icon: <FaChartLine />, label: 'Overview' },
    { key: 'analytics',  icon: <FaMap />,       label: 'Regional Reports' },
    { key: 'profile',    icon: <FaUserEdit />,  label: 'Profile & Settings' },
  ],
};

const Dashboard = () => {
  const [role, setRole]           = useState('farmer');
  const [activeTab, setActiveTab] = useState('overview');

  const handleRoleChange = (r) => { setRole(r); setActiveTab('overview'); };

  return (
    <div className="dash-wrapper">

      {/* ── SIDEBAR ── */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar-brand">
          <div className="dash-avatar">D</div>
          <div>
            <div className="dash-user-name">Dinesh Kumar</div>
            <div className="dash-user-role">{role.charAt(0).toUpperCase() + role.slice(1)}</div>
          </div>
        </div>

        <div className="dash-role-select-wrap">
          <p className="dash-role-label">Switch Role</p>
          <select className="form-input dash-role-select" value={role} onChange={e => handleRoleChange(e.target.value)}>
            <option value="farmer">👨‍🌾 Farmer (Rent)</option>
            <option value="owner">🚜 Equipment Owner</option>
            <option value="admin">🗺️ State Head (Admin)</option>
          </select>
        </div>

        <nav className="dash-nav">
          {(navItems[role] || []).map(item => (
            <button
              key={item.key}
              className={`dash-nav-btn ${activeTab === item.key ? 'dash-nav-active' : ''}`}
              onClick={() => setActiveTab(item.key)}
            >
              <span className="dash-nav-icon">{item.icon}</span>
              {item.label}
              {item.badge && <span className="dash-nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="dash-sidebar-footer">
          <a href="/" className="dash-nav-btn">
            <span className="dash-nav-icon"><FaLeaf /></span> Back to Site
          </a>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <main className="dash-main">
        {activeTab === 'overview'  && role === 'farmer' && <FarmerDashboard />}
        {activeTab === 'overview'  && role === 'owner'  && <OwnerDashboard />}
        {activeTab === 'overview'  && role === 'admin'  && <AdminDashboard />}
        {activeTab === 'analytics' && role === 'admin'  && <AdminDashboard />}
        {activeTab === 'requests'  && role === 'owner'  && <OwnerRequests />}
        {activeTab === 'profile'                        && <UserSettings />}
      </main>
    </div>
  );
};

export default Dashboard;
