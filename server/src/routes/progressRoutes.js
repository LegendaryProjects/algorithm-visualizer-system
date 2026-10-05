import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// 1. Get Progress History
router.get('/:userId', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, a.name as algo_name FROM user_progress p 
       JOIN algorithms a ON p.algo_id = a.id WHERE p.user_id = $1 ORDER BY p.last_visited DESC`,
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Update Progress
router.post('/update', async (req, res) => {
  try {
    const { user_id, algo_id, completion_pct, steps_viewed } = req.body;
    const result = await pool.query(
      `INSERT INTO user_progress (user_id, algo_id, completion_pct, steps_viewed, last_visited) 
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) 
       ON CONFLICT (user_id, algo_id) DO UPDATE SET 
         completion_pct = GREATEST(user_progress.completion_pct, EXCLUDED.completion_pct),
         steps_viewed = user_progress.steps_viewed + EXCLUDED.steps_viewed,
         last_visited = CURRENT_TIMESTAMP RETURNING *`,
      [user_id, algo_id, completion_pct, steps_viewed]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Get Bookmarks
router.get('/bookmarks/:userId', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT b.*, a.name as algo_name FROM bookmarks b 
       JOIN algorithms a ON b.algo_id = a.id WHERE b.user_id = $1`,
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Toggle Bookmark
router.post('/bookmarks/toggle', async (req, res) => {
  try {
    const { user_id, algo_id, bookmark_notes } = req.body;
    const existing = await pool.query(
      'SELECT * FROM bookmarks WHERE user_id = $1 AND algo_id = $2',
      [user_id, algo_id]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        'DELETE FROM bookmarks WHERE user_id = $1 AND algo_id = $2',
        [user_id, algo_id]
      );
      res.json({ status: 'removed' });
    } else {
      await pool.query(
        `INSERT INTO bookmarks (user_id, algo_id, bookmark_notes) VALUES ($1, $2, $3)`,
        [user_id, algo_id, bookmark_notes || '']
      );
      res.json({ status: 'added' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
