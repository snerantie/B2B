const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');

// Register
router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('name').notEmpty(),
  body('companyName').notEmpty(),
  body('userType').isIn(['buyer', 'provider'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }

  try {
    const { name, email, password, companyName, userType } = req.body;

    // Check if user exists
    const existingUser = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert user
    const result = await db.query(
      `INSERT INTO users (name, email, password, company_name, user_type) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, company_name, user_type`,
      [name, email, hashedPassword, companyName, userType]
    );

    const user = result.rows[0];

    // Generate JWT
    const token = jwt.sign({ userId: user.id, userType }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });

    res.status(201).json({ 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email,
        companyName: user.company_name,
        userType: user.user_type
      }, 
      token 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed' });
  }

  try {
    const { email, password } = req.body;

    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, userType: user.user_type }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        companyName: user.company_name,
        userType: user.user_type
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;
