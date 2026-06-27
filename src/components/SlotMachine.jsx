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
      height: '180px',
      backgroundColor: 'var(--canvas)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--rounded-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="display-xl" style={{
        color: 'var(--ink)',
        transition: 'color 0.3s ease',
        zIndex: 2,
        opacity: isSpinning ? 0.5 : 1
      }}>
        {currentName}
      </div>
    </div>
  );
}
