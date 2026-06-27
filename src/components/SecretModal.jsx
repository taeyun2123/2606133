import React, { useState } from 'react';

export default function SecretModal({ isOpen, onClose, secretOrder, setSecretOrder, availableStudents }) {
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    const names = inputText.split(/,|\n/).map(n => n.trim()).filter(n => n !== '');
    
    // Validate if names exist in available students (optional, but good for UX)
    const invalidNames = names.filter(name => !availableStudents.includes(name));
    if (invalidNames.length > 0) {
      if (!window.confirm(`다음 이름들은 현재 명단에 없습니다: ${invalidNames.join(', ')}\n그래도 저장하시겠습니까?`)) {
        return;
      }
    }

    setSecretOrder(names);
    onClose();
  };

  const handleClear = () => {
    setSecretOrder([]);
    setInputText('');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'var(--overlay-scrim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="flat-panel fade-in" style={{ width: '90%', maxWidth: '400px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <h2 className="subhead" style={{ marginBottom: 'var(--spacing-md)' }}>비밀 순서 설정 (교사용)</h2>
        <p className="body" style={{ fontSize: '14px', color: 'var(--ink)', marginBottom: 'var(--spacing-md)' }}>
          입력한 순서대로 뽑히게 됩니다. 순서가 모두 소진되면 다시 랜덤으로 뽑힙니다.<br/>
          (쉼표 또는 줄바꿈으로 구분)
        </p>
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="예: 홍길동, 김철수, 이영희"
          rows={4}
          style={{ marginBottom: 'var(--spacing-md)', resize: 'vertical' }}
        />

        {secretOrder.length > 0 && (
          <div className="surface-panel" style={{ marginBottom: 'var(--spacing-md)', fontSize: '14px' }}>
            현재 설정된 순서 ({secretOrder.length}명): <br/>
            <span style={{ fontWeight: 600 }}>{secretOrder.join(' ➔ ')}</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: 'var(--spacing-xs)', justifyContent: 'flex-end' }}>
          <button className="btn btn-danger" onClick={handleClear}>초기화</button>
          <button className="btn btn-secondary" onClick={onClose}>취소</button>
          <button className="btn btn-primary" onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
}
