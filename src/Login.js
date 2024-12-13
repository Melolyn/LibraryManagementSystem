import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

 

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Check if both fields are filled out
    if (!username || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }
  
    try {
      // Send login credentials to the backend API
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: username,  // Send 'email' instead of 'username'
        password,
      });
      
  
      if (response.status === 200) {
        // Assuming your API returns a token or some indication of successful login
        const { token } = response.data;
        
        // Store the token in localStorage (or sessionStorage, or Redux, etc.)
        localStorage.setItem('authToken', token);
  
        // Update login state
        onLoginSuccess();
      }
    } catch (error) {
      // Handle errors (e.g., invalid credentials or server issues)
      if (error.response) {
        setErrorMessage(error.response.data.message); // Display error message from backend
      } else {
        setErrorMessage('Error logging in');
      }
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Login;
