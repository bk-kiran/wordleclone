import React from 'react';

export default function StatsModal({ isOpen, onClose, stats }) {
  if (!isOpen) return null;

  const maxCount = Math.max(...stats.guessDistribution, 1);

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
          padding: '30px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '1.5em' }}>Statistics</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '2em',
              cursor: 'pointer',
              padding: '0',
              lineHeight: '1'
            }}
          >
            &times;
          </button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.gamesPlayed}</div>
            <div style={{ fontSize: '0.8em', color: '#666' }}>Played</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.winPercentage}</div>
            <div style={{ fontSize: '0.8em', color: '#666' }}>Win %</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.currentStreak}</div>
            <div style={{ fontSize: '0.8em', color: '#666' }}>Current Streak</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.maxStreak}</div>
            <div style={{ fontSize: '0.8em', color: '#666' }}>Max Streak</div>
          </div>
        </div>

        <h3 style={{ marginBottom: '15px', fontSize: '1.1em' }}>Guess Distribution</h3>
        <div>
          {stats.guessDistribution.map((count, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '20px', fontSize: '0.9em' }}>{i + 1}</div>
              <div style={{ flex: 1, backgroundColor: '#e0e0e0', height: '24px', position: 'relative' }}>
                <div 
                  style={{
                    backgroundColor: '#6aaa64',
                    height: '100%',
                    width: `${count > 0 ? Math.max((count / maxCount) * 100, 10) : 0}%`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '8px',
                    color: 'white',
                    fontSize: '0.85em',
                    fontWeight: 'bold'
                  }}
                >
                  {count > 0 && count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}