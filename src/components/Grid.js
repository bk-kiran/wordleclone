import React from 'react'
import Row from './Row'

export default function Grid({ currentGuess = "", guesses = [], turn = 0, length = 5 }) {
  return (
    <div className="grid">
      {Array.from({ length: 6 }, (_, i) => {
        if (i < turn) {
          // show past guess in that row
          return <Row key={i} letters={guesses[i] || ""} length={length} />;
        }
        if (i === turn) {
          // show the actively-typing row
          return <Row key={i} letters={currentGuess} length={length} />;
        }
        // empty row
        return <Row key={i} length={length} />;
      })}
    </div>
  );
}

