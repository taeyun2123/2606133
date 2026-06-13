import React, { useState, useRef } from 'react';
import StudentList from './components/StudentList';
import Controls from './components/Controls';
import SlotMachine from './components/SlotMachine';
import SecretModal from './components/SecretModal';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [students, setStudents] = useLocalStorage('random_presenter_students', []);
  const [secretOrder, setSecretOrder] = useLocalStorage('random_presenter_secret_order', []);
  
  const [count, setCount] = useState(1);
  const [winners, setWinners] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSpinIndex, setCurrentSpinIndex] = useState(0); // For multiple selections
  
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const logoClickCount = useRef(0);
  const clickTimeout = useRef(null);

  const handleLogoClick = () => {
    logoClickCount.current += 1;
    
    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    
    if (logoClickCount.current >= 5) {
      setIsSecretModalOpen(true);
      logoClickCount.current = 0;
    } else {
      clickTimeout.current = setTimeout(() => {
        logoClickCount.current = 0;
      }, 1000); // Reset click count if not clicked within 1s
    }
  };

  const startPicking = () => {
    if (students.length === 0) return alert('학생 명단을 추가해주세요.');
    if (count > students.length) return alert('뽑을 인원이 전체 학생 수보다 많습니다.');
    
    setWinners([]);
    setCurrentSpinIndex(0);
    setIsSpinning(true);
  };

  const handleStopSpin = (winner) => {
    setWinners(prev => [...prev, winner]);
    
    // If we have a secret order, consume the first item
    if (secretOrder.length > 0) {
      setSecretOrder(prev => prev.slice(1));
    }

    // Wait a little bit before starting the next spin, or finish
    setTimeout(() => {
      if (currentSpinIndex + 1 < count) {
        setCurrentSpinIndex(prev => prev + 1);
        setIsSpinning(true);
      } else {
        setIsSpinning(false);
      }
    }, 1000);
  };

  // Determine available students (excluding already picked ones in the current session)
  const availableForSpin = students.filter(s => !winners.includes(s));
  
  // Determine if we should force a winner for the current spin
  const forcedWinner = secretOrder.length > 0 ? secretOrder[0] : null;

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      
      {/* Header / Logo */}
      <div 
        onClick={handleLogoClick}
        style={{ 
          cursor: 'default', 
          userSelect: 'none', 
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease'
        }}
      >
        <h1 style={{ 
          fontSize: '2.5rem', 
          background: 'linear-gradient(to right, #a855f7, #ec4899)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          랜덤 발표자 추출
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>두근두근, 다음 발표자는 누구일까요?</p>
      </div>

      {/* Main Area */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        
        {/* Slot Machine Display */}
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <SlotMachine 
            students={availableForSpin} 
            isSpinning={isSpinning} 
            onStop={handleStopSpin}
            forcedWinner={forcedWinner}
          />
          
          {/* Winners Display */}
          {winners.length > 0 && (
            <div className="fade-in" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>🎉 당첨자 🎉</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                {winners.map((winner, idx) => (
                  <div key={idx} className="glass-panel fade-in" style={{ 
                    padding: '1rem 2rem', 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold',
                    background: 'rgba(139, 92, 246, 0.2)',
                    borderColor: 'var(--accent-color)',
                    animationDelay: `${idx * 0.1}s`
                  }}>
                    {winner}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Controls & List */}
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          <StudentList students={students} setStudents={setStudents} />
          
          <div style={{ flex: 1, minWidth: '300px', maxWidth: '400px' }}>
            <Controls 
              count={count} 
              setCount={setCount} 
              onStart={startPicking} 
              disabled={isSpinning || students.length === 0}
              maxCount={students.length}
            />
          </div>
        </div>

      </div>

      <SecretModal 
        isOpen={isSecretModalOpen} 
        onClose={() => setIsSecretModalOpen(false)} 
        secretOrder={secretOrder}
        setSecretOrder={setSecretOrder}
        availableStudents={students}
      />
    </div>
  );
}

export default App;
