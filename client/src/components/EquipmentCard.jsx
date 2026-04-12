import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';

const EquipmentCard = ({ equipment }) => {
  return (
    <div className="glass-card card-hover">
      <img
        src={equipment.image || 'https://via.placeholder.com/300x200?text=AgroLink+Equipment'}
        alt={equipment.name}
        className="img-fluid mb-2"
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <div className="flex justify-between items-center mb-1">
        <span className="badge badge-success">{equipment.type}</span>
        {equipment.distance && (
          <span className="text-sm text-muted flex items-center gap-1">
            <FaMapMarkerAlt /> {equipment.distance} km away
          </span>
        )}
      </div>
      <h3 className="text-xl mb-1">{equipment.name}</h3>
      <div className="flex justify-between items-center mt-2">
        <div className="text-gradient font-bold flex items-center">
          <FaRupeeSign /> {equipment.ratePerHour}/hr
        </div>
        <Link to={`/equipment/${equipment._id}`} className="btn btn-secondary text-sm">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EquipmentCard;
