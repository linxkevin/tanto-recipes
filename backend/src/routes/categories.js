const express = require('express');
const { pool } = require('../db');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// Public: get all active categories
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM categories ORDER BY sort_order ASC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: update sort order
router.put('/reorder', authMiddleware, async (req, res) => {
  const { order } = req.body; // [{id, sort_order}]
  try {
    await Promise.all(
      order.map(({ id, sort_order }) =>
        pool.query('UPDATE categories SET sort_order=$1 WHERE id=$2', [sort_order, id])
      )
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
