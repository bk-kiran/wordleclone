import React from 'react';

export default function Row({ guess, currentGuess = "", length = 5 }) {
  const letters = currentGuess || "";
  
  return (
    <div className="row">
      {Array.from({ length }, (_, i) => {
        const letter = letters[i] || "";
        const tile = guess?.[i];
        
        let backgroundColor = 'white';
        let borderColor = '#bbb';
        let color = 'black';
        
        if (tile) {
          if (tile.color === 'green') {
            backgroundColor = '#6aaa64';
            color = 'white';
          } else if (tile.color === 'yellow') {
            backgroundColor = '#c9b458';
            color = 'white';
          } else {
            backgroundColor = '#787c7e';
            color = 'white';
          }
        } else if (letter) {
          borderColor = '#878a8c';
        }
        
        return (
          <div 
            key={i}
            className="cell"
            style={{
              backgroundColor,
              borderColor,
              color
            }}
          >
            {tile ? tile.key : letter}
          </div>
        );
      })}
    </div>
  );
}