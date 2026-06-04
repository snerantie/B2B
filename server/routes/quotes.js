const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { auth } = require('../middleware/auth');

// Get quotes for an RFQ
router.get('/rfq/:rfqId', auth, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT q.*, p.id as provider_id, u.company_name as provider_name
      FROM quotes q
      JOIN providers p ON q.provider_id = p.id
      JOIN users u ON p.user_id = u.id
      WHERE q.rfq_id = $1
      ORDER BY q.created_at DESC
    `, [req.params.rfqId]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Failed to fetch quotes' });
  }
});

// Create quote
router.post('/', auth, async (req, res) => {
  try {
    const { rfq_id, price, delivery_time, proposal, terms } = req.body;
    
    // Get provider_id from user
    const providerResult = await db.query('SELECT id FROM providers WHERE user_id = $1', [req.user.userId]);
    
    if (providerResult.rows.length === 0) {
      return res.status(403).json({ message: 'User is not a provider' });
    }

    const provider_id = providerResult.rows[0].id;

    const result = await db.query(`
      INSERT INTO quotes (rfq_id, provider_id, price, delivery_time, proposal, terms)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [rfq_id, provider_id, price, delivery_time, proposal, JSON.stringify(terms)]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(500).json({ message: 'Failed to create quote' });
  }
});

module.exports = router;
