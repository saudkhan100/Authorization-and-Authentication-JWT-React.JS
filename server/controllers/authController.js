// server/controllers/authController.js
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const secretKey= 'saud';
// const User = require('../models/user');
import bcrypt from 'bcryptjs';
import {User} from '../models/user.js';
import  jwt  from 'jsonwebtoken';

const signup = async (req, res) => {
  try {
    const { firstname,lastname,email, password } = req.body;
    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({ firstname,lastname,email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log('Signup Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate a JWT token
    const token = jwt.sign({ id: user._id,firstname: user.firstname,email:user.email }, secretKey, { expiresIn: '1h' });
    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiry
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


const editPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.log('Edit Password Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// const googleLogin = async (req, res) => {
//   try {
//     const { idToken } = req.body;

//     // Verify Google ID token
//     const client = new OAuth2Client(googleClientId);
//     const ticket = await client.verifyIdToken({
//       idToken,
//       audience: googleClientId,
//     });

//     const payload = ticket.getPayload();
//     const googleUserId = payload.sub; // Google's unique identifier for the user

//     // Create or retrieve the user based on Google's information
//     const user = await User.findOneAndUpdate(
//       { googleId: googleUserId }, // Assuming you store the Google ID in your user model
//       { username: 'Google User', password: '', googleId: googleUserId },
//       { upsert: true, new: true }
//     );

//     // Generate a JWT token
//     const token = jwt.sign({ id: user._id, username: user.username }, secretKey, {
//       expiresIn: '1h',
//     });

//     res.status(200).json({ message: 'Google login successful', token });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

export {signup,login,editPassword};