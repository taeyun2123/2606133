import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import privacyPolicyMd from '../../개인정보처리방침.md?raw';
import termsOfServiceMd from '../../이용약관.md?raw';

export default function LegalModal({ isOpen, onClose, type }) {
  const [content, setContent] = useState('');
  
  useEffect(() => {
    if (type === 'privacy') {
      setContent(privacyPolicyMd);
    } else if (type === 'terms') {
      setContent(termsOfServiceMd);
    }
  }, [type]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fade-in" onClick={onClose} style={{ zIndex: 1000 }}>
      <div className="modal-content legal-modal-content fade-in" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)', paddingBottom: 'var(--spacing-sm)', borderBottom: '1px solid var(--hairline)' }}>
          <h2 className="subhead">{type === 'privacy' ? '개인정보처리방침' : '이용약관'}</h2>
          <button className="btn" onClick={onClose} style={{ fontSize: '24px', padding: '0 8px' }}>&times;</button>
        </div>
        
        <div className="legal-markdown-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
