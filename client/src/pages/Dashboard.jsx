import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTractor, FaMoneyBillWave, FaMapMarkedAlt, FaChartLine, FaRobot, FaClipboardList, FaUserEdit, FaCog, FaStar, FaIdCard, FaHistory, FaBell, FaMap } from 'react-icons/fa';
import WeatherWidget from '../components/dashboard/WeatherWidget';
import RatingModal from '../components/dashboard/RatingModal';

// Mock Component Stubs
const FarmerDashboard = () => {
  const [ratingOpen, setRatingOpen] = useState(false);

  return (
  <div style={{ padding: '16px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <h2 className="text-2xl text-gradient">Farmer Operations 👨‍🌾</h2>

    {/* Stats Grid */}
    <div className="grid-4" style={{ flexShrink: 0 }}>
      <div className="glass-card"><h3 className="text-muted text-sm">Total Bookings</h3><h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary-blue)' }}>12</h1></div>
      <div className="glass-card"><h3 className="text-muted text-sm">Active Rentals</h3><h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>2</h1></div>
      <div className="glass-card"><h3 className="text-muted text-sm">Completed</h3><h1 style={{ fontSize: '2rem', fontWeight: 700 }}>9</h1></div>
      <div className="glass-card"><h3 className="text-muted text-sm">Pending</h3><h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-color)' }}>1</h1></div>
    </div>

    {/* Split Layout */}
    <div className="grid-3" style={{ flex: 1, minHeight: 0 }}>
      
      {/* Bookings */}
      <div className="glass-card" style={{ overflowX: 'auto' }}>
        <h3 className="text-lg mb-2 flex items-center gap-2"><FaClipboardList /> My Bookings</h3>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '13px', minWidth: '350px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}><th className="pb-2">Equipment</th><th>Dates</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            <tr><td className="py-2">Mahindra 575 DI</td><td>Oct 12–14</td><td><span style={{color:'var(--primary-green)'}}>Active</span></td><td><button className="btn btn-secondary text-sm" style={{padding:'4px 8px'}}>View</button></td></tr>
            <tr><td className="py-2">Seed Drill</td><td>Oct 18–19</td><td><span style={{color:'var(--accent-color)'}}>Pending</span></td><td><button className="btn btn-secondary text-sm" style={{padding:'4px 8px'}}>Cancel</button></td></tr>
            <tr><td className="py-2">Rotavator</td><td>Sep 2–3</td><td><span style={{color:'var(--text-muted)'}}>Done</span></td><td>
              <button className="btn btn-secondary text-sm" style={{padding:'4px 8px'}} onClick={() => setRatingOpen(true)}>⭐ Rate</button>
            </td></tr>
          </tbody>
        </table>
      </div>

      {/* AI Recommendations */}
      <div className="glass-card">
        <h3 className="text-lg mb-2 flex items-center gap-2"><FaRobot style={{color:'var(--accent-color)'}} /> AI Farming Planner</h3>
        <div className="form-group flex gap-2">
          <select className="form-input text-sm" style={{flex:1, padding:'8px'}}>
            <option>Wheat</option><option>Rice</option><option>Sugarcane</option><option>Maize</option><option>Cotton</option>
          </select>
          <button className="btn btn-primary text-sm" style={{padding:'8px 14px'}}>Analyze</button>
        </div>
        <div style={{ padding: '12px', background: 'rgba(241, 196, 15, 0.1)', borderLeft: '4px solid var(--accent-color)', borderRadius: '4px', fontSize: '13px' }}>
          <p className="mb-2"><strong>🌾 Crop: Wheat</strong> | 🧪 <strong>Fertilizer Advice:</strong> NPK 120:60:40 (Urea & DAP)</p>
          <p className="mb-1"><strong>Action Plan:</strong> Prepare soil with <strong>Rotavator</strong> (2–3 passes), then use <strong>Zero-till Seed Drill</strong> for optimal germination and moisture retention.</p>
          <button className="btn btn-secondary mt-1 text-sm" style={{padding:'4px 10px'}}>Find Equipment →</button>
        </div>

        <div style={{ marginTop: '12px' }}>
          <h4 className="text-sm mb-2 font-bold" style={{color:'var(--text-muted)'}}>📍 Nearby Matches in Nanded</h4>
          {['Mahindra 575 DI · 2.1 km · ₹500/hr', 'Seed Drill · 3.4 km · ₹200/hr'].map(item => (
            <div key={item} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 0', borderBottom:'1px solid var(--border-color)', fontSize:'12px'}}>
              <span>{item}</span>
              <button className="btn btn-primary text-sm" style={{padding:'3px 10px'}}>Book</button>
            </div>
          ))}
        </div>
      </div>

      {/* Live Weather */}
      <WeatherWidget city="Nanded" />
    </div>

    <RatingModal isOpen={ratingOpen} onClose={() => setRatingOpen(false)} targetName="Agri Rentals Ltd" targetRole="owner" />
  </div>
  );
};

const OwnerDashboard = () => (
  <div style={{ padding: '16px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <h2 className="text-2xl text-gradient">Owner Command Center</h2>
    
    {/* Financial Stats Grid */}
    <div className="grid-4" style={{ flexShrink: 0 }}>
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.2), transparent)' }}>
        <h3 className="text-muted flex items-center gap-1"><FaMoneyBillWave /> This Month</h3>
        <h1 className="text-4xl text-success font-bold">₹42,500</h1>
      </div>
      <div className="glass-card"><h3 className="text-muted">Total Bookings</h3><h1 className="text-4xl text-primary-blue">84</h1></div>
      <div className="glass-card"><h3 className="text-muted">Equipment Fleet</h3><h1 className="text-4xl">4</h1></div>
      <div className="glass-card"><h3 className="text-muted">Pending Requests</h3><h1 className="text-4xl text-danger">3</h1></div>
    </div>

    {/* Split Layout */}
    <div className="grid-2" style={{ flex: 1, minHeight: 0 }}>
      
      {/* Fleet Management */}
      <div className="glass-card" style={{ overflowX: 'auto' }}>
         <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl flex items-center gap-2"><FaTractor /> My Fleet (GPS Tracked)</h3>
            <button className="btn btn-primary text-sm">+ Add Equipment</button>
         </div>
         <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '450px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}><th>Equipment</th><th>Type</th><th>Locomotion State</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              <tr><td className="py-2">John Deere 5310</td><td>Tractor</td><td><span className="text-success text-sm flex items-center gap-1"><span style={{width:6,height:6,borderRadius:'50%',background:'green',display:'inline-block'}}></span> Working in Field</span></td><td><span className="badge badge-warning text-xs">Booked</span></td><td><button className="text-primary-blue mr-2">Edit</button></td></tr>
              <tr><td className="py-2">Laser Land Leveler</td><td>Implement</td><td><span className="text-muted text-sm flex items-center gap-1"><span style={{width:6,height:6,borderRadius:'50%',background:'gray',display:'inline-block'}}></span> Idle (Garage)</span></td><td><span className="badge badge-success text-xs">Available</span></td><td><button className="text-primary-blue mr-2">Edit</button></td></tr>
              <tr><td className="py-2">TATA Hitatchi EX200</td><td>Excavator</td><td><span className="text-sm flex items-center gap-1" style={{color:'var(--primary-blue)'}}><span style={{width:6,height:6,borderRadius:'50%',background:'var(--primary-blue)',display:'inline-block'}}></span> In Transit</span></td><td><span className="badge badge-warning text-xs">Booked</span></td><td><button className="text-primary-blue mr-2">Edit</button></td></tr>
            </tbody>
          </table>
      </div>

      {/* Analytics & Tracking */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
         <div className="glass-card border-l-4">
           <h3 className="text-xl mb-2 flex items-center gap-2"><FaChartLine /> Analytics</h3>
           <div style={{ height: '150px', backgroundColor: 'var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <p className="text-muted text-sm">[ Earnings Chart Render ]</p>
           </div>
         </div>
         <div className="glass-card" style={{ flex: 1 }}>
           <h3 className="text-xl mb-2 flex items-center gap-2"><FaMapMarkedAlt /> Live Locomotion Map</h3>
           <div style={{ height: '150px', backgroundColor: 'var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'url(https://www.transparenttextures.com/patterns/cubes.png)' }}>
             <p className="text-primary-blue font-bold text-sm bg-white p-2 rounded">📍 Tracking 2 Active Machines near Nanded</p>
           </div>
         </div>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => (
  <div style={{ padding: '16px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <h2 className="text-2xl text-gradient">State Head Regional Analytics</h2>
    
    <div className="grid-4" style={{ flexShrink: 0 }}>
      <div className="glass-card"><h3 className="text-muted text-sm">Districts Covered</h3><h1 style={{ fontSize: '2rem', fontWeight: 700 }}>5</h1></div>
      <div className="glass-card"><h3 className="text-muted text-sm">High Demand Region</h3><h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--danger)' }}>Nanded South</h1></div>
      <div className="glass-card"><h3 className="text-muted text-sm">Most Needed Tech</h3><h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-blue)' }}>Laser Levelers</h1></div>
    </div>

    <div className="grid-2">
      <div className="glass-card" style={{ flex: 1, overflowX: 'auto' }}>
        <h3 className="text-xl mb-4">Equipment Deficit By Region</h3>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '14px', minWidth: '400px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}><th className="pb-2">Region</th><th>Machine Demand</th><th>Locally Available</th><th>Intervention Recommended</th></tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td className="py-2">Nanded North</td><td>High (124 Requests)</td><td>45 Units</td><td><span className="text-danger font-bold">Relocate 15 Tractors</span></td></tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td className="py-2">Latur Border</td><td>Medium (50 Requests)</td><td>60 Units</td><td><span className="text-success font-bold">Optimal Capacity</span></td></tr>
            <tr><td className="py-2">Parbhani Zone</td><td>Low (15 Requests)</td><td>40 Units</td><td><span className="text-muted font-bold">Subsidize Rentals</span></td></tr>
          </tbody>
        </table>
      </div>
      
      <div className="glass-card" style={{ flex: 1 }}>
        <h3 className="text-xl mb-4">Resource Heatmap</h3>
        <div style={{ height: '220px', backgroundColor: 'var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p className="text-muted text-sm">[ Geo-Spatial Heat Map for Admin View ]</p>
        </div>
      </div>
    </div>
  </div>
);

const UserSettings = () => (
   <div style={{ padding: '20px' }}>
      <h2 className="text-2xl text-gradient mb-3">Settings & Profile</h2>
      <div className="grid-2">
      <div className="glass-card mb-3" style={{ width: '100%' }}>
         <h3 className="text-xl mb-2 flex items-center gap-2"><FaUserEdit /> Edit Profile</h3>
         <div className="form-group"><label className="form-label">Full Name</label><input type="text" className="form-input" defaultValue="Test User" /></div>
         <div className="form-group"><label className="form-label">Phone</label><input type="tel" className="form-input" defaultValue="+91 9876543210" /></div>
         <button className="btn btn-primary mt-2">Save Profile</button>
      </div>
      
      <div className="glass-card" style={{ width: '100%' }}>
         <h3 className="text-xl mb-2 flex items-center gap-2"><FaCog /> Preferences</h3>
         <div className="flex justify-between items-center mb-2">
            <span>Push Notifications</span>
            <input type="checkbox" defaultChecked style={{ scale: '1.5' }} />
         </div>
         <div className="flex justify-between items-center">
            <span>SMS Alerts</span>
            <input type="checkbox" defaultChecked style={{ scale: '1.5' }} />
         </div>
      </div>
      </div>
   </div>
);

const Dashboard = () => {
  const { t } = useTranslation();
  // In a real app, role is derived from AuthContext/Redux
  const [role, setRole] = useState('farmer'); 
  const [activeTab, setActiveTab] = useState('overview'); // overview | requests | profile

  return (
    <div className="flex-col-md sidebar-container" style={{ display: 'flex', height: 'calc(100vh - 66px)', width: '100%', overflow: 'hidden' }}>
      
      {/* Sidebar Navigation */}
      <div className="sidebar-left" style={{ width: '250px', backgroundColor: 'var(--surface-color)', borderRight: '1px solid var(--border-color)', padding: '20px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 20px', marginBottom: '20px' }}>
           <p className="text-sm text-muted mb-1">Logged in as:</p>
           <select 
             className="form-input text-sm p-1" 
             value={role} 
             onChange={(e) => { setRole(e.target.value); setActiveTab('overview'); }}
             style={{ cursor: 'pointer', background: 'var(--bg-color)', fontWeight: 700 }}
           >
             <option value="farmer">Farmer (Rent)</option>
             <option value="owner">Equipment Owner</option>
             <option value="admin">State Head (Admin)</option>
           </select>
        </div>

        <button onClick={() => setActiveTab('overview')} className={`btn ${activeTab === 'overview' ? 'text-gradient font-bold' : 'text-muted'}`} style={{ textAlign: 'left', padding: '15px 20px', borderRadius: 0, justifyContent: 'flex-start', background: activeTab === 'overview' ? 'var(--bg-color)' : 'transparent' }}>
           <FaChartLine /> Overview
        </button>
        {role === 'owner' && (
          <button onClick={() => setActiveTab('requests')} className={`btn ${activeTab === 'requests' ? 'text-gradient font-bold' : 'text-muted'}`} style={{ textAlign: 'left', padding: '15px 20px', borderRadius: 0, justifyContent: 'flex-start', background: activeTab === 'requests' ? 'var(--bg-color)' : 'transparent' }}>
             <FaClipboardList /> Booking Requests <span className="badge badge-warning ml-1" style={{ fontSize: '10px' }}>3</span>
          </button>
        )}
        {role === 'admin' && (
          <button onClick={() => setActiveTab('analytics')} className={`btn ${activeTab === 'analytics' ? 'text-gradient font-bold' : 'text-muted'}`} style={{ textAlign: 'left', padding: '15px 20px', borderRadius: 0, justifyContent: 'flex-start', background: activeTab === 'analytics' ? 'var(--bg-color)' : 'transparent' }}>
             <FaMap /> Regional Reports
          </button>
        )}
        <button onClick={() => setActiveTab('profile')} className={`btn ${activeTab === 'profile' ? 'text-gradient font-bold' : 'text-muted'}`} style={{ textAlign: 'left', padding: '15px 20px', borderRadius: 0, justifyContent: 'flex-start', background: activeTab === 'profile' ? 'var(--bg-color)' : 'transparent' }}>
           <FaUserEdit /> Profile & Settings
        </button>
      </div>

      {/* Main Content Area - Full Screen Adjusted */}
      <div style={{ flex: 1, backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
         {activeTab === 'overview' && role === 'farmer' && <FarmerDashboard />}
         {activeTab === 'overview' && role === 'owner' && <OwnerDashboard />}
         {activeTab === 'overview' && role === 'admin' && <AdminDashboard />}
         {activeTab === 'analytics' && role === 'admin' && <AdminDashboard />}
         {activeTab === 'profile' && <UserSettings />}
         {activeTab === 'requests' && role === 'owner' && (
            <div style={{ padding: '20px' }}>
              <h2 className="text-2xl text-gradient mb-3">Incoming Rent Requests</h2>
              <p className="text-muted">Review and accept tracking requests here.</p>
              {/* Request Table would go here */}
            </div>
         )}
      </div>

    </div>
  );
};

export default Dashboard;
