import React from 'react';

export default function MessageModal({ message, onClose }) {
  if (!message) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '40px 60px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '20px' }}>
          {message}
        </div>
        <button 
          onClick={onClose}
          style={{
            padding: '12px 30px',
            backgroundColor: '#6aaa64',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1em'
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}