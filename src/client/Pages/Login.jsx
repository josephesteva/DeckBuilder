import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import "../styles/Login.css";


const Login = () => {
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
          localStorage.setItem('isAdmin', decodedToken.isAdmin);
        }
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
    <div className='background-color'>
    <div className='form-container'>
      <h1>Welcome back!</h1>
      <form onSubmit={handleLogin}>
        {error && <div className="error-message">{error}</div>}
        <div>
          <label></label>
          <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label></label>
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
        <button type="button">Cancel</button>
      </form>

      <div class="drops">
    <div class="drop drop-1"></div>
    <div class="drop drop-2"></div>
    <div class="drop drop-3"></div>
    <div class="drop drop-4"></div>
    <div class="drop drop-5"></div>
    </div>
    </div>
    </div>
  )
}

export default Login;