import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import "../css/globals.css";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/login`, { email, password });
      setLoading(false); // Stop loading

      if (response.data.message === "User not found" || response.data.message === "Invalid password") {
        setError(response.data.message);
        return;
      }

      if (response.data.message === "User logged in") {
        // Store JWT token and user info
        localStorage.setItem('token', response.data.token);
        const decodedToken = jwtDecode(response.data.token);
        localStorage.setItem('role', decodedToken.role);
        localStorage.setItem('username', decodedToken.userName);

        // Redirect to home page
        navigate('/');
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}
        
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className={`w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-5">OR</p>
        <div className="text-center mt-2">
          <a href='/user/signup' className="text-indigo-500 hover:text-indigo-600">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
