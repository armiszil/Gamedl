import React from 'react';
import RandomCharacter from './RandomCharacter.js'; // Adjust the path if needed
import Characters from './Characters.js'
import Header from './Design elements/Header.js'
import Banner from './Design elements/Banner.js'
import Footer from './Design elements/Footer.js'
function App() {
    return (
        <div className="App">
        <Header />
        <Banner />
        <RandomCharacter /> 
        <Footer />
        </div>
    );
}

export default App;
