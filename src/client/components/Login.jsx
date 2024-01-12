import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({setIsLoggedIn}) => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault();
        const userData = {
            username,
            password
        }

        
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                setIsLoggedIn(true);
                navigate("/");

            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData.message);
                // Set error message if request fails
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Error during Login:', error);
            // Set error message if request fails
            setError('An error occurred during login');
        }
    }

    return (
        <>
            <h1>Login!</h1>
            <form onSubmit={handleLogin}>
            {error && <div className="error-message">{error}</div>}
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
                <button type="button">Cancel</button>
            </form>
        </>
    )
}

export default Login;