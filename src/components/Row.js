import React from 'react'

export default function Row({ letters = "", length = 5 }) {
  return (
    <div className="row">
      {Array.from({ length }, (_, i) => (
        <div className="cell" key={i}>
          {(letters[i] || "").toUpperCase()}
        </div>
      ))}
    </div>
  );
}
