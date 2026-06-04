const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { auth } = require('../middleware/auth');

// Get user's conversations
router.get('/conversations', auth, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT DISTINCT ON (c.id) 
        c.id, c.created_at,
        CASE 
          WHEN c.user1_id = $1 THEN u2.company_name
          ELSE u1.company_name
        END as other_party,
        m.content as last_message,
        m.created_at as last_message_time
      FROM conversations c
      JOIN users u1 ON c.user1_id = u1.id
      JOIN users u2 ON c.user2_id = u2.id
      LEFT JOIN messages m ON m.conversation_id = c.id
      WHERE c.user1_id = $1 OR c.user2_id = $1
      ORDER BY c.id, m.created_at DESC
    `, [req.user.userId]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ message: 'Failed to fetch conversations' });
  }
});

// Get messages in a conversation
router.get('/conversations/:id', auth, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT m.*, u.name as sender_name
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.conversation_id = $1
      ORDER BY m.created_at ASC
    `, [req.params.id]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

// Send message
router.post('/', auth, async (req, res) => {
  try {
    const { conversation_id, content } = req.body;
    
    const result = await db.query(`
      INSERT INTO messages (conversation_id, sender_id, content)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [conversation_id, req.user.userId, content]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

module.exports = router;
