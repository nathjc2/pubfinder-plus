import React, { useState } from 'react';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (username.trim()) {
            localStorage.setItem('user', JSON.stringify({ username }));
            onLogin({ username });
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
