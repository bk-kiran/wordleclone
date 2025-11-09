import { useState, useEffect } from "react";
import Wordle from "./components/Wordle";
import StatsModal from "./components/StatsModal";
import MessageModal from "./components/MessageModal";

export default function App() {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [length, setLength] = useState(5);
  const [showStats, setShowStats] = useState(false);
  const [gameState, setGameState] = useState(null);
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    winPercentage: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0]
  });

  const STORAGE_KEY = (len) => `wordle:solution:${len}`;
  const GAME_STATE_KEY = (len) => `wordle:gameState:${len}`;

  useEffect(() => {
    const savedStats = JSON.parse(localStorage.getItem('wordle:stats') || 'null');
    if (savedStats) {
      setStats(savedStats);
    }
  }, []);

  const saveStats = (newStats) => {
    setStats(newStats);
    localStorage.setItem('wordle:stats', JSON.stringify(newStats));
  };

  const handleGameEnd = (won, guessCount) => {
    const newStats = { ...stats };
    newStats.gamesPlayed += 1;
    
    if (won) {
      newStats.gamesWon += 1;
      newStats.currentStreak += 1;
      newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
      newStats.guessDistribution[guessCount - 1] += 1;
    } else {
      newStats.currentStreak = 0;
    }
    
    newStats.winPercentage = Math.round((newStats.gamesWon / newStats.gamesPlayed) * 100);
    saveStats(newStats);
    
    // Mark game as complete
    const state = JSON.parse(localStorage.getItem(GAME_STATE_KEY(length)) || '{}');
    state.gameComplete = true;
    localStorage.setItem(GAME_STATE_KEY(length), JSON.stringify(state));
  };

  const fetchRandomWord = async (len) => {
    try {
      setLoading(true);
      const res = await fetch(`https://random-word-api.herokuapp.com/word?length=${len}`);
      const data = await res.json();
      const w = (data?.[0] || "").toUpperCase();
      setWord(w);
      console.log("Solution:", w);
      localStorage.setItem(STORAGE_KEY(len), w);
      // Clear game state for new word
      localStorage.removeItem(GAME_STATE_KEY(len));
      setGameState(null);
    } catch (e) {
      console.error(e);
      const fallback = len === 5 ? "REACT" : "PROGRAM";
      setWord(fallback);
      localStorage.setItem(STORAGE_KEY(len), fallback);
      localStorage.removeItem(GAME_STATE_KEY(len));
      setGameState(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedWord = localStorage.getItem(STORAGE_KEY(length));
    const savedState = JSON.parse(localStorage.getItem(GAME_STATE_KEY(length)) || 'null');
    
    // If game was complete, fetch new word
    if (savedState && savedState.gameComplete) {
      fetchRandomWord(length);
    } else if (savedWord) {
      // Load existing word and game state
      setWord(savedWord);
      setGameState(savedState);
      setLoading(false);
    } else {
      // No saved word, fetch new one
      fetchRandomWord(length);
    }
  }, [length]);

  const handleNewGame = () => {
    fetchRandomWord(length);
  };

  const changeMode = (newLength) => {
    setLength(newLength);
  };

  return (
    <div className="App">
      <h1>Wordle</h1>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => changeMode(5)}
          style={{ 
            padding: '10px 20px', 
            margin: '0 5px',
            backgroundColor: length === 5 ? '#6aaa64' : '#ddd',
            color: length === 5 ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Normal (5)
        </button>
        <button 
          onClick={() => changeMode(7)}
          style={{ 
            padding: '10px 20px', 
            margin: '0 5px',
            backgroundColor: length === 7 ? '#6aaa64' : '#ddd',
            color: length === 7 ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Hard (7)
        </button>
        <button 
          onClick={handleNewGame}
          style={{ 
            padding: '10px 20px', 
            margin: '0 5px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          New Word
        </button>
        <button 
          onClick={() => setShowStats(true)}
          style={{ 
            padding: '10px 20px', 
            margin: '0 5px',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Stats
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        word && <Wordle solution={word} length={length} onGameEnd={handleGameEnd} savedGameState={gameState} />
      )}

      <StatsModal 
        isOpen={showStats} 
        onClose={() => setShowStats(false)} 
        stats={stats}
      />
    </div>
  );
}
