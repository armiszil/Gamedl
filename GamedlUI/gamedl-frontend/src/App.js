import React from 'react';
import RandomCharacter from './RandomCharacter.js'; // Adjust the path if needed
import Header from './Design elements/Header.js'
import Banner from './Design elements/Banner.js'
import Footer from './Design elements/Footer.js'

export default function App() {
    return (
        <div className="App">
        <Header />
        <Banner />
        <RandomCharacter /> 
        <Footer />
        </div>
    );
}


