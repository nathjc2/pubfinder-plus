import React, { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
    //variables
    const [pubs, setPubs] = useState([]);
    const [newPubName, setNewPubName] = React.useState('');
    const [newPubLocation, setNewPubLocation] = React.useState('');
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


    const handleAddPub = async (e) => {
        e.preventDefault(); // Prevent default form reload

        const newPub = {
            name: newPubName,
            location: newPubLocation
        };

        try {
            const response = await fetch("https://localhost:7115/api/pubs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPub)
            });

            if (response.ok) {
                const createdPub = await response.json();
                setPubs([...pubs, createdPub]); // Update list with new pub
                setNewPubName(""); // Clear input
                setNewPubLocation(""); // Clear input
            } else {
                const error = await response.text();
                console.error("Failed to add pub:", error);
            }
        } catch (err) {
            console.error("Error posting pub:", err);
        }
    };

    //html
    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Nearby Pubs</h1>
            {loading ? (
                <p>Loading pubs...</p>
            ) : (
                <ul>
                    {pubs.map(pub => (
                        <li key={pub.id}>
                            {pub.name} – {pub.location}
                        </li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleAddPub} style={{ marginTop: '2rem' }}>
                <h2>Add a New Pub</h2>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={newPubName}
                            onChange={e => setNewPubName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <label>
                        Location:
                        <input
                            type="text"
                            value={newPubLocation}
                            onChange={e => setNewPubLocation(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit" style={{ marginTop: '1rem' }}>Add Pub</button>
            </form>
        </div>
    );
    

}

export default App;
