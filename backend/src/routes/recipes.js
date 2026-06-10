const express = require('express');
const { pool } = require('../db');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// Public: get all active recipes (optionally filtered by category key)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = `
      SELECT r.*, c.key as category_key, c.icon as category_icon,
             c.label_en as category_label, c.color_badge, c.color_text
      FROM recipes r
      JOIN categories c ON r.category_id = c.id
      WHERE r.is_active = true
    `;
    const params = [];
    if (category && category !== 'all') {
      params.push(category);
      query += ` AND c.key = $${params.length}`;
    }
    query += ' ORDER BY r.sort_order ASC, r.created_at ASC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public: get single recipe
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, c.key as category_key, c.icon as category_icon,
              c.label_en as category_label, c.color_badge, c.color_text
       FROM recipes r
       JOIN categories c ON r.category_id = c.id
       WHERE r.id = $1 AND r.is_active = true`,
      [req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: get all recipes (including inactive)
router.get('/admin/all', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, c.key as category_key, c.label_en as category_label
       FROM recipes r
       JOIN categories c ON r.category_id = c.id
       ORDER BY c.sort_order ASC, r.sort_order ASC, r.created_at ASC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: create recipe
router.post('/', authMiddleware, async (req, res) => {
  const { category_id, icon, title_en, meta_en, ingredients_en, steps_en, video_url, is_active, sort_order } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO recipes (category_id, icon, title_en, meta_en, ingredients_en, steps_en, video_url, is_active, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [category_id, icon, title_en, meta_en,
       JSON.stringify(ingredients_en || []),
       JSON.stringify(steps_en || []),
       video_url || null,
       is_active !== false,
       sort_order || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: update recipe
router.put('/:id', authMiddleware, async (req, res) => {
  const { category_id, icon, title_en, meta_en, ingredients_en, steps_en, video_url, is_active, sort_order } = req.body;
  try {
    const result = await pool.query(
      `UPDATE recipes SET
         category_id=$1, icon=$2, title_en=$3, meta_en=$4,
         ingredients_en=$5, steps_en=$6, video_url=$7,
         is_active=$8, sort_order=$9, updated_at=NOW()
       WHERE id=$10 RETURNING *`,
      [category_id, icon, title_en, meta_en,
       JSON.stringify(ingredients_en || []),
       JSON.stringify(steps_en || []),
       video_url || null,
       is_active !== false,
       sort_order || 0,
       req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: delete recipe
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM recipes WHERE id=$1', [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: reorder
router.put('/reorder/batch', authMiddleware, async (req, res) => {
  const { order } = req.body;
  try {
    await Promise.all(
      order.map(({ id, sort_order }) =>
        pool.query('UPDATE recipes SET sort_order=$1 WHERE id=$2', [sort_order, id])
      )
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
