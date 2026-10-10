import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Get all users (Admin only ideally, but keeping it simple)
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all algorithms (Admin)
router.get('/algorithms', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM algorithms ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Algorithm
router.delete('/algorithms/:id', async (req, res) => {
  try {
    // Because of CASCADE, this will also delete inputs, templates, bookmarks, and progress
    await pool.query('DELETE FROM algorithms WHERE id = $1', [req.params.id]);
    res.status(200).json({ message: 'Algorithm deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Algorithm
router.put('/algorithms/:id', async (req, res) => {
  try {
    const { name, category, description, complexity, code } = req.body;
    // Extracting code string fields if they exist
    const code_cpp = code?.cpp || '';
    const code_java = code?.java || '';
    const code_python = code?.python || '';

    const result = await pool.query(
      `UPDATE algorithms SET 
        name = $1, 
        category = $2, 
        description = $3, 
        complexity = $4,
        code_cpp = $5,
        code_java = $6,
        code_python = $7
       WHERE id = $8 RETURNING *`,
      [name, category, description, complexity, code_cpp, code_java, code_python, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Algorithm not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

// Get login history
router.get('/login-history', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.id, s.device_info, s.ip_address, s.created_at, u.username, u.email
      FROM user_sessions s
      JOIN users u ON s.user_id = u.id
      ORDER BY s.created_at DESC
      LIMIT 100
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add New Algorithm
router.post('/algorithms', async (req, res) => {
  try {
    const { id, name, category, description, complexity, code } = req.body;
    
    // Extracting code string fields if they exist
    const code_cpp = code?.cpp || '';
    const code_java = code?.java || '';
    const code_python = code?.python || '';

    // Check if ID already exists
    const checkResult = await pool.query('SELECT id FROM algorithms WHERE id = $1', [id]);
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: 'Algorithm ID already exists. Use a unique ID like "quick-sort".' });
    }

    const result = await pool.query(
      `INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [id, name, category, description, complexity, code_cpp, code_java, code_python]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add New Algorithm
router.post('/algorithms', async (req, res) => {
  try {
    const { id, name, category, description, complexity, code } = req.body;
    
    // Extracting code string fields if they exist
    const code_cpp = code?.cpp || '';
    const code_java = code?.java || '';
    const code_python = code?.python || '';

    // Check if ID already exists
    const checkResult = await pool.query('SELECT id FROM algorithms WHERE id = $1', [id]);
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: 'Algorithm ID already exists. Use a unique ID like "quick-sort".' });
    }

    const result = await pool.query(
      `INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [id, name, category, description, complexity, code_cpp, code_java, code_python]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
