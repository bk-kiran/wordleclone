import React, { useEffect } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keyboard from './Keyboard';
import MessageModal from './MessageModal';

function Wordle({ solution, length, onGameEnd, savedGameState }) {
  const { 
    currentGuess, 
    handleKeyup, 
    guesses, 
    isCorrect, 
    turn, 
    gameOver, 
    message,
    usedKeys,
    closeMessage 
  } = useWordle(solution, length, onGameEnd, savedGameState);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);
    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup]);

  return (
    <div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} length={length} />
      <Keyboard usedKeys={usedKeys} onKeyClick={handleKeyup} />
      <MessageModal message={message} onClose={closeMessage} />
    </div>
  );
}

export default Wordle;
