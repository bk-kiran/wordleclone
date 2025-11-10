import { useState, useEffect } from "react";

const useWordle = (solution, length, onGameEnd, savedGameState) => {
  const [turn, setTurn] = useState(savedGameState?.turn || 0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState(savedGameState?.guesses || Array(6).fill(null));
  const [history, setHistory] = useState(savedGameState?.history || []);
  const [isCorrect, setIsCorrect] = useState(savedGameState?.isCorrect || false);
  const [gameOver, setGameOver] = useState(savedGameState?.gameOver || false);
  const [message, setMessage] = useState('');
  const [usedKeys, setUsedKeys] = useState(savedGameState?.usedKeys || {});

  const GAME_STATE_KEY = `wordle:gameState:${length}`;

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    const state = {
      turn,
      guesses,
      history,
      isCorrect,
      gameOver,
      usedKeys
    };
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
  }, [turn, guesses, history, isCorrect, gameOver, usedKeys, length]);

  const formatGuess = (guess) => {
    let solutionArray = [...solution];
    let formattedGuess = [...guess].map((l) => {
      return { key: l, color: 'grey' };
    });
    
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        l.color = 'green';
        solutionArray[i] = null;
      }
    });

    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    const won = currentGuess === solution;
    
    // Update used keys
    const newUsedKeys = { ...usedKeys };
    formattedGuess.forEach(l => {
      const currentColor = newUsedKeys[l.key];
      if (l.color === 'green') {
        newUsedKeys[l.key] = 'green';
      } else if (l.color === 'yellow' && currentColor !== 'green') {
        newUsedKeys[l.key] = 'yellow';
      } else if (!currentColor) {
        newUsedKeys[l.key] = 'grey';
      }
    });
    setUsedKeys(newUsedKeys);

    setGuesses(prev => {
      const newGuesses = [...prev];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory(prev => [...prev, currentGuess]);
    setTurn(prev => prev + 1);
    setCurrentGuess('');

    if (won) {
      setIsCorrect(true);
      setGameOver(true);
      setMessage(`🎉 Correct! The word was ${solution}`);
      onGameEnd(true, turn + 1);
    } else if (turn >= 5) {
      setGameOver(true);
      setMessage(`Game Over! The word was ${solution}`);
      onGameEnd(false, 0);
    }
  };

  const handleKeyup = ({ key }) => {
    if (gameOver) return;

    if (key === 'Enter' || key === 'ENTER') {
      if (turn > 5) {
        setMessage("No more guesses!");
        return;
      }
      if (history.includes(currentGuess)) {
        setMessage("You already tried that word!");
        return;
      }
      if (currentGuess.length !== length) {
        setMessage(`Word must be ${length} letters!`);
        return;
      }

      const formatted = formatGuess(currentGuess);
      addNewGuess(formatted);
    }

    if (key === 'Backspace' || key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < length) {
        setCurrentGuess(prev => prev + key.toUpperCase());
      }
    }
  };

  const closeMessage = () => {
    setMessage('');
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup, gameOver, message, usedKeys, closeMessage };
};

export default useWordle;