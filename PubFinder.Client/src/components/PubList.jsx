import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PubList.css';

function PubList({ user }) {
    const [pubs, setPubs] = useState([]);
    const [newPubName, setNewPubName] = useState('');
    const [newPubLocation, setNewPubLocation] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://localhost:7115/api/pubs')
            .then(response => {
                setPubs(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching pubs:', error);
                setLoading(false);
            });
    }, []);

    const [bookmarkedPubs, setBookmarkedPubs] = useState(() => {
        const saved = localStorage.getItem('bookmarkedPubs');
        return saved ? JSON.parse(saved) : [];
    });

    const toggleBookmark = (pubId) => {
        let updated;
        if (bookmarkedPubs.includes(pubId)) {
            updated = bookmarkedPubs.filter(id => id !== pubId);
        } else {
            updated = [...bookmarkedPubs, pubId];
        }
        setBookmarkedPubs(updated);
        localStorage.setItem('bookmarkedPubs', JSON.stringify(updated));
    };

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
                setPubs([...pubs, createdPub]);
                setNewPubName('');
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

                            {/* show bookmark button if logged in */}

                            {user && (
                                <button
                                    onClick={() => toggleBookmark(pub.id)}
                                    className="bookmark-btn"
                                    title="Bookmark this pub"
                                >
                                    {bookmarkedPubs.includes(pub.id) ? '★' : '☆'}
                                </button>
                            )}
                        </div>
                    ))}
                        </div>                        // end of pub-list
            )}

                        {/* show pub form if user is logged in*/}
            {user ? (
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
            ) : (
                // message if not logged in
                <p style={{ marginTop: '2rem', color: 'gray' }}>
                    You must <Link to="/login">log in</Link> to add a new pub.
                </p>
            )}
        </div>
    );
}

export default PubList;
