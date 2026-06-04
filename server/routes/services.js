const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { auth } = require('../middleware/auth');

// Get all services
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = `
      SELECT s.*, p.id as provider_id, u.company_name as provider_name
      FROM services s
      JOIN providers p ON s.provider_id = p.id
      JOIN users u ON p.user_id = u.id
      WHERE s.is_active = true
    `;
    const params = [];

    if (category) {
      params.push(category);
      query += ` AND s.category = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (s.name ILIKE $${params.length} OR s.description ILIKE $${params.length})`;
    }

    query += ' ORDER BY s.created_at DESC';

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Failed to fetch services' });
  }
});

// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT s.*, p.id as provider_id, u.company_name as provider_name, u.email as provider_email
      FROM services s
      JOIN providers p ON s.provider_id = p.id
      JOIN users u ON p.user_id = u.id
      WHERE s.id = $1
    `, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Failed to fetch service' });
  }
});

// Create service
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, category, pricing_type, base_price } = req.body;
    
    // Get provider_id from user
    const providerResult = await db.query('SELECT id FROM providers WHERE user_id = $1', [req.user.userId]);
    
    if (providerResult.rows.length === 0) {
      return res.status(403).json({ message: 'User is not a provider' });
    }

    const provider_id = providerResult.rows[0].id;

    const result = await db.query(`
      INSERT INTO services (provider_id, name, description, category, pricing_type, base_price)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [provider_id, name, description, category, pricing_type, base_price]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Failed to create service' });
  }
});

module.exports = router;
