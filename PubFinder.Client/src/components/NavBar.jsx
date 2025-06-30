import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">PubFinder</Link>
                </div>
                <nav>
                    <ul className="navbar-menu">
                        <li><Link to="/">Home</Link></li>
                        {/* Future links can go here */}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;
