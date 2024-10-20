import React, { useState } from 'react';
import axios from 'axios';
import "../../css/globals.css"
const UserSignUp = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/signup`, { email, password,role:"user", userName });
      console.log(response.data);
    } catch (err) {
      console.error(err);
      setError('Error signing up');
    }
  };

  return (
    <div className="signup-container">
      <h2>User Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>User Name:</label>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
        <p className=' text-center mt-7'>OR</p>
        <a href="/Turf/signup">Signup as turf owner</a>
      </form>
    </div>
  );
};

export default UserSignUp;
