import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const Login = ({ setIsLoggedIn }) => {
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
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token);

        if (data.token) {
          const decodedToken = jwtDecode(data.token);
          localStorage.setItem('userId', decodedToken.id);
          localStorage.setItem('userName', decodedToken.username);
        }
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
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
        <button type="button">Cancel</button>
      </form>
    </>
  )
}

export default Login;