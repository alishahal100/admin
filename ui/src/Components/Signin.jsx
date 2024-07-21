import React, { useState } from 'react';
import axios from 'axios';
import "../css/globals.css"

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/login`, { email, password });
      console.log(response.data);

      if (response.data.message === "User not found" || response.data.message === "Invalid password") {
        setError(response.data.message);
        return;
      }
      
      if (response.data.message === "User logged in") {
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
      setError('Error logging in');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
