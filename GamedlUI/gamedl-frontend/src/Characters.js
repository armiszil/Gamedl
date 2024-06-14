import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);

    const fetchAllCharacters = () => {
        axios.get('http://localhost:8080/api/characters')
            .then(response => {
                setCharacters(response.data);
                setError(null); // Clear any previous errors
            })
            .catch(error => {
                setError('Error fetching characters');
                console.error('Error fetching data: ', error);
                setCharacters([]); // Clear any previous characters
            });
    };

    return (
        <div>
            <button onClick={fetchAllCharacters}>Get All Characters</button>
            {error && <div>{error}</div>}
            {characters.length > 0 ? (
                <div>
                    {characters.map(character => (
                        <div key={character.id}>
                            <h2>{character.name}</h2>
                            <p>Role: {character.role}</p>
                            <p>Gender: {character.gender}</p>
                            <p>Age: {character.age}</p>
                            <p>Game: {character.game.name}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            ) : (
                <div>No characters data</div>
            )}
        </div>
    );
}

export default CharacterList;
