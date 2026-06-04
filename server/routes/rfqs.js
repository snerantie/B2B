const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { auth } = require('../middleware/auth');

// Get all RFQs (providers see all, buyers see their own)
router.get('/', auth, async (req, res) => {
  try {
    let query, params;
    
    if (req.user.userType === 'provider') {
      // Providers see all open RFQs
      query = `
        SELECT r.*, u.company_name as buyer_company
        FROM rfqs r
        JOIN users u ON r.buyer_id = u.id
        WHERE r.status = 'open'
        ORDER BY r.created_at DESC
      `;
      params = [];
    } else {
      // Buyers see their own RFQs
      query = `
        SELECT r.*, COUNT(q.id) as quote_count
        FROM rfqs r
        LEFT JOIN quotes q ON r.id = q.rfq_id
        WHERE r.buyer_id = $1
        GROUP BY r.id
        ORDER BY r.created_at DESC
      `;
      params = [req.user.userId];
    }

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching RFQs:', error);
    res.status(500).json({ message: 'Failed to fetch RFQs' });
  }
});

// Get single RFQ
router.get('/:id', auth, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT r.*, u.company_name as buyer_company, u.email as buyer_email
      FROM rfqs r
      JOIN users u ON r.buyer_id = u.id
      WHERE r.id = $1
    `, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'RFQ not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching RFQ:', error);
    res.status(500).json({ message: 'Failed to fetch RFQ' });
  }
});

// Create RFQ
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, requirements, budget, deadline } = req.body;
    
    const result = await db.query(`
      INSERT INTO rfqs (buyer_id, title, description, category, requirements, budget, deadline)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [req.user.userId, title, description, category, JSON.stringify(requirements), budget, deadline]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating RFQ:', error);
    res.status(500).json({ message: 'Failed to create RFQ' });
  }
});

module.exports = router;
