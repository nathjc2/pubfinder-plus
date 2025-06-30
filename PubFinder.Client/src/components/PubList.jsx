import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PubList.css'; // Import styles

function PubList() {
    // State variables
    const [pubs, setPubs] = useState([]);               // List of pubs
    const [newPubName, setNewPubName] = useState('');  // New pub name input
    const [newPubLocation, setNewPubLocation] = useState(''); // New pub location input
    const [loading, setLoading] = useState(true);       // Loading state

    // Fetch pubs on component mount
    useEffect(() => {
        axios.get('https://localhost:7115/api/pubs')
            .then(response => {
                setPubs(response.data);
                setLoading(false);                       // Data loaded
            })
            .catch(error => {
                console.error('Error fetching pubs:', error);
                setLoading(false);                       // Stop loading on error
            });
    }, []);

    // Handle form submit to add new pub
    const handleAddPub = async (e) => {
        e.preventDefault();

        const newPub = {
            name: newPubName,
            location: newPubLocation
        };

        try {
            const response = await fetch("https://localhost:7115/api/pubs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPub)
            });

            if (response.ok) {
                const createdPub = await response.json();
                setPubs([...pubs, createdPub]);         // Add pub to list
                setNewPubName('');                      // Reset input fields
                setNewPubLocation('');
            } else {
                const error = await response.text();
                console.error("Failed to add pub:", error);
            }
        } catch (err) {
            console.error("Error posting pub:", err);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Nearby Pubs</h1>

            {/* Loading and empty states */}
            {loading ? (
                <div className="loading">Loading pubs...</div>
            ) : pubs.length === 0 ? (
                <div className="no-pubs">No pubs found.</div>
            ) : (
                        <div className="pub-list">
                            {pubs.map(pub => (
                                <div key={pub.id} className="pub-card">
                                    <Link to={`/pubs/${pub.id}`} className="pub-link">
                                        <h3>{pub.name}</h3>
                                        <p>{pub.location}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
            )}

            {/* Form to add a new pub */}
            <form onSubmit={handleAddPub} className="form-section">
                <h2>Add a New Pub</h2>
                <div>
                    <label className="form-label">
                        Name:
                        <input
                            type="text"
                            value={newPubName}
                            onChange={e => setNewPubName(e.target.value)}
                            required
                            className="form-input"
                        />
                    </label>
                </div>
                <div>
                    <label className="form-label">
                        Location:
                        <input
                            type="text"
                            value={newPubLocation}
                            onChange={e => setNewPubLocation(e.target.value)}
                            required
                            className="form-input"
                        />
                    </label>
                </div>
                <button type="submit" className="submit-btn">Add Pub</button>
            </form>
        </div>
    );
}

export default PubList;
