import React, { useState } from 'react';
import { FaFilter, FaTractor, FaMapMarkerAlt, FaStar, FaCheckCircle, FaTimesCircle, FaTag, FaSearch } from 'react-icons/fa';

const MOCK_EQUIPMENT = [
  { id: 1, name: 'Mahindra 575 DI Tractor', type: 'Tractor', price: 500, distance: 2.1, status: 'available', owner: 'Suresh Kumar', rating: 4.8, reviews: 34, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=260&fit=crop', tag: 'Top Rated' },
  { id: 2, name: 'John Deere 5310 Harvester', type: 'Harvester', price: 1200, distance: 3.4, status: 'booked', owner: 'Ramesh Singh Agro', rating: 4.6, reviews: 21, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=260&fit=crop', tag: 'Eco-Friendly \uD83C\uDF3F' },
  { id: 3, name: 'Heavy Duty Rotavator', type: 'Attachment', price: 200, distance: 1.8, status: 'available', owner: 'Agri Rentals Ltd', rating: 4.9, reviews: 57, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=260&fit=crop', tag: 'Anti-Gravity Supported \uD83D\uDE80' },
  { id: 4, name: 'Zero-till Seed Drill', type: 'Attachment', price: 300, distance: 5.2, status: 'available', owner: 'GreenField Machines', rating: 4.5, reviews: 18, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=260&fit=crop', tag: 'Eco-Friendly \uD83C\uDF3F' },
  { id: 5, name: 'TATA Hitachi Excavator', type: 'Excavator', price: 2000, distance: 7.1, status: 'available', owner: 'Singh Heavy Equip.', rating: 4.7, reviews: 12, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=260&fit=crop', tag: 'Anti-Gravity Supported \uD83D\uDE80' },
  { id: 6, name: 'Laser Land Leveler', type: 'Attachment', price: 400, distance: 4.3, status: 'booked', owner: 'Precision Agri', rating: 4.4, reviews: 8, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=260&fit=crop', tag: 'Energy Efficient' },
];

const TYPES = ['All', 'Tractor', 'Harvester', 'Attachment', 'Excavator'];

const StarRating = ({ rating }) => (
  <span style={{ color: '#f1c40f', fontSize: '12px' }}>
    {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))} <span style={{ color: 'var(--text-muted)' }}>{rating}</span>
  </span>
);

const EquipmentCard = ({ eq }) => (
  <div className="glass-card" style={{ padding: 0, overflow: 'hidden', transition: 'transform 0.2s', cursor: 'pointer' }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>

    {/* Image */}
    <div style={{ position: 'relative' }}>
      <img src={eq.image} alt={eq.name} style={{ width: '100%', height: '185px', objectFit: 'cover', display: 'block' }} />

      {/* Status Badge */}
      <span style={{
        position: 'absolute', top: '10px', left: '10px',
        padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
        background: eq.status === 'available' ? 'rgba(46,204,113,0.9)' : 'rgba(231,76,60,0.9)',
        color: 'white',
      }}>
        {eq.status === 'available' ? '✅ Available' : '🔴 Booked'}
      </span>

      {/* Tag Badge */}
      {eq.tag && (
        <span style={{
          position: 'absolute', top: '10px', right: '10px',
          padding: '3px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 700,
          background: eq.tag.includes('Eco-Friendly') ? 'rgba(46,204,113,0.9)' : eq.tag.includes('Energy') ? 'rgba(46,204,113,0.9)' : eq.tag.includes('Anti-Gravity') ? 'rgba(52,152,219,0.9)' : 'rgba(241,196,15,0.9)',
          color: 'white',
        }}>
          {eq.tag}
        </span>
      )}
    </div>

    {/* Card Body */}
    <div style={{ padding: '14px' }}>
      <div className="flex justify-between items-start mb-1">
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', flex: 1 }}>{eq.name}</h3>
      </div>

      <div className="flex justify-between items-center mb-2">
        <StarRating rating={eq.rating} />
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{eq.reviews} reviews</span>
      </div>

      <div className="flex justify-between items-center mb-3" style={{ fontSize: '13px' }}>
        <span style={{ color: 'var(--text-muted)' }}><FaMapMarkerAlt style={{ color: 'var(--primary-blue)' }} /> {eq.distance} km away</span>
        <span style={{ color: 'var(--text-muted)' }}><FaTractor /> {eq.owner}</span>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <span className="text-gradient" style={{ fontSize: '20px', fontWeight: 700 }}>₹{eq.price}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>/hr</span>
        </div>
        {eq.status === 'available' ? (
          <button className="btn btn-primary" style={{ padding: '7px 16px', fontSize: '13px' }}>Book Now</button>
        ) : (
          <button className="btn btn-secondary" style={{ padding: '7px 16px', fontSize: '13px' }} disabled>Unavailable</button>
        )}
      </div>
    </div>
  </div>
);

const Browse = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [maxPrice, setMaxPrice] = useState(2500);
  const [maxDist, setMaxDist] = useState(10);
  const [showFilters, setShowFilters] = useState(true);

  const filtered = MOCK_EQUIPMENT.filter(eq => {
    if (search && !eq.name.toLowerCase().includes(search.toLowerCase()) && !eq.owner.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'All' && eq.type !== typeFilter) return false;
    if (statusFilter !== 'all' && eq.status !== statusFilter) return false;
    if (eq.price > maxPrice) return false;
    if (eq.distance > maxDist) return false;
    return true;
  });

  return (
    <div style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* Page Header — full width */}
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 className="text-2xl text-gradient" style={{ marginBottom: '4px' }}>Browse Equipment 🚜</h1>
            <p className="text-muted text-sm">Find tractors, harvesters, and implements — rented by trusted local owners near you</p>
          </div>
          {/* Search Bar inline in header */}
          <div style={{ display: 'flex', gap: '8px', flex: '1', maxWidth: '500px', minWidth: '260px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <FaSearch style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)', fontSize: '14px' }} />
              <input type="text" className="form-input" placeholder="Search equipment, owner..." style={{ paddingLeft: '36px', padding: '10px 10px 10px 36px' }}
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)} style={{ padding: '10px 14px', gap: '6px', whiteSpace: 'nowrap' }}>
              <FaFilter style={{ fontSize: '13px' }} /> {showFilters ? 'Hide' : 'Filters'}
            </button>
          </div>
        </div>
      </div>

      {/* Body — fills all remaining height */}
      <div className="flex-col-md sidebar-container" style={{ display: 'flex', flex: 1, minHeight: 0 }}>

        {/* Filter Sidebar */}
        {showFilters && (
          <div className="sidebar-left" style={{
            width: '220px', flexShrink: 0,
            borderRight: '1px solid var(--border-color)',
            backgroundColor: 'var(--surface-color)',
            overflowY: 'auto', padding: '16px',
          }}>
            <h3 style={{ fontWeight: 700, fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)' }}>
              <FaFilter /> Filters
            </h3>

            {/* Type */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Type</p>
              {TYPES.map(t => (
                <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', marginBottom: '6px', color: typeFilter === t ? 'var(--primary-green)' : 'var(--text-main)' }}>
                  <input type="radio" name="type" checked={typeFilter === t} onChange={() => setTypeFilter(t)} style={{ accentColor: 'var(--primary-green)' }} />
                  {t}
                </label>
              ))}
            </div>

            {/* Availability */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Availability</p>
              {[['all', 'All'], ['available', '✅ Available'], ['booked', '🔴 Booked']].map(([val, label]) => (
                <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', marginBottom: '6px', color: statusFilter === val ? 'var(--primary-green)' : 'var(--text-main)' }}>
                  <input type="radio" name="status" checked={statusFilter === val} onChange={() => setStatusFilter(val)} style={{ accentColor: 'var(--primary-green)' }} />
                  {label}
                </label>
              ))}
            </div>

            {/* Price */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Max Price: <span className="text-gradient">₹{maxPrice}/hr</span>
              </p>
              <input type="range" min="100" max="2500" step="100" value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-green)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                <span>₹100</span><span>₹2500</span>
              </div>
            </div>

            {/* Distance */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Max Distance: <span className="text-gradient">{maxDist} km</span>
              </p>
              <input type="range" min="1" max="10" step="0.5" value={maxDist}
                onChange={e => setMaxDist(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-blue)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                <span>1 km</span><span>10 km</span>
              </div>
            </div>

            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '13px', padding: '8px' }}
              onClick={() => { setTypeFilter('All'); setStatusFilter('all'); setMaxPrice(2500); setMaxDist(10); setSearch(''); }}>
              Reset Filters
            </button>
          </div>
        )}

        {/* Equipment Grid — fills remaining width */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text-main)' }}>{filtered.length}</strong> equipment found near you
            </p>
            <select className="form-input" style={{ width: 'auto', padding: '6px 10px', fontSize: '13px' }}>
              <option>Sort: Nearest First</option>
              <option>Sort: Price Low to High</option>
              <option>Sort: Price High to Low</option>
              <option>Sort: Top Rated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
              <FaTractor style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.2 }} />
              <h3>No equipment matches your filters</h3>
              <p className="text-sm" style={{ marginTop: '6px' }}>Try adjusting the distance or price range</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
              {filtered.map(eq => <EquipmentCard key={eq.id} eq={eq} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
