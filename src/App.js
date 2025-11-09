import { useState, useEffect } from "react";
import Wordle from "./components/Wordle";

export default function App() {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [length, setLength] = useState(5); 

  const STORAGE_KEY = (len) => `wordle:solution:${len}`;

  const fetchRandomWord = async (len = length) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`https://random-word-api.herokuapp.com/word?length=${len}`);
      const data = await res.json();
      const w = (data?.[0] || "").toUpperCase();
      setWord(w);
      localStorage.setItem(STORAGE_KEY(len), w); // persist
    } catch (e) {
      setError("Failed to fetch word");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY(length));
    if (saved) {
      setWord(saved);
      setLoading(false);
    } else {
      fetchRandomWord(length);
    }
  }, [setWord, length]); 

  return (
    <div className="App">
      <h1>Wordle</h1>

        <button onClick={() => setLength(5)}>Normal (5)</button>

        <button
          onClick={() => {
            localStorage.removeItem(`wordle:solution:${length}`);
            fetchRandomWord(length);
          }}
        >
          New Word
        </button>
        <div>
          Solution: {word}
          {word && <Wordle solution={word} />}
        </div>
        
        
    </div>
  );
}

