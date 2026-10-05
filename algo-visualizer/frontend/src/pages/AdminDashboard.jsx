const express = require('express');
const router = express.Router();
const pool = require('../db');

// 1. Get All Algorithms
router.get('/algorithms', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM algorithms ORDER BY algo_id ASC');
    res.json(result.rows);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// 2. Add New Metadata
router.post('/algorithms', async (req, res) => {
  try {
    const { name, category_id, description, best_case, worst_case, space_complexity } = req.body;
    const result = await pool.query(
      `INSERT INTO algorithms (name, category_id, description, best_case, worst_case, space_complexity) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, category_id, description, best_case, worst_case, space_complexity]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// 3. Add or REPLACE Code Snippet (UPSERT)
router.post('/code', async (req, res) => {
  try {
    const { algo_id, language_code, code_text } = req.body;
    const result = await pool.query(
      `INSERT INTO code_snippets (algo_id, language_code, code_text) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (algo_id, language_code) 
       DO UPDATE SET code_text = EXCLUDED.code_text 
       RETURNING *`,
      [algo_id, language_code, code_text]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// 4. Add or REPLACE Explanation Script (UPSERT)
router.post('/scripts', async (req, res) => {
  try {
    const { algo_id, step_index, written_text, tts_narration_text } = req.body;
    const result = await pool.query(
      `INSERT INTO explanation_scripts (algo_id, step_index, written_text, tts_narration_text) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (algo_id, step_index) 
       DO UPDATE SET 
         written_text = EXCLUDED.written_text,
         tts_narration_text = EXCLUDED.tts_narration_text 
       RETURNING *`,
      [algo_id, step_index, written_text, tts_narration_text]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// 5. Delete Algorithm (Cascades down to delete its code and scripts automatically)
router.delete('/algorithms/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM algorithms WHERE algo_id = $1', [req.params.id]);
    res.json({ message: 'Deleted successfully' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

module.exports = router;