import React, { useEffect, useState } from 'react';
import axios from 'axios';



function RandomCharacter() {
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);

   const fetchRandomCharacter = () => {
           axios.get('http://localhost:8080/api/characters/random')
               .then(response => {
                   setCharacter(response.data);
                   setError(null); // Clear any previous errors
               })
               .catch(error => {
                   setError('Character not found');
                   console.error('Error fetching data:', error);
                   setCharacter(null); // Clear any previous character
               });
       };

       return (
           <div>
               <button onClick={fetchRandomCharacter}>Get Random Character</button>
               {error && <div>{error}</div>}
               {character ? (
                   <div>
                       <h1>{character.name}</h1>
                       <p>Role: {character.role}</p>
                       <p>Gender: {character.gender}</p>
                       <p>Age: {character.age}</p>
                       <p>Game: {character.game.name}</p>
                   </div>
               ) : (
                   <div>No character data</div>
               )}
           </div>
       );
   }


export default RandomCharacter;
