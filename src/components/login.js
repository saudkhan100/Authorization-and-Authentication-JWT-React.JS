import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setLoginError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      window.location.replace('/');
    } catch (error) {
      setIsLoading(false);
      setLoginError('Invalid credentials');
    }
  };

  useEffect(() => {
    if (loginError) {
      setTimeout(() => {
        setLoginError('');
      }, 10000);
    }
  }, [loginError]);

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {isLoading ? (
          <p className="loading-message">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"  // Use "email" type for email input
              className="input-field"
              placeholder="Email"  // Change placeholder to "Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="button-container">
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </form>
        )}
        {loginError && <p className="error-message">{loginError}</p>}
      </div>
    </div>
  );
};

export default Login;
