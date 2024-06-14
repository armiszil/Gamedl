import React from 'react';
import RandomCharacter from './RandomCharacter.js'; // Adjust the path if needed
import Characters from './Characters.js'
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Random Character</h1>
                <RandomCharacter />
                <h1> All characters</h1>
                <Characters />
            </header>
        </div>
    );
}

export default App;
