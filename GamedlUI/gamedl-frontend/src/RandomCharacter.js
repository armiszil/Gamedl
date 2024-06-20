import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { deepEqualsWithResult } from './deepEqualsWithReport';
import GuessesList from './GuessesList';
import './App.css'

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
        setSelectedGuess(-1);
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

        if(!foundCharacter){
            setMessage(`Incorrect, "${guess}" is not valid character.`)
            return;
        }
        const result = deepEqualsWithResult(character,foundCharacter);
        addsCharacterToGuessedCharactersAndSetsMessages(foundCharacter,result);
    };

    const addsCharacterToGuessedCharactersAndSetsMessages = (newCharacter,result) => {
        setGuessedCharacters(guessedCharacters => {
            return [...guessedCharacters,{id : crypto.randomUUID(),character : newCharacter, results : result}];
        })
        setGuess("");
            
        if (character.name.toLowerCase() === newCharacter.name.toLowerCase()) {
            setMessage('Correct! You guessed the character.');
        } else {
            setMessage('Incorrect. Try again.');
        }
    }

    const handleGuessOnEnter = () => {
        const selectedCharacter = filteredCharacters[selectedGuess]
        const result = deepEqualsWithResult(character, selectedCharacter);
        addsCharacterToGuessedCharactersAndSetsMessages(selectedCharacter,result);
    }


    const handleGenerateNewCharacter = () => {
        setCharacter(fetchRandomCharacter());
        setFilteredCharacters([]);
        setGuessedCharacters([]);
    };

    const handleKeyDown = e => {
        if(e.key === "ArrowUp" && selectedGuess > 0) {
            e.preventDefault();
            setSelectedGuess(prev => prev - 1)
        } 
        else if(e.key  === "ArrowDown" && selectedGuess < filteredCharacters.length - 1){
            e.preventDefault();
            setSelectedGuess(prev => prev + 1)
        } 
        else if(e.key === "ArrowUp" || e.key === "ArrowDown"){
            e.preventDefault();
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
                <div className="search_section">
                    <div className="search_input_div">
                        <input
                            type="text"
                            value={guess}
                            className="search_input"
                            onChange={handleGuessChange}
                            placeholder="Type character name"
                            onKeyDown={handleKeyDown}
                        />
                        {message && <span>{message}</span>}
                        {filteredCharacters.length > 0 && (
                            <ul className="search_result">
                                {filteredCharacters.map((char, index) => (
                                    <li key={index} onClick={handleGuessSubmit} className={selectedGuess === index ? "search_suggestion_line active" : "search_suggestion_line"}>
                                        {char.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                
            )}
            {guessedCharacters.length !== 0 && (
                    <GuessesList guessedCharacters={guessedCharacters}/>
                )
            }
            <div>
                <button onClick={handleGenerateNewCharacter}>Get a new character</button>
            </div>
        </>
    );
}
