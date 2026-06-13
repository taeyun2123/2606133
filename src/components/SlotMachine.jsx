import React, { useState, useEffect } from 'react';

export default function SlotMachine({ students, isSpinning, onStop, forcedWinner }) {
  const [currentName, setCurrentName] = useState('?');
  const [speed, setSpeed] = useState(50);

  useEffect(() => {
    let interval;
    if (isSpinning && students.length > 0) {
      interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * students.length);
        setCurrentName(students[randomIndex]);
      }, speed);
      
      // Gradually slow down
      const slowDownTimeout1 = setTimeout(() => setSpeed(100), 1000);
      const slowDownTimeout2 = setTimeout(() => setSpeed(250), 2000);
      
      const stopTimeout = setTimeout(() => {
        clearInterval(interval);
        const finalWinner = forcedWinner || students[Math.floor(Math.random() * students.length)];
        setCurrentName(finalWinner);
        onStop(finalWinner);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(slowDownTimeout1);
        clearTimeout(slowDownTimeout2);
        clearTimeout(stopTimeout);
        setSpeed(50);
      };
    } else if (!isSpinning) {
      setCurrentName('?');
    }
  }, [isSpinning, students, forcedWinner]);

  return (
    <div style={{
      width: '100%',
      height: '150px',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 100%)',
      border: '2px solid var(--accent-color)',
      borderRadius: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 0 20px rgba(139, 92, 246, 0.4)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: '30px',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)',
        zIndex: 1
      }} />
      
      <div style={{
        fontSize: '3rem',
        fontWeight: 800,
        color: isSpinning ? 'rgba(255,255,255,0.8)' : '#fbbf24',
        textShadow: isSpinning ? 'none' : '0 0 20px rgba(251, 191, 36, 0.8)',
        transition: 'color 0.3s ease, text-shadow 0.3s ease',
        zIndex: 2,
        animation: isSpinning ? 'float 0.1s infinite alternate' : 'none'
      }}>
        {currentName}
      </div>

      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0, height: '30px',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 100%)',
        zIndex: 1
      }} />
    </div>
  );
}
