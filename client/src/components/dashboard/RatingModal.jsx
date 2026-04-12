import React, { useState } from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';

const RatingModal = ({ isOpen, onClose, targetName, targetRole }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating === 0) { alert('Please select a star rating!'); return; }
    // In production: POST /api/ratings with { targetId, rating, comment }
    setSubmitted(true);
    setTimeout(() => { onClose(); setSubmitted(false); setRating(0); setComment(''); }, 2000);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px', margin: '16px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <FaTimes size={18} />
        </button>

        {!submitted ? (
          <>
            <h3 className="text-xl mb-1">Rate Your Experience ⭐</h3>
            <p className="text-muted text-sm mb-4">How was your experience with <strong>{targetName}</strong>?</p>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  size={36}
                  style={{ cursor: 'pointer', color: star <= (hover || rating) ? '#f1c40f' : 'var(--border-color)', transition: 'color 0.15s' }}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <div className="form-group">
              <label className="form-label">Comments (Optional)</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder={`How was the ${targetRole === 'owner' ? 'equipment and service' : "farmer's behavior"}?`}
                value={comment}
                onChange={e => setComment(e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div className="flex gap-2 mt-2">
              <button className="btn btn-secondary flex-1 justify-center" onClick={onClose}>Cancel</button>
              <button className="btn btn-primary flex-1 justify-center" onClick={handleSubmit}>Submit Rating</button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>⭐</div>
            <h3 className="text-xl mb-2">Thank You!</h3>
            <p className="text-muted text-sm">Your rating helps build trust in the community.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingModal;
