// server/routes/auth.js
import express from 'express';
import { OAuth2Client } from 'google-auth-library'; // Import Google's OAuth2Client
import { User } from '../models/user.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const googleClientId = '295429429953-j8ep3ug572q1604m5jis644sbbpuc55d.apps.googleusercontent.com';
const secretKey = 'saud';


const router = express.Router();

import {signup,login,editPassword} from '../controllers/authController.js';

router.post('/signup', signup);
router.post('/login', login);
router.post('/editpassword', editPassword);



// router.post('/google-login', async (req, res) => {
//     try {
//       const { idToken } = req.body;
  
//       // Verify Google ID token
//       const client = new OAuth2Client(googleClientId);
//       const ticket = await client.verifyIdToken({
//         idToken,
//         audience: googleClientId,
//       });
  
//       const payload = ticket.getPayload();
//       const googleUserId = payload.sub; // Google's unique identifier for the user
  
//       // Create or retrieve the user based on Google's information
//       const user = await User.findOneAndUpdate(
//         { googleId: googleUserId }, // Assuming you store the Google ID in your user model
//         { username: 'Google User', password: '', googleId: googleUserId },
//         { upsert: true, new: true }
//       );
  
//       // Generate a JWT token
//       const token = jwt.sign({ id: user._id, username: user.username }, secretKey, {
//         expiresIn: '1h',
//       });
  
//       res.status(200).json({ message: 'Google login successful', token });
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
  

export default router;