import React from 'react';

export default function Controls({ count, setCount, onStart, disabled, maxCount }) {
  return (
    <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label htmlFor="count" style={{ fontWeight: 600 }}>뽑을 인원 (명)</label>
        <input 
          id="count"
          type="number" 
          min="1" 
          max={maxCount || 1}
          value={count} 
          onChange={(e) => setCount(Math.min(Math.max(1, parseInt(e.target.value) || 1), maxCount))}
          style={{ width: '80px', textAlign: 'center' }}
          disabled={disabled}
        />
      </div>
      <button 
        className="btn" 
        onClick={onStart} 
        disabled={disabled || maxCount === 0}
        style={{ opacity: disabled || maxCount === 0 ? 0.5 : 1, padding: '1rem', fontSize: '1.2rem' }}
      >
        발표자 뽑기 시작!
      </button>
    </div>
  );
}
