import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const userData = {
      username,
      email,
      password
    }
    
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        localStorage.setItem('token', data.token);
        console.log(localStorage.getItem('token'));
        if (data.token) {
          const decodedToken = jwtDecode(data.token);
          localStorage.setItem('userId', decodedToken.id);
          localStorage.setItem('userName', decodedToken.username);
					localStorage.setItem('isAdmin', decodedToken.isAdmin);
        }
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.message);
        // Set error message if request fails
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Set error message if request fails
      setError('An error occurred during registration.');
    }
  }

  return (
    <>
      <h1>Sign Up!</h1>
      <form onSubmit={handleRegister}>
        {error && <div className="error-message">{error}</div>}
        <div>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign Up!</button>
        <button type="button">Cancel</button>
      </form>
    </>
  )
}

export default Register;