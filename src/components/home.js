import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import './home.css';

const Home = () => {
  const [email, setEmail] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.replace('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setEmail(decodedToken.firstname);
      } catch (error) {
        console.error('Token decoding error:', error);
      }
    }
  }, []);

  return (
    <div className="home-container">
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
         { !email && <li><a href="/signup">Signup</a></li>}
          { !email && <li><a href="/login">Login</a></li>}
          {email && <li><a href="/editpassword">EditPassword</a></li>}
          <li className="account-dropdown">
            <button className="account-button">
              {email ? email : 'Account'}
            </button>
            {email && (
              <div className="account-dropdown-content">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <h2>Welcome to the Home Page</h2>
      {email && <p>You are logged in as: {email}</p>}
    </div>
  );
};

export default Home;
