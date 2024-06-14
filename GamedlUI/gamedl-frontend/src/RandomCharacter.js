import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RandomCharacter() {
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);
    const [isGuessing, setIsGuessing] = useState(false);
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [allCharacters, setAllCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/characters')
            .then(response => {
                setAllCharacters(response.data);
            })
            .catch(error => {
                console.error('Error fetching characters:', error);
            });
    }, []);

    const fetchRandomCharacter = () => {
        axios.get('http://localhost:8080/api/characters/random')
            .then(response => {
                setCharacter(response.data);
                setError(null);
                setIsGuessing(true);
                setGuess('');
                setMessage('');
            })
            .catch(error => {
                setError('Character not found');
                console.error('Error fetching data:', error);
                setCharacter(null);
                setIsGuessing(false);
            });
    };

    const handleGuessChange = (event) => {
        const userInput = event.target.value;
        setGuess(userInput);

        if (userInput){
        const filtered = allCharacters.filter(char =>
            char.name.toLowerCase().startsWith(userInput.toLowerCase())
        );
        setFilteredCharacters(filtered);}
        else{setFilteredCharacters([]);}
    };

    const handleGuessSubmit = () => {
        if (guess.toLowerCase() === character.name.toLowerCase()) {
            setMessage('Correct! You guessed the character.');
        } else {
            setMessage('Incorrect. Try again.');
        }
    };

    const handleGenerateNewCharacter = () => {
        setIsGuessing(false);
        setCharacter(null); // Reset the character
        setFilteredCharacters([]); // Clear filtered characters
        setMessage(''); // Clear message
    };

    const handleSuggestionClick = (suggestion) => {
        setGuess(suggestion);
        setFilteredCharacters([]);
    };

    return (
        <div>
            {!isGuessing && (
                <button onClick={fetchRandomCharacter}>Start Guessing!!</button>
            )}
            {error && <div>{error}</div>}
            {isGuessing && (
                <div>
                    <input
                        type="text"
                        value={guess}
                        onChange={handleGuessChange}
                        placeholder="Guess the character"
                    />
                    <button onClick={handleGuessSubmit}>Submit Guess</button>
                    {message && <div>{message}</div>}
                    {filteredCharacters.length > 0 && (
                        <ul>
                            {filteredCharacters.map((char, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(char.name)}>
                                    {char.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    <div>
                        <button onClick={handleGenerateNewCharacter}>Get a new character</button>
                    </div>
                </div>
            )}
            {character && ( //just for testing rn
                <div>
                    <h1>Character Info (for testing):</h1>
                    <p>Name: {character.name}</p>
                    <p>Role: {character.role}</p>
                    <p>Gender: {character.gender}</p>
                    <p>Age: {character.age}</p>
                    <p>Game: {character.game.name}</p>
                </div>
            )}
        </div>
    );
}

export default RandomCharacter;
