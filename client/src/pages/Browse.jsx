import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaTractor, FaMapMarkerAlt, FaStar, FaSearch, FaTimes, FaSort } from 'react-icons/fa';

const MOCK_EQUIPMENT = [
  { id: 1, name: 'Mahindra 575 DI Tractor',    type: 'Tractor',    price: 500,  distance: 2.1, status: 'available', owner: 'Suresh Kumar',      rating: 4.8, reviews: 34, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=260&fit=crop', tag: 'Top Rated' },
  { id: 2, name: 'John Deere 5310 Harvester',   type: 'Harvester',  price: 1200, distance: 3.4, status: 'booked',   owner: 'Ramesh Singh Agro', rating: 4.6, reviews: 21, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=260&fit=crop', tag: 'Eco-Friendly 🌿' },
  { id: 3, name: 'Heavy Duty Rotavator',         type: 'Attachment', price: 200,  distance: 1.8, status: 'available', owner: 'Agri Rentals Ltd',  rating: 4.9, reviews: 57, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=260&fit=crop', tag: 'Best Value' },
  { id: 4, name: 'Zero-till Seed Drill',         type: 'Attachment', price: 300,  distance: 5.2, status: 'available', owner: 'GreenField Machines', rating: 4.5, reviews: 18, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=260&fit=crop', tag: 'Eco-Friendly 🌿' },
  { id: 5, name: 'TATA Hitachi Excavator',       type: 'Excavator',  price: 2000, distance: 7.1, status: 'available', owner: 'Singh Heavy Equip.', rating: 4.7, reviews: 12, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=260&fit=crop', tag: 'Top Rated' },
  { id: 6, name: 'Laser Land Leveler',           type: 'Attachment', price: 400,  distance: 4.3, status: 'booked',   owner: 'Precision Agri',    rating: 4.4, reviews: 8,  image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=260&fit=crop', tag: 'Precision' },
];

const TYPES = ['All', 'Tractor', 'Harvester', 'Attachment', 'Excavator'];

const EqCard = ({ eq }) => (
  <div className="browse-eq-card glass-card">
    <div className="browse-eq-img-wrap">
      <img src={eq.image} alt={eq.name} className="browse-eq-img" />
      <div className="browse-eq-overlay" />
      <span className={`browse-eq-status ${eq.status === 'available' ? 'browse-eq-avail' : 'browse-eq-booked'}`}>
        {eq.status === 'available' ? '✅ Available' : '🔴 Booked'}
      </span>
      {eq.tag && <span className="browse-eq-tag">{eq.tag}</span>}
    </div>

    <div className="browse-eq-body">
      <div className="browse-eq-type">{eq.type}</div>
      <h3 className="browse-eq-name">{eq.name}</h3>

      <div className="browse-eq-row">
        <span className="browse-eq-meta"><FaStar style={{ color: '#f1c40f' }} /> {eq.rating} ({eq.reviews})</span>
        <span className="browse-eq-meta"><FaMapMarkerAlt style={{ color: '#3498db' }} /> {eq.distance} km</span>
      </div>
      <div className="browse-eq-owner"><FaTractor style={{ color: '#2ecc71', fontSize: '11px' }} /> {eq.owner}</div>

      <div className="browse-eq-footer">
        <div>
          <span className="browse-eq-price text-gradient">₹{eq.price}</span>
          <span className="browse-eq-unit">/hr</span>
        </div>
        {eq.status === 'available'
          ? <button className="browse-book-btn">Book Now</button>
          : <button className="browse-book-btn browse-book-disabled" disabled>Booked</button>
        }
      </div>
    </div>
  </div>
);

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch]             = useState(searchParams.get('q') || '');
  const [typeFilter, setTypeFilter]     = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [maxPrice, setMaxPrice]         = useState(2500);
  const [maxDist, setMaxDist]           = useState(10);
  const [sidebarOpen, setSidebarOpen]   = useState(true);

  const filtered = MOCK_EQUIPMENT.filter(eq => {
    if (search && !eq.name.toLowerCase().includes(search.toLowerCase()) && !eq.owner.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'All' && eq.type !== typeFilter) return false;
    if (statusFilter !== 'all' && eq.status !== statusFilter) return false;
    if (eq.price > maxPrice) return false;
    if (eq.distance > maxDist) return false;
    return true;
  });

  const resetFilters = () => { setTypeFilter('All'); setStatusFilter('all'); setMaxPrice(2500); setMaxDist(10); setSearch(''); };

  return (
    <div className="browse-page">

      {/* ── HEADER ── */}
      <div className="browse-header">
        <div className="browse-header-inner">
          <div>
            <h1 className="browse-title">Browse Equipment <span className="browse-title-emoji">🚜</span></h1>
            <p className="browse-sub">Trusted machinery from verified local owners near you</p>
          </div>
          <div className="browse-search-wrap">
            <FaSearch className="browse-search-icon" />
            <input
              type="text" className="browse-search-input"
              placeholder="Search equipment, owner..."
              value={search} onChange={e => setSearch(e.target.value)}
            />
            {search && <button className="browse-search-clear" onClick={() => setSearch('')}><FaTimes /></button>}
            <button className={`browse-filter-btn ${sidebarOpen ? 'browse-filter-active' : ''}`} onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FaFilter /> {sidebarOpen ? 'Hide Filters' : 'Filters'}
            </button>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="browse-body">

        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="browse-sidebar">
            <div className="browse-sidebar-head">
              <span><FaFilter /> Filters</span>
              <button className="browse-reset-btn" onClick={resetFilters}>Reset</button>
            </div>

            {/* Type */}
            <div className="browse-filter-group">
              <p className="browse-filter-label">Equipment Type</p>
              {TYPES.map(t => (
                <label key={t} className={`browse-radio-item ${typeFilter === t ? 'browse-radio-active' : ''}`}>
                  <input type="radio" name="type" checked={typeFilter === t} onChange={() => setTypeFilter(t)} style={{ accentColor: 'var(--primary-green)' }} />
                  {t}
                </label>
              ))}
            </div>

            {/* Availability */}
            <div className="browse-filter-group">
              <p className="browse-filter-label">Availability</p>
              {[['all', 'All Equipment'], ['available', '✅ Available Now'], ['booked', '🔴 Booked']].map(([val, label]) => (
                <label key={val} className={`browse-radio-item ${statusFilter === val ? 'browse-radio-active' : ''}`}>
                  <input type="radio" name="status" checked={statusFilter === val} onChange={() => setStatusFilter(val)} style={{ accentColor: 'var(--primary-green)' }} />
                  {label}
                </label>
              ))}
            </div>

            {/* Price */}
            <div className="browse-filter-group">
              <p className="browse-filter-label">Max Price: <span className="text-gradient">₹{maxPrice}/hr</span></p>
              <input type="range" min="100" max="2500" step="100" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="browse-range" />
              <div className="browse-range-labels"><span>₹100</span><span>₹2500</span></div>
            </div>

            {/* Distance */}
            <div className="browse-filter-group">
              <p className="browse-filter-label">Max Distance: <span className="text-gradient">{maxDist} km</span></p>
              <input type="range" min="1" max="10" step="0.5" value={maxDist} onChange={e => setMaxDist(Number(e.target.value))} className="browse-range browse-range-blue" />
              <div className="browse-range-labels"><span>1 km</span><span>10 km</span></div>
            </div>
          </aside>
        )}

        {/* Grid */}
        <div className="browse-grid-wrap">
          <div className="browse-grid-bar">
            <p className="browse-count"><strong>{filtered.length}</strong> equipment found near you</p>
            <select className="browse-sort form-input">
              <option>Nearest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="browse-empty">
              <div className="browse-empty-icon">🚜</div>
              <h3 className="browse-empty-title">No equipment found</h3>
              <p className="browse-empty-sub">Try adjusting filters or expanding your search radius.</p>
              <button className="home-cta-secondary" onClick={resetFilters}>Reset Filters</button>
            </div>
          ) : (
            <div className="browse-grid">
              {filtered.map(eq => <EqCard key={eq.id} eq={eq} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
