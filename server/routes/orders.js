const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { auth } = require('../middleware/auth');

// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT o.*, s.name as service_name, u.company_name as provider_name
      FROM orders o
      JOIN services s ON o.service_id = s.id
      JOIN providers p ON s.provider_id = p.id
      JOIN users u ON p.user_id = u.id
      WHERE o.buyer_id = $1
      ORDER BY o.created_at DESC
    `, [req.user.userId]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { quote_id } = req.body;
    
    // Get quote details
    const quoteResult = await db.query('SELECT * FROM quotes WHERE id = $1', [quote_id]);
    
    if (quoteResult.rows.length === 0) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    const quote = quoteResult.rows[0];

    const result = await db.query(`
      INSERT INTO orders (buyer_id, quote_id, service_id, total_amount, status)
      VALUES ($1, $2, $3, $4, 'pending')
      RETURNING *
    `, [req.user.userId, quote_id, quote.service_id, quote.price]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

module.exports = router;
