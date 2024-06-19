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
    const [selectedGuess,setSelectedGuess] = useState(-1);

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

    

    const handleGuessChange = e => {
        setGuess(e.target.value);
    };

    const handleGuessSubmit = e => {
        const foundCharacter = allCharacters.find(x => {
            return x.name.toLowerCase() === e.target.textContent.toLowerCase();
        });

        if(foundCharacter){
            const result = deepEqualsWithResult(character,foundCharacter);
            setGuessedCharacters(guessedCharacters => {
                return [...guessedCharacters,{id : crypto.randomUUID(),character : foundCharacter, results : result}];
            })
            
            if (character.name.toLowerCase() === foundCharacter.name.toLowerCase()) {
                setMessage('Correct! You guessed the character.');
            } else {
                setMessage('Incorrect. Try again.');
            }
        } else {
            setMessage(`Incorrect, "${guess}" is not valid character.`)
        }
    };

    // These function need a unification meaning substracting the functions from inside

    const handleGuessOnEnter = () => {
        const selectedCharacter = filteredCharacters[selectedGuess]
        const result = deepEqualsWithResult(character, selectedCharacter);
        setGuessedCharacters(guessedCharacters => {
            return [...guessedCharacters,{id : crypto.randomUUID(),character : selectedCharacter, results : result}];
        })
    }


    const handleGenerateNewCharacter = () => {
        setCharacter(fetchRandomCharacter());
        setFilteredCharacters([]);
        setGuessedCharacters([]);
    };

    const handleKeyDown = e => {
        if(e.key === "ArrowUp" && selectedGuess > 0) {
            setSelectedGuess(prev => prev - 1)
        }
        else if(e.key  === "ArrowDown" && selectedGuess < filteredCharacters.length - 1){
            setSelectedGuess(prev => prev + 1)
        }
        else if(e.key === "Enter" && selectedGuess >= 0){
            handleGuessOnEnter();
        }
    }

    return (
        <>
            {!isGuessing && (
                <button onClick={handleGenerateNewCharacter}>Start Guessing!</button>
            )}
            {error && <div>{error}</div>}
            {isGuessing && (
                <div>
                    <input
                        type="text"
                        value={guess}
                        onChange={handleGuessChange}
                        placeholder="Type character name"
                        onKeyDown={handleKeyDown}
                    />
                    {message && <div>{message}</div>}
                    {filteredCharacters.length > 0 && (
                        <ul>
                            {filteredCharacters.map((char, index) => (
                                <li key={index} onClick={handleGuessSubmit}>
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
