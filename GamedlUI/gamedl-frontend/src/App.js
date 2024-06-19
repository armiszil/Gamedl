import React from 'react';
import RandomCharacter from './RandomCharacter.js'; // Adjust the path if needed
import Header from './design_elements/Header.js'
import Banner from './design_elements/Banner.js'
import Footer from './design_elements/Footer.js'

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


