const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { auth } = require('../middleware/auth');

// Get all providers
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT p.*, u.name, u.company_name, u.email
      FROM providers p
      JOIN users u ON p.user_id = u.id
      WHERE p.is_verified = true
      ORDER BY p.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({ message: 'Failed to fetch providers' });
  }
});

// Get provider by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT p.*, u.name, u.company_name, u.email
      FROM providers p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = $1
    `, [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching provider:', error);
    res.status(500).json({ message: 'Failed to fetch provider' });
  }
});

// Create provider profile
router.post('/', auth, async (req, res) => {
  try {
    const { description, services, certifications, website } = req.body;
    
    const result = await db.query(`
      INSERT INTO providers (user_id, description, services, certifications, website)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [req.user.userId, description, JSON.stringify(services), JSON.stringify(certifications), website]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating provider:', error);
    res.status(500).json({ message: 'Failed to create provider profile' });
  }
});

module.exports = router;
