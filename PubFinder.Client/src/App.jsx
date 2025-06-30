import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PubList from './components/PubList';
import PubDetail from './components/PubDetail';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<PubList />} />
                <Route path="/pubs/:id" element={<PubDetail />} />
            </Routes>
            <Footer /> 
        </Router>
    );
}

export default App;
