import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaSearch, FaFilter, FaTractor, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import L from 'leaflet';

// Fix for default Leaflet icon missing issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock Data mimicking backend $near query
const mockNearbyEquipment = [
  { _id: '1', name: 'Mahindra 575 DI Tractor', type: 'Tractor', ratePerHour: 500, status: 'available', coords: [19.1467, 77.3462], owner: 'Suresh Kumar' },
  { _id: '2', name: 'John Deere Harvester', type: 'Harvester', ratePerHour: 1200, status: 'booked', coords: [19.1500, 77.3500], owner: 'Ramesh Singh' },
  { _id: '3', name: 'Rotavator Heavy Duty', type: 'Attachment', ratePerHour: 200, status: 'available', coords: [19.1400, 77.3400], owner: 'Agri Rentals Ltd' }
];

const MapSearch = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Center on Nanded for demo purposes
  const position = [19.1467, 77.3462];

  const filteredEq = mockNearbyEquipment.filter(eq => 
    activeFilter === 'all' || eq.status === activeFilter
  );

  return (
    <div style={{ position: 'relative', height: 'calc(100vh - 72px)', width: '100%' }}>
      {/* Search & Filter Overlay - Uber Style */}
      <div style={{ 
        position: 'absolute', top: '20px', left: '0', zIndex: 1000, padding: '0 20px',
        width: '100%', maxWidth: '390px', display: 'flex', flexDirection: 'column', gap: '15px' 
      }}>
        
        {/* Main Search Bar */}
        <div className="glass-card" style={{ padding: '15px', backgroundColor: 'var(--surface-color)', backdropFilter: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h2 className="text-xl mb-2" style={{ color: 'var(--text-main)' }}>Find Nearby Equipment</h2>
          <div className="flex gap-2 mb-2">
            <div className="form-group flex-1" style={{ marginBottom: 0 }}>
              <input type="text" className="form-input" style={{ backgroundColor: 'var(--bg-color)' }} placeholder="e.g., Tractor, Harvester..." />
            </div>
            <button className="btn btn-primary" style={{ padding: '10px' }}><FaSearch /></button>
          </div>
          
          <div className="flex gap-1 mt-2">
             <button 
                onClick={() => setActiveFilter('all')} 
                className={`badge ${activeFilter === 'all' ? 'badge-warning' : ''}`} 
                style={{ cursor: 'pointer', border: '1px solid var(--border-color)', backgroundColor: activeFilter === 'all' ? 'var(--dark-surface)' : 'transparent', color: activeFilter === 'all' ? 'white' : 'var(--text-main)' }}>
                All Shows
             </button>
             <button 
                onClick={() => setActiveFilter('available')} 
                className={`badge ${activeFilter === 'available' ? 'badge-success' : ''}`} 
                style={{ cursor: 'pointer', border: '1px solid var(--border-color)', backgroundColor: activeFilter === 'available' ? 'var(--success)' : 'transparent', color: activeFilter === 'available' ? 'white' : 'var(--text-main)' }}>
                Available
             </button>
          </div>
        </div>

        {/* Results List Overlay */}
        <div className="glass-card" style={{ padding: '15px', backgroundColor: 'var(--surface-color)', maxHeight: '350px', overflowY: 'auto', backdropFilter: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <p className="text-sm text-muted mb-2 font-bold">{filteredEq.length} machines near you</p>
          
          {filteredEq.map(eq => (
            <div key={eq._id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '10px' }}>
               <div className="flex justify-between items-center mb-1">
                 <h4 className="font-bold" style={{ color: 'var(--text-main)' }}>{eq.name}</h4>
                 <span className="text-gradient font-bold">₹{eq.ratePerHour}/hr</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-muted"><FaTractor /> {eq.owner}</span>
                 {eq.status === 'available' ? (
                   <span className="text-success flex items-center gap-1" style={{ color: 'green' }}><FaCheckCircle /> Available</span>
                 ) : (
                   <span className="text-danger flex items-center gap-1" style={{ color: 'red' }}><FaTimesCircle /> Booked</span>
                 )}
               </div>
               {eq.status === 'available' && (
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px', padding: '8px' }}>Book Now</button>
               )}
            </div>
          ))}
        </div>
      </div>

      {/* The Map */}
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%', zIndex: 1 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredEq.map(eq => (
           <Marker key={eq._id} position={eq.coords}>
             <Popup>
               <h3 className="font-bold">{eq.name}</h3>
               <p className="text-sm">Price: ₹{eq.ratePerHour}/hr</p>
               <p className="text-sm">Status: {eq.status.toUpperCase()}</p>
             </Popup>
           </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapSearch;
