import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar({ user, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-logo">
                PubFinder
            </NavLink>
            <div className="nav-links">
                {user ? (
                    <>
                        <span className="welcome-text">Welcome, {user.username}</span>
                        <button onClick={handleLogout} className="btn logout-btn">
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink to="/login" className="btn login-link" activeclassname="active-link">
                        Login
                    </NavLink>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
