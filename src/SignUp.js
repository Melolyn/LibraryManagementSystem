import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css'; // Import the new CSS

function SignUp({ onSignUpSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to indicate request in progress

  // Handle sign up logic
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (username && email && password) {
      setLoading(true); // Show loading indicator
      try {
        // Send a POST request to the backend to create a new user
        const response = await axios.post('http://localhost:5000/api/auth/signup', {
          username,
          email,
          password
        });

        if (response.status === 201) {
          // Successfully created user, trigger onSignUpSuccess
          onSignUpSuccess();
        }
      } catch (error) {
        // Handle errors (e.g., user already exists, server errors)
        setErrorMessage(error.response ? error.response.data.message : 'Error signing up');
      } finally {
        setLoading(false); // Hide loading indicator
      }
    } else {
      setErrorMessage('Please fill in all fields');
    }
  };

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      {/* Add the link to the Login page */}
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default SignUp;
