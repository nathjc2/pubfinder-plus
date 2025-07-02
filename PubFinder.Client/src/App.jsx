import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PubList from './components/PubList';
import PubDetail from './components/PubDetail';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './components/Login';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <Router>
            <NavBar user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<PubList user={user} />} />
                <Route path="/pubs/:id" element={<PubDetail />} />
                <Route path="/login" element={<Login onLogin={setUser} />} />
            </Routes>
            <Footer /> 
        </Router>
    );
}

export default App;
