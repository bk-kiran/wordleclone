import { useState } from "react";


const useWordle = (solution) => {
    const [turn, setTurn] = useState(0); // track current turn
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
    const [history, setHistory] = useState([]); // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false);

    // format a guess into an array of letter objects
    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((l) => {
            return {key: l, color: 'grey'};
        });
        
        // find any green letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                l.color = 'green';
                solutionArray[i] = null;
            }
        });

        // find any yellow letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        });

        return formattedGuess
    }


    // add a new guess to the guesses state
    // checks if guess is correct and updates isCorrect state
    // add one to turn count state
    const addNewGuess = (guess) => {
        if (currentGuess === solution) {
            setIsCorrect(true);
        }

        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = guess;
            return newGuesses;
        });

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess];
        });

        setTurn((prevTurn) => prevTurn + 1);
        setCurrentGuess('');
    }

    // tracjs currrent turn and registers if enter is pressed
    const handleKeyup = ({key}) => {
        if (key === 'Enter') {
            // only add guess if turn is less thn length
            if (turn > 5) {
                console.log("you used all your guesses");
                return;
            }
            // do not allow duplicate words
            if (history.includes(currentGuess)) {
                console.log("you already tried that word");
                return;
            }
            // check word is 5 chars long
            if (currentGuess.length !== 5) {
                console.log("word must be 5 letters");
                return;
            }

            const formatted = formatGuess()
            addNewGuess(formatted)
        }

        if (key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0, -1));
            return;
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => prev + key.toUpperCase());
            }
        }

        
    }

    return { turn, currentGuess, guesses, isCorrect, handleKeyup };
        
}

export default useWordle;