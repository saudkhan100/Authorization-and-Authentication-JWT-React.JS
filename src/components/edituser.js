import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './EditPassword.css'; // Import your CSS file

const EditPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false); // New state
  const [editError, setEditError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setEmail(decodedToken.email);
      } catch (error) {
        console.error('Token decoding error:', error);
      }
    }
  }, []);

  const handleEditPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setEditError('');

    try {
      const response = await axios.post('http://localhost:5000/user/editpassword', {
        email,
        newPassword,
      });

      setIsLoading(false);
      setEditSuccess(true);
      setTimeout(() => {
        setEditSuccess(false);
        window.location.replace('/'); // Redirect to home after success
      }, 3000); // Show success message for 3 seconds
    } catch (error) {
      setIsLoading(false);
      setEditError('Password update failed');
    }
  };

  return (
    <div className="edit-password-container">
      <h2>Edit Password</h2>
      <form onSubmit={handleEditPassword}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Update Password</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {editSuccess && <p>Password updated successfully!</p>}
      {editError && <p>{editError}</p>}
    </div>
  );
};

export default EditPassword;
