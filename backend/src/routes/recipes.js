const express = require('express');
const { pool } = require('../db');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

async function translateWithClaude(text, targetLang) {
  const langLabel = targetLang === 'en' ? 'English' : 'Simplified Chinese';
  const prompt = `You are a professional culinary translator for a Japanese ramen restaurant in Hawaii.
Translate the following Japanese kitchen recipe content into ${langLabel}.
Keep ingredient names, cooking terms, and measurements accurate.
Return ONLY the translated text, nothing else.

Text to translate:
${text}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  const data = await response.json();
  return data.content?.[0]?.text?.trim() || text;
}

async function translateRecipe(body) {
  const { title_ja, meta_ja, ingredients_ja, steps_ja } = body;
  if (!title_ja) return {};

  // Build text blocks for batch translation
  const ingText = (ingredients_ja || []).map(i => `${i.name}|${i.amount}`).join('\n');
  const stepsText = (steps_ja || []).join('\n');

  const [
    title_en, meta_en, ing_en_raw, steps_en_raw,
    title_zh, meta_zh, ing_zh_raw, steps_zh_raw,
  ] = await Promise.all([
    translateWithClaude(title_ja, 'en'),
    translateWithClaude(meta_ja || '', 'en'),
    ingText ? translateWithClaude(ingText, 'en') : Promise.resolve(''),
    stepsText ? translateWithClaude(stepsText, 'en') : Promise.resolve(''),
    translateWithClaude(title_ja, 'zh'),
    translateWithClaude(meta_ja || '', 'zh'),
    ingText ? translateWithClaude(ingText, 'zh') : Promise.resolve(''),
    stepsText ? translateWithClaude(stepsText, 'zh') : Promise.resolve(''),
  ]);

  const parseIngredients = (raw, origJa) => {
    const lines = raw.split('\n').filter(Boolean);
    return (origJa || []).map((item, i) => {
      const parts = (lines[i] || '').split('|');
      return { name: parts[0]?.trim() || item.name, amount: parts[1]?.trim() || item.amount };
    });
  };

  return {
    title_en, meta_en,
    ingredients_en: parseIngredients(ing_en_raw, ingredients_ja),
    steps_en: steps_en_raw.split('\n').filter(Boolean),
    title_zh, meta_zh,
    ingredients_zh: parseIngredients(ing_zh_raw, ingredients_ja),
    steps_zh: steps_zh_raw.split('\n').filter(Boolean),
  };
}


// ── Public routes ─────────────────────────────────────────────────────────────

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

// ── Admin routes ──────────────────────────────────────────────────────────────

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

router.get('/admin/:id', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, c.key as category_key, c.icon as category_icon,
              c.label_en as category_label, c.color_badge, c.color_text
       FROM recipes r
       JOIN categories c ON r.category_id = c.id
       WHERE r.id = $1`,
      [req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    let {
      category_id, icon, video_url, is_active, sort_order,
      title_ja, meta_ja, ingredients_ja, steps_ja,
      title_en, meta_en, ingredients_en, steps_en,
      title_zh, meta_zh, ingredients_zh, steps_zh,
    } = req.body;

    if (title_ja && (!title_en || !title_zh)) {
      const translated = await translateRecipe(req.body);
      if (!title_en) { title_en = translated.title_en; meta_en = translated.meta_en; ingredients_en = translated.ingredients_en; steps_en = translated.steps_en; }
      if (!title_zh) { title_zh = translated.title_zh; meta_zh = translated.meta_zh; ingredients_zh = translated.ingredients_zh; steps_zh = translated.steps_zh; }
    }

    const result = await pool.query(
      `INSERT INTO recipes (
         category_id, icon, video_url, is_active, sort_order,
         title_ja, meta_ja, ingredients_ja, steps_ja,
         title_en, meta_en, ingredients_en, steps_en,
         title_zh, meta_zh, ingredients_zh, steps_zh
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *`,
      [
        category_id, icon, video_url || null, is_active !== false, sort_order || 0,
        title_ja || null, meta_ja || null,
        JSON.stringify(ingredients_ja || []), JSON.stringify(steps_ja || []),
        title_en || null, meta_en || null,
        JSON.stringify(ingredients_en || []), JSON.stringify(steps_en || []),
        title_zh || null, meta_zh || null,
        JSON.stringify(ingredients_zh || []), JSON.stringify(steps_zh || []),
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    let {
      category_id, icon, video_url, is_active, sort_order,
      title_ja, meta_ja, ingredients_ja, steps_ja,
      title_en, meta_en, ingredients_en, steps_en,
      title_zh, meta_zh, ingredients_zh, steps_zh,
      retranslate,
    } = req.body;

    if (title_ja && (retranslate || (!title_en && !title_zh))) {
      const translated = await translateRecipe(req.body);
      if (retranslate || !title_en) { title_en = translated.title_en; meta_en = translated.meta_en; ingredients_en = translated.ingredients_en; steps_en = translated.steps_en; }
      if (retranslate || !title_zh) { title_zh = translated.title_zh; meta_zh = translated.meta_zh; ingredients_zh = translated.ingredients_zh; steps_zh = translated.steps_zh; }
    }

    const result = await pool.query(
      `UPDATE recipes SET
         category_id=$1, icon=$2, video_url=$3, is_active=$4, sort_order=$5,
         title_ja=$6, meta_ja=$7, ingredients_ja=$8, steps_ja=$9,
         title_en=$10, meta_en=$11, ingredients_en=$12, steps_en=$13,
         title_zh=$14, meta_zh=$15, ingredients_zh=$16, steps_zh=$17,
         updated_at=NOW()
       WHERE id=$18 RETURNING *`,
      [
        category_id, icon, video_url || null, is_active !== false, sort_order || 0,
        title_ja || null, meta_ja || null,
        JSON.stringify(ingredients_ja || []), JSON.stringify(steps_ja || []),
        title_en || null, meta_en || null,
        JSON.stringify(ingredients_en || []), JSON.stringify(steps_en || []),
        title_zh || null, meta_zh || null,
        JSON.stringify(ingredients_zh || []), JSON.stringify(steps_zh || []),
        req.params.id,
      ]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM recipes WHERE id=$1', [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

// Public single recipe (active only)
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

module.exports = router;
