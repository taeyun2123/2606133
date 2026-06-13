import React, { useState } from 'react';

export default function StudentList({ students, setStudents }) {
  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    if (!inputText.trim()) return;
    
    // Split by comma or newline
    const newNames = inputText
      .split(/,|\n/)
      .map(name => name.trim())
      .filter(name => name !== '' && !students.includes(name));

    if (newNames.length > 0) {
      setStudents([...students, ...newNames]);
      setInputText('');
    }
  };

  const handleRemove = (nameToRemove) => {
    setStudents(students.filter(name => name !== nameToRemove));
  };

  const handleClear = () => {
    if (window.confirm('모든 명단을 삭제하시겠습니까?')) {
      setStudents([]);
    }
  };

  return (
    <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>명단 관리</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="이름 입력 (쉼표 또는 줄바꿈으로 구분하여 여러 명 일괄 추가 가능)"
          rows={3}
          style={{ resize: 'vertical' }}
        />
        <button className="btn" onClick={handleAdd}>추가하기</button>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>총 {students.length}명</span>
        {students.length > 0 && (
          <button className="btn danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={handleClear}>전체 삭제</button>
        )}
      </div>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '0.5rem', 
        maxHeight: '200px', 
        overflowY: 'auto',
        padding: '0.5rem 0'
      }}>
        {students.map((student, index) => (
          <div 
            key={index} 
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              padding: '0.25rem 0.75rem', 
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              animation: 'fadeIn 0.3s ease'
            }}
          >
            <span>{student}</span>
            <button 
              onClick={() => handleRemove(student)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--danger)',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
