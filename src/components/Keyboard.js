import React from 'react';

export default function Keyboard({ usedKeys, onKeyClick }) {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ];

  const handleClick = (key) => {
    onKeyClick({ key });
  };

  const getKeyColor = (key) => {
    if (usedKeys[key] === 'green') return '#6aaa64';
    if (usedKeys[key] === 'yellow') return '#c9b458';
    if (usedKeys[key] === 'grey') return '#787c7e';
    return '#d3d6da';
  };

  return (
    <div style={{ marginTop: '30px', maxWidth: '500px', margin: '30px auto' }}>
      {keys.map((row, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '6px' }}>
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              style={{
                padding: '12px',
                minWidth: key === 'ENTER' || key === 'BACKSPACE' ? '65px' : '43px',
                height: '58px',
                backgroundColor: getKeyColor(key),
                color: usedKeys[key] ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                fontSize: key === 'ENTER' || key === 'BACKSPACE' ? '12px' : '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              {key === 'BACKSPACE' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}