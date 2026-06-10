require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { pool } = require('./db');

const authRouter = require('./routes/auth');
const categoriesRouter = require('./routes/categories');
const recipesRouter = require('./routes/recipes');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/recipes', recipesRouter);

app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`tanto-recipes backend running on port ${PORT}`));
