const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Admin credentials stored in env vars:
// ADMIN_USERS = JSON array: [{"username":"kevin","password":"xxx"},{"username":"staff","password":"yyy"}]
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  let admins = [];
  try {
    admins = JSON.parse(process.env.ADMIN_USERS || '[]');
  } catch {
    return res.status(500).json({ error: 'Server config error' });
  }

  const user = admins.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, username: user.username });
});

module.exports = router;
