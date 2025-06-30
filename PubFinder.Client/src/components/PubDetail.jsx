import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PubDetail.css';  // Import the styles

function PubDetail() {
    const { id } = useParams();
    const [pub, setPub] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://localhost:7115/api/pubs/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Pub not found');
                return res.json();
            })
            .then(data => {
                setPub(data);
                setLoading(false);
            })
            .catch(() => {
                setPub(null);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading pub details...</p>;

    if (!pub) {
        return (
            <div className="container">
                <p>Pub not found.</p>
                <Link to="/" className="back-button">← Back to list</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <h2>{pub.name}</h2>
            <p><strong>Location:</strong> {pub.location}</p>

            <h3>Menu</h3>
            <ul>
                <li>Beer - £3.50</li>
                <li>Cider - £3.00</li>
                <li>Pie and Mash - £6.50</li>
                <li>Fish and Chips - £7.00</li>
            </ul>

            <Link to="/" className="back-button">← Back to list</Link>
        </div>
    );
}

export default PubDetail;
