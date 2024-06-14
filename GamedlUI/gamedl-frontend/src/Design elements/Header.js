import React from "react";
import './Header.css';


function Header(){
    return(
        <header className="header">
            <div className="logo">Gamedl</div>
            <nav className="nav">
                <a href="#">Home</a>
                <a href="#">Play</a>
                <a href="#">LeaderBoard</a>
            </nav>
        </header>



    );
}

export default Header;