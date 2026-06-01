import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaRupeeSign, FaStar, FaTractor } from 'react-icons/fa';

const EquipmentCard = ({ equipment }) => {
  const eq = equipment;
  return (
    <div className="eq-card glass-card card-hover">
      {/* Image */}
      <div className="eq-card-img-wrap">
        <img
          src={eq.image || 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c11?w=400&h=260&fit=crop'}
          alt={eq.name}
          className="eq-card-img"
        />
        <div className="eq-card-overlay" />
        <span className={`eq-status-badge ${eq.status === 'booked' ? 'eq-status-booked' : 'eq-status-avail'}`}>
          {eq.status === 'booked' ? '🔴 Booked' : '✅ Available'}
        </span>
        <span className="eq-type-chip">{eq.type || 'Equipment'}</span>
      </div>

      {/* Body */}
      <div className="eq-card-body">
        <h3 className="eq-card-title">{eq.name}</h3>

        <div className="eq-card-meta">
          {eq.distance && (
            <span className="eq-meta-item">
              <FaMapMarkerAlt style={{ color: '#3498db' }} /> {eq.distance} km
            </span>
          )}
          {eq.rating && (
            <span className="eq-meta-item">
              <FaStar style={{ color: '#f1c40f' }} /> {eq.rating}
            </span>
          )}
          {eq.owner && (
            <span className="eq-meta-item">
              <FaTractor style={{ color: '#2ecc71' }} /> {eq.owner}
            </span>
          )}
        </div>

        <div className="eq-card-footer">
          <div className="eq-price">
            <span className="eq-price-val text-gradient">₹{eq.ratePerHour || eq.price}</span>
            <span className="eq-price-unit">/hr</span>
          </div>
          <Link to={`/browse`} className="eq-book-btn">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;
