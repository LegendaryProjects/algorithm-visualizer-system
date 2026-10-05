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

export default router;
