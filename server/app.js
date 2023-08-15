// server/server.js
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const authRoutes = require('./routes/auth');
// const config = require('./config');

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import {connection} from './connection.js';
import passport from 'passport'



const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

connection
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.log('Error:', err);
  });

// Routes
app.use('/user', authRoutes);


app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });;
