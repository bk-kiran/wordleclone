import React from 'react';
import Row from './Row';

export default function Grid({ currentGuess = "", guesses = [], turn = 0, length = 5 }) {
  return (
    <div className="grid">
      {Array.from({ length: 6 }, (_, i) => {
        if (i < turn) {
          return <Row key={i} guess={guesses[i]} length={length} />;
        }
        if (i === turn) {
          return <Row key={i} currentGuess={currentGuess} length={length} />;
        }
        return <Row key={i} length={length} />;
      })}
    </div>
  );
}