import React, { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signin', { username, password });
            setMessage(response.data.message || response.data.error || 'Unknown error occurred');
            // Handle successful sign-in (e.g., store tokens, redirect)
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.error || 'An error occurred. Please try again.');
            } else {
                setMessage('Network Error. Please try again later.');
            }
        }
    };

    return (
        <form onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign In</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default SignIn;
