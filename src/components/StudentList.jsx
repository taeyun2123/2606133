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
    <div className="flat-panel" style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <h2 className="subhead" style={{ fontWeight: 540 }}>명단 관리</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="이름 입력 (쉼표 또는 줄바꿈으로 구분하여 여러 명 일괄 추가 가능)"
          rows={3}
          style={{ resize: 'vertical' }}
        />
        <button className="btn btn-secondary" onClick={handleAdd}>추가하기</button>
      </div>

      <div style={{ marginTop: 'var(--spacing-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="eyebrow" style={{ color: 'var(--ink)' }}>총 {students.length}명</span>
        {students.length > 0 && (
          <button className="btn btn-danger" style={{ padding: '4px 12px', fontSize: '14px' }} onClick={handleClear}>전체 삭제</button>
        )}
      </div>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 'var(--spacing-xs)', 
        maxHeight: '200px', 
        overflowY: 'auto',
        padding: 'var(--spacing-xs) 0'
      }}>
        {students.map((student, index) => (
          <div 
            key={index} 
            className="surface-panel fade-in"
            style={{ 
              padding: '6px 12px', 
              borderRadius: 'var(--rounded-pill)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-xs)',
              fontSize: '16px'
            }}
          >
            <span>{student}</span>
            <button 
              onClick={() => handleRemove(student)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--ink)',
                cursor: 'pointer',
                fontSize: '18px',
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
