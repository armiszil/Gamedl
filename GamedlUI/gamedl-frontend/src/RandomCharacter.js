import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { deepEqualsWithResult } from './deepEqualsWithReport';
import GuessesList from './GuessesList';

export default function RandomCharacter() {
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);
    const [isGuessing, setIsGuessing] = useState(false);
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [allCharacters, setAllCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [guessedCharacters, setGuessedCharacters] = useState([]);

    useEffect(() => {
        fetchAllCharacters(setAllCharacters)
    }, []);

    useEffect(() => {
        setFilteredCharacters([]);
        if(guess !== ''){
            const filteredCharacters = allCharacters.filter(character => {
                return character.name.toLowerCase().includes(guess.toLowerCase());
            });
            setFilteredCharacters(filteredCharacters);
        }
    }, [guess])

    const fetchAllCharacters = async () => {
        await axios.get('http://localhost:8080/api/characters')
            .then(response => {
                setAllCharacters(response.data);
            })
            .catch(error => {
                console.error('Error fetching characters:', error);
            });
    }
    
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
        setGuess(event.target.value);
    };

    const handleGuessSubmit = () => {
        const foundCharacter = allCharacters.find(x => {
            return x.name.toLowerCase() === guess.toLowerCase();
        });

        if(foundCharacter){
            console.log(foundCharacter);
            const result = deepEqualsWithResult(character,foundCharacter);
            setGuessedCharacters(guessedCharacters => {
                return [...guessedCharacters,{id : crypto.randomUUID(),character : foundCharacter, results : result}];
            })

            console.log(guessedCharacters);
            
            if (character.name.toLowerCase() === foundCharacter.name.toLowerCase()) {
                setMessage('Correct! You guessed the character.');
            } else {
                setMessage('Incorrect. Try again.');
            }
        } else {
            setMessage(`Incorrect, "${guess}" is not valid character.`)
        }
    };


    const handleGenerateNewCharacter = () => {
        setCharacter(fetchRandomCharacter());
        setFilteredCharacters([]);
        setGuessedCharacters([]);
    };

    const handleSuggestionClick = (suggestion) => {
        setGuess(suggestion);
        setFilteredCharacters([]);
    };

    return (
        <>
            {!isGuessing && (
                <button onClick={handleGenerateNewCharacter}>Start Guessing!!</button>
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
            {guessedCharacters.length !== 0 && (
                    <GuessesList guessedCharacters={guessedCharacters}/>
                )
            }
            
        </>
    );
}
